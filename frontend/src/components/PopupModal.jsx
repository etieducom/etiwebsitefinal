import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAnnouncement } from "../context/AnnouncementContext";
import { Button } from "./ui/button";

const PopupModal = () => {
  const location = useLocation();
  const { popupModal, setPopupModalShown } = useAnnouncement();
  const [isVisible, setIsVisible] = useState(false);

  // Show popup after delay only on homepage
  useEffect(() => {
    if (!popupModal || location.pathname !== "/") return;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, (popupModal.delay_seconds || 4) * 1000);

    return () => clearTimeout(timer);
  }, [popupModal, location.pathname]);

  const handleClose = () => {
    setIsVisible(false);
    setPopupModalShown();
  };

  if (!popupModal || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={handleClose}
            data-testid="popup-modal-backdrop"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-lg mx-4"
            data-testid="popup-modal"
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
                data-testid="popup-modal-close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image */}
              {popupModal.image_url && (
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={popupModal.image_url}
                    alt={popupModal.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-3 font-['Poppins']">
                  {popupModal.title}
                </h2>

                {/* Body */}
                <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                  {popupModal.body}
                </p>

                {/* CTA Button */}
                {popupModal.cta_text && popupModal.cta_link && (
                  <Link to={popupModal.cta_link} onClick={handleClose}>
                    <Button className="btn-primary w-full sm:w-auto" data-testid="popup-modal-cta">
                      {popupModal.cta_text}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                )}

                {/* Secondary close text */}
                <button
                  onClick={handleClose}
                  className="block w-full text-center text-sm text-[#717171] mt-4 hover:text-[#1a1a1a] transition-colors"
                >
                  No thanks, maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PopupModal;
