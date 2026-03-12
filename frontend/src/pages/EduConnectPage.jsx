import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  UserCheck
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
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

const EduConnectPage = () => {
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    qualification: "",
    program_interest: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

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
      toast.error("Please enter your name and phone number");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/educonnect/enquiry`, formData);
      setSubmitted(true);
      toast.success("Thank you! Our counsellor will call you shortly.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: "", phone: "", qualification: "", program_interest: "" });
  };

  // Programs slider
  const popularPrograms = programs.length > 0 ? programs : [
    { name: "BBA", duration: "3 Years", type: "UG" },
    { name: "BCA", duration: "3 Years", type: "UG" },
    { name: "B.Com", duration: "3 Years", type: "UG" },
    { name: "BA", duration: "3 Years", type: "UG" },
    { name: "B.Sc", duration: "3 Years", type: "UG" },
    { name: "MBA", duration: "2 Years", type: "PG" },
    { name: "MCA", duration: "2 Years", type: "PG" },
    { name: "M.Com", duration: "2 Years", type: "PG" },
    { name: "MA", duration: "2 Years", type: "PG" },
    { name: "M.Sc", duration: "2 Years", type: "PG" }
  ];

  const defaultUniversities = [
    { name: "Manipal University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/92/Manipal_University_logo.png/200px-Manipal_University_logo.png" },
    { name: "Amity University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Amity_University_logo.png/200px-Amity_University_logo.png" },
    { name: "IGNOU", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Indira_Gandhi_National_Open_University_logo.png/200px-Indira_Gandhi_National_Open_University_logo.png" },
    { name: "Jain University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b9/Jain_University_logo.png/200px-Jain_University_logo.png" },
    { name: "LPU Online", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Lovely_Professional_University_logo.png/200px-Lovely_Professional_University_logo.png" },
    { name: "Chandigarh University", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/Chandigarh_University_Logo.png/200px-Chandigarh_University_Logo.png" }
  ];

  const displayUniversities = universities.length > 0 ? universities : defaultUniversities;

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Compact Form Component
  const QuickEnquiryForm = ({ variant = "default" }) => (
    <div className={`${variant === "hero" ? "bg-white rounded-2xl p-6 shadow-2xl" : "bg-white rounded-xl p-5 shadow-lg border border-gray-100"}`}>
      {submitted ? (
        <div className="text-center py-4">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-1">Thank You!</h3>
          <p className="text-sm text-[#4a4a4a] mb-4">Our counsellor will call you shortly.</p>
          <Button variant="outline" size="sm" onClick={resetForm}>
            Submit Another
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-center mb-4">
            <h3 className={`font-bold text-[#1a1a1a] ${variant === "hero" ? "text-xl" : "text-lg"}`}>
              Get Free Counselling
            </h3>
            <p className="text-xs text-[#717171] mt-1">We'll call you within 24 hours</p>
          </div>
          
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Your Name *"
            required
            className="h-11 text-sm"
            data-testid="educonnect-name"
          />
          
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            placeholder="Phone Number *"
            required
            className="h-11 text-sm"
            data-testid="educonnect-phone"
          />
          
          <Select 
            value={formData.qualification} 
            onValueChange={(v) => setFormData({...formData, qualification: v})}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Current Qualification" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10th">10th Pass</SelectItem>
              <SelectItem value="12th">12th Pass</SelectItem>
              <SelectItem value="graduate">Graduate</SelectItem>
              <SelectItem value="postgraduate">Post Graduate</SelectItem>
            </SelectContent>
          </Select>
          
          <Select 
            value={formData.program_interest} 
            onValueChange={(v) => setFormData({...formData, program_interest: v})}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Interested Program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BBA">BBA</SelectItem>
              <SelectItem value="BCA">BCA</SelectItem>
              <SelectItem value="B.Com">B.Com</SelectItem>
              <SelectItem value="MBA">MBA</SelectItem>
              <SelectItem value="MCA">MCA</SelectItem>
              <SelectItem value="M.Com">M.Com</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Button 
            type="submit" 
            className="w-full h-11 bg-[#1545ea] hover:bg-[#0d36c4] text-white font-semibold"
            disabled={submitting}
            data-testid="educonnect-submit"
          >
            {submitting ? "Submitting..." : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Apply Now - It's Free
              </>
            )}
          </Button>
          
          <p className="text-[10px] text-center text-[#717171]">
            By submitting, you agree to receive calls from our counsellors
          </p>
        </form>
      )}
    </div>
  );

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
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Form */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-12 lg:py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white border border-white/20 mb-4 px-3 py-1.5">
                <Sparkles className="w-3 h-3 mr-1" />
                Free Career Counselling
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Get Your <span className="text-yellow-400">Distance Degree</span> From Top Universities
              </h1>
              <p className="text-base lg:text-lg text-blue-100 mb-6 leading-relaxed">
                Free expert guidance to choose the right Online or Distance education program. 
                All UGC-approved universities. Valid degrees for jobs & higher studies.
              </p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl lg:text-2xl font-bold text-white">50+</p>
                  <p className="text-[10px] lg:text-xs text-blue-100">Programs</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl lg:text-2xl font-bold text-white">10+</p>
                  <p className="text-[10px] lg:text-xs text-blue-100">Universities</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
                  <p className="text-xl lg:text-2xl font-bold text-white">100%</p>
                  <p className="text-[10px] lg:text-xs text-blue-100">UGC Valid</p>
                </div>
              </div>

              {/* Trust Badges - Mobile */}
              <div className="flex flex-wrap gap-2 lg:hidden">
                {["UGC Approved", "NAAC Accredited", "EMI Available"].map((item, i) => (
                  <span key={i} className="text-xs bg-white/10 text-white px-2 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <QuickEnquiryForm variant="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges - Desktop */}
      <section className="hidden lg:block py-4 bg-[#f8f9fa] border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8">
            {[
              { icon: <Award className="w-5 h-5" />, text: "UGC Approved" },
              { icon: <Star className="w-5 h-5" />, text: "NAAC Accredited" },
              { icon: <Clock className="w-5 h-5" />, text: "Flexible Learning" },
              { icon: <CheckCircle className="w-5 h-5" />, text: "Valid for Jobs" },
              { icon: <Globe className="w-5 h-5" />, text: "EMI Available" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-[#4a4a4a]">
                <span className="text-[#1545ea]">{item.icon}</span>
                <span className="text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Slider Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-2">Popular Programs</Badge>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a]">
                Choose Your Program
              </h2>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => scrollSlider('left')}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full"
                onClick={() => scrollSlider('right')}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {popularPrograms.map((prog, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-[160px] sm:w-[200px] snap-start"
              >
                <Card className="h-full hover:shadow-xl transition-all group cursor-pointer border-2 border-transparent hover:border-[#1545ea]">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${prog.type === "PG" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"}`}>
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <Badge className={`mb-2 text-[10px] ${prog.type === "PG" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>
                      {prog.type === "PG" ? "Post Graduate" : "Undergraduate"}
                    </Badge>
                    <h3 className="font-bold text-[#1a1a1a] text-lg mb-1">{prog.name}</h3>
                    <p className="text-xs text-[#717171] mb-3">{prog.duration}</p>
                    <Button 
                      size="sm" 
                      className="w-full bg-[#1545ea] hover:bg-[#0d36c4] text-white text-xs"
                      onClick={() => {
                        setFormData({...formData, program_interest: prog.name});
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* University Partners */}
      <section className="py-12 lg:py-16 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-2">Our Partners</Badge>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] mb-2">
              Top Universities
            </h2>
            <p className="text-[#4a4a4a] text-sm max-w-lg mx-auto">
              All our partner universities are UGC approved and NAAC accredited
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayUniversities.map((uni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 flex flex-col items-center justify-center h-28 shadow-sm hover:shadow-md transition-shadow"
              >
                {uni.logo ? (
                  <img src={uni.logo} alt={uni.name} className="max-h-12 max-w-full object-contain mb-2" />
                ) : null}
                <span className="text-xs font-medium text-[#4a4a4a] text-center">{uni.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us + CTA Form */}
      <section className="py-12 lg:py-16 bg-[#1545ea]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                Why Choose ETI EduConnect?
              </h2>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <UserCheck className="w-6 h-6" />, title: "Free Counselling", desc: "Expert guidance at zero cost" },
                  { icon: <CheckCircle className="w-6 h-6" />, title: "100% Genuine", desc: "Only UGC approved universities" },
                  { icon: <BookOpen className="w-6 h-6" />, title: "Complete Support", desc: "From admission to graduation" },
                  { icon: <Award className="w-6 h-6" />, title: "Best Prices", desc: "EMI options available" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white/10 rounded-xl p-4">
                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-[#1545ea] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.title}</h4>
                      <p className="text-xs text-blue-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <a href="tel:8699391076">
                  <Button className="bg-white text-[#1545ea] hover:bg-blue-50">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <QuickEnquiryForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-3">
            Ready to Start Your Journey?
          </h2>
          <p className="text-[#4a4a4a] text-sm mb-5 max-w-md mx-auto">
            Get free counselling and find the perfect program for your career goals
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              className="bg-[#1545ea] hover:bg-[#0d36c4] text-white px-8"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Send className="w-4 h-4 mr-2" />
              Apply Now - Free
            </Button>
            <a href="tel:8699391076">
              <Button variant="outline" className="border-[#1545ea] text-[#1545ea] px-8">
                <Phone className="w-4 h-4 mr-2" />
                8699391076
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-[#1a1a1a] py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[#717171] text-sm mb-1">
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
