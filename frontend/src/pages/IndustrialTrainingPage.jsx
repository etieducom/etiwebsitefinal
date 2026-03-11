import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  Award,
  ArrowRight,
  Zap,
  Code,
  Palette,
  Globe,
  Shield,
  Database,
  Monitor,
  TrendingUp,
  Cpu,
  Server,
  GraduationCap,
  BadgeCheck,
  Briefcase,
  Target,
  BookOpen,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  IndianRupee,
  Sparkles,
  Rocket,
  PenTool,
  Network,
  FileCode,
  Megaphone,
  Cog,
  Building
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
  { name: "C Programming", icon: <FileCode className="w-6 h-6" />, color: "from-blue-500 to-blue-600" },
  { name: "C++ Programming", icon: <Code className="w-6 h-6" />, color: "from-indigo-500 to-indigo-600" },
  { name: "Python", icon: <Code className="w-6 h-6" />, color: "from-yellow-500 to-yellow-600" },
  { name: "Java", icon: <FileCode className="w-6 h-6" />, color: "from-red-500 to-red-600" },
  { name: "Web Designing", icon: <Globe className="w-6 h-6" />, color: "from-cyan-500 to-cyan-600" },
  { name: "CCNA", icon: <Network className="w-6 h-6" />, color: "from-emerald-500 to-emerald-600" },
  { name: "Security+ (S+)", icon: <Shield className="w-6 h-6" />, color: "from-purple-500 to-purple-600" },
  { name: "SOC Analyst Level 1", icon: <Shield className="w-6 h-6" />, color: "from-rose-500 to-rose-600" },
  { name: "Linux Administration", icon: <Server className="w-6 h-6" />, color: "from-orange-500 to-orange-600" },
  { name: "Networking", icon: <Network className="w-6 h-6" />, color: "from-teal-500 to-teal-600" },
  { name: "AutoCAD", icon: <PenTool className="w-6 h-6" />, color: "from-amber-500 to-amber-600" },
  { name: "Digital Marketing", icon: <Megaphone className="w-6 h-6" />, color: "from-pink-500 to-pink-600" },
  { name: "UI & UX Design", icon: <Palette className="w-6 h-6" />, color: "from-violet-500 to-violet-600" },
  { name: "Data Science", icon: <Database className="w-6 h-6" />, color: "from-sky-500 to-sky-600" },
  { name: "Machine Learning", icon: <Cpu className="w-6 h-6" />, color: "from-lime-500 to-lime-600" },
  { name: "Ethical Hacking", icon: <Shield className="w-6 h-6" />, color: "from-red-600 to-red-700" },
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 max-w-md text-center shadow-2xl">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Registration Successful!
          </h2>
          <p className="text-slate-600 mb-6">
            Thank you for registering for Industrial Training. Our team will contact you within 24 hours with program details.
          </p>
          <a href="/">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-full">
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900" data-testid="industrial-training-page">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
        
        <div className="relative container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-5 py-2.5 mb-6 backdrop-blur-sm">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300 font-semibold text-sm tracking-wide">Limited Seats Available</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight">
                <span className="text-white">6 Weeks</span>
                <span className="block bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Industrial Training
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-6 max-w-lg leading-relaxed">
                <span className="text-amber-400 font-semibold">45 Days</span> of intensive, hands-on training under 
                <span className="text-amber-400 font-semibold"> Expert Trainers</span> on in-demand technologies
              </p>

              {/* Target Students */}
              <div className="mb-8">
                <p className="text-slate-400 text-sm mb-3 font-medium">Perfect For:</p>
                <div className="flex flex-wrap gap-2">
                  {targetStudents.map((student, idx) => (
                    <span key={idx} className="bg-white/10 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                      {student}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-6 mb-8 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center">
                    <IndianRupee className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm line-through">₹14,999</p>
                    <p className="text-4xl font-black text-white">₹6,999<span className="text-lg text-slate-400 font-normal">/- Only</span></p>
                    <p className="text-amber-400 text-sm font-medium mt-1">Including International Certification</p>
                  </div>
                </div>
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 hover:border-amber-500/30 transition-all">
                    <div className="text-amber-400 mb-2 flex justify-center">{item.icon}</div>
                    <p className="text-white font-bold text-sm">{item.title}</p>
                    <p className="text-slate-400 text-xs">{item.subtitle}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Registration Form */}
            <div className="lg:pl-8">
              <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-md mx-auto relative overflow-hidden">
                {/* Form Header */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500"></div>
                
                <div className="text-center mb-6 pt-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Rocket className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Enroll Now
                  </h2>
                  <p className="text-slate-500 text-sm mt-2">
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
                      className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
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
                      className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
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
                      className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
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
                      className="h-12 rounded-xl border-slate-200 focus:border-amber-500 focus:ring-amber-500"
                      data-testid="industrial-college"
                    />
                  </div>

                  <div>
                    <Select 
                      value={formData.course} 
                      onValueChange={(v) => setFormData({...formData, course: v})}
                    >
                      <SelectTrigger className="h-12 rounded-xl border-slate-200" data-testid="industrial-course">
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
                      <SelectTrigger className="h-12 rounded-xl border-slate-200" data-testid="industrial-program">
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
                    className="w-full h-12 text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-amber-500/25"
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

                  <p className="text-xs text-center text-slate-400 mt-4">
                    By registering, you agree to receive calls and updates about the program.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What's Included in <span className="text-amber-400">₹6,999</span>?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need for a successful industrial training experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: <Calendar className="w-10 h-10" />, title: "45 Days Training", desc: "Intensive hands-on training with practical projects", color: "from-blue-500 to-cyan-500" },
              { icon: <BadgeCheck className="w-10 h-10" />, title: "International Certification", desc: "Globally recognized certification upon completion", color: "from-amber-500 to-orange-500" },
              { icon: <Briefcase className="w-10 h-10" />, title: "Project Development", desc: "Full assistance in building your final year project", color: "from-purple-500 to-pink-500" },
              { icon: <Users className="w-10 h-10" />, title: "Expert Trainers", desc: "Learn from industry professionals with real experience", color: "from-emerald-500 to-teal-500" },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-amber-500/30 transition-all group">
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 lg:py-24 bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your <span className="text-amber-400">Technology</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Wide range of in-demand technologies for your industrial training
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {courses.map((course, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm rounded-xl p-5 text-center border border-slate-700 hover:border-amber-500/50 transition-all cursor-pointer group hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${course.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform shadow-lg`}>
                  {course.icon}
                </div>
                <h3 className="font-semibold text-white text-sm">{course.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-slate-400 text-sm">
              <span className="text-amber-400 font-semibold">+ Many More Technologies</span> - Contact us for custom training requirements
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose <span className="text-amber-400">ETI Educom</span>?
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
                    <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-slate-300 group-hover:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* CTA Card */}
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
              </div>
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Start Your Journey</h3>
                <p className="text-white/80 mb-6">Limited seats available for the upcoming batch</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-6">
                  <p className="text-3xl font-black">₹6,999/-</p>
                  <p className="text-sm text-white/80">Complete Training + International Certification</p>
                </div>
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="bg-white text-amber-600 hover:bg-slate-100 font-bold px-8 py-4 rounded-xl inline-flex items-center gap-2 transition-all hover:scale-105"
                >
                  Enroll Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-sm">Call Us</p>
                <a href="tel:+919417009339" className="text-xl font-bold text-white hover:text-amber-400 transition-colors">
                  +91 94170 09339
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-slate-400 text-sm">Email Us</p>
                <a href="mailto:info@etieducom.com" className="text-xl font-bold text-white hover:text-amber-400 transition-colors">
                  info@etieducom.com
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800">
            <p className="text-slate-500">
              ETI Educom® - The Computer Career School | Since 2017
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustrialTrainingPage;
