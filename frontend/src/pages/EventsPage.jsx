import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events`);
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sample events if none from API
  const sampleEvents = [
    {
      id: "1",
      title: "Career Guidance Workshop",
      description: "Join our expert counsellors for a comprehensive career guidance session covering IT industry trends and opportunities.",
      event_date: "2025-02-15",
      event_time: "10:00 AM",
      location: "ETI Educom Head Office",
      image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "2",
      title: "Web Development Bootcamp",
      description: "A hands-on bootcamp introducing the fundamentals of web development using modern technologies.",
      event_date: "2025-02-22",
      event_time: "9:00 AM",
      location: "Online",
      image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      id: "3",
      title: "Cybersecurity Awareness Seminar",
      description: "Learn about the latest cybersecurity threats and best practices to protect yourself and your organization.",
      event_date: "2025-03-05",
      event_time: "2:00 PM",
      location: "ETI Educom Head Office",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
    }
  ];

  const displayEvents = events.length > 0 ? events : sampleEvents;

  return (
    <div className="pt-[72px]" data-testid="events-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              Upcoming Events
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Events
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Stay updated with our workshops, seminars, and training events
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-white">
        <div className="container-main">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full mx-auto"></div>
              <p className="text-[#717171] mt-4">Loading events...</p>
            </div>
          ) : displayEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-[#b0b0b0] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">No Upcoming Events</h3>
              <p className="text-[#717171]">Check back later for new events</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="event-card h-full" data-testid={`event-${event.id}`}>
                    {event.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={event.image_url}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge className="bg-[#1545ea]/10 text-[#1545ea] text-xs">
                          {event.event_date}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {event.event_time}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Manrope']">
                        {event.title}
                      </h3>
                      <p className="text-sm text-[#4a4a4a] mb-4 line-clamp-3">
                        {event.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[#717171]">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 section-grey">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Want to Host an Event?
            </h2>
            <p className="text-[#4a4a4a] mb-8 max-w-xl mx-auto">
              Partner with us to organize workshops, seminars, or training programs.
            </p>
            <Button className="btn-primary">
              Contact Us
              <ChevronRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
