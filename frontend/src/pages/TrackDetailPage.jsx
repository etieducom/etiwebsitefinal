import React from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
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
  ArrowLeft
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const trackData = {
  "computer-foundation": {
    title: "Computer Career Foundation",
    subtitle: "Build Essential Digital Skills",
    description: "A comprehensive program designed to build a solid foundation in computing fundamentals, digital literacy, and essential software skills. Perfect for beginners starting their career journey.",
    icon: <Monitor className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    duration: "3-6 months",
    outcomes: ["Digital Literacy Expert", "Office Productivity Specialist", "IT Fundamentals Professional"],
    suitable: "Students, Fresh Graduates, Career Starters",
    certifications: ["Microsoft Office Specialist (MOS)", "IC3 Digital Literacy Certification"],
    modules: [
      "Computer Fundamentals & Operating Systems",
      "Microsoft Office Suite (Word, Excel, PowerPoint)",
      "Internet & Email Management",
      "Basic Troubleshooting",
      "Digital Communication Skills"
    ],
    skills: [
      "Document Creation & Formatting",
      "Spreadsheet Management",
      "Presentation Design",
      "Email Etiquette",
      "File Management"
    ]
  },
  "digital-design": {
    title: "Digital Design & Marketing",
    subtitle: "Create & Market with Impact",
    description: "Master the art of digital design and marketing. Learn industry-standard tools and strategies to create compelling visual content and execute effective marketing campaigns.",
    icon: <Palette className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    duration: "6-12 months",
    outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer", "Social Media Manager"],
    suitable: "Creative Professionals, Marketing Enthusiasts, Entrepreneurs",
    certifications: ["Adobe Certified Professional", "Google Digital Marketing", "Meta Blueprint"],
    modules: [
      "Adobe Photoshop & Illustrator",
      "UI/UX Design Fundamentals",
      "Social Media Marketing",
      "Search Engine Optimization (SEO)",
      "Google Ads & Analytics",
      "Content Marketing Strategy"
    ],
    skills: [
      "Visual Design Principles",
      "Brand Identity Creation",
      "Campaign Management",
      "Analytics & Reporting",
      "Content Strategy"
    ]
  },
  "it-networking": {
    title: "IT Support, Networking & Cybersecurity",
    subtitle: "Secure & Connect the Digital World",
    description: "Develop expertise in IT infrastructure, network administration, and cybersecurity protocols. Prepare for roles in enterprise IT environments with hands-on training.",
    icon: <Network className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=1200",
    duration: "6-12 months",
    outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst", "Help Desk Specialist"],
    suitable: "Technical Aspirants, IT Professionals, Career Changers",
    certifications: ["CompTIA A+", "CompTIA Network+", "CompTIA Security+", "Cisco CCNA"],
    modules: [
      "Hardware & Software Troubleshooting",
      "Network Configuration & Management",
      "Operating Systems Administration",
      "Cybersecurity Fundamentals",
      "Cloud Computing Basics",
      "IT Service Management"
    ],
    skills: [
      "Technical Troubleshooting",
      "Network Configuration",
      "Security Implementation",
      "System Administration",
      "Documentation"
    ]
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Code the Future",
    description: "Learn programming languages, development frameworks, and software engineering principles. Build real-world applications and prepare for careers in software development.",
    icon: <Code className="w-12 h-12" />,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200",
    duration: "9-18 months",
    outcomes: ["Full Stack Developer", "Software Engineer", "Application Developer", "Web Developer"],
    suitable: "Engineering Students, Tech Enthusiasts, Career Changers",
    certifications: ["Microsoft Certified Developer", "AWS Developer Associate", "Oracle Certified"],
    modules: [
      "Programming Fundamentals (Python/Java)",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL, MongoDB)",
      "Backend Development",
      "Frontend Frameworks (React/Angular)",
      "Version Control & DevOps Basics"
    ],
    skills: [
      "Problem Solving",
      "Code Quality & Testing",
      "API Development",
      "Database Design",
      "Agile Methodology"
    ]
  }
};

const TrackDetailPage = () => {
  const { trackId } = useParams();
  const track = trackData[trackId];

  if (!track) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Track Not Found</h1>
          <Link to="/career-tracks">
            <Button className="btn-primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Career Tracks
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid={`track-detail-${trackId}`}>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <img 
            src={track.image}
            alt={track.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 to-[#1a1a1a]/50"></div>
        </div>
        <div className="relative container-main h-full flex items-center">
          <motion.div {...fadeInUp} className="max-w-2xl text-white">
            <Link to="/career-tracks" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm">
              <ArrowLeft className="w-4 h-4" />
              Back to Career Tracks
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-[#1545ea] rounded-xl flex items-center justify-center">
                {track.icon}
              </div>
              <Badge className="bg-white/20 text-white">
                <Clock className="w-3 h-3 mr-1" />
                {track.duration}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Manrope']">
              {track.title}
            </h1>
            <p className="text-xl text-white/80">{track.subtitle}</p>
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
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
                  About This Track
                </h2>
                <p className="text-[#4a4a4a] leading-relaxed">{track.description}</p>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                  Course Modules
                </h2>
                <div className="space-y-3">
                  {track.modules.map((module, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-[#f1eded] rounded-lg">
                      <span className="w-8 h-8 bg-[#1545ea] text-white rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-[#1a1a1a] font-medium pt-1">{module}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                  Skills You'll Gain
                </h2>
                <div className="flex flex-wrap gap-3">
                  {track.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="px-4 py-2 text-[#1545ea] border-[#1545ea]">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeInUp}>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                  Career Outcomes
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {track.outcomes.map((outcome, index) => (
                    <Card key={index} className="card-default">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Target className="w-5 h-5 text-[#1545ea]" />
                        <span className="font-medium text-[#1a1a1a]">{outcome}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div {...fadeInUp} className="sticky top-28 space-y-6">
                <Card className="card-default">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#1a1a1a] mb-4">Track Overview</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-[#1545ea]" />
                        <div>
                          <p className="text-sm text-[#717171]">Duration</p>
                          <p className="font-semibold text-[#1a1a1a]">{track.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-[#1545ea]" />
                        <div>
                          <p className="text-sm text-[#717171]">Suitable For</p>
                          <p className="font-semibold text-[#1a1a1a] text-sm">{track.suitable}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-default">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#1545ea]" />
                      Certifications
                    </h3>
                    <ul className="space-y-2">
                      {track.certifications.map((cert, index) => (
                        <li key={index} className="text-sm text-[#4a4a4a] flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#1545ea] mt-0.5 flex-shrink-0" />
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-[#1545ea] text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold mb-2">Ready to Start?</h3>
                    <p className="text-blue-100 text-sm mb-4">Book a free counselling session</p>
                    <Link to="/contact">
                      <Button className="w-full bg-white text-[#1545ea] hover:bg-[#f1eded]">
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

export default TrackDetailPage;
