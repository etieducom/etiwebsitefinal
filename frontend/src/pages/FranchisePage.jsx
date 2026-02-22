import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { 
  Building2, 
  CheckCircle, 
  Shield, 
  Users,
  Award,
  Target,
  Globe,
  Send,
  MapPin,
  Briefcase,
  IndianRupee,
  FileText
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
      title: "Brand Authorization",
      description: "Licensed use of ETI Educom brand with full marketing support"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Certification Access",
      description: "Certiport CATC authorization for global certification delivery"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Training Support",
      description: "Comprehensive faculty training and development programs"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Academic Governance",
      description: "Centralized curriculum and quality assurance framework"
    }
  ];

  const terms = [
    { label: "Agreement Duration", value: "5 Years" },
    { label: "Royalty", value: "15%" },
    { label: "Exclusivity Radius", value: "15 KM" },
    { label: "Renewal", value: "Auto (Compliance Based)" }
  ];

  const features = [
    "Fresh agreement at renewal without new brand license fee",
    "Centralized marketing execution and brand support",
    "ERP-enabled academic monitoring system",
    "Structured career track curriculum",
    "Ongoing operational support",
    "Quality assurance audits"
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
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Building2 className="w-4 h-4 mr-1" />
              Partnership Opportunity
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Franchise with ETI Educom
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Join India's growing network of structured computer career education centers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                Build a Sustainable Education Business
              </h2>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                ETI Educom franchise model is designed for entrepreneurs who share our 
                vision of structured, quality computer education. Join a network backed 
                by institutional-grade support and governance.
              </p>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                With centralized academic governance, marketing support, and global 
                certification partnerships, our franchisees benefit from a proven 
                education model focused on student success.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {terms.map((term) => (
                  <Card key={term.label} className="card-default">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-[#1545ea]">{term.value}</p>
                      <p className="text-xs text-[#717171]">{term.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800"
                  alt="Business partnership"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 section-grey">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Poppins']">
              Franchise Benefits
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-default h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#1545ea]">
                      {benefit.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{benefit.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 font-['Poppins']">
                What's Included
              </h2>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{feature}</span>
                  </div>
                ))}
              </div>

              <Card className="bg-[#1545ea] text-white mt-8">
                <CardContent className="p-6">
                  <Globe className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold mb-2 font-['Poppins']">
                    Join Our Growing Network
                  </h3>
                  <p className="text-blue-100 text-sm">
                    Be part of India's premier computer career education franchise network.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Franchise Enquiry Form */}
            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <Card className="card-default">
                <CardContent className="p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-['Poppins']">
                        Thank You!
                      </h3>
                      <p className="text-[#4a4a4a]">
                        Your franchise enquiry has been received. Our team will review your application and contact you within 48 hours.
                      </p>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2 font-['Poppins']">
                        Franchise Enquiry
                      </h3>
                      <p className="text-[#717171] text-sm mb-6">
                        Fill this form to express your interest in becoming an ETI Educom franchise partner.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-4" data-testid="franchise-form">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Full Name *</label>
                            <Input
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="form-input"
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
                              className="form-input"
                              required
                              data-testid="franchise-email"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Phone Number *</label>
                            <Input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="form-input"
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
                              className="form-input"
                              placeholder="e.g., Mumbai"
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
                            className="form-input"
                            placeholder="e.g., Andheri West, Mumbai"
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
                            <SelectTrigger className="form-input" data-testid="franchise-budget">
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
                            className="form-input resize-none"
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
                            className="form-input"
                            placeholder="Link to your resume (Google Drive, Dropbox, etc.)"
                            data-testid="franchise-resume"
                          />
                        </div>

                        <div>
                          <label className="form-label">Why do you want to partner with ETI Educom? *</label>
                          <Textarea
                            value={formData.why_franchise}
                            onChange={(e) => setFormData({...formData, why_franchise: e.target.value})}
                            className="form-input resize-none"
                            rows={4}
                            placeholder="Tell us about your motivation, vision, and why you believe this partnership would be successful..."
                            required
                            data-testid="franchise-why"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          className="btn-primary w-full"
                          disabled={submitting}
                          data-testid="franchise-submit"
                        >
                          {submitting ? (
                            "Submitting..."
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Submit Franchise Enquiry
                            </>
                          )}
                        </Button>

                        <p className="text-xs text-[#717171] text-center">
                          By submitting, you agree to be contacted by our franchise team.
                        </p>
                      </form>
                    </>
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
