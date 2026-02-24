import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { X, ChevronLeft, ChevronRight, ExternalLink, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useAnnouncement } from "../context/AnnouncementContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AnnouncementBar = () => {
  const { isAnnouncementVisible, setAnnouncementVisible } = useAnnouncement();
  const [announcements, setAnnouncements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
    fetchUpcomingEvents();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${API}/announcements?active_only=true`);
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const res = await axios.get(`${API}/cyber-warriors/upcoming-events`);
      setUpcomingEvents(res.data);
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
    }
  };

  // Combine regular announcements with upcoming Cyber Warriors events
  const allAnnouncements = [
    ...upcomingEvents.map(event => ({
      id: `cw-${event.id}`,
      text: event.is_today 
        ? `LIVE TODAY: Cyber Warriors Session - "${event.title}"` 
        : `Upcoming in ${event.days_until} day${event.days_until > 1 ? 's' : ''}: Cyber Warriors - "${event.title}"`,
      link: "/cyber-warriors",
      link_text: "Register Now",
      isCyberWarrior: true,
      isLive: event.is_today
    })),
    ...announcements.map(a => ({ ...a, isCyberWarrior: false, isLive: false }))
  ];

  // Auto-rotate announcements
  useEffect(() => {
    if (allAnnouncements.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % allAnnouncements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allAnnouncements.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex(prev => 
      prev === 0 ? allAnnouncements.length - 1 : prev - 1
    );
  }, [allAnnouncements.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => 
      (prev + 1) % allAnnouncements.length
    );
  }, [allAnnouncements.length]);

  const handleDismiss = () => {
    setAnnouncementVisible(false);
    sessionStorage.setItem("announcement_dismissed", "true");
  };

  if (!isAnnouncementVisible || allAnnouncements.length === 0) return null;

  const currentAnnouncement = allAnnouncements[currentIndex];

  return (
    <div 
      className={`announcement-bar-wrapper ${currentAnnouncement?.isLive ? 'bg-gradient-to-r from-red-600 via-red-500 to-orange-500' : 'bg-[#1545ea]'}`}
      data-testid="announcement-bar"
    >
      <div className="container-main">
        <div className="flex items-center justify-between py-2.5 px-2 sm:px-0">
          {/* Navigation - Left */}
          {allAnnouncements.length > 1 && (
            <button
              onClick={goToPrev}
              className="p-1 text-white/70 hover:text-white transition-colors flex-shrink-0"
              aria-label="Previous announcement"
              data-testid="announcement-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Announcement Content */}
          <div className="flex-1 overflow-hidden mx-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-3 text-center"
              >
                {/* Live indicator for Cyber Warriors events */}
                {currentAnnouncement?.isLive && (
                  <span className="flex items-center gap-1.5 bg-white/20 rounded-full px-2.5 py-0.5 text-xs font-bold text-white animate-pulse flex-shrink-0">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    LIVE
                  </span>
                )}

                {/* Cyber Warriors badge */}
                {currentAnnouncement?.isCyberWarrior && !currentAnnouncement?.isLive && (
                  <Zap className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                )}

                {/* Text */}
                <span className="text-white text-sm font-medium truncate">
                  {currentAnnouncement?.text}
                </span>

                {/* Link */}
                {currentAnnouncement?.link && (
                  <Link
                    to={currentAnnouncement.link}
                    className="flex items-center gap-1 text-white font-semibold text-sm hover:underline flex-shrink-0"
                    data-testid="announcement-link"
                  >
                    {currentAnnouncement.link_text || "Learn More"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation - Right + Close */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {allAnnouncements.length > 1 && (
              <>
                <button
                  onClick={goToNext}
                  className="p-1 text-white/70 hover:text-white transition-colors"
                  aria-label="Next announcement"
                  data-testid="announcement-next"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="hidden sm:flex items-center gap-1 mx-2">
                  {allAnnouncements.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-white w-3' : 'bg-white/40'
                      }`}
                      aria-label={`Go to announcement ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="p-1 text-white/70 hover:text-white transition-colors ml-2"
              aria-label="Dismiss announcements"
              data-testid="announcement-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
