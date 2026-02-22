import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight, 
  Clock,
  Send,
  Building2,
  Handshake
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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiry_type: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Thank you! We'll contact you shortly.");
      setFormData({ name: "", email: "", phone: "", enquiry_type: "", message: "" });
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

  // Pathankot Branch Info
  const branchInfo = {
    name: "Pathankot (Head Office)",
    address: "ETI Educom, Jodhamal Colony, Dhangu Road, Pathankot",
    phone: "+91 9646727676",
    email: "Pathankot@etieducom.com",
    timings: "Monday - Saturday, 9:00 AM - 6:00 PM"
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "+91 9646727676",
      subtext: "Mon-Sat, 9AM-6PM"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "helpdesk@etieducom.com",
      subtext: "We reply within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Head Office",
      value: "ETI Educom",
      subtext: "Jodhamal Colony, Dhangu Road, Pathankot"
    }
  ];

  return (
    <div className="pt-[72px]" data-testid="contact-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Send className="w-4 h-4 mr-1" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Contact Us
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Ready to start your career journey? We're here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-1 space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="card-default">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] mb-1">{info.title}</h3>
                        <p className="text-[#1a1a1a]">{info.value}</p>
                        <p className="text-sm text-[#717171]">{info.subtext}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-[#1545ea] text-white">
                <CardContent className="p-6">
                  <Clock className="w-8 h-8 mb-4" />
                  <h3 className="font-bold mb-2">Office Hours</h3>
                  <p className="text-blue-100 text-sm">
                    Monday - Saturday<br />
                    9:00 AM - 6:00 PM IST
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="card-default">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                    Send us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          required
                          className="form-input"
                          data-testid="contact-name-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address *</label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="form-input"
                          data-testid="contact-email-input"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="form-label">Phone Number</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          className="form-input"
                          data-testid="contact-phone-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">Enquiry Type *</label>
                        <Select 
                          value={formData.enquiry_type} 
                          onValueChange={(value) => setFormData({ ...formData, enquiry_type: value })}
                          required
                        >
                          <SelectTrigger className="form-input" data-testid="contact-enquiry-select">
                            <SelectValue placeholder="Select enquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="career_counselling">Career Counselling</SelectItem>
                            <SelectItem value="course_enquiry">Course Enquiry</SelectItem>
                            <SelectItem value="franchise">Franchise Enquiry</SelectItem>
                            <SelectItem value="corporate">Corporate Enquiry</SelectItem>
                            <SelectItem value="general">General Enquiry</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Message *</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your requirements..."
                        rows={5}
                        required
                        className="form-input resize-none"
                        data-testid="contact-message-input"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="btn-primary"
                      disabled={loading}
                      data-testid="contact-submit-btn"
                    >
                      {loading ? "Sending..." : "Send Message"}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
