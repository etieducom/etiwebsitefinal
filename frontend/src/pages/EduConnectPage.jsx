import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Phone, 
  GraduationCap, 
  Building2, 
  CheckCircle,
  ArrowRight,
  Send,
  BookOpen,
  Users,
  Award,
  Globe,
  Clock,
  MapPin
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

const EduConnectPage = () => {
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    qualification: "",
    program_interest: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [uniRes, progRes] = await Promise.all([
        axios.get(`${API}/educonnect/universities`).catch(() => ({ data: [] })),
        axios.get(`${API}/educonnect/programs`).catch(() => ({ data: [] }))
      ]);
      setUniversities(uniRes.data);
      setPrograms(progRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/educonnect/enquiry`, formData);
      setSubmitted(true);
      toast.success("Enquiry submitted successfully! We'll contact you soon.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    { icon: <GraduationCap className="w-6 h-6" />, title: "UGC Approved", desc: "All universities are UGC recognized" },
    { icon: <Globe className="w-6 h-6" />, title: "NAAC Accredited", desc: "Quality assured education" },
    { icon: <Clock className="w-6 h-6" />, title: "Flexible Learning", desc: "Study at your own pace" },
    { icon: <Award className="w-6 h-6" />, title: "Valid Degrees", desc: "Accepted for jobs & higher studies" }
  ];

  const popularPrograms = [
    { name: "BBA", duration: "3 Years", type: "UG" },
    { name: "BCA", duration: "3 Years", type: "UG" },
    { name: "B.Com", duration: "3 Years", type: "UG" },
    { name: "BA", duration: "3 Years", type: "UG" },
    { name: "MBA", duration: "2 Years", type: "PG" },
    { name: "MCA", duration: "2 Years", type: "PG" },
    { name: "M.Com", duration: "2 Years", type: "PG" },
    { name: "MA", duration: "2 Years", type: "PG" }
  ];

  // Default university logos if none from API
  const defaultUniversities = [
    { name: "Manipal University", logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=100&fit=crop" },
    { name: "Amity University", logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=200&h=100&fit=crop" },
    { name: "IGNOU", logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=100&fit=crop" },
    { name: "Jain University", logo: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=200&h=100&fit=crop" },
    { name: "LPU Online", logo: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=200&h=100&fit=crop" },
    { name: "Chandigarh University", logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=200&h=100&fit=crop" }
  ];

  const displayUniversities = universities.length > 0 ? universities : defaultUniversities;

  return (
    <div className="min-h-screen bg-white" data-testid="educonnect-page">
      {/* Simple Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/eti-educonnect" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1545ea]">ETI</span>
              <span className="text-xl font-bold text-[#1a1a1a]">EduConnect</span>
            </Link>
            <a 
              href="tel:8699391076" 
              className="flex items-center gap-2 bg-[#1545ea] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#0d36c4] transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">8699391076</span>
              <span className="sm:hidden">Call Now</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-2">
                <GraduationCap className="w-4 h-4 mr-2" />
                Free Counselling
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Your Gateway to <span className="text-yellow-400">Distance & Online Education</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 leading-relaxed">
                Get free expert counselling to choose the right Distance or Online degree 
                from top UGC-approved universities across India. We help you make the 
                best decision for your career.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#enquiry-form">
                  <Button className="bg-white text-[#1545ea] hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold w-full sm:w-auto">
                    Get Free Counselling
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="tel:8699391076">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-xl w-full sm:w-auto">
                    <Phone className="w-4 h-4 mr-2" />
                    8699391076
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3 text-yellow-400">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                      <p className="text-xs text-blue-100">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits for Mobile */}
      <section className="py-8 bg-[#f8f9fa] lg:hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="w-10 h-10 bg-[#1545ea]/10 rounded-lg flex items-center justify-center mx-auto mb-2 text-[#1545ea]">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold text-[#1a1a1a] text-sm">{benefit.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Our University Partners</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4">
              Top Universities Across India
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              We partner with UGC-approved and NAAC-accredited universities to bring you 
              the best distance and online education options.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {displayUniversities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-[#f8f9fa] rounded-xl p-4 flex items-center justify-center h-24 hover:shadow-md transition-shadow"
              >
                {uni.logo ? (
                  <img 
                    src={uni.logo} 
                    alt={uni.name} 
                    className="max-h-16 max-w-full object-contain"
                  />
                ) : (
                  <span className="text-sm font-medium text-[#4a4a4a] text-center">{uni.name}</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Programs */}
      <section className="py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Programs Available</Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4">
              Choose Your Program
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(programs.length > 0 ? programs : popularPrograms).map((prog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow bg-white">
                  <CardContent className="p-4 text-center">
                    <Badge className={`mb-3 ${prog.type === "PG" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {prog.type || "UG"}
                    </Badge>
                    <h3 className="font-bold text-[#1a1a1a] text-lg mb-1">{prog.name}</h3>
                    <p className="text-sm text-[#717171]">{prog.duration}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#1545ea]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why Choose ETI EduConnect?
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Users />, title: "Free Counselling", desc: "Expert guidance at no cost" },
              { icon: <CheckCircle />, title: "Verified Universities", desc: "Only UGC approved options" },
              { icon: <BookOpen />, title: "Complete Support", desc: "From admission to graduation" },
              { icon: <Award />, title: "Best Prices", desc: "Competitive fee structure" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-yellow-400">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-blue-100">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Get Started</Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-4">
                Get Free Counselling
              </h2>
              <p className="text-[#4a4a4a]">
                Fill in your details and our counsellors will guide you to the 
                best program and university for your goals.
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="shadow-xl">
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Thank You!</h3>
                      <p className="text-[#4a4a4a] mb-6">
                        Our counsellor will contact you within 24 hours.
                      </p>
                      <Button 
                        className="bg-[#1545ea] text-white"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", phone: "", qualification: "", program_interest: "", message: "" });
                        }}
                      >
                        Submit Another Enquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" data-testid="educonnect-form">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Your Name *</label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Enter your name"
                            required
                            className="h-12"
                            data-testid="educonnect-name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Phone Number *</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="Enter your phone"
                            required
                            className="h-12"
                            data-testid="educonnect-phone"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Current Qualification</label>
                          <Select 
                            value={formData.qualification} 
                            onValueChange={(v) => setFormData({...formData, qualification: v})}
                          >
                            <SelectTrigger className="h-12" data-testid="educonnect-qualification">
                              <SelectValue placeholder="Select qualification" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="10th">10th Pass</SelectItem>
                              <SelectItem value="12th">12th Pass</SelectItem>
                              <SelectItem value="graduate">Graduate</SelectItem>
                              <SelectItem value="postgraduate">Post Graduate</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Program Interest</label>
                          <Select 
                            value={formData.program_interest} 
                            onValueChange={(v) => setFormData({...formData, program_interest: v})}
                          >
                            <SelectTrigger className="h-12" data-testid="educonnect-program">
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="BBA">BBA</SelectItem>
                              <SelectItem value="BCA">BCA</SelectItem>
                              <SelectItem value="B.Com">B.Com</SelectItem>
                              <SelectItem value="BA">BA</SelectItem>
                              <SelectItem value="MBA">MBA</SelectItem>
                              <SelectItem value="MCA">MCA</SelectItem>
                              <SelectItem value="M.Com">M.Com</SelectItem>
                              <SelectItem value="MA">MA</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#1a1a1a] mb-1">Message (Optional)</label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          placeholder="Any specific requirements or questions?"
                          rows={3}
                          data-testid="educonnect-message"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-12 bg-[#1545ea] hover:bg-[#0d36c4] text-white font-semibold"
                        disabled={submitting}
                        data-testid="educonnect-submit"
                      >
                        {submitting ? "Submitting..." : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Get Free Counselling
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1a1a1a] mb-4">
            Still have questions?
          </h2>
          <p className="text-[#4a4a4a] mb-6">
            Call us directly for immediate assistance
          </p>
          <a href="tel:8699391076">
            <Button className="bg-[#1545ea] hover:bg-[#0d36c4] text-white px-8 py-3 text-lg">
              <Phone className="w-5 h-5 mr-2" />
              8699391076
            </Button>
          </a>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#1a1a1a] py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#717171] text-sm mb-2">
            ETI EduConnect - A Division of ETI Educom®
          </p>
          <p className="text-[#717171] text-xs">
            © {new Date().getFullYear()} All rights reserved. | 
            <a href="https://www.wizbang.in" target="_blank" rel="noopener noreferrer" className="text-[#1545ea] ml-1 hover:underline">
              Designed by Wizbang
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default EduConnectPage;
