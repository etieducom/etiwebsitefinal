import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Shield, 
  Users, 
  Building2, 
  User,
  Phone,
  Mail,
  Calendar,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  X,
  GraduationCap,
  Landmark
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

const CYBER_WARRIORS_LOGO = "https://customer-assets.emergentagent.com/job_a7e86cb7-9664-465e-9ee0-aab3368ca51d/artifacts/8vl4eoeh_cyber%20warriros.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const whyReasons = [
  {
    icon: <AlertTriangle className="w-6 h-6" />,
    title: "Rising Cyber Threats",
    description: "India faces millions of cyber attacks annually. Awareness is the first line of defense."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Protection",
    description: "Empower citizens, students, and organizations to identify and prevent online fraud."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Digital Safety Skills",
    description: "Learn practical skills to protect personal data, finances, and digital identity."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Scam Awareness",
    description: "Recognize phishing, fake calls, UPI fraud, and social engineering attacks."
  }
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
    <div className="pt-[72px]" data-testid="cyber-warriors-page">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#0a1628] to-[#1a2d4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#1545ea] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#1545ea] rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/20 text-[#6b9fff] border-[#1545ea]/30 mb-6">
                <Shield className="w-4 h-4 mr-1" />
                An Initiative by ETI Educom
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-['Poppins'] leading-tight">
                Cyber Warriors
              </h1>
              <p className="text-xl text-gray-300 mb-4">
                For a Safer Digital Landscape
              </p>
              <p className="text-gray-400 leading-relaxed">
                Safeguarding citizens of India from online threats through awareness, 
                education, and community empowerment programs.
              </p>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="flex justify-center"
            >
              <img 
                src={CYBER_WARRIORS_LOGO}
                alt="Cyber Warriors"
                className="max-w-[300px] h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                Register for a Session
              </h2>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                Want to organize a Cyber Warriors awareness session for yourself or your organization? 
                Fill out the form and our team will get in touch with you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4a4a4a]">Free awareness sessions for schools & colleges</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4a4a4a]">Customized workshops for organizations</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4a4a4a]">Expert-led interactive sessions</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                  <span className="text-[#4a4a4a]">Certificates for participants</span>
                </div>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default">
                <CardContent className="p-6">
                  {/* Registration Type Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setRegistrationType("self")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        registrationType === "self"
                          ? "bg-[#1545ea] text-white"
                          : "bg-[#f8f9fa] text-[#4a4a4a] hover:bg-[#ebebeb]"
                      }`}
                      data-testid="register-self-btn"
                    >
                      <User className="w-4 h-4" />
                      Register for Self
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegistrationType("organization")}
                      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        registrationType === "organization"
                          ? "bg-[#1545ea] text-white"
                          : "bg-[#f8f9fa] text-[#4a4a4a] hover:bg-[#ebebeb]"
                      }`}
                      data-testid="register-org-btn"
                    >
                      <Building2 className="w-4 h-4" />
                      Organization
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" data-testid="cyber-warriors-form">
                    {registrationType === "organization" && (
                      <div>
                        <label className="form-label">Organization Type *</label>
                        <Select 
                          value={formData.organization_type} 
                          onValueChange={(value) => setFormData({ ...formData, organization_type: value })}
                          required
                        >
                          <SelectTrigger className="form-input" data-testid="org-type-select">
                            <SelectValue placeholder="Select organization type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="school">
                              <div className="flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                School
                              </div>
                            </SelectItem>
                            <SelectItem value="college">
                              <div className="flex items-center gap-2">
                                <Landmark className="w-4 h-4" />
                                College
                              </div>
                            </SelectItem>
                            <SelectItem value="other">
                              <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                Other Organization
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <label className="form-label">Your Name *</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        className="form-input"
                        data-testid="cw-name-input"
                      />
                    </div>

                    {registrationType === "organization" && (
                      <div>
                        <label className="form-label">Organization Name *</label>
                        <Input
                          name="organization_name"
                          value={formData.organization_name}
                          onChange={handleChange}
                          placeholder="Enter organization name"
                          required
                          className="form-input"
                          data-testid="cw-org-name-input"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Contact Number *</label>
                        <Input
                          name="contact_number"
                          value={formData.contact_number}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          required
                          className="form-input"
                          data-testid="cw-phone-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="form-input"
                          data-testid="cw-email-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Preferred Date</label>
                      <Input
                        name="preferred_date"
                        type="date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        className="form-input"
                        data-testid="cw-date-input"
                      />
                    </div>

                    <div>
                      <label className="form-label">Message (Optional)</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific requirements or questions..."
                        rows={3}
                        className="form-input resize-none"
                        data-testid="cw-message-input"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-primary w-full"
                      disabled={loading}
                      data-testid="cw-submit-btn"
                    >
                      {loading ? "Submitting..." : "Submit Registration"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Cyber Warriors */}
      <section className="py-20 section-grey">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Our Mission
            </Badge>
            <h2 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
              Why Cyber Warriors?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyReasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                {...fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-default h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#1545ea]">
                      {reason.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{reason.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Calendar className="w-4 h-4 mr-1" />
              Our Impact
            </Badge>
            <h2 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
              Past Events
            </h2>
            <p className="text-[#4a4a4a] mt-2">
              Sessions we've conducted across schools, colleges, and organizations
            </p>
          </motion.div>

          {events.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-[#b0b0b0] mx-auto mb-4" />
              <p className="text-[#717171]">Events coming soon. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  {...fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="card-default cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => setSelectedEvent(event)}
                    data-testid={`cw-event-${event.id}`}
                  >
                    <div className="relative h-48 overflow-hidden rounded-t-xl">
                      <img 
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-[#1a1a1a] mb-2 line-clamp-1">{event.title}</h3>
                      <p className="text-sm text-[#4a4a4a] line-clamp-2">{event.description}</p>
                      <button className="text-[#1545ea] text-sm font-semibold mt-3 flex items-center gap-1">
                        View Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Event Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          {selectedEvent && (
            <div>
              <img 
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <p className="text-[#4a4a4a] whitespace-pre-wrap">{selectedEvent.description}</p>
              {selectedEvent.date && (
                <p className="text-sm text-[#717171] mt-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(selectedEvent.date).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CyberWarriorsPage;
