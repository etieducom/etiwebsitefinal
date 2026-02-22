import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Layout
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

// Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FounderPage from "./pages/FounderPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramDetailPage from "./pages/ProgramDetailPage";
import EventsPage from "./pages/EventsPage";
import HireFromUsPage from "./pages/HireFromUsPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import FranchisePage from "./pages/FranchisePage";
import VerifyCertificatePage from "./pages/VerifyCertificatePage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <div className="App">
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Header />
        <main>
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
            <Route path="/hire-from-us" element={<HireFromUsPage />} />
            <Route path="/join-team" element={<JoinTeamPage />} />
            <Route path="/franchise" element={<FranchisePage />} />
            <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </BrowserRouter>
    </div>
  );
}

export default App;
