import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  Monitor, 
  Palette, 
  Network, 
  Code,
  ChevronRight,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  CheckCircle,
  ArrowLeft,
  Building2,
  GraduationCap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Default program data
const defaultPrograms = {
  "computer-foundation": {
    title: "Computer Career Foundation",
    subtitle: "Build Essential Digital Skills",
    description: "A comprehensive program designed to build a solid foundation in computing fundamentals, digital literacy, and essential software skills. Perfect for beginners starting their career journey.",
    icon: "Monitor",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    duration: "3-6 months",
    outcomes: ["Digital Literacy Expert", "Office Productivity Specialist", "IT Fundamentals Professional"],
    suitable_for: "Students, Fresh Graduates, Career Starters",
    certifications: ["Microsoft Office Specialist (MOS)", "IC3 Digital Literacy Certification"],
    modules: [
      "Computer Fundamentals & Operating Systems",
      "Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Internet & Email Management",
      "Basic Troubleshooting",
      "Digital Communication Skills"
    ]
  },
  "digital-design": {
    title: "Digital Design & Marketing",
    subtitle: "Create & Market with Impact",
    description: "Master the art of digital design and marketing. Learn industry-standard tools and strategies to create compelling visual content and execute effective marketing campaigns.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    duration: "6-12 months",
    outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer", "Social Media Manager"],
    suitable_for: "Creative Professionals, Marketing Enthusiasts, Entrepreneurs",
    certifications: ["Adobe Certified Professional", "Google Digital Marketing", "Meta Blueprint"],
    modules: [
      "Adobe Photoshop & Illustrator",
      "UI/UX Design Fundamentals",
      "Social Media Marketing",
      "Search Engine Optimization (SEO)",
      "Google Ads & Analytics",
      "Content Marketing Strategy"
    ]
  },
  "it-networking": {
    title: "IT Support, Networking & Cybersecurity",
    subtitle: "Secure & Connect the Digital World",
    description: "Develop expertise in IT infrastructure, network administration, and cybersecurity protocols. Prepare for roles in enterprise IT environments with hands-on training.",
    icon: "Network",
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=1200",
    duration: "6-12 months",
    outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst", "Help Desk Specialist"],
    suitable_for: "Technical Aspirants, IT Professionals, Career Changers",
    certifications: ["CompTIA A+", "CompTIA Network+", "CompTIA Security+", "Cisco CCNA"],
    modules: [
      "Hardware & Software Troubleshooting",
      "Network Configuration & Management",
      "Operating Systems Administration",
      "Cybersecurity Fundamentals",
      "Cloud Computing Basics",
      "IT Service Management"
    ]
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Code the Future",
    description: "Learn programming languages, development frameworks, and software engineering principles. Build real-world applications and prepare for careers in software development.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200",
    duration: "9-18 months",
    outcomes: ["Full Stack Developer", "Software Engineer", "Application Developer", "Web Developer"],
    suitable_for: "Engineering Students, Tech Enthusiasts, Career Changers",
    certifications: ["Microsoft Certified Developer", "AWS Developer Associate", "Oracle Certified"],
    modules: [
      "Programming Fundamentals (Python/Java)",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL, MongoDB)",
      "Backend Development",
      "Frontend Frameworks (React/Angular)",
      "Version Control & DevOps Basics"
    ]
  }
};

const iconMap = {
  Monitor: <Monitor className="w-12 h-12" />,
  Palette: <Palette className="w-12 h-12" />,
  Network: <Network className="w-12 h-12" />,
  Code: <Code className="w-12 h-12" />,
  Building2: <Building2 className="w-12 h-12" />,
  GraduationCap: <GraduationCap className="w-12 h-12" />
};

const ProgramDetailPage = () => {
  const { programId, trackId } = useParams();
  const id = programId || trackId;
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProgram();
  }, [id]);

  const fetchProgram = async () => {
    try {
      // Try to fetch from API first
      const response = await axios.get(`${API}/programs/${id}`);
      setProgram(response.data);
    } catch (error) {
      // Fall back to default data
      console.log("Using default program data");
      setProgram(defaultPrograms[id] || null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Program Not Found</h1>
          <Link to="/programs">
            <Button className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const icon = iconMap[program.icon] || <Monitor className="w-12 h-12" />;

  return (
    <div className="pt-[72px]" data-testid={`program-detail-${id}`}>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={program.image_url || program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 to-[#1a1a1a]/50"></div>
        </div>
        <div className="relative container-main h-full flex items-center">
          <motion.div {...fadeInUp} className="max-w-2xl text-white">
            <Link to="/programs" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Programs
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#1545ea] rounded-xl flex items-center justify-center">
                {icon}
              </div>
              <Badge className="bg-white/20 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {program.duration}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Poppins']">
              {program.title}
            </h1>
            <p className="text-xl text-white/80">{program.subtitle || "Professional Training Program"}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div {...fadeInUp}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                  About This Program
                </h2>
                <p className="text-[#4a4a4a] leading-relaxed">{program.description}</p>
              </motion.div>

              {program.modules && program.modules.length > 0 && (
                <motion.div {...fadeInUp}>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                    Course Modules
                  </h2>
                  <div className="space-y-3">
                    {program.modules.map((module, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-[#ebebeb] rounded-lg">
                        <span className="w-8 h-8 bg-[#1545ea] text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-[#1a1a1a] font-medium pt-1">{module}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {program.outcomes && program.outcomes.length > 0 && (
                <motion.div {...fadeInUp}>
                  <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                    Career Outcomes
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {program.outcomes.map((outcome, index) => (
                      <Card key={index} className="card-default">
                        <CardContent className="p-4 flex items-center gap-3">
                          <Target className="w-5 h-5 text-[#1545ea]" />
                          <span className="font-medium text-[#1a1a1a]">{outcome}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div {...fadeInUp} className="sticky top-28 space-y-6">
                <Card className="card-default">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#1a1a1a] mb-4">Program Overview</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#1545ea]" />
                        <div>
                          <p className="text-sm text-[#717171]">Duration</p>
                          <p className="font-semibold text-[#1a1a1a]">{program.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#1545ea]" />
                        <div>
                          <p className="text-sm text-[#717171]">Suitable For</p>
                          <p className="font-semibold text-[#1a1a1a] text-sm">{program.suitable_for}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {program.certifications && program.certifications.length > 0 && (
                  <Card className="card-default">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#1545ea]" />
                        Certifications
                      </h3>
                      <ul className="space-y-2">
                        {program.certifications.map((cert, index) => (
                          <li key={index} className="text-sm text-[#4a4a4a] flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-[#1545ea] mt-0.5 flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                <Card className="bg-[#1545ea] text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold mb-2">Ready to Start?</h3>
                    <p className="text-blue-100 text-sm mb-4">Book a free counselling session</p>
                    <Link to="/contact">
                      <Button className="w-full bg-white text-[#1545ea] hover:bg-[#ebebeb]">
                        Enquire Now
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetailPage;
