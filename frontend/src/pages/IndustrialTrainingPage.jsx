import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Award,
  ArrowRight,
  Code,
  Palette,
  Globe,
  Shield,
  Database,
  TrendingUp,
  Cpu,
  Server,
  GraduationCap,
  BadgeCheck,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  IndianRupee,
  Rocket,
  PenTool,
  Network,
  FileCode,
  Megaphone,
  MessageCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
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

const courses = [
  { name: "C Programming", icon: <FileCode className="w-6 h-6" /> },
  { name: "C++ Programming", icon: <Code className="w-6 h-6" /> },
  { name: "Python", icon: <Code className="w-6 h-6" /> },
  { name: "Java", icon: <FileCode className="w-6 h-6" /> },
  { name: "Web Designing", icon: <Globe className="w-6 h-6" /> },
  { name: "CCNA", icon: <Network className="w-6 h-6" /> },
  { name: "Security+ (S+)", icon: <Shield className="w-6 h-6" /> },
  { name: "SOC Analyst Level 1", icon: <Shield className="w-6 h-6" /> },
  { name: "Linux Administration", icon: <Server className="w-6 h-6" /> },
  { name: "Networking", icon: <Network className="w-6 h-6" /> },
  { name: "AutoCAD", icon: <PenTool className="w-6 h-6" /> },
  { name: "Digital Marketing", icon: <Megaphone className="w-6 h-6" /> },
  { name: "UI & UX Design", icon: <Palette className="w-6 h-6" /> },
  { name: "Data Science", icon: <Database className="w-6 h-6" /> },
  { name: "Machine Learning", icon: <Cpu className="w-6 h-6" /> },
  { name: "Ethical Hacking", icon: <Shield className="w-6 h-6" /> },
];

const targetStudents = [
  "BCA", "MCA", "BBA", "MBA", "BSc IT", "MSc IT", 
  "BTech CSE", "MTech CSE", "Civil Engineering", "Mechanical Engineering"
];

const highlights = [
  { icon: <Calendar className="w-8 h-8" />, title: "45 Days", subtitle: "Intensive Training" },
  { icon: <Users className="w-8 h-8" />, title: "Expert Trainers", subtitle: "Industry Professionals" },
  { icon: <BadgeCheck className="w-8 h-8" />, title: "International", subtitle: "Certifications" },
  { icon: <Briefcase className="w-8 h-8" />, title: "Project Help", subtitle: "Full Support" },
];

const IndustrialTrainingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    course: "",
    program_interest: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.program_interest) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/industrial-training-leads`, formData);
      setSubmitted(true);
      toast.success("Registration submitted! We'll contact you soon.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">
            Registration Successful!
          </h2>
          <p className="text-[#4a4a4a] mb-6">
            Thank you for registering for Industrial Training. Our team will contact you within 24 hours with program details.
          </p>
          <a href="/">
            <Button className="btn-primary px-8 py-3">
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-testid="industrial-training-page">
      {/* Hero Section - Blue Theme */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea]">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2.5 mb-6 backdrop-blur-sm">
                <GraduationCap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-semibold text-sm tracking-wide">Limited Seats Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight font-['Poppins']">
                <span className="text-white">6 Weeks</span>
                <span className="block text-yellow-400">
                  Industrial Training
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-6 max-w-lg leading-relaxed">
                <span className="text-yellow-400 font-semibold">45 Days</span> of intensive, hands-on training under 
                <span className="text-yellow-400 font-semibold"> Expert Trainers</span> on in-demand technologies
              </p>

              {/* Target Students */}
              <div className="mb-8">
                <p className="text-blue-200 text-sm mb-3 font-medium">Perfect For:</p>
                <div className="flex flex-wrap gap-2">
                  {targetStudents.map((student, idx) => (
                    <span key={idx} className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                      {student}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center">
                    <IndianRupee className="w-8 h-8 text-[#1545ea]" />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm line-through">Rs. 14,999</p>
                    <p className="text-4xl font-black text-white">Rs. 6,999<span className="text-lg text-blue-200 font-normal">/- Only</span></p>
                    <p className="text-yellow-400 text-sm font-medium mt-1">Including International Certification</p>
                  </div>
                </div>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10">
                    <div className="text-yellow-400 mb-2 flex justify-center">{item.icon}</div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-blue-200 text-xs">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Registration Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md mx-auto relative overflow-hidden">
                {/* Form Header */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1545ea] to-[#0d36c4]"></div>
                
                <div className="text-center mb-6 pt-2">
                  <div className="w-14 h-14 bg-[#1545ea] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">
                    Enroll Now
                  </h2>
                  <p className="text-[#717171] text-sm mt-2">
                    Start your career journey today
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" data-testid="industrial-training-form">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="h-12 rounded-xl border-[#ebebeb] focus:border-[#1545ea] focus:ring-[#1545ea]"
                      required
                      data-testid="industrial-name"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="h-12 rounded-xl border-[#ebebeb] focus:border-[#1545ea] focus:ring-[#1545ea]"
                      required
                      data-testid="industrial-email"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="h-12 rounded-xl border-[#ebebeb] focus:border-[#1545ea] focus:ring-[#1545ea]"
                      required
                      data-testid="industrial-phone"
                    />
                  </div>

                  <div>
                    <Input
                      type="text"
                      placeholder="College/University Name"
                      value={formData.college}
                      onChange={(e) => setFormData({...formData, college: e.target.value})}
                      className="h-12 rounded-xl border-[#ebebeb] focus:border-[#1545ea] focus:ring-[#1545ea]"
                      data-testid="industrial-college"
                    />
                  </div>

                  <div>
                    <Select 
                      value={formData.course} 
                      onValueChange={(v) => setFormData({...formData, course: v})}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-[#ebebeb]" data-testid="industrial-course">
                        <SelectValue placeholder="Your Current Course" />
                      </SelectTrigger>
                      <SelectContent>
                        {targetStudents.map((course) => (
                          <SelectItem key={course} value={course}>{course}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select 
                      value={formData.program_interest} 
                      onValueChange={(v) => setFormData({...formData, program_interest: v})}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-[#ebebeb]" data-testid="industrial-program">
                        <SelectValue placeholder="Select Training Program *" />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((program) => (
                          <SelectItem key={program.name} value={program.name}>{program.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base font-semibold btn-primary rounded-xl"
                    disabled={submitting}
                    data-testid="industrial-submit"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Register for Training
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-[#717171] mt-4">
                    By registering, you agree to receive calls and updates about the program.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 lg:py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              What's Included in <span className="text-[#1545ea]">Rs. 6,999</span>?
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Everything you need for a successful industrial training experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Calendar className="w-10 h-10" />, title: "45 Days Training", desc: "Intensive hands-on training with practical projects" },
              { icon: <BadgeCheck className="w-10 h-10" />, title: "International Certification", desc: "Globally recognized certification upon completion" },
              { icon: <Briefcase className="w-10 h-10" />, title: "Project Development", desc: "Full assistance in building your final year project" },
              { icon: <Users className="w-10 h-10" />, title: "Expert Trainers", desc: "Learn from industry professionals with real experience" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow group text-center">
                <div className="w-16 h-16 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center text-[#1545ea] mx-auto mb-4 group-hover:bg-[#1545ea] group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                <p className="text-[#4a4a4a] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Choose Your <span className="text-[#1545ea]">Technology</span>
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Wide range of in-demand technologies for your industrial training
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {courses.map((course, idx) => (
              <div 
                key={idx}
                className="bg-[#f8f9fa] rounded-xl p-5 text-center border border-[#ebebeb] hover:border-[#1545ea] transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="w-14 h-14 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-[#1545ea] group-hover:bg-[#1545ea] group-hover:text-white transition-colors">
                  {course.icon}
                </div>
                <h3 className="font-semibold text-[#1a1a1a] text-sm">{course.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-[#717171] text-sm">
              <span className="text-[#1545ea] font-semibold">+ Many More Technologies</span> - Contact us for custom training requirements
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-[#1545ea]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Poppins']">
                Why Choose ETI Educom?
              </h2>
              <div className="space-y-4">
                {[
                  "Certiport Authorized Testing Center (CATC)",
                  "Industry-Expert Faculty with Real-World Experience",
                  "100% Practical & Hands-on Training",
                  "Real-World Projects & Case Studies",
                  "Internationally Recognized Certification",
                  "Dedicated Project Assistance Team",
                  "Flexible Batch Timings",
                  "State-of-the-Art Computer Labs",
                  "Placement Support & Interview Preparation",
                  "Letter of Recommendation for Top Performers"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#1545ea]" />
                    </div>
                    <span className="text-white">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Card */}
            <div className="bg-white rounded-3xl p-8 text-center">
              <div className="w-20 h-20 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-[#1545ea]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-2 font-['Poppins']">Start Your Journey</h3>
              <p className="text-[#4a4a4a] mb-6">Limited seats available for the upcoming batch</p>
              <div className="bg-[#f8f9fa] rounded-2xl p-4 mb-6">
                <p className="text-3xl font-black text-[#1545ea]">Rs. 6,999/-</p>
                <p className="text-sm text-[#717171]">Complete Training + International Certification</p>
              </div>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="btn-primary w-full py-4 rounded-xl inline-flex items-center justify-center gap-2"
              >
                Enroll Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1545ea] rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[#717171] text-sm">Call Us</p>
                <a href="tel:+919417009339" className="text-xl font-bold text-[#1a1a1a] hover:text-[#1545ea] transition-colors">
                  +91 94170 09339
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#1545ea] rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[#717171] text-sm">Email Us</p>
                <a href="mailto:info@etieducom.com" className="text-xl font-bold text-[#1a1a1a] hover:text-[#1545ea] transition-colors">
                  info@etieducom.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#ebebeb]">
            <p className="text-[#717171]">
              ETI Educom® - The Computer Career School | Since 2017
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustrialTrainingPage;
