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
  Layers,
  PenTool,
  BarChart3,
  Server,
  Smartphone
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

const programs = [
  { name: "Python Programming", icon: <Code className="w-8 h-8" />, color: "bg-yellow-500" },
  { name: "Web Development", icon: <Globe className="w-8 h-8" />, color: "bg-blue-500" },
  { name: "Digital Marketing", icon: <TrendingUp className="w-8 h-8" />, color: "bg-green-500" },
  { name: "SEO & SEM", icon: <BarChart3 className="w-8 h-8" />, color: "bg-purple-500" },
  { name: "Ethical Hacking", icon: <Shield className="w-8 h-8" />, color: "bg-red-500" },
  { name: "Networking (CCNA)", icon: <Server className="w-8 h-8" />, color: "bg-cyan-500" },
  { name: "AutoCAD", icon: <PenTool className="w-8 h-8" />, color: "bg-orange-500" },
  { name: "Graphic Design", icon: <Palette className="w-8 h-8" />, color: "bg-pink-500" },
  { name: "Data Science", icon: <Database className="w-8 h-8" />, color: "bg-indigo-500" },
  { name: "Cloud Computing", icon: <Layers className="w-8 h-8" />, color: "bg-sky-500" },
  { name: "MS Office Advanced", icon: <Monitor className="w-8 h-8" />, color: "bg-emerald-500" },
  { name: "App Development", icon: <Smartphone className="w-8 h-8" />, color: "bg-violet-500" },
  { name: "AI & Machine Learning", icon: <Cpu className="w-8 h-8" />, color: "bg-amber-500" },
  { name: "Cybersecurity", icon: <Shield className="w-8 h-8" />, color: "bg-rose-500" },
];

const benefits = [
  { icon: <Award className="w-6 h-6" />, title: "Industry Certificate", desc: "Get certified upon completion" },
  { icon: <Clock className="w-6 h-6" />, title: "Flexible Duration", desc: "6 Weeks or 6 Months options" },
  { icon: <Users className="w-6 h-6" />, title: "Expert Faculty", desc: "Learn from industry professionals" },
  { icon: <Zap className="w-6 h-6" />, title: "Hands-on Projects", desc: "Real-world practical training" }
];

const SummerTrainingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    program_interest: "",
    duration: "6 weeks"
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
      await axios.post(`${API}/summer-training-leads`, formData);
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
      <div className="min-h-screen bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 md:p-12 max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
            Registration Successful!
          </h2>
          <p className="text-[#4a4a4a] mb-6">
            Thank you for registering for Summer Training. Our team will contact you within 24 hours with program details.
          </p>
          <a href="/">
            <Button className="btn-primary">
              Back to Home
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" data-testid="summer-training-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-12 lg:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left - Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">Summer Training 2025</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight font-['Poppins']">
                6 Weeks & 6 Months
                <span className="block text-yellow-400">Summer Training</span>
              </h1>
              
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                Boost your career with industry-relevant skills this summer. Get hands-on training in trending technologies from expert faculty.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{benefit.title}</h3>
                      <p className="text-xs text-blue-200">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <p className="text-3xl font-bold text-yellow-400">2000+</p>
                  <p className="text-blue-200">Students Trained</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-400">14+</p>
                  <p className="text-blue-200">Programs</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-400">100%</p>
                  <p className="text-blue-200">Practical Training</p>
                </div>
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-[#1a1a1a] font-['Poppins']">
                    Register Now
                  </h2>
                  <p className="text-[#717171] text-sm mt-2">
                    Limited seats available for Summer Batch
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4" data-testid="summer-training-form">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input h-12"
                      required
                      data-testid="summer-name"
                    />
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input h-12"
                      required
                      data-testid="summer-email"
                    />
                  </div>

                  <div>
                    <Input
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="form-input h-12"
                      required
                      data-testid="summer-phone"
                    />
                  </div>

                  <div>
                    <Select 
                      value={formData.program_interest} 
                      onValueChange={(v) => setFormData({...formData, program_interest: v})}
                    >
                      <SelectTrigger className="form-input h-12" data-testid="summer-program">
                        <SelectValue placeholder="Select Program *" />
                      </SelectTrigger>
                      <SelectContent>
                        {programs.map((program) => (
                          <SelectItem key={program.name} value={program.name}>{program.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Select 
                      value={formData.duration} 
                      onValueChange={(v) => setFormData({...formData, duration: v})}
                    >
                      <SelectTrigger className="form-input h-12" data-testid="summer-duration">
                        <SelectValue placeholder="Select Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6 weeks">6 Weeks Program</SelectItem>
                        <SelectItem value="6 months">6 Months Program</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    type="submit" 
                    className="btn-primary w-full h-12 text-base"
                    disabled={submitting}
                    data-testid="summer-submit"
                  >
                    {submitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        Register for Summer Training
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

      {/* Programs Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Trending Programs
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Choose from our wide range of industry-relevant programs designed for summer training
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {programs.map((program, index) => (
              <div 
                key={index}
                className="bg-[#ebebeb] rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                  {program.icon}
                </div>
                <h3 className="font-semibold text-[#1a1a1a] text-sm">{program.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 lg:py-24 section-grey">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                Why Choose ETI Educom for Summer Training?
              </h2>
              <div className="space-y-4">
                {[
                  "Certiport Authorized Testing Center (CATC)",
                  "Industry-Expert Faculty",
                  "100% Practical & Hands-on Training",
                  "Real-World Projects & Case Studies",
                  "Certificate Upon Completion",
                  "Flexible Batch Timings",
                  "Placement Assistance for Eligible Students",
                  "State-of-the-Art Computer Labs"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1545ea] rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4 font-['Poppins']">Enroll Today!</h3>
              <p className="text-blue-100 mb-6">Limited seats available for Summer 2025 Batch</p>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <Button className="bg-white text-[#1545ea] hover:bg-[#ebebeb] font-semibold px-8 py-3">
                  Register Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-12 bg-[#1a1a1a] text-white text-center">
        <div className="container-main">
          <p className="text-lg mb-4">Have questions? Call us at</p>
          <a href="tel:+91XXXXXXXXXX" className="text-3xl font-bold text-yellow-400 hover:text-yellow-300">
            Contact ETI Educom
          </a>
          <p className="text-[#b0b0b0] mt-4">
            ETI Educom - The Computer Career School | Since 2017
          </p>
        </div>
      </section>
    </div>
  );
};

export default SummerTrainingPage;
