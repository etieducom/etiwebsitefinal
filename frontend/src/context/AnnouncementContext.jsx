import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AnnouncementContext = createContext({
  isAnnouncementVisible: false,
  setAnnouncementVisible: () => {},
  popupModal: null,
  setPopupModalShown: () => {}
});

export const useAnnouncement = () => useContext(AnnouncementContext);

export const AnnouncementProvider = ({ children }) => {
  const [isAnnouncementVisible, setAnnouncementVisible] = useState(true);
  const [popupModal, setPopupModal] = useState(null);
  const [popupShown, setPopupShown] = useState(false);

  // Check if announcement was dismissed this session
  useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement_dismissed");
    if (dismissed === "true") {
      setAnnouncementVisible(false);
    }
  }, []);

  // Fetch popup modal settings
  useEffect(() => {
    const fetchPopupModal = async () => {
      try {
        const res = await axios.get(`${API}/popup-modal`);
        if (res.data && res.data.is_active) {
          setPopupModal(res.data);
        }
      } catch (error) {
        console.error("Error fetching popup modal:", error);
      }
    };
    fetchPopupModal();
  }, []);

  const setPopupModalShown = () => {
    setPopupShown(true);
    sessionStorage.setItem("popup_modal_shown", "true");
  };

  // Check if popup was already shown this session
  useEffect(() => {
    const shown = sessionStorage.getItem("popup_modal_shown");
    if (shown === "true") {
      setPopupShown(true);
    }
  }, []);

  return (
    <AnnouncementContext.Provider value={{
      isAnnouncementVisible,
      setAnnouncementVisible,
      popupModal: popupShown ? null : popupModal,
      setPopupModalShown
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementContext;
