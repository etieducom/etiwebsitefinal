import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Shield, 
  Calendar, 
  Briefcase, 
  Plus,
  Trash2,
  Star,
  BookOpen,
  Users,
  FileText,
  HelpCircle,
  Globe,
  Building2,
  GraduationCap,
  Sun,
  MessageSquare,
  Lock,
  LogOut,
  Code,
  Bell
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const AdminPage = () => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Data states
  const [events, setEvents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [seoSettings, setSeoSettings] = useState([]);
  const [franchiseEnquiries, setFranchiseEnquiries] = useState([]);
  const [counsellingLeads, setCounsellingLeads] = useState([]);
  const [summerLeads, setSummerLeads] = useState([]);
  const [quickEnquiries, setQuickEnquiries] = useState([]);
  const [technicalSeo, setTechnicalSeo] = useState({});
  const [cyberWarriorsEvents, setCyberWarriorsEvents] = useState([]);
  const [cyberWarriorsRegistrations, setCyberWarriorsRegistrations] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showEventModal, setShowEventModal] = useState(false);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showFaqModal, setShowFaqModal] = useState(false);
  const [showSeoModal, setShowSeoModal] = useState(false);
  const [showTechSeoModal, setShowTechSeoModal] = useState(false);
  const [showCwEventModal, setShowCwEventModal] = useState(false);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showPopupModal, setShowPopupModal] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showBranchModal, setShowBranchModal] = useState(false);
  
  // Edit mode states
  const [editingEvent, setEditingEvent] = useState(null);
  const [editingReview, setEditingReview] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingTeam, setEditingTeam] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);

  // Form states
  const [eventForm, setEventForm] = useState({ title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" });
  const [jobForm, setJobForm] = useState({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: [""] });
  const [reviewForm, setReviewForm] = useState({ student_name: "", course: "", review_text: "", photo_url: "", rating: 5 });
  const [programForm, setProgramForm] = useState({
    title: "", slug: "", description: "", category: "career_tracks", duration: "",
    outcomes: [""], suitable_for: "", certifications: [""], modules: [""], image_url: "", icon: "Monitor", order: 0
  });
  const [blogForm, setBlogForm] = useState({
    title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "", 
    tags: "", author: "ETI Educom", read_time: 5, is_featured: false, meta_title: "", meta_description: ""
  });
  const [faqForm, setFaqForm] = useState({ question: "", answer: "", category: "General", order: 0 });
  const [cwEventForm, setCwEventForm] = useState({ title: "", description: "", image: "", date: "" });
  const [announcementForm, setAnnouncementForm] = useState({ text: "", link: "", link_text: "", order: 0 });
  const [teamForm, setTeamForm] = useState({ 
    name: "", title: "", bio: "", photo_url: "", linkedin_url: "", twitter_url: "", email: "", order: 0 
  });
  const [branchForm, setBranchForm] = useState({ 
    name: "", slug: "", address: "", city: "", state: "", phone: "", email: "", 
    map_url: "", image_url: "", description: "", facilities: "", timings: "", order: 0 
  });
  const [popupModalForm, setPopupModalForm] = useState({ 
    title: "", body: "", image_url: "", cta_text: "", cta_link: "", delay_seconds: 4 
  });
  const [popupModalData, setPopupModalData] = useState(null);
  const [seoForm, setSeoForm] = useState({
    page_slug: "", meta_title: "", meta_description: "", meta_keywords: "", og_title: "", og_description: "", og_image: ""
  });
  const [techSeoForm, setTechSeoForm] = useState({
    google_analytics_id: "",
    google_tag_manager_id: "",
    facebook_pixel_id: "",
    sitemap_url: "",
    robots_txt: "",
    custom_head_scripts: ""
  });
  
  // Submitting states
  const [submitting, setSubmitting] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  // Admin login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        setIsLoggedIn(true);
        fetchData();
        toast.success("Login successful!");
      } else {
        setLoginError("Invalid password");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
  };

  const fetchData = async () => {
    try {
      const [eventsRes, jobsRes, reviewsRes, programsRes, enquiriesRes, blogsRes, faqsRes, seoRes, franchiseRes, counsellingRes, summerRes, quickRes, techSeoRes, cwEventsRes, cwRegsRes, announcementsRes, popupModalRes, teamRes, branchesRes] = await Promise.all([
        axios.get(`${API}/events?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/jobs?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/reviews?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/programs?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/contact`).catch(() => ({ data: [] })),
        axios.get(`${API}/blogs?published_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/faqs?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/seo`).catch(() => ({ data: [] })),
        axios.get(`${API}/franchise-enquiry`).catch(() => ({ data: [] })),
        axios.get(`${API}/counselling-leads`).catch(() => ({ data: [] })),
        axios.get(`${API}/summer-training-leads`).catch(() => ({ data: [] })),
        axios.get(`${API}/quick-enquiry`).catch(() => ({ data: [] })),
        axios.get(`${API}/technical-seo`).catch(() => ({ data: {} })),
        axios.get(`${API}/cyber-warriors/events?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/cyber-warriors/registrations`).catch(() => ({ data: [] })),
        axios.get(`${API}/announcements?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/popup-modal/admin`).catch(() => ({ data: null })),
        axios.get(`${API}/team?active_only=false`).catch(() => ({ data: [] })),
        axios.get(`${API}/branches?active_only=false`).catch(() => ({ data: [] }))
      ]);
      setEvents(eventsRes.data);
      setJobs(jobsRes.data);
      setReviews(reviewsRes.data);
      setPrograms(programsRes.data);
      setEnquiries(enquiriesRes.data);
      setBlogs(blogsRes.data);
      setFaqs(faqsRes.data);
      setSeoSettings(seoRes.data);
      setFranchiseEnquiries(franchiseRes.data);
      setCounsellingLeads(counsellingRes.data);
      setSummerLeads(summerRes.data);
      setQuickEnquiries(quickRes.data);
      setTechnicalSeo(techSeoRes.data || {});
      setCyberWarriorsEvents(cwEventsRes.data);
      setCyberWarriorsRegistrations(cwRegsRes.data);
      setAnnouncements(announcementsRes.data);
      setPopupModalData(popupModalRes.data);
      setTeamMembers(teamRes.data);
      setBranches(branchesRes.data);
      // Pre-populate popup modal form if data exists
      if (popupModalRes.data) {
        setPopupModalForm({
          title: popupModalRes.data.title || "",
          body: popupModalRes.data.body || "",
          image_url: popupModalRes.data.image_url || "",
          cta_text: popupModalRes.data.cta_text || "",
          cta_link: popupModalRes.data.cta_link || "",
          delay_seconds: popupModalRes.data.delay_seconds || 4
        });
      }
      // Pre-populate form if data exists
      if (techSeoRes.data && Object.keys(techSeoRes.data).length > 0) {
        setTechSeoForm({
          google_analytics_id: techSeoRes.data.google_analytics_id || "",
          google_tag_manager_id: techSeoRes.data.google_tag_manager_id || "",
          facebook_pixel_id: techSeoRes.data.facebook_pixel_id || "",
          sitemap_url: techSeoRes.data.sitemap_url || "",
          robots_txt: techSeoRes.data.robots_txt || "",
          custom_head_scripts: techSeoRes.data.custom_head_scripts || ""
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingEvent) {
        await axios.put(`${API}/events/${editingEvent.id}`, eventForm);
        toast.success("Event updated!");
      } else {
        await axios.post(`${API}/events`, eventForm);
        toast.success("Event created!");
      }
      setShowEventModal(false);
      setEditingEvent(null);
      setEventForm({ title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to save event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${API}/events/${eventId}`);
      toast.success("Event deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete event");
    }
  };

  // Job handlers
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const jobData = { ...jobForm, requirements: jobForm.requirements.filter(r => r.trim()) };
      await axios.post(`${API}/jobs`, jobData);
      toast.success("Job created successfully!");
      setShowJobModal(false);
      setJobForm({ title: "", department: "", location: "", type: "Full-time", description: "", requirements: [""] });
      fetchData();
    } catch (error) {
      toast.error("Failed to create job");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await axios.delete(`${API}/jobs/${jobId}`);
      toast.success("Job deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  // Review handlers
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingReview) {
        await axios.put(`${API}/reviews/${editingReview.id}`, reviewForm);
        toast.success("Review updated!");
      } else {
        await axios.post(`${API}/reviews`, reviewForm);
        toast.success("Review added!");
      }
      setShowReviewModal(false);
      setEditingReview(null);
      setReviewForm({ student_name: "", course: "", review_text: "", photo_url: "", rating: 5 });
      fetchData();
    } catch (error) {
      toast.error("Failed to save review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`${API}/reviews/${reviewId}`);
      toast.success("Review deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete review");
    }
  };

  // Program handlers
  const handleProgramSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const programData = {
        ...programForm,
        outcomes: programForm.outcomes.filter(o => o.trim()),
        certifications: programForm.certifications.filter(c => c.trim()),
        modules: programForm.modules.filter(m => m.trim())
      };
      await axios.post(`${API}/programs`, programData);
      toast.success("Program created successfully!");
      setShowProgramModal(false);
      setProgramForm({
        title: "", slug: "", description: "", category: "career_tracks", duration: "",
        outcomes: [""], suitable_for: "", certifications: [""], modules: [""], image_url: "", icon: "Monitor", order: 0
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to create program");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProgram = async (programId) => {
    if (!window.confirm("Delete this program?")) return;
    try {
      await axios.delete(`${API}/programs/${programId}`);
      toast.success("Program deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete program");
    }
  };

  // Blog handlers
  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const blogData = {
        ...blogForm,
        tags: typeof blogForm.tags === 'string' ? blogForm.tags.split(',').map(t => t.trim()).filter(t => t) : blogForm.tags
      };
      if (editingBlog) {
        await axios.put(`${API}/blogs/${editingBlog.id}`, blogData);
        toast.success("Blog updated!");
      } else {
        await axios.post(`${API}/blogs`, blogData);
        toast.success("Blog created!");
      }
      setShowBlogModal(false);
      setEditingBlog(null);
      setBlogForm({
        title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "", 
        tags: "", author: "ETI Educom", read_time: 5, is_featured: false, meta_title: "", meta_description: ""
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to save blog");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await axios.delete(`${API}/blogs/${blogId}`);
      toast.success("Blog deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  // FAQ handlers
  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/faqs`, faqForm);
      toast.success("FAQ created successfully!");
      setShowFaqModal(false);
      setFaqForm({ question: "", answer: "", category: "General", order: 0 });
      fetchData();
    } catch (error) {
      toast.error("Failed to create FAQ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteFaq = async (faqId) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      await axios.delete(`${API}/faqs/${faqId}`);
      toast.success("FAQ deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete FAQ");
    }
  };

  // SEO handlers
  const handleSeoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/seo`, seoForm);
      toast.success("SEO settings saved successfully!");
      setShowSeoModal(false);
      setSeoForm({ page_slug: "", meta_title: "", meta_description: "", meta_keywords: "", og_title: "", og_description: "", og_image: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to save SEO settings");
    } finally {
      setSubmitting(false);
    }
  };

  // Technical SEO handler
  const handleTechSeoSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/technical-seo`, techSeoForm);
      toast.success("Technical SEO settings saved successfully!");
      setShowTechSeoModal(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to save Technical SEO settings");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete handlers for franchise and counselling
  const handleDeleteFranchise = async (id) => {
    if (!window.confirm("Delete this franchise enquiry?")) return;
    try {
      await axios.delete(`${API}/franchise-enquiry/${id}`);
      toast.success("Franchise enquiry deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteCounselling = async (id) => {
    if (!window.confirm("Delete this counselling lead?")) return;
    try {
      await axios.delete(`${API}/counselling-leads/${id}`);
      toast.success("Lead deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteSummerLead = async (id) => {
    if (!window.confirm("Delete this summer training lead?")) return;
    try {
      await axios.delete(`${API}/summer-training-leads/${id}`);
      toast.success("Lead deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteQuickEnquiry = async (id) => {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await axios.delete(`${API}/quick-enquiry/${id}`);
      toast.success("Enquiry deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Cyber Warriors handlers
  const handleCwEventSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/cyber-warriors/events`, cwEventForm);
      toast.success("Event created successfully!");
      setShowCwEventModal(false);
      setCwEventForm({ title: "", description: "", image: "", date: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCwEvent = async (id) => {
    if (!window.confirm("Delete this Cyber Warriors event?")) return;
    try {
      await axios.delete(`${API}/cyber-warriors/events/${id}`);
      toast.success("Event deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const handleDeleteCwRegistration = async (id) => {
    if (!window.confirm("Delete this registration?")) return;
    try {
      await axios.delete(`${API}/cyber-warriors/registrations/${id}`);
      toast.success("Registration deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Announcement handlers
  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/announcements`, announcementForm);
      toast.success("Announcement created successfully!");
      setShowAnnouncementModal(false);
      setAnnouncementForm({ text: "", link: "", link_text: "", order: 0 });
      fetchData();
    } catch (error) {
      toast.error("Failed to create announcement");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleAnnouncement = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/announcements/${id}`, { is_active: !currentStatus });
      toast.success(`Announcement ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchData();
    } catch (error) {
      toast.error("Failed to update announcement");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await axios.delete(`${API}/announcements/${id}`);
      toast.success("Announcement deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Popup Modal handlers
  const handlePopupModalSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/popup-modal`, popupModalForm);
      toast.success("Popup modal saved successfully!");
      setShowPopupModal(false);
      fetchData();
    } catch (error) {
      toast.error("Failed to save popup modal");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePopupModal = async () => {
    try {
      const res = await axios.put(`${API}/popup-modal/toggle`);
      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error("Failed to toggle popup modal");
    }
  };

  const handleDeletePopupModal = async () => {
    if (!window.confirm("Delete the popup modal?")) return;
    try {
      await axios.delete(`${API}/popup-modal`);
      toast.success("Popup modal deleted");
      setPopupModalForm({ title: "", body: "", image_url: "", cta_text: "", cta_link: "", delay_seconds: 4 });
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Team handlers
  const handleTeamSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingTeam) {
        await axios.put(`${API}/team/${editingTeam.id}`, teamForm);
        toast.success("Team member updated!");
      } else {
        await axios.post(`${API}/team`, teamForm);
        toast.success("Team member added!");
      }
      setShowTeamModal(false);
      setEditingTeam(null);
      setTeamForm({ name: "", title: "", bio: "", photo_url: "", linkedin_url: "", twitter_url: "", email: "", order: 0 });
      fetchData();
    } catch (error) {
      toast.error("Failed to save team member");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditTeam = (member) => {
    setEditingTeam(member);
    setTeamForm({
      name: member.name,
      title: member.title,
      bio: member.bio || "",
      photo_url: member.photo_url || "",
      linkedin_url: member.linkedin_url || "",
      twitter_url: member.twitter_url || "",
      email: member.email || "",
      order: member.order || 0
    });
    setShowTeamModal(true);
  };

  const handleToggleTeam = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/team/${id}`, { is_active: !currentStatus });
      toast.success(`Team member ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchData();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm("Delete this team member?")) return;
    try {
      await axios.delete(`${API}/team/${id}`);
      toast.success("Team member deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Branch handlers
  const handleBranchSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        ...branchForm,
        facilities: branchForm.facilities ? branchForm.facilities.split(',').map(f => f.trim()).filter(f => f) : []
      };
      if (editingBranch) {
        await axios.put(`${API}/branches/${editingBranch.id}`, payload);
        toast.success("Branch updated!");
      } else {
        await axios.post(`${API}/branches`, payload);
        toast.success("Branch added!");
      }
      setShowBranchModal(false);
      setEditingBranch(null);
      setBranchForm({ name: "", slug: "", address: "", city: "", state: "", phone: "", email: "", map_url: "", image_url: "", description: "", facilities: "", timings: "", order: 0 });
      fetchData();
    } catch (error) {
      toast.error("Failed to save branch");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setBranchForm({
      name: branch.name,
      slug: branch.slug,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      phone: branch.phone,
      email: branch.email,
      map_url: branch.map_url || "",
      image_url: branch.image_url || "",
      description: branch.description || "",
      facilities: branch.facilities ? branch.facilities.join(', ') : "",
      timings: branch.timings || "",
      order: branch.order || 0
    });
    setShowBranchModal(true);
  };

  const handleToggleBranch = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/branches/${id}`, { is_active: !currentStatus });
      toast.success(`Branch ${!currentStatus ? 'activated' : 'deactivated'}`);
      fetchData();
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  const handleDeleteBranch = async (id) => {
    if (!window.confirm("Delete this branch?")) return;
    try {
      await axios.delete(`${API}/branches/${id}`);
      toast.success("Branch deleted");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // Edit handlers for existing items
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      event_date: event.event_date || "",
      event_time: event.event_time || "",
      location: event.location || "",
      image_url: event.image_url || ""
    });
    setShowEventModal(true);
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      student_name: review.student_name,
      course: review.course,
      review_text: review.review_text,
      photo_url: review.photo_url || "",
      rating: review.rating || 5
    });
    setShowReviewModal(true);
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      featured_image: blog.featured_image || "",
      category: blog.category || "",
      tags: blog.tags || "",
      author: blog.author || "ETI Educom",
      read_time: blog.read_time || 5,
      is_featured: blog.is_featured || false,
      meta_title: blog.meta_title || "",
      meta_description: blog.meta_description || ""
    });
    setShowBlogModal(true);
  };

  // Helper functions
  const addArrayItem = (formSetter, field, currentForm) => {
    formSetter({ ...currentForm, [field]: [...currentForm[field], ""] });
  };

  const updateArrayItem = (formSetter, field, index, value, currentForm) => {
    const newArray = [...currentForm[field]];
    newArray[index] = value;
    formSetter({ ...currentForm, [field]: newArray });
  };

  const pageOptions = [
    { value: "home", label: "Home Page" },
    { value: "about", label: "About Page" },
    { value: "programs", label: "Programs Page" },
    { value: "events", label: "Events Page" },
    { value: "blogs", label: "Blogs Page" },
    { value: "faq", label: "FAQ Page" },
    { value: "contact", label: "Contact Page" },
    { value: "franchise", label: "Franchise Page" },
    { value: "founder", label: "Founder's Desk" },
    { value: "summer-training", label: "Summer Training" }
  ];

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center bg-[#ebebeb]" data-testid="admin-login">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1545ea] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-[#1a1a1a] font-['Poppins']">Admin Login</h1>
            <p className="text-[#717171] text-sm mt-2">Enter your password to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input h-12"
              required
              data-testid="admin-password"
            />
            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}
            <Button 
              type="submit" 
              className="btn-primary w-full h-12"
              disabled={loggingIn}
              data-testid="admin-login-btn"
            >
              {loggingIn ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-xs text-center text-[#717171] mt-6">
            Contact administrator if you forgot the password
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="admin-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center relative">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Admin Panel
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Admin Dashboard
            </h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="absolute right-0 top-0"
              data-testid="admin-logout"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Admin Content */}
      <section className="py-12 bg-white">
        <div className="container-main">
          <Tabs defaultValue="events" className="w-full">
            <TabsList className="mb-8 flex-wrap h-auto gap-1">
              <TabsTrigger value="events" className="flex items-center gap-1 text-xs">
                <Calendar className="w-3 h-3" /> Events ({events.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-1 text-xs">
                <Star className="w-3 h-3" /> Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="programs" className="flex items-center gap-1 text-xs">
                <BookOpen className="w-3 h-3" /> Programs ({programs.length})
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-1 text-xs">
                <FileText className="w-3 h-3" /> Blogs ({blogs.length})
              </TabsTrigger>
              <TabsTrigger value="faqs" className="flex items-center gap-1 text-xs">
                <HelpCircle className="w-3 h-3" /> FAQs ({faqs.length})
              </TabsTrigger>
              <TabsTrigger value="jobs" className="flex items-center gap-1 text-xs">
                <Briefcase className="w-3 h-3" /> Jobs ({jobs.length})
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-1 text-xs">
                <Globe className="w-3 h-3" /> SEO ({seoSettings.length})
              </TabsTrigger>
              <TabsTrigger value="techseo" className="flex items-center gap-1 text-xs">
                <Code className="w-3 h-3" /> Tech SEO
              </TabsTrigger>
              <TabsTrigger value="enquiries" className="flex items-center gap-1 text-xs">
                <Users className="w-3 h-3" /> Enquiries ({enquiries.length})
              </TabsTrigger>
              <TabsTrigger value="franchise" className="flex items-center gap-1 text-xs">
                <Building2 className="w-3 h-3" /> Franchise ({franchiseEnquiries.length})
              </TabsTrigger>
              <TabsTrigger value="counselling" className="flex items-center gap-1 text-xs">
                <GraduationCap className="w-3 h-3" /> Leads ({counsellingLeads.length})
              </TabsTrigger>
              <TabsTrigger value="summer" className="flex items-center gap-1 text-xs">
                <Sun className="w-3 h-3" /> Summer ({summerLeads.length})
              </TabsTrigger>
              <TabsTrigger value="quick" className="flex items-center gap-1 text-xs">
                <MessageSquare className="w-3 h-3" /> Quick ({quickEnquiries.length})
              </TabsTrigger>
              <TabsTrigger value="cyberwarriors" className="flex items-center gap-1 text-xs">
                <Shield className="w-3 h-3" /> Cyber Warriors ({cyberWarriorsEvents.length + cyberWarriorsRegistrations.length})
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-1 text-xs bg-green-500/10">
                <Users className="w-3 h-3" /> Team ({teamMembers.length})
              </TabsTrigger>
              <TabsTrigger value="branches" className="flex items-center gap-1 text-xs bg-orange-500/10">
                <Building2 className="w-3 h-3" /> Branches ({branches.length})
              </TabsTrigger>
              <TabsTrigger value="announcements" className="flex items-center gap-1 text-xs bg-[#1545ea]/10">
                <MessageSquare className="w-3 h-3" /> Announcements ({announcements.length})
              </TabsTrigger>
            </TabsList>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Events</h2>
                <Button className="btn-primary" onClick={() => setShowEventModal(true)} data-testid="add-event-btn">
                  <Plus className="w-4 h-4" /> Add Event
                </Button>
              </div>
              {events.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No events yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <Card key={event.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{event.title}</h3>
                          <p className="text-sm text-[#717171]">{event.event_date} | {event.location}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditEvent(event)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Student Reviews</h2>
                <Button className="btn-primary" onClick={() => setShowReviewModal(true)} data-testid="add-review-btn">
                  <Plus className="w-4 h-4" /> Add Review
                </Button>
              </div>
              {reviews.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Star className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No reviews yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {review.photo_url && (
                            <img src={review.photo_url} alt={review.student_name} className="w-12 h-12 rounded-full object-cover" />
                          )}
                          <div>
                            <h3 className="font-semibold text-[#1a1a1a]">{review.student_name}</h3>
                            <p className="text-sm text-[#717171]">{review.course} | Rating: {review.rating}/5</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditReview(review)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Programs Tab */}
            <TabsContent value="programs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Programs</h2>
                <Button className="btn-primary" onClick={() => setShowProgramModal(true)} data-testid="add-program-btn">
                  <Plus className="w-4 h-4" /> Add Program
                </Button>
              </div>
              {programs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <BookOpen className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No programs yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {programs.map((program) => (
                    <Card key={program.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{program.title}</h3>
                          <p className="text-sm text-[#717171]">{program.category} | {program.duration}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteProgram(program.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Blogs Tab */}
            <TabsContent value="blogs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Blogs</h2>
                <Button className="btn-primary" onClick={() => setShowBlogModal(true)} data-testid="add-blog-btn">
                  <Plus className="w-4 h-4" /> Add Blog
                </Button>
              </div>
              {blogs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <FileText className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No blogs yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <Card key={blog.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {blog.featured_image && (
                            <img src={blog.featured_image} alt={blog.title} className="w-16 h-12 rounded object-cover" />
                          )}
                          <div>
                            <h3 className="font-semibold text-[#1a1a1a]">{blog.title}</h3>
                            <p className="text-sm text-[#717171]">{blog.category} | {blog.read_time} min read</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditBlog(blog)}>
                            Edit
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* FAQs Tab */}
            <TabsContent value="faqs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage FAQs</h2>
                <Button className="btn-primary" onClick={() => setShowFaqModal(true)} data-testid="add-faq-btn">
                  <Plus className="w-4 h-4" /> Add FAQ
                </Button>
              </div>
              {faqs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <HelpCircle className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No FAQs yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <Card key={faq.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a] line-clamp-1">{faq.question}</h3>
                          <p className="text-sm text-[#717171]">{faq.category}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteFaq(faq.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Job Openings</h2>
                <Button className="btn-primary" onClick={() => setShowJobModal(true)} data-testid="add-job-btn">
                  <Plus className="w-4 h-4" /> Add Job
                </Button>
              </div>
              {jobs.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Briefcase className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No job openings yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <Card key={job.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{job.title}</h3>
                          <p className="text-sm text-[#717171]">{job.department} | {job.location} | {job.type}</p>
                        </div>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteJob(job.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* SEO Tab */}
            <TabsContent value="seo">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">SEO Settings</h2>
                <Button className="btn-primary" onClick={() => setShowSeoModal(true)} data-testid="add-seo-btn">
                  <Plus className="w-4 h-4" /> Add/Update SEO
                </Button>
              </div>
              {seoSettings.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Globe className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No SEO settings yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {seoSettings.map((seo) => (
                    <Card key={seo.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge>{seo.page_slug}</Badge>
                        </div>
                        <h3 className="font-semibold text-[#1a1a1a]">{seo.meta_title}</h3>
                        <p className="text-sm text-[#717171] line-clamp-2">{seo.meta_description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Technical SEO Tab */}
            <TabsContent value="techseo">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-[#1a1a1a]">Technical SEO Settings</h2>
                <Button className="btn-primary" onClick={() => setShowTechSeoModal(true)} data-testid="edit-techseo-btn">
                  <Plus className="w-4 h-4" /> Edit Settings
                </Button>
              </div>
              <Card className="card-default">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] mb-4">Analytics & Tracking</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-lg">
                          <span className="text-sm text-[#4a4a4a]">Google Analytics ID</span>
                          <Badge variant={technicalSeo.google_analytics_id ? "default" : "outline"}>
                            {technicalSeo.google_analytics_id || "Not Set"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-lg">
                          <span className="text-sm text-[#4a4a4a]">Google Tag Manager</span>
                          <Badge variant={technicalSeo.google_tag_manager_id ? "default" : "outline"}>
                            {technicalSeo.google_tag_manager_id || "Not Set"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-lg">
                          <span className="text-sm text-[#4a4a4a]">Facebook Pixel ID</span>
                          <Badge variant={technicalSeo.facebook_pixel_id ? "default" : "outline"}>
                            {technicalSeo.facebook_pixel_id || "Not Set"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] mb-4">Sitemap & Robots</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-lg">
                          <span className="text-sm text-[#4a4a4a]">Sitemap URL</span>
                          <Badge variant={technicalSeo.sitemap_url ? "default" : "outline"}>
                            {technicalSeo.sitemap_url ? "Configured" : "Not Set"}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-[#f8f9fa] rounded-lg">
                          <span className="text-sm text-[#4a4a4a]">Custom Head Scripts</span>
                          <Badge variant={technicalSeo.custom_head_scripts ? "default" : "outline"}>
                            {technicalSeo.custom_head_scripts ? "Configured" : "Not Set"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enquiries Tab */}
            <TabsContent value="enquiries">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Contact Enquiries</h2>
              {enquiries.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No enquiries yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-[#1a1a1a]">{enquiry.name}</h3>
                            <p className="text-sm text-[#717171]">{enquiry.email} | {enquiry.phone}</p>
                            <p className="text-sm text-[#4a4a4a] mt-2">{enquiry.message}</p>
                          </div>
                          <Badge variant="outline">{enquiry.status || 'new'}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Franchise Tab */}
            <TabsContent value="franchise">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Franchise Enquiries</h2>
              {franchiseEnquiries.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Building2 className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No franchise enquiries yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {franchiseEnquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="card-default">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-[#1a1a1a]">{enquiry.name}</h3>
                            <p className="text-sm text-[#717171]">{enquiry.email} | {enquiry.phone}</p>
                            <p className="text-sm text-[#717171]">{enquiry.city} | Budget: {enquiry.investment_budget}</p>
                            <p className="text-sm text-[#4a4a4a] mt-2 line-clamp-2">{enquiry.why_franchise}</p>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge variant="outline">{enquiry.status || 'new'}</Badge>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteFranchise(enquiry.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Counselling Leads Tab */}
            <TabsContent value="counselling">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Free Counselling Leads</h2>
              {counsellingLeads.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <GraduationCap className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No counselling leads yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {counsellingLeads.map((lead) => (
                    <Card key={lead.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{lead.name}</h3>
                          <p className="text-sm text-[#717171]">{lead.phone} | {lead.education}</p>
                          <p className="text-sm text-[#1545ea]">Interested in: {lead.preferred_track}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{lead.status || 'new'}</Badge>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteCounselling(lead.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Summer Training Tab */}
            <TabsContent value="summer">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Summer Training Leads</h2>
              {summerLeads.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Sun className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No summer training leads yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {summerLeads.map((lead) => (
                    <Card key={lead.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{lead.name}</h3>
                          <p className="text-sm text-[#717171]">{lead.email} | {lead.phone}</p>
                          <p className="text-sm text-[#1545ea]">{lead.program_interest} | {lead.duration}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{lead.status || 'new'}</Badge>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteSummerLead(lead.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Quick Enquiries Tab */}
            <TabsContent value="quick">
              <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Quick Enquiries (Homepage)</h2>
              {quickEnquiries.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No quick enquiries yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {quickEnquiries.map((enquiry) => (
                    <Card key={enquiry.id} className="card-default">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-[#1a1a1a]">{enquiry.name}</h3>
                          <p className="text-sm text-[#717171]">{enquiry.phone} {enquiry.email && `| ${enquiry.email}`}</p>
                          <p className="text-sm text-[#1545ea]">Interested in: {enquiry.interest}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{enquiry.status || 'new'}</Badge>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteQuickEnquiry(enquiry.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Cyber Warriors Tab */}
            <TabsContent value="cyberwarriors">
              <div className="space-y-8">
                {/* Events Section */}
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[#1a1a1a]">Cyber Warriors Events</h2>
                    <Button className="btn-primary" onClick={() => setShowCwEventModal(true)} data-testid="add-cw-event-btn">
                      <Plus className="w-4 h-4" /> Add Event
                    </Button>
                  </div>
                  {cyberWarriorsEvents.length === 0 ? (
                    <Card className="card-default"><CardContent className="p-8 text-center">
                      <Shield className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                      <p className="text-[#717171]">No Cyber Warriors events yet</p>
                    </CardContent></Card>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {cyberWarriorsEvents.map((event) => (
                        <Card key={event.id} className="card-default">
                          {event.image && (
                            <img src={event.image} alt={event.title} className="w-full h-32 object-cover rounded-t-xl" />
                          )}
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-[#1a1a1a] line-clamp-1">{event.title}</h3>
                            <p className="text-sm text-[#717171] line-clamp-2 mt-1">{event.description}</p>
                            <div className="flex justify-end mt-3">
                              <Button variant="destructive" size="sm" onClick={() => handleDeleteCwEvent(event.id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>

                {/* Registrations Section */}
                <div>
                  <h2 className="text-xl font-bold text-[#1a1a1a] mb-6">Cyber Warriors Registrations</h2>
                  {cyberWarriorsRegistrations.length === 0 ? (
                    <Card className="card-default"><CardContent className="p-8 text-center">
                      <Users className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                      <p className="text-[#717171]">No registrations yet</p>
                    </CardContent></Card>
                  ) : (
                    <div className="space-y-4">
                      {cyberWarriorsRegistrations.map((reg) => (
                        <Card key={reg.id} className="card-default">
                          <CardContent className="p-4 flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-[#1a1a1a]">{reg.name}</h3>
                                <Badge variant="outline">{reg.registration_type}</Badge>
                              </div>
                              <p className="text-sm text-[#717171]">{reg.email} | {reg.contact_number}</p>
                              {reg.organization_name && (
                                <p className="text-sm text-[#1545ea]">{reg.organization_type}: {reg.organization_name}</p>
                              )}
                              {reg.preferred_date && (
                                <p className="text-xs text-[#717171] mt-1">Preferred Date: {reg.preferred_date}</p>
                              )}
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteCwRegistration(reg.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1a1a1a]">Team Members</h2>
                  <p className="text-sm text-[#717171]">Manage your team. Members appear on homepage and /team page.</p>
                </div>
                <Button className="btn-primary" onClick={() => { setEditingTeam(null); setTeamForm({ name: "", title: "", bio: "", photo_url: "", linkedin_url: "", twitter_url: "", email: "", order: 0 }); setShowTeamModal(true); }} data-testid="add-team-btn">
                  <Plus className="w-4 h-4" /> Add Member
                </Button>
              </div>
              {teamMembers.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No team members yet</p>
                </CardContent></Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className={`card-default ${!member.is_active ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          {member.photo_url ? (
                            <img src={member.photo_url} alt={member.name} className="w-16 h-16 rounded-full object-cover" />
                          ) : (
                            <div className="w-16 h-16 bg-[#1545ea]/10 rounded-full flex items-center justify-center">
                              <span className="text-xl font-bold text-[#1545ea]">{member.name.charAt(0)}</span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="font-semibold text-[#1a1a1a]">{member.name}</h3>
                            <p className="text-sm text-[#1545ea]">{member.title}</p>
                            <Badge className={member.is_active ? 'bg-green-100 text-green-700 mt-2' : 'bg-gray-100 text-gray-500 mt-2'}>
                              {member.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditTeam(member)}>
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleToggleTeam(member.id, member.is_active)}>
                            {member.is_active ? 'Hide' : 'Show'}
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleDeleteTeam(member.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Branches Tab */}
            <TabsContent value="branches">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1a1a1a]">Branches</h2>
                  <p className="text-sm text-[#717171]">Manage branches. Each branch auto-generates a landing page at /branches/slug</p>
                </div>
                <Button className="btn-primary" onClick={() => { setEditingBranch(null); setBranchForm({ name: "", slug: "", address: "", city: "", state: "", phone: "", email: "", map_url: "", image_url: "", description: "", facilities: "", timings: "", order: 0 }); setShowBranchModal(true); }} data-testid="add-branch-btn">
                  <Plus className="w-4 h-4" /> Add Branch
                </Button>
              </div>
              {branches.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <Building2 className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No branches yet</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {branches.map((branch) => (
                    <Card key={branch.id} className={`card-default ${!branch.is_active ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            {branch.image_url && (
                              <img src={branch.image_url} alt={branch.name} className="w-20 h-16 rounded-lg object-cover" />
                            )}
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-[#1a1a1a]">{branch.name}</h3>
                                <Badge className={branch.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                                  {branch.is_active ? 'Active' : 'Inactive'}
                                </Badge>
                              </div>
                              <p className="text-sm text-[#717171]">{branch.city}, {branch.state}</p>
                              <p className="text-sm text-[#717171]">{branch.phone} | {branch.email}</p>
                              <a href={`/branches/${branch.slug}`} target="_blank" rel="noreferrer" className="text-sm text-[#1545ea] hover:underline">
                                View Page →
                              </a>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditBranch(branch)}>
                              Edit
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleToggleBranch(branch.id, branch.is_active)}>
                              {branch.is_active ? 'Hide' : 'Show'}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteBranch(branch.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1a1a1a]">Announcement Bar</h2>
                  <p className="text-sm text-[#717171]">Announcements appear above the navbar across all pages. Cyber Warriors events within 3 days are auto-detected.</p>
                </div>
                <Button className="btn-primary" onClick={() => setShowAnnouncementModal(true)} data-testid="add-announcement-btn">
                  <Plus className="w-4 h-4" /> Add Announcement
                </Button>
              </div>
              {announcements.length === 0 ? (
                <Card className="card-default"><CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                  <p className="text-[#717171]">No announcements yet</p>
                  <p className="text-sm text-[#b0b0b0] mt-2">Cyber Warriors events within 3 days will auto-appear in the bar</p>
                </CardContent></Card>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <Card key={announcement.id} className={`card-default ${!announcement.is_active ? 'opacity-60' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={announcement.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                                {announcement.is_active ? 'Active' : 'Inactive'}
                              </Badge>
                              <span className="text-xs text-[#717171]">Order: {announcement.order}</span>
                            </div>
                            <p className="font-medium text-[#1a1a1a]">{announcement.text}</p>
                            {announcement.link && (
                              <p className="text-sm text-[#1545ea] mt-1">
                                Link: {announcement.link} {announcement.link_text && `(${announcement.link_text})`}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleToggleAnnouncement(announcement.id, announcement.is_active)}
                            >
                              {announcement.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteAnnouncement(announcement.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Popup Modal Section */}
              <div className="mt-12 pt-8 border-t border-[#ebebeb]">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#1a1a1a]">Popup Modal</h2>
                    <p className="text-sm text-[#717171]">A modal that appears after visitors stay on homepage for a few seconds</p>
                  </div>
                  <Button className="btn-primary" onClick={() => setShowPopupModal(true)} data-testid="edit-popup-modal-btn">
                    <Plus className="w-4 h-4" /> {popupModalData ? 'Edit Modal' : 'Create Modal'}
                  </Button>
                </div>
                
                {!popupModalData ? (
                  <Card className="card-default"><CardContent className="p-8 text-center">
                    <Bell className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                    <p className="text-[#717171]">No popup modal configured</p>
                    <p className="text-sm text-[#b0b0b0] mt-2">Create one to engage visitors with special offers or announcements</p>
                  </CardContent></Card>
                ) : (
                  <Card className={`card-default ${!popupModalData.is_active ? 'opacity-60' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-6">
                        {popupModalData.image_url && (
                          <img 
                            src={popupModalData.image_url} 
                            alt={popupModalData.title}
                            className="w-32 h-24 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={popupModalData.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}>
                              {popupModalData.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <span className="text-xs text-[#717171]">Shows after {popupModalData.delay_seconds}s</span>
                          </div>
                          <h3 className="font-bold text-lg text-[#1a1a1a]">{popupModalData.title}</h3>
                          <p className="text-[#4a4a4a] text-sm mt-1 line-clamp-2">{popupModalData.body}</p>
                          {popupModalData.cta_text && (
                            <p className="text-sm text-[#1545ea] mt-2">
                              CTA: "{popupModalData.cta_text}" → {popupModalData.cta_link}
                            </p>
                          )}
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button variant="outline" size="sm" onClick={handleTogglePopupModal}>
                            {popupModalData.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button variant="destructive" size="sm" onClick={handleDeletePopupModal}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Event Modal */}
      <Dialog open={showEventModal} onOpenChange={setShowEventModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <Input placeholder="Event Title *" value={eventForm.title} onChange={(e) => setEventForm({...eventForm, title: e.target.value})} required className="form-input" />
            <Textarea placeholder="Description *" value={eventForm.description} onChange={(e) => setEventForm({...eventForm, description: e.target.value})} required className="form-input" rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <Input type="date" value={eventForm.event_date} onChange={(e) => setEventForm({...eventForm, event_date: e.target.value})} required className="form-input" />
              <Input placeholder="Time (e.g., 10:00 AM)" value={eventForm.event_time} onChange={(e) => setEventForm({...eventForm, event_time: e.target.value})} required className="form-input" />
            </div>
            <Input placeholder="Location *" value={eventForm.location} onChange={(e) => setEventForm({...eventForm, location: e.target.value})} required className="form-input" />
            <Input placeholder="Image URL (optional)" value={eventForm.image_url} onChange={(e) => setEventForm({...eventForm, image_url: e.target.value})} className="form-input" />
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating..." : "Create Event"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={showReviewModal} onOpenChange={setShowReviewModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Student Review</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <Input placeholder="Student Name *" value={reviewForm.student_name} onChange={(e) => setReviewForm({...reviewForm, student_name: e.target.value})} required className="form-input" />
            <Input placeholder="Course/Program *" value={reviewForm.course} onChange={(e) => setReviewForm({...reviewForm, course: e.target.value})} required className="form-input" />
            <Textarea placeholder="Review Text *" value={reviewForm.review_text} onChange={(e) => setReviewForm({...reviewForm, review_text: e.target.value})} required className="form-input" rows={4} />
            <Input placeholder="Photo URL (optional)" value={reviewForm.photo_url} onChange={(e) => setReviewForm({...reviewForm, photo_url: e.target.value})} className="form-input" />
            <Select value={String(reviewForm.rating)} onValueChange={(v) => setReviewForm({...reviewForm, rating: parseInt(v)})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Rating" /></SelectTrigger>
              <SelectContent>
                {[5,4,3,2,1].map(r => <SelectItem key={r} value={String(r)}>{r} Stars</SelectItem>)}
              </SelectContent>
            </Select>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Adding..." : "Add Review"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Program Modal */}
      <Dialog open={showProgramModal} onOpenChange={setShowProgramModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Program</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProgramSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Program Title *" value={programForm.title} onChange={(e) => setProgramForm({...programForm, title: e.target.value})} required className="form-input" />
              <Input placeholder="Slug (e.g., web-development) *" value={programForm.slug} onChange={(e) => setProgramForm({...programForm, slug: e.target.value})} required className="form-input" />
            </div>
            <Textarea placeholder="Description *" value={programForm.description} onChange={(e) => setProgramForm({...programForm, description: e.target.value})} required className="form-input" rows={3} />
            <div className="grid grid-cols-2 gap-4">
              <Select value={programForm.category} onValueChange={(v) => setProgramForm({...programForm, category: v})}>
                <SelectTrigger className="form-input"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="career_tracks">Career Tracks</SelectItem>
                  <SelectItem value="short_term">Short Term Programs</SelectItem>
                  <SelectItem value="skill_development">Skill Development</SelectItem>
                  <SelectItem value="corporate_training">Corporate Training</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Duration (e.g., 6 months)" value={programForm.duration} onChange={(e) => setProgramForm({...programForm, duration: e.target.value})} className="form-input" />
            </div>
            <Input placeholder="Suitable For" value={programForm.suitable_for} onChange={(e) => setProgramForm({...programForm, suitable_for: e.target.value})} className="form-input" />
            <Input placeholder="Image URL (optional)" value={programForm.image_url} onChange={(e) => setProgramForm({...programForm, image_url: e.target.value})} className="form-input" />
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating..." : "Create Program"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Modal */}
      <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Job Opening</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleJobSubmit} className="space-y-4">
            <Input placeholder="Job Title *" value={jobForm.title} onChange={(e) => setJobForm({...jobForm, title: e.target.value})} required className="form-input" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Department *" value={jobForm.department} onChange={(e) => setJobForm({...jobForm, department: e.target.value})} required className="form-input" />
              <Input placeholder="Location *" value={jobForm.location} onChange={(e) => setJobForm({...jobForm, location: e.target.value})} required className="form-input" />
            </div>
            <Select value={jobForm.type} onValueChange={(v) => setJobForm({...jobForm, type: v})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Job Description *" value={jobForm.description} onChange={(e) => setJobForm({...jobForm, description: e.target.value})} required className="form-input" rows={4} />
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating..." : "Create Job"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Blog Modal */}
      <Dialog open={showBlogModal} onOpenChange={setShowBlogModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBlogSubmit} className="space-y-4">
            <Input placeholder="Blog Title *" value={blogForm.title} onChange={(e) => setBlogForm({...blogForm, title: e.target.value})} required className="form-input" />
            <Input placeholder="Slug (e.g., my-blog-post) *" value={blogForm.slug} onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})} required className="form-input" />
            <Textarea placeholder="Excerpt (short description) *" value={blogForm.excerpt} onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})} required className="form-input" rows={2} />
            <Textarea placeholder="Content (HTML supported) *" value={blogForm.content} onChange={(e) => setBlogForm({...blogForm, content: e.target.value})} required className="form-input" rows={8} />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Category *" value={blogForm.category} onChange={(e) => setBlogForm({...blogForm, category: e.target.value})} required className="form-input" />
              <Input placeholder="Tags (comma separated)" value={blogForm.tags} onChange={(e) => setBlogForm({...blogForm, tags: e.target.value})} className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Author" value={blogForm.author} onChange={(e) => setBlogForm({...blogForm, author: e.target.value})} className="form-input" />
              <Input type="number" placeholder="Read Time (minutes)" value={blogForm.read_time} onChange={(e) => setBlogForm({...blogForm, read_time: parseInt(e.target.value) || 5})} className="form-input" />
            </div>
            <Input placeholder="Featured Image URL" value={blogForm.featured_image} onChange={(e) => setBlogForm({...blogForm, featured_image: e.target.value})} className="form-input" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Meta Title (SEO)" value={blogForm.meta_title} onChange={(e) => setBlogForm({...blogForm, meta_title: e.target.value})} className="form-input" />
              <Input placeholder="Meta Description (SEO)" value={blogForm.meta_description} onChange={(e) => setBlogForm({...blogForm, meta_description: e.target.value})} className="form-input" />
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating..." : "Create Blog"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* FAQ Modal */}
      <Dialog open={showFaqModal} onOpenChange={setShowFaqModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add FAQ</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFaqSubmit} className="space-y-4">
            <Textarea placeholder="Question *" value={faqForm.question} onChange={(e) => setFaqForm({...faqForm, question: e.target.value})} required className="form-input" rows={2} />
            <Textarea placeholder="Answer *" value={faqForm.answer} onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})} required className="form-input" rows={4} />
            <div className="grid grid-cols-2 gap-4">
              <Select value={faqForm.category} onValueChange={(v) => setFaqForm({...faqForm, category: v})}>
                <SelectTrigger className="form-input"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Admissions">Admissions</SelectItem>
                  <SelectItem value="Programs">Programs</SelectItem>
                  <SelectItem value="Fees">Fees</SelectItem>
                  <SelectItem value="Placements">Placements</SelectItem>
                  <SelectItem value="Certifications">Certifications</SelectItem>
                  <SelectItem value="Franchise">Franchise</SelectItem>
                </SelectContent>
              </Select>
              <Input type="number" placeholder="Order" value={faqForm.order} onChange={(e) => setFaqForm({...faqForm, order: parseInt(e.target.value) || 0})} className="form-input" />
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Creating..." : "Create FAQ"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* SEO Modal */}
      <Dialog open={showSeoModal} onOpenChange={setShowSeoModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add/Update SEO Settings</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSeoSubmit} className="space-y-4">
            <Select value={seoForm.page_slug} onValueChange={(v) => setSeoForm({...seoForm, page_slug: v})}>
              <SelectTrigger className="form-input"><SelectValue placeholder="Select Page *" /></SelectTrigger>
              <SelectContent>
                {pageOptions.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input placeholder="Meta Title * (max 70 chars)" value={seoForm.meta_title} onChange={(e) => setSeoForm({...seoForm, meta_title: e.target.value})} required className="form-input" maxLength={70} />
            <Textarea placeholder="Meta Description * (max 160 chars)" value={seoForm.meta_description} onChange={(e) => setSeoForm({...seoForm, meta_description: e.target.value})} required className="form-input" rows={2} maxLength={160} />
            <Input placeholder="Meta Keywords (comma separated)" value={seoForm.meta_keywords} onChange={(e) => setSeoForm({...seoForm, meta_keywords: e.target.value})} className="form-input" />
            <Input placeholder="OG Title (for social sharing)" value={seoForm.og_title} onChange={(e) => setSeoForm({...seoForm, og_title: e.target.value})} className="form-input" />
            <Input placeholder="OG Description" value={seoForm.og_description} onChange={(e) => setSeoForm({...seoForm, og_description: e.target.value})} className="form-input" />
            <Input placeholder="OG Image URL" value={seoForm.og_image} onChange={(e) => setSeoForm({...seoForm, og_image: e.target.value})} className="form-input" />
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>{submitting ? "Saving..." : "Save SEO Settings"}</Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Technical SEO Modal */}
      <Dialog open={showTechSeoModal} onOpenChange={setShowTechSeoModal}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Technical SEO Settings</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTechSeoSubmit} className="space-y-4">
            <div>
              <label className="form-label">Google Analytics ID</label>
              <Input 
                placeholder="G-XXXXXXXXXX or UA-XXXXXXXX-X" 
                value={techSeoForm.google_analytics_id} 
                onChange={(e) => setTechSeoForm({...techSeoForm, google_analytics_id: e.target.value})} 
                className="form-input" 
              />
              <p className="text-xs text-[#717171] mt-1">Enter your Google Analytics measurement ID</p>
            </div>
            <div>
              <label className="form-label">Google Tag Manager ID</label>
              <Input 
                placeholder="GTM-XXXXXXX" 
                value={techSeoForm.google_tag_manager_id} 
                onChange={(e) => setTechSeoForm({...techSeoForm, google_tag_manager_id: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Facebook Pixel ID</label>
              <Input 
                placeholder="XXXXXXXXXXXXXXXXX" 
                value={techSeoForm.facebook_pixel_id} 
                onChange={(e) => setTechSeoForm({...techSeoForm, facebook_pixel_id: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Sitemap URL</label>
              <Input 
                placeholder="https://yoursite.com/sitemap.xml" 
                value={techSeoForm.sitemap_url} 
                onChange={(e) => setTechSeoForm({...techSeoForm, sitemap_url: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Custom Head Scripts</label>
              <Textarea 
                placeholder="Paste custom scripts to be added in <head> (e.g., schema markup, verification codes)" 
                value={techSeoForm.custom_head_scripts} 
                onChange={(e) => setTechSeoForm({...techSeoForm, custom_head_scripts: e.target.value})} 
                className="form-input font-mono text-sm" 
                rows={5}
              />
              <p className="text-xs text-[#717171] mt-1">Include the full script tags</p>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Saving..." : "Save Technical SEO Settings"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Announcement Modal */}
      <Dialog open={showAnnouncementModal} onOpenChange={setShowAnnouncementModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add Announcement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
            <div>
              <label className="form-label">Announcement Text *</label>
              <Textarea 
                placeholder="Enter your announcement message (max 200 chars)" 
                value={announcementForm.text} 
                onChange={(e) => setAnnouncementForm({...announcementForm, text: e.target.value})} 
                required 
                className="form-input" 
                rows={2}
                maxLength={200}
              />
              <p className="text-xs text-[#717171] mt-1">{announcementForm.text.length}/200 characters</p>
            </div>
            <div>
              <label className="form-label">Link URL (optional)</label>
              <Input 
                placeholder="/programs or https://example.com" 
                value={announcementForm.link} 
                onChange={(e) => setAnnouncementForm({...announcementForm, link: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Link Text (optional)</label>
              <Input 
                placeholder="Learn More" 
                value={announcementForm.link_text} 
                onChange={(e) => setAnnouncementForm({...announcementForm, link_text: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Display Order</label>
              <Input 
                type="number" 
                placeholder="0 = first" 
                value={announcementForm.order} 
                onChange={(e) => setAnnouncementForm({...announcementForm, order: parseInt(e.target.value) || 0})} 
                className="form-input" 
              />
              <p className="text-xs text-[#717171] mt-1">Lower numbers appear first. Cyber Warriors events always show first.</p>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Creating..." : "Create Announcement"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Popup Modal Dialog */}
      <Dialog open={showPopupModal} onOpenChange={setShowPopupModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{popupModalData ? 'Edit Popup Modal' : 'Create Popup Modal'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePopupModalSubmit} className="space-y-4">
            <div>
              <label className="form-label">Title *</label>
              <Input 
                placeholder="e.g., Limited Time Offer!" 
                value={popupModalForm.title} 
                onChange={(e) => setPopupModalForm({...popupModalForm, title: e.target.value})} 
                required 
                className="form-input" 
                maxLength={100}
              />
            </div>
            <div>
              <label className="form-label">Body Text *</label>
              <Textarea 
                placeholder="Your message to visitors (max 500 chars)" 
                value={popupModalForm.body} 
                onChange={(e) => setPopupModalForm({...popupModalForm, body: e.target.value})} 
                required 
                className="form-input" 
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-[#717171] mt-1">{popupModalForm.body.length}/500 characters</p>
            </div>
            <div>
              <label className="form-label">Image URL (optional)</label>
              <Input 
                placeholder="https://example.com/image.jpg" 
                value={popupModalForm.image_url} 
                onChange={(e) => setPopupModalForm({...popupModalForm, image_url: e.target.value})} 
                className="form-input" 
              />
              <p className="text-xs text-[#717171] mt-1">Recommended size: 800x400px</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">CTA Button Text</label>
                <Input 
                  placeholder="e.g., Enroll Now" 
                  value={popupModalForm.cta_text} 
                  onChange={(e) => setPopupModalForm({...popupModalForm, cta_text: e.target.value})} 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">CTA Link</label>
                <Input 
                  placeholder="/programs or URL" 
                  value={popupModalForm.cta_link} 
                  onChange={(e) => setPopupModalForm({...popupModalForm, cta_link: e.target.value})} 
                  className="form-input" 
                />
              </div>
            </div>
            <div>
              <label className="form-label">Delay (seconds)</label>
              <Input 
                type="number" 
                min={1}
                max={30}
                placeholder="4" 
                value={popupModalForm.delay_seconds} 
                onChange={(e) => setPopupModalForm({...popupModalForm, delay_seconds: parseInt(e.target.value) || 4})} 
                className="form-input" 
              />
              <p className="text-xs text-[#717171] mt-1">How long to wait before showing the popup (recommended: 3-5 seconds)</p>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Saving..." : (popupModalData ? "Update Popup Modal" : "Create Popup Modal")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Team Member Modal */}
      <Dialog open={showTeamModal} onOpenChange={(open) => { setShowTeamModal(open); if (!open) setEditingTeam(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingTeam ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleTeamSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Name *</label>
                <Input 
                  placeholder="John Doe" 
                  value={teamForm.name} 
                  onChange={(e) => setTeamForm({...teamForm, name: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">Title/Role *</label>
                <Input 
                  placeholder="Senior Instructor" 
                  value={teamForm.title} 
                  onChange={(e) => setTeamForm({...teamForm, title: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
            </div>
            <div>
              <label className="form-label">Photo URL</label>
              <Input 
                placeholder="https://example.com/photo.jpg" 
                value={teamForm.photo_url} 
                onChange={(e) => setTeamForm({...teamForm, photo_url: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Bio</label>
              <Textarea 
                placeholder="Brief description about the team member" 
                value={teamForm.bio} 
                onChange={(e) => setTeamForm({...teamForm, bio: e.target.value})} 
                className="form-input" 
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">LinkedIn URL</label>
                <Input 
                  placeholder="https://linkedin.com/in/..." 
                  value={teamForm.linkedin_url} 
                  onChange={(e) => setTeamForm({...teamForm, linkedin_url: e.target.value})} 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">Twitter URL</label>
                <Input 
                  placeholder="https://twitter.com/..." 
                  value={teamForm.twitter_url} 
                  onChange={(e) => setTeamForm({...teamForm, twitter_url: e.target.value})} 
                  className="form-input" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Email</label>
                <Input 
                  type="email"
                  placeholder="john@etieducom.com" 
                  value={teamForm.email} 
                  onChange={(e) => setTeamForm({...teamForm, email: e.target.value})} 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">Display Order</label>
                <Input 
                  type="number"
                  placeholder="0" 
                  value={teamForm.order} 
                  onChange={(e) => setTeamForm({...teamForm, order: parseInt(e.target.value) || 0})} 
                  className="form-input" 
                />
              </div>
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Saving..." : (editingTeam ? "Update Member" : "Add Member")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Branch Modal */}
      <Dialog open={showBranchModal} onOpenChange={(open) => { setShowBranchModal(open); if (!open) setEditingBranch(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingBranch ? 'Edit Branch' : 'Add Branch'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleBranchSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Branch Name *</label>
                <Input 
                  placeholder="Pathankot Branch" 
                  value={branchForm.name} 
                  onChange={(e) => setBranchForm({...branchForm, name: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">URL Slug *</label>
                <Input 
                  placeholder="pathankot" 
                  value={branchForm.slug} 
                  onChange={(e) => setBranchForm({...branchForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                  required 
                  className="form-input" 
                />
                <p className="text-xs text-[#717171] mt-1">Page will be at /branches/{branchForm.slug || 'slug'}</p>
              </div>
            </div>
            <div>
              <label className="form-label">Full Address *</label>
              <Textarea 
                placeholder="123 Main Street, Building Name" 
                value={branchForm.address} 
                onChange={(e) => setBranchForm({...branchForm, address: e.target.value})} 
                required 
                className="form-input" 
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">City *</label>
                <Input 
                  placeholder="Pathankot" 
                  value={branchForm.city} 
                  onChange={(e) => setBranchForm({...branchForm, city: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">State *</label>
                <Input 
                  placeholder="Punjab" 
                  value={branchForm.state} 
                  onChange={(e) => setBranchForm({...branchForm, state: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone *</label>
                <Input 
                  placeholder="9646727676" 
                  value={branchForm.phone} 
                  onChange={(e) => setBranchForm({...branchForm, phone: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <Input 
                  type="email"
                  placeholder="branch@etieducom.com" 
                  value={branchForm.email} 
                  onChange={(e) => setBranchForm({...branchForm, email: e.target.value})} 
                  required 
                  className="form-input" 
                />
              </div>
            </div>
            <div>
              <label className="form-label">Description</label>
              <Textarea 
                placeholder="Brief description about this branch" 
                value={branchForm.description} 
                onChange={(e) => setBranchForm({...branchForm, description: e.target.value})} 
                className="form-input" 
                rows={2}
              />
            </div>
            <div>
              <label className="form-label">Facilities (comma separated)</label>
              <Input 
                placeholder="AC Classrooms, Computer Lab, Library, Cafeteria" 
                value={branchForm.facilities} 
                onChange={(e) => setBranchForm({...branchForm, facilities: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Timings</label>
                <Input 
                  placeholder="Mon-Sat: 9AM - 7PM" 
                  value={branchForm.timings} 
                  onChange={(e) => setBranchForm({...branchForm, timings: e.target.value})} 
                  className="form-input" 
                />
              </div>
              <div>
                <label className="form-label">Display Order</label>
                <Input 
                  type="number"
                  placeholder="0" 
                  value={branchForm.order} 
                  onChange={(e) => setBranchForm({...branchForm, order: parseInt(e.target.value) || 0})} 
                  className="form-input" 
                />
              </div>
            </div>
            <div>
              <label className="form-label">Image URL</label>
              <Input 
                placeholder="https://example.com/branch-image.jpg" 
                value={branchForm.image_url} 
                onChange={(e) => setBranchForm({...branchForm, image_url: e.target.value})} 
                className="form-input" 
              />
            </div>
            <div>
              <label className="form-label">Google Maps Embed URL</label>
              <Input 
                placeholder="https://www.google.com/maps/embed?pb=..." 
                value={branchForm.map_url} 
                onChange={(e) => setBranchForm({...branchForm, map_url: e.target.value})} 
                className="form-input" 
              />
            </div>
            <Button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting ? "Saving..." : (editingBranch ? "Update Branch" : "Add Branch")}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPage;
