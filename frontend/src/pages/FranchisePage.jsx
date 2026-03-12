import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import SEO from "../components/SEO";
import { 
  Building2, 
  CheckCircle, 
  Shield, 
  Users,
  Award,
  Target,
  Send,
  MapPin,
  Briefcase,
  IndianRupee,
  FileText,
  TrendingUp,
  Handshake,
  HeartHandshake,
  BarChart3,
  BadgeCheck,
  ArrowRight,
  Clock,
  Phone,
  Mail
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

const FranchisePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    experience: "",
    resume_url: "",
    investment_budget: "",
    why_franchise: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const benefits = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Proven Business Model",
      description: "Join a successful education franchise with established systems and processes"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Brand Value",
      description: "Leverage the trust and recognition of ETI Educom brand in your city"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Complete Support System",
      description: "From setup to operations, we're with you at every step of your journey"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "High-Demand Industry",
      description: "Tap into the ever-growing demand for quality IT education"
    }
  ];

  const entrepreneurQualities = [
    "Passionate about education and making a difference",
    "Ready to invest in a meaningful business venture",
    "Willing to commit full-time to your center's success",
    "Strong networking skills within your community",
    "Basic understanding of business operations",
    "Desire to empower youth with digital skills"
  ];

  const process = [
    { step: "01", title: "Express Interest", desc: "Fill the enquiry form below" },
    { step: "02", title: "We Connect", desc: "Our team reaches out within 48 hours" },
    { step: "03", title: "Discussion", desc: "Detailed discussion about opportunity" },
    { step: "04", title: "Partnership", desc: "Begin your entrepreneurial journey" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.location || 
        !formData.city || !formData.experience || !formData.investment_budget || !formData.why_franchise) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/franchise-enquiry`, formData);
      setSubmitted(true);
      toast.success("Franchise enquiry submitted successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[72px]" data-testid="franchise-page">
      <SEO pageSlug="franchise" />
      
      {/* Hero Section - Blue Theme */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-20 lg:py-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-2">
                <Handshake className="w-4 h-4 mr-2" />
                Entrepreneurship Opportunity
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-['Poppins']">
                Ready to Be Your Own Boss?
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                If you've always dreamed of running your own business while making a real 
                difference in young lives, this opportunity is for you. Partner with 
                ETI Educom and build a thriving education business in your city.
              </p>
              
              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-yellow-400"><TrendingUp className="w-5 h-5" /></div>
                    <div>
                      <p className="text-lg font-bold text-white">High Demand</p>
                      <p className="text-xs text-blue-100">IT Skills Market</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="text-yellow-400"><Shield className="w-5 h-5" /></div>
                    <div>
                      <p className="text-lg font-bold text-white">Proven Model</p>
                      <p className="text-xs text-blue-100">7+ Years Success</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#enquiry-form">
                  <Button className="bg-white text-[#1545ea] hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold">
                    Start Your Journey
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
                <a href="tel:+919417009339">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                    <Phone className="w-4 h-4 mr-2" />
                    Talk to Us
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                    alt="Business partnership"
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Floating Stats Card */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea]">
                      <HeartHandshake className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1a1a1a]">Be an</p>
                      <p className="text-sm text-[#717171]">Edupreneur</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Franchise Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Why Partner With Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              The ETI Educom Advantage
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Join a proven education model with comprehensive support at every step
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-default h-full text-center hover:shadow-xl transition-all group hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center mb-6 text-[#1545ea] mx-auto group-hover:bg-[#1545ea] group-hover:text-white transition-colors">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">{benefit.title}</h3>
                    <p className="text-[#4a4a4a]">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Your Journey to Partnership
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="card-default h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <span className="text-5xl font-black text-[#1545ea]/5 absolute top-4 right-4">
                      {item.step}
                    </span>
                    <div className="relative z-10">
                      <div className="w-12 h-12 bg-[#1545ea] rounded-xl flex items-center justify-center text-white font-bold mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-[#1a1a1a] text-lg mb-2">{item.title}</h3>
                      <p className="text-[#4a4a4a]">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Are You The One? Section */}
      <section className="py-20 bg-[#1545ea]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white border border-white/20 mb-4">The Right Fit</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Poppins']">
                Are You The One We're Looking For?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                We're not just looking for investors—we're looking for passionate individuals 
                who want to build something meaningful. If these qualities resonate with you, 
                let's talk!
              </p>
              
              <div className="space-y-4">
                {entrepreneurQualities.map((quality, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#1545ea]" />
                    </div>
                    <span className="text-white">{quality}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 lg:p-10 text-center"
            >
              <div className="w-20 h-20 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="w-10 h-10 text-[#1545ea]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">Ready to Transform Lives?</h3>
              <p className="text-[#4a4a4a] mb-6">
                Submit your enquiry and we'll share complete details about investment, 
                support structure, and everything you need to know via email.
              </p>
              <p className="text-sm text-[#717171] mb-8">
                All partnership details shared after form submission
              </p>
              <a href="#enquiry-form">
                <Button className="btn-primary px-8 py-4">
                  I'm Interested!
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="enquiry-form" className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <motion.div {...fadeInUp}>
                <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Get Started</Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                  Apply for Franchise Partnership
                </h2>
                <p className="text-[#4a4a4a] mb-8">
                  Fill out this form to express your interest in becoming an ETI Educom franchise partner. 
                  Our team will review your application and get in touch within 48 hours.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a]">Call Us</h4>
                      <a href="tel:+919417009339" className="text-[#1545ea] hover:underline">+91 94170 09339</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a]">Email Us</h4>
                      <a href="mailto:franchise@etieducom.com" className="text-[#1545ea] hover:underline">franchise@etieducom.com</a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="lg:col-span-3">
              <Card className="card-default shadow-xl">
                <CardContent className="p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                        Application Submitted!
                      </h3>
                      <p className="text-[#4a4a4a] max-w-md mx-auto">
                        Thank you for your interest in partnering with ETI Educom. 
                        Our franchise team will review your application and contact you within 48 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5" data-testid="franchise-form">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Full Name *</label>
                          <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            className="form-input h-12"
                            placeholder="John Doe"
                            required
                            data-testid="franchise-name"
                          />
                        </div>
                        <div>
                          <label className="form-label">Email *</label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="form-input h-12"
                            placeholder="john@example.com"
                            required
                            data-testid="franchise-email"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="form-label">Phone Number *</label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="form-input h-12"
                            placeholder="+91 98765 43210"
                            required
                            data-testid="franchise-phone"
                          />
                        </div>
                        <div>
                          <label className="form-label">City *</label>
                          <Input
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                            className="form-input h-12"
                            placeholder="Mumbai"
                            required
                            data-testid="franchise-city"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="form-label">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          Proposed Location/Area *
                        </label>
                        <Input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="form-input h-12"
                          placeholder="Andheri West, Mumbai"
                          required
                          data-testid="franchise-location"
                        />
                      </div>

                      <div>
                        <label className="form-label">
                          <IndianRupee className="w-4 h-4 inline mr-1" />
                          Investment Budget *
                        </label>
                        <Select 
                          value={formData.investment_budget} 
                          onValueChange={(v) => setFormData({...formData, investment_budget: v})}
                        >
                          <SelectTrigger className="form-input h-12" data-testid="franchise-budget">
                            <SelectValue placeholder="Select investment range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5-10 Lakhs">5-10 Lakhs</SelectItem>
                            <SelectItem value="10-20 Lakhs">10-20 Lakhs</SelectItem>
                            <SelectItem value="20-30 Lakhs">20-30 Lakhs</SelectItem>
                            <SelectItem value="30-50 Lakhs">30-50 Lakhs</SelectItem>
                            <SelectItem value="50+ Lakhs">50+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="form-label">
                          <Briefcase className="w-4 h-4 inline mr-1" />
                          Your Experience/Background *
                        </label>
                        <Textarea
                          value={formData.experience}
                          onChange={(e) => setFormData({...formData, experience: e.target.value})}
                          className="form-input"
                          rows={3}
                          placeholder="Describe your professional background, any experience in education sector, business experience, etc."
                          required
                          data-testid="franchise-experience"
                        />
                      </div>

                      <div>
                        <label className="form-label">
                          <FileText className="w-4 h-4 inline mr-1" />
                          Resume/CV URL (Optional)
                        </label>
                        <Input
                          type="url"
                          value={formData.resume_url}
                          onChange={(e) => setFormData({...formData, resume_url: e.target.value})}
                          className="form-input h-12"
                          placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                          data-testid="franchise-resume"
                        />
                      </div>

                      <div>
                        <label className="form-label">Why do you want to partner with ETI Educom? *</label>
                        <Textarea
                          value={formData.why_franchise}
                          onChange={(e) => setFormData({...formData, why_franchise: e.target.value})}
                          className="form-input"
                          rows={4}
                          placeholder="Tell us about your motivation, vision, and why you believe this partnership would be successful..."
                          required
                          data-testid="franchise-why"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="btn-primary w-full h-12 text-base"
                        disabled={submitting}
                        data-testid="franchise-submit"
                      >
                        {submitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Franchise Application
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-[#717171] text-center">
                        By submitting, you agree to be contacted by our franchise team.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FranchisePage;
