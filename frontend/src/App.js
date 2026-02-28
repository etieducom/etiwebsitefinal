import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Context
import { AnnouncementProvider } from "./context/AnnouncementContext";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import AnnouncementBar from "./components/AnnouncementBar";
import PopupModal from "./components/PopupModal";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FounderPage from "./pages/FounderPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import EventsPage from "./pages/EventsPage";
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import FAQPage from "./pages/FAQPage";
import HireFromUsPage from "./pages/HireFromUsPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import FranchisePage from "./pages/FranchisePage";
import ContactPage from "./pages/ContactPage";
import FreeCounsellingPage from "./pages/FreeCounsellingPage";
import SummerTrainingPage from "./pages/SummerTrainingPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import AdminPage from "./pages/AdminPage";
import BranchPage from "./pages/BranchPage";
import CyberWarriorsPage from "./pages/CyberWarriorsPage";
import TeamPage from "./pages/TeamPage";

// Layout wrapper component to handle announcement bar spacing
const MainLayout = ({ children }) => {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      <Chatbot />
      <PopupModal />
    </>
  );
};

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <AnnouncementProvider>
          <Routes>
            {/* Landing pages - No header/footer */}
            <Route path="/free-counselling" element={<FreeCounsellingPage />} />
            <Route path="/summer-training" element={<SummerTrainingPage />} />
            
            {/* All other routes with header/footer */}
            <Route path="/*" element={
              <MainLayout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/founder" element={<FounderPage />} />
                  <Route path="/programs" element={<ProgramsPage />} />
                  <Route path="/programs/:programId" element={<ProgramDetailPage />} />
                  {/* Legacy routes - redirect to programs */}
                  <Route path="/career-tracks" element={<ProgramsPage />} />
                  <Route path="/career-tracks/:trackId" element={<ProgramDetailPage />} />
                  <Route path="/events" element={<EventsPage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blogs/:slug" element={<BlogDetailPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/hire-from-us" element={<HireFromUsPage />} />
                  <Route path="/join-team" element={<JoinTeamPage />} />
                  <Route path="/franchise" element={<FranchisePage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/branches/:branchId" element={<BranchPage />} />
                  <Route path="/cyber-warriors" element={<CyberWarriorsPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                </Routes>
              </MainLayout>
            } />
          </Routes>
        </AnnouncementProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
