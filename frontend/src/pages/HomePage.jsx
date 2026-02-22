import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
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
  FileText
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

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
    title: "Computer Career Foundation",
    description: "Build essential digital literacy and computing fundamentals for a strong career start.",
    icon: <Monitor className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "digital-design",
    title: "Digital Design & Marketing",
    description: "Master creative design tools and digital marketing strategies for business success.",
    icon: <Palette className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "it-networking",
    title: "IT Support & Cybersecurity",
    description: "Develop expertise in IT infrastructure, networks, and security protocols.",
    icon: <Network className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Learn programming, development frameworks, and software engineering principles.",
    icon: <Code className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600"
  }
];

const stats = [
  { value: "2000+", label: "Students Trained", icon: <Users className="w-6 h-6" /> },
  { value: "2017", label: "Established", icon: <Building2 className="w-6 h-6" /> },
  { value: "4", label: "Career Tracks", icon: <BookOpen className="w-6 h-6" /> },
  { value: "100%", label: "Structured Learning", icon: <Target className="w-6 h-6" /> }
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

  return (
    <div className="pt-[72px]" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-home py-20 lg:py-28" data-testid="hero-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-6 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Certiport Authorized Testing Center
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Students in computer lab"
                  className="w-full h-auto object-cover"
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1545ea]/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1545ea] rounded-lg flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#1a1a1a]">2000+</p>
                    <p className="text-sm text-[#717171]">Students Trained</p>
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

      {/* Career Tracks Section */}
      <section className="py-20 md:py-28 section-grey" data-testid="tracks-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              Structured Learning Paths
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Career Tracks
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Comprehensive career programs designed to transform learners into 
              skilled professionals ready for the modern workforce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {careerTracks.map((track, index) => (
              <motion.div
                key={track.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/programs/${track.id}`}>
                  <div className="track-card h-full" data-testid={`track-card-${track.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={track.image} 
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="w-12 h-12 bg-[#1545ea] rounded-lg flex items-center justify-center mb-2">
                          {track.icon}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-['Poppins']">
                        {track.title}
                      </h3>
                      <p className="text-[#4a4a4a] text-sm mb-4">
                        {track.description}
                      </p>
                      <span className="text-[#1545ea] font-semibold text-sm flex items-center gap-1">
                        Learn More <ArrowRight className="w-4 h-4" />
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

      {/* Stats Section */}
      <section className="py-20 bg-white" data-testid="stats-section">
        <div className="container-main">
          <motion.div 
            {...fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-box-blue"
                data-testid={`stat-${index}`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </div>
            ))}
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

      {/* Why ETI Section */}
      <section className="py-20 md:py-28 section-grey" data-testid="why-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-6">
                Why Choose ETI Educom®
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                Institution-Grade Computer Education
              </h2>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                We operate through defined Career Tracks, not disconnected courses. 
                Our structured academic framework ensures consistent, quality education 
                with centralized governance and career-focused outcomes.
              </p>
              
              <div className="space-y-4">
                {[
                  "Certiport Authorized Testing Center (CATC)",
                  "Structured Career Pathways",
                  "Industry-Aligned Curriculum",
                  "Centralized Academic Governance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button className="btn-secondary">
                    Learn More About Us
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  alt="Professional team"
                  className="w-full h-auto object-cover"
                />
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
