import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  ChevronRight, 
  Monitor, 
  Palette, 
  Network, 
  Code,
  Award,
  Users,
  Building2,
  CheckCircle,
  ArrowRight,
  Shield,
  Target,
  BookOpen,
  Star,
  Calendar,
  MapPin,
  Clock,
  Quote,
  User,
  FileText,
  Send,
  TrendingUp,
  Zap,
  Globe,
  Rocket,
  Sparkles,
  GraduationCap,
  Briefcase
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
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

const careerTracks = [
  {
    id: "computer-foundation",
    title: "Computer Foundation",
    shortDesc: "Digital Literacy & Office",
    fullDesc: "Master essential computing skills, MS Office, and digital fundamentals for career readiness.",
    icon: <Monitor className="w-6 h-6" />
  },
  {
    id: "digital-design",
    title: "Design & Marketing",
    shortDesc: "Creative + Digital Strategy",
    fullDesc: "Learn Adobe tools, UI/UX design, SEO, and digital marketing for creative careers.",
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: "it-networking",
    title: "IT & Cybersecurity",
    shortDesc: "Networks + Security",
    fullDesc: "Build expertise in IT support, networking, and cybersecurity protocols.",
    icon: <Network className="w-6 h-6" />
  },
  {
    id: "software-development",
    title: "Software Development",
    shortDesc: "Code + Build Apps",
    fullDesc: "Master programming, web development, and software engineering principles.",
    icon: <Code className="w-6 h-6" />
  }
];

// Trending Skills / Hot Courses
const trendingSkills = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    tag: "High Demand",
    icon: <TrendingUp className="w-5 h-5" />
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking",
    tag: "Hot",
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    tag: "Creative",
    icon: <Palette className="w-5 h-5" />
  },
  {
    id: "data-analytics",
    title: "Data Analytics",
    tag: "Trending",
    icon: <Monitor className="w-5 h-5" />
  },
  {
    id: "full-stack-web-development",
    title: "Full Stack Development",
    tag: "In Demand",
    icon: <Code className="w-5 h-5" />
  }
];

const stats = [
  { value: "5000+", label: "Students Trained", icon: <Users className="w-6 h-6" /> },
  { value: "2017", label: "Established", icon: <Building2 className="w-6 h-6" /> },
  { value: "4", label: "Career Tracks", icon: <BookOpen className="w-6 h-6" /> },
  { value: "100%", label: "Structured Learning", icon: <Target className="w-6 h-6" /> }
];

// Placement Partners - Using text-based logos for reliability
const placementPartners = [
  { name: "TCS", color: "#1a73e8" },
  { name: "Infosys", color: "#007bff" },
  { name: "Wipro", color: "#412b8f" },
  { name: "HCL", color: "#0077c8" },
  { name: "Tech M", color: "#c42426" },
  { name: "Accenture", color: "#a100ff" }
];

const partners = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Adobe_Systems_logo_and_wordmark.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
];

// Sample reviews for fallback
const sampleReviews = [
  {
    id: "1",
    student_name: "Rahul Sharma",
    course: "Software Development",
    review_text: "ETI Educom transformed my career. The structured curriculum and practical training helped me land my dream job as a developer.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "2",
    student_name: "Priya Patel",
    course: "Digital Design & Marketing",
    review_text: "The Adobe certification I earned here opened many doors. Faculty support was exceptional throughout my journey.",
    photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "3",
    student_name: "Amit Kumar",
    course: "IT Support & Networking",
    review_text: "From zero IT knowledge to a Network Administrator role in 8 months. ETI's structured approach made all the difference.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "4",
    student_name: "Sneha Reddy",
    course: "Computer Career Foundation",
    review_text: "Perfect for beginners! The foundation program gave me confidence to pursue advanced IT certifications.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200",
    rating: 5
  }
];

// Sample events for fallback
const sampleEvents = [
  {
    id: "1",
    title: "Career Guidance Workshop",
    description: "Expert career counseling session covering IT industry trends",
    event_date: "2025-02-15",
    event_time: "10:00 AM",
    location: "ETI Educom Head Office",
    image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "2",
    title: "Web Development Bootcamp",
    description: "Hands-on introduction to modern web development",
    event_date: "2025-02-22",
    event_time: "9:00 AM",
    location: "Online",
    image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "3",
    title: "Cybersecurity Seminar",
    description: "Latest cybersecurity threats and best practices",
    event_date: "2025-03-05",
    event_time: "2:00 PM",
    location: "ETI Educom Head Office",
    image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400"
  }
];

const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchReviews();
    fetchEvents();
    fetchBlogs();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`${API}/reviews`);
      setReviews(response.data.length > 0 ? response.data : sampleReviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews(sampleReviews);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API}/events?limit=6`);
      setEvents(response.data.length > 0 ? response.data : sampleEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents(sampleEvents);
    }
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs?limit=3`);
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : sampleReviews;
  const displayEvents = events.length > 0 ? events.slice(0, 6) : sampleEvents;
  
  // Sample blogs for fallback
  const sampleBlogs = [
    {
      id: "1",
      title: "Top 10 IT Skills in Demand for 2025",
      slug: "top-10-it-skills-2025",
      excerpt: "Discover the most sought-after IT skills that employers are looking for.",
      featured_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
      category: "Career Tips",
      read_time: 5,
      created_at: "2025-02-15"
    },
    {
      id: "2",
      title: "How to Choose the Right Career Track",
      slug: "choose-right-career-track",
      excerpt: "A guide to help you select the best career path based on your interests.",
      featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400",
      category: "Career Guidance",
      read_time: 7,
      created_at: "2025-02-10"
    },
    {
      id: "3",
      title: "The Future of Digital Marketing",
      slug: "future-digital-marketing",
      excerpt: "Explore the evolving landscape of digital marketing and opportunities.",
      featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400",
      category: "Industry Insights",
      read_time: 6,
      created_at: "2025-02-05"
    }
  ];
  
  const displayBlogs = blogs.length > 0 ? blogs.slice(0, 3) : sampleBlogs;

  // Quick Enquiry Form State
  const [quickForm, setQuickForm] = useState({
    name: "",
    phone: "",
    interest: ""
  });
  const [quickSubmitting, setQuickSubmitting] = useState(false);

  const handleQuickSubmit = async (e) => {
    e.preventDefault();
    if (!quickForm.name || !quickForm.phone || !quickForm.interest) {
      toast.error("Please fill all fields");
      return;
    }
    setQuickSubmitting(true);
    try {
      await axios.post(`${API}/quick-enquiry`, { ...quickForm, source: "homepage" });
      toast.success("Enquiry submitted! We'll contact you soon.");
      setQuickForm({ name: "", phone: "", interest: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setQuickSubmitting(false);
    }
  };

  return (
    <div className="pt-[72px]" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-home py-20 lg:py-28" data-testid="hero-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-6 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                ETI Educom
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight font-['Poppins']">
                Building Careers in <span className="text-[#1545ea]">Technology</span>
              </h1>
              <p className="text-lg text-[#4a4a4a] mb-8 leading-relaxed max-w-xl">
                India's premier Computer Career School offering structured career pathways 
                through certified training programs. Training | Certification | Placement
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/programs">
                  <Button className="btn-primary text-base" data-testid="hero-explore-btn">
                    Explore Programs
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="btn-secondary text-base" data-testid="hero-contact-btn">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Quick Query Form */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-[#ebebeb]">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-[#1a1a1a] font-['Poppins']">
                    Quick Enquiry
                  </h2>
                  <p className="text-sm text-[#717171] mt-1">
                    Get a callback within 24 hours
                  </p>
                </div>

                <form onSubmit={handleQuickSubmit} className="space-y-4" data-testid="quick-enquiry-form">
                  <Input
                    type="text"
                    placeholder="Your Name *"
                    value={quickForm.name}
                    onChange={(e) => setQuickForm({...quickForm, name: e.target.value})}
                    className="form-input h-12"
                    required
                    data-testid="quick-name"
                  />

                  <Input
                    type="tel"
                    placeholder="Phone Number *"
                    value={quickForm.phone}
                    onChange={(e) => setQuickForm({...quickForm, phone: e.target.value})}
                    className="form-input h-12"
                    required
                    data-testid="quick-phone"
                  />

                  <Select 
                    value={quickForm.interest} 
                    onValueChange={(v) => setQuickForm({...quickForm, interest: v})}
                  >
                    <SelectTrigger className="form-input h-12" data-testid="quick-interest">
                      <SelectValue placeholder="Interested In *" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Career Foundation">Computer Career Foundation</SelectItem>
                      <SelectItem value="Digital Design & Marketing">Digital Design & Marketing</SelectItem>
                      <SelectItem value="IT Support & Cybersecurity">IT Support & Cybersecurity</SelectItem>
                      <SelectItem value="Software Development">Software Development</SelectItem>
                      <SelectItem value="Summer Training">Summer Training</SelectItem>
                      <SelectItem value="Short Term Courses">Short Term Courses</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full h-12"
                    disabled={quickSubmitting}
                    data-testid="quick-submit"
                  >
                    {quickSubmitting ? "Submitting..." : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Enquiry
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-[#717171]">
                    We respect your privacy. No spam calls.
                  </p>
                </form>

                {/* Trust Badges */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-6 border-t border-[#ebebeb]">
                  <div className="flex items-center gap-2 text-sm text-[#717171]">
                    <Users className="w-4 h-4 text-[#1545ea]" />
                    <span>5000+ Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#717171]">
                    <Award className="w-4 h-4 text-[#1545ea]" />
                    <span>Since 2017</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certification Partners */}
      <section className="py-16 bg-white border-y border-[#ebebeb]" data-testid="partners-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <Badge className="bg-[#ebebeb] text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Certification Partners
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
              Industry-Recognized Certifications
            </h2>
          </motion.div>

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-12 flex items-center justify-center h-16"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Tracks Section - Flip Cards */}
      <section className="py-20 md:py-28 section-grey" data-testid="tracks-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              Choose Your Path
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Career Tracks
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Four specialized pathways designed for real career outcomes
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {careerTracks.map((track, index) => (
              <motion.div
                key={track.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="perspective-1000"
              >
                <Link to={`/programs/${track.id}`}>
                  <div className="flip-card group h-[200px] md:h-[240px]" data-testid={`track-card-${track.id}`}>
                    {/* Front Side - Blue */}
                    <div className="flip-card-front bg-[#1545ea] rounded-xl p-6 flex flex-col items-center justify-center text-center text-white">
                      <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                        {track.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-bold font-['Poppins']">
                        {track.title}
                      </h3>
                      <p className="text-blue-100 text-sm mt-2 hidden md:block">
                        {track.shortDesc}
                      </p>
                    </div>
                    {/* Back Side - Grey */}
                    <div className="flip-card-back bg-[#2a2a2a] rounded-xl p-6 flex flex-col items-center justify-center text-center text-white">
                      <p className="text-sm md:text-base leading-relaxed mb-4">
                        {track.fullDesc}
                      </p>
                      <span className="text-[#1545ea] bg-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                        Explore <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/programs">
              <Button className="btn-primary">
                View All Programs
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Student Reviews Slider */}
      <section className="py-20 md:py-28 section-grey" data-testid="reviews-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Star className="w-4 h-4 mr-1" />
              Student Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              What Our Students Say
            </h2>
          </motion.div>

          {/* Reviews Slider */}
          <div className="overflow-hidden">
            <div className="flex gap-6 animate-marquee">
              {[...displayReviews, ...displayReviews].map((review, index) => (
                <div 
                  key={`${review.id}-${index}`}
                  className="flex-shrink-0 w-[350px]"
                >
                  <Card className="review-card h-full" data-testid={`review-${review.id}`}>
                    <CardContent className="p-6 pt-10">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(review.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#1545ea] text-[#1545ea]" />
                        ))}
                      </div>
                      <p className="text-[#4a4a4a] mb-6 text-sm leading-relaxed">
                        "{review.review_text}"
                      </p>
                      <div className="flex items-center gap-4">
                        <img 
                          src={review.photo_url || `https://ui-avatars.com/api/?name=${review.student_name}&background=1545ea&color=fff`}
                          alt={review.student_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-[#1a1a1a]">{review.student_name}</p>
                          <p className="text-sm text-[#717171]">{review.course}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Events Section */}
      <section className="py-20 bg-white" data-testid="events-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
                <Calendar className="w-4 h-4 mr-1" />
                Upcoming
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Poppins']">
                Latest Events
              </h2>
            </div>
            <Link to="/events" className="mt-4 md:mt-0">
              <Button variant="outline" className="btn-secondary">
                View All Events
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.slice(0, 6).map((event, index) => (
              <motion.div
                key={event.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="event-card h-full" data-testid={`event-${event.id}`}>
                  {event.image_url && (
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={event.image_url}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className="bg-[#1545ea]/10 text-[#1545ea] text-xs">
                        {event.event_date}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {event.event_time}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins']">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#4a4a4a] mb-3 line-clamp-2">
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
        </div>
      </section>

      {/* Blogs Section */}
      <section className="py-20 md:py-28 bg-white" data-testid="blogs-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <FileText className="w-4 h-4 mr-1" />
              Knowledge Hub
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Latest from Our Blog
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Stay updated with career tips, industry insights, and educational resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {displayBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/blogs/${blog.slug}`}>
                  <Card className="blog-card h-full overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={blog.featured_image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400"}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-white/90 text-[#1545ea] text-xs">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 text-sm text-[#717171] mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {blog.read_time} min read
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 line-clamp-2 group-hover:text-[#1545ea] transition-colors font-['Poppins']">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[#4a4a4a] line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <span className="text-[#1545ea] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/blogs">
              <Button className="btn-secondary">
                View All Articles
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why ETI Section - Creative */}
      <section className="py-20 md:py-28 bg-[#0a0a0a] text-white overflow-hidden" data-testid="why-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white mb-6 border-0">
                <Sparkles className="w-4 h-4 mr-1" />
                Why ETI Educom
              </Badge>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 font-['Poppins'] leading-tight">
                We Don't Just Teach.<br/>
                <span className="text-[#1545ea]">We Transform Careers.</span>
              </h2>
              <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                While others offer courses, we build complete career trajectories. 
                Our students don't just learn — they evolve into industry-ready professionals.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#1545ea]/50 transition-colors">
                  <Rocket className="w-8 h-8 text-[#1545ea] mb-3" />
                  <h4 className="font-semibold text-white mb-1">Career-First Approach</h4>
                  <p className="text-sm text-gray-400">Every module designed for job outcomes</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#1545ea]/50 transition-colors">
                  <Globe className="w-8 h-8 text-[#1545ea] mb-3" />
                  <h4 className="font-semibold text-white mb-1">Global Certifications</h4>
                  <p className="text-sm text-gray-400">Microsoft, Adobe, Google certified</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#1545ea]/50 transition-colors">
                  <Target className="w-8 h-8 text-[#1545ea] mb-3" />
                  <h4 className="font-semibold text-white mb-1">Structured Tracks</h4>
                  <p className="text-sm text-gray-400">Clear pathways, not random courses</p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10 hover:border-[#1545ea]/50 transition-colors">
                  <Briefcase className="w-8 h-8 text-[#1545ea] mb-3" />
                  <h4 className="font-semibold text-white mb-1">Placement Support</h4>
                  <p className="text-sm text-gray-400">From training to job placement</p>
                </div>
              </div>

              <div className="mt-10">
                <Link to="/about">
                  <Button className="bg-[#1545ea] hover:bg-[#0d36c4] text-white px-8">
                    Discover Our Story
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Stats Display */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-[#1545ea] to-[#0d36c4] rounded-2xl p-8 text-center">
                  <p className="text-5xl md:text-6xl font-bold mb-2">5K+</p>
                  <p className="text-blue-100">Students Trained</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
                  <p className="text-5xl md:text-6xl font-bold text-[#1545ea] mb-2">8+</p>
                  <p className="text-gray-400">Years Experience</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 text-center border border-white/10">
                  <p className="text-5xl md:text-6xl font-bold text-[#1545ea] mb-2">4</p>
                  <p className="text-gray-400">Career Tracks</p>
                </div>
                <div className="bg-gradient-to-br from-[#1545ea] to-[#0d36c4] rounded-2xl p-8 text-center">
                  <p className="text-5xl md:text-6xl font-bold mb-2">95%</p>
                  <p className="text-blue-100">Success Rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Skills Section */}
      <section className="py-20 bg-white" data-testid="trending-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <TrendingUp className="w-4 h-4 mr-1" />
              Most Popular
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Trending Skills
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              The most in-demand skills employers are hiring for right now
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4">
            {trendingSkills.map((skill, index) => (
              <motion.div
                key={skill.id}
                {...fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link to={`/programs/${skill.id}`}>
                  <div className="group flex items-center gap-3 bg-white border-2 border-[#ebebeb] hover:border-[#1545ea] rounded-full px-6 py-3 transition-all hover:shadow-lg">
                    <div className="w-10 h-10 bg-[#1545ea]/10 group-hover:bg-[#1545ea] rounded-full flex items-center justify-center text-[#1545ea] group-hover:text-white transition-colors">
                      {skill.icon}
                    </div>
                    <span className="font-semibold text-[#1a1a1a]">{skill.title}</span>
                    <Badge className="bg-[#1545ea]/10 text-[#1545ea] text-xs">{skill.tag}</Badge>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Placement Partners Section */}
      <section className="py-20 section-grey" data-testid="placement-partners-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text */}
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
                <Briefcase className="w-4 h-4 mr-1" />
                Career Launchpad
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                Placement Partners
              </h2>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                Our students are placed in leading companies across India. 
                We maintain strong industry partnerships to ensure you get the best career opportunities.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1545ea]">50+</p>
                  <p className="text-sm text-[#717171]">Partner Companies</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#1545ea]">90%</p>
                  <p className="text-sm text-[#717171]">Placement Rate</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Animated Logos */}
            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-[280px] overflow-hidden"
            >
              <div className="placement-logos-grid">
                {[...placementPartners, ...placementPartners].map((partner, index) => (
                  <motion.div
                    key={`${partner.name}-${index}`}
                    className="placement-logo-item bg-white rounded-xl shadow-sm border border-[#ebebeb] flex items-center justify-center"
                    animate={{
                      x: [0, Math.random() * 20 - 10, 0],
                      y: [0, Math.random() * 20 - 10, 0],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.2
                    }}
                  >
                    <span 
                      className="text-lg font-bold"
                      style={{ color: partner.color }}
                    >
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1545ea]" data-testid="cta-section">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Poppins']">
              Start Your Career Journey Today
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
              Join thousands of successful professionals who started their journey with ETI Educom®
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button className="bg-white text-[#1545ea] hover:bg-[#ebebeb] font-semibold px-8 py-3">
                  Explore Programs
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-outline-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
