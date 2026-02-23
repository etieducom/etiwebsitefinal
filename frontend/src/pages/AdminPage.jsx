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
  Code
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
      const [eventsRes, jobsRes, reviewsRes, programsRes, enquiriesRes, blogsRes, faqsRes, seoRes, franchiseRes, counsellingRes, summerRes, quickRes, techSeoRes, cwEventsRes, cwRegsRes] = await Promise.all([
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
        axios.get(`${API}/cyber-warriors/registrations`).catch(() => ({ data: [] }))
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
      await axios.post(`${API}/events`, eventForm);
      toast.success("Event created successfully!");
      setShowEventModal(false);
      setEventForm({ title: "", description: "", event_date: "", event_time: "", location: "", image_url: "" });
      fetchData();
    } catch (error) {
      toast.error("Failed to create event");
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
      await axios.post(`${API}/reviews`, reviewForm);
      toast.success("Review added successfully!");
      setShowReviewModal(false);
      setReviewForm({ student_name: "", course: "", review_text: "", photo_url: "", rating: 5 });
      fetchData();
    } catch (error) {
      toast.error("Failed to add review");
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
        tags: blogForm.tags.split(',').map(t => t.trim()).filter(t => t)
      };
      await axios.post(`${API}/blogs`, blogData);
      toast.success("Blog created successfully!");
      setShowBlogModal(false);
      setBlogForm({
        title: "", slug: "", excerpt: "", content: "", featured_image: "", category: "", 
        tags: "", author: "ETI Educom", read_time: 5, is_featured: false, meta_title: "", meta_description: ""
      });
      fetchData();
    } catch (error) {
      toast.error("Failed to create blog");
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteReview(review.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteBlog(blog.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
    </div>
  );
};

export default AdminPage;
