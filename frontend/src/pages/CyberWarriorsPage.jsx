import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Shield, 
  Users, 
  Building2, 
  User,
  Calendar,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  GraduationCap,
  Landmark,
  ArrowRight,
  Phone,
  Mail,
  Target,
  Award,
  Zap,
  Globe,
  ExternalLink
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: { once: true }
};

const features = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Threat Awareness",
    description: "Learn to identify phishing, scams, and social engineering attacks before they strike.",
    color: "from-red-500/20 to-orange-500/20",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400"
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Digital Safety",
    description: "Protect your personal data, finances, and digital identity with proven strategies.",
    color: "from-[#1545ea]/20 to-cyan-500/20",
    iconBg: "bg-[#1545ea]/20",
    iconColor: "text-[#1545ea]"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Shield",
    description: "Empower your community to create a collective defense against cyber threats.",
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400"
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Scam Detection",
    description: "Master the art of recognizing fake calls, UPI fraud, and online deception.",
    color: "from-purple-500/20 to-pink-500/20",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400"
  }
];

const stats = [
  { value: "500+", label: "Sessions Conducted" },
  { value: "10,000+", label: "People Trained" },
  { value: "50+", label: "Partner Institutions" },
  { value: "100%", label: "Free of Cost" }
];

const CyberWarriorsPage = () => {
  const [registrationType, setRegistrationType] = useState("self");
  const [formData, setFormData] = useState({
    name: "",
    organization_name: "",
    organization_type: "",
    contact_number: "",
    email: "",
    preferred_date: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API}/cyber-warriors/events`);
      setEvents(res.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        registration_type: registrationType
      };
      await axios.post(`${API}/cyber-warriors/register`, payload);
      toast.success("Registration successful! We'll contact you soon.");
      setFormData({
        name: "",
        organization_name: "",
        organization_type: "",
        contact_number: "",
        email: "",
        preferred_date: "",
        message: ""
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen" data-testid="cyber-warriors-page">
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center pt-[72px] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(21, 69, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 69, 234, 0.03) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}></div>
        </div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#1545ea]/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-20 right-20 w-[200px] h-[200px] bg-red-500/10 rounded-full blur-[80px]"></div>
        
        <div className="container-main relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Initiative Badge */}
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full px-6 py-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <span className="text-red-400 text-sm font-semibold tracking-wider uppercase">An Initiative by ETI Educom</span>
              </div>
              
              {/* Main Title */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 font-['Poppins'] leading-none tracking-tight">
                CYBER
                <span className="block bg-gradient-to-r from-[#1545ea] via-cyan-400 to-[#1545ea] bg-clip-text text-transparent">
                  WARRIORS
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                Defending India's digital citizens through awareness, education, and community empowerment.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#register">
                  <Button className="group bg-gradient-to-r from-[#1545ea] to-cyan-500 hover:from-[#0d36c4] hover:to-cyan-600 text-white px-10 py-5 text-lg font-semibold rounded-xl shadow-lg shadow-[#1545ea]/30 hover:shadow-[#1545ea]/50 transition-all duration-300">
                    Register Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#events">
                  <Button variant="outline" className="border-2 border-white/20 text-white hover:bg-white/10 px-10 py-5 text-lg font-semibold rounded-xl backdrop-blur-sm">
                    View Past Events
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
              <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative border-y border-white/10">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-500 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/20 text-[#1545ea] border-[#1545ea]/30 mb-6 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              Our Mission
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
              Why Cyber Warriors?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Empowering citizens with the knowledge and skills to navigate the digital world safely
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full hover:border-white/20 transition-all duration-300 group`}>
                  <div className={`w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className={feature.iconColor}>{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section id="register" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1545ea]/5 to-transparent"></div>
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Info */}
            <motion.div {...fadeInUp}>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mb-6 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free Registration
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Poppins'] leading-tight">
                Register for a<br />
                <span className="text-[#1545ea]">Free Session</span>
              </h2>
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Want to organize a Cyber Warriors awareness session for yourself or your organization? 
                Fill out the form and our team will get in touch with you within 24 hours.
              </p>

              <div className="space-y-5">
                {[
                  "Free awareness sessions for schools & colleges",
                  "Customized workshops for corporate organizations",
                  "Expert-led interactive training modules",
                  "Certificates for all participants"
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <p className="text-white font-semibold mb-4">Have questions? Contact us directly:</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+919876543210" className="flex items-center gap-3 text-gray-400 hover:text-[#1545ea] transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>+91 98765 43210</span>
                  </a>
                  <a href="mailto:cyberwarriors@etieducom.com" className="flex items-center gap-3 text-gray-400 hover:text-[#1545ea] transition-colors">
                    <Mail className="w-5 h-5" />
                    <span>cyberwarriors@etieducom.com</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div 
              {...fadeInUp} 
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-10 shadow-2xl">
                {/* Registration Type Toggle */}
                <div className="flex gap-2 mb-8 p-1.5 bg-white/5 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setRegistrationType("self")}
                    className={`flex-1 py-3.5 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                      registrationType === "self"
                        ? "bg-[#1545ea] text-white shadow-lg shadow-[#1545ea]/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid="register-self-btn"
                  >
                    <User className="w-4 h-4" />
                    Individual
                  </button>
                  <button
                    type="button"
                    onClick={() => setRegistrationType("organization")}
                    className={`flex-1 py-3.5 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                      registrationType === "organization"
                        ? "bg-[#1545ea] text-white shadow-lg shadow-[#1545ea]/30"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                    data-testid="register-org-btn"
                  >
                    <Building2 className="w-4 h-4" />
                    Organization
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5" data-testid="cyber-warriors-form">
                  {registrationType === "organization" && (
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Organization Type *</label>
                      <Select 
                        value={formData.organization_type} 
                        onValueChange={(value) => setFormData({ ...formData, organization_type: value })}
                        required
                      >
                        <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20" data-testid="org-type-select">
                          <SelectValue placeholder="Select organization type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a1a1a] border-white/10">
                          <SelectItem value="school" className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-2">
                              <GraduationCap className="w-4 h-4" />
                              School
                            </div>
                          </SelectItem>
                          <SelectItem value="college" className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Landmark className="w-4 h-4" />
                              College / University
                            </div>
                          </SelectItem>
                          <SelectItem value="corporate" className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              Corporate / Business
                            </div>
                          </SelectItem>
                          <SelectItem value="ngo" className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              NGO / Non-Profit
                            </div>
                          </SelectItem>
                          <SelectItem value="other" className="text-white hover:bg-white/10">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              Other
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      {registrationType === "organization" ? "Contact Person Name *" : "Your Name *"}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20"
                      data-testid="cw-name-input"
                    />
                  </div>

                  {registrationType === "organization" && (
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Organization Name *</label>
                      <Input
                        name="organization_name"
                        value={formData.organization_name}
                        onChange={handleChange}
                        placeholder="Enter organization name"
                        required
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20"
                        data-testid="cw-org-name-input"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Contact Number *</label>
                      <Input
                        name="contact_number"
                        value={formData.contact_number}
                        onChange={handleChange}
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20"
                        data-testid="cw-phone-input"
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20"
                        data-testid="cw-email-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Preferred Date</label>
                    <Input
                      name="preferred_date"
                      type="date"
                      value={formData.preferred_date}
                      onChange={handleChange}
                      className="h-12 bg-white/5 border-white/10 text-white rounded-xl focus:border-[#1545ea] focus:ring-[#1545ea]/20 [color-scheme:dark]"
                      data-testid="cw-date-input"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">Message (Optional)</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Any specific requirements or questions..."
                      rows={3}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl resize-none focus:border-[#1545ea] focus:ring-[#1545ea]/20"
                      data-testid="cw-message-input"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-14 bg-gradient-to-r from-[#1545ea] to-cyan-500 hover:from-[#0d36c4] hover:to-cyan-600 text-white text-lg font-semibold rounded-xl shadow-lg shadow-[#1545ea]/30 hover:shadow-[#1545ea]/50 transition-all duration-300"
                    disabled={loading}
                    data-testid="cw-submit-btn"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Submit Registration
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    )}
                  </Button>

                  <p className="text-center text-gray-500 text-sm">
                    We respect your privacy. No spam, ever.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section id="events" className="py-24 relative">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 mb-6 px-4 py-2">
              <Calendar className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-['Poppins']">
              Past Events
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Sessions we've conducted across schools, colleges, and organizations
            </p>
          </motion.div>

          {events.length === 0 ? (
            <motion.div 
              {...fadeInUp}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-12 h-12 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Events Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We're planning exciting cyber awareness sessions. Register above to be notified about upcoming events!
              </p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-[#1545ea]/50 transition-all duration-300"
                    onClick={() => setSelectedEvent(event)}
                    data-testid={`cw-event-${event.id}`}
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#1545ea] transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">{event.description}</p>
                      <button className="flex items-center gap-2 text-[#1545ea] text-sm font-semibold group-hover:gap-3 transition-all">
                        View Details
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1545ea]/20 via-transparent to-cyan-500/20"></div>
        <div className="container-main relative z-10">
          <motion.div 
            {...fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-['Poppins']">
              Ready to Make a Difference?
            </h2>
            <p className="text-gray-400 text-lg mb-10">
              Join the Cyber Warriors movement and help create a safer digital India. Together, we can protect millions from online threats.
            </p>
            <a href="#register">
              <Button className="bg-white text-[#0a0a0a] hover:bg-gray-200 px-10 py-5 text-lg font-semibold rounded-xl transition-all duration-300">
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Event Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl bg-[#1a1a1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <img 
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-72 object-cover rounded-xl mb-6"
              />
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{selectedEvent.description}</p>
              {selectedEvent.date && (
                <div className="mt-6 flex items-center gap-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(selectedEvent.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CyberWarriorsPage;
