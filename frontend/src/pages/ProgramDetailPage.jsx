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
  GraduationCap,
  Shield,
  Globe,
  TrendingUp,
  BarChart3,
  Bot,
  Cpu,
  PenTool,
  Calculator,
  MessageCircle,
  Star,
  Briefcase
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
  // Career Tracks
  "it-foundation": {
    title: "IT Foundation",
    subtitle: "Build Your Digital Career Base",
    description: "A comprehensive 6-month program designed to build a solid foundation in computing fundamentals, digital literacy, and essential IT skills. Perfect for beginners starting their career journey in the technology sector.",
    icon: "Monitor",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
    duration: "6 Months",
    outcomes: ["IT Support Specialist", "Computer Operator", "Digital Literacy Expert", "Office Administrator"],
    suitable_for: "Students, Fresh Graduates, Career Starters, Working Professionals",
    certifications: ["Microsoft Office Specialist (MOS)", "IC3 Digital Literacy Certification", "CompTIA IT Fundamentals"],
    modules: [
      "Computer Fundamentals & Hardware Basics",
      "Operating Systems (Windows & Linux Basics)",
      "Microsoft Office Suite (Word, Excel, PowerPoint, Outlook)",
      "Internet Technologies & Email Management",
      "Basic Networking Concepts",
      "Troubleshooting & Technical Support",
      "Digital Communication & Collaboration Tools",
      "Introduction to Cloud Computing"
    ]
  },
  "digital-design": {
    title: "Digital Design & Marketing",
    subtitle: "Create & Market with Impact",
    description: "Master the art of digital design and marketing in this comprehensive 9-12 month program. Learn industry-standard tools and strategies to create compelling visual content and execute effective marketing campaigns.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1200",
    duration: "9-12 Months",
    outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer", "Social Media Manager", "Brand Strategist"],
    suitable_for: "Creative Professionals, Marketing Enthusiasts, Entrepreneurs, Freelancers",
    certifications: ["Adobe Certified Professional", "Google Digital Marketing", "Meta Blueprint", "HubSpot Content Marketing"],
    modules: [
      "Design Fundamentals & Color Theory",
      "Adobe Photoshop & Illustrator Mastery",
      "UI/UX Design Principles",
      "Social Media Marketing & Management",
      "Search Engine Optimization (SEO)",
      "Google Ads & PPC Campaigns",
      "Content Marketing Strategy",
      "Analytics & Performance Tracking",
      "Brand Identity & Logo Design",
      "Video Editing Basics"
    ]
  },
  "it-networking": {
    title: "IT Support & Cybersecurity",
    subtitle: "Secure & Connect the Digital World",
    description: "Develop expertise in IT infrastructure, network administration, and cybersecurity protocols in this 9-12 month program. Prepare for roles in enterprise IT environments with hands-on practical training.",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=1200",
    duration: "9-12 Months",
    outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst", "Help Desk Specialist", "System Administrator"],
    suitable_for: "Technical Aspirants, IT Professionals, Career Changers, Engineering Students",
    certifications: ["CompTIA A+", "CompTIA Network+", "CompTIA Security+", "Cisco CCNA", "CEH"],
    modules: [
      "Hardware & Software Troubleshooting",
      "Windows & Linux Server Administration",
      "Network Configuration & Management",
      "TCP/IP & Network Protocols",
      "Cybersecurity Fundamentals",
      "Firewall & Security Tools",
      "Cloud Computing (AWS/Azure Basics)",
      "IT Service Management (ITIL)",
      "Vulnerability Assessment",
      "Incident Response & Recovery"
    ]
  },
  "software-development": {
    title: "Software Development",
    subtitle: "Code the Future",
    description: "Learn programming languages, development frameworks, and software engineering principles in this comprehensive 9-12 month program. Build real-world applications and prepare for high-paying careers in software development.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200",
    duration: "9-12 Months",
    outcomes: ["Full Stack Developer", "Software Engineer", "Web Developer", "Application Developer", "Backend Developer"],
    suitable_for: "Engineering Students, Tech Enthusiasts, Career Changers, IT Professionals",
    certifications: ["Microsoft Certified Developer", "AWS Developer Associate", "Oracle Certified Java Programmer"],
    modules: [
      "Programming Fundamentals",
      "Python Programming",
      "Java Programming",
      "Web Development (HTML, CSS, JavaScript)",
      "Database Management (SQL & NoSQL)",
      "Backend Development (Node.js/Django)",
      "Frontend Frameworks (React)",
      "API Development & Integration",
      "Version Control (Git & GitHub)",
      "Software Testing & DevOps Basics"
    ]
  },

  // Tech Programs
  "python": {
    title: "Python Programming",
    subtitle: "Master the Most Versatile Language",
    description: "Learn Python programming from basics to advanced concepts. Python is the most popular programming language used in web development, data science, AI, automation, and more.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Python Developer", "Automation Engineer", "Backend Developer", "Data Analyst"],
    suitable_for: "Beginners, Students, Working Professionals, Career Changers",
    certifications: ["Python Institute PCAP", "Microsoft Python Certification"],
    modules: [
      "Python Basics & Syntax",
      "Data Types & Variables",
      "Control Flow & Loops",
      "Functions & Modules",
      "Object-Oriented Programming",
      "File Handling & Exception Management",
      "Libraries (NumPy, Pandas basics)",
      "Project Development"
    ]
  },
  "web-designing": {
    title: "Web Designing",
    subtitle: "Design Beautiful Websites",
    description: "Learn to create visually stunning and user-friendly websites. Master HTML, CSS, and design principles to build responsive websites that work on all devices.",
    icon: "Globe",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Web Designer", "Frontend Designer", "UI Developer", "Freelance Designer"],
    suitable_for: "Creative Individuals, Students, Small Business Owners",
    certifications: ["Adobe Certified Professional - Web", "W3Schools Certification"],
    modules: [
      "HTML5 Fundamentals",
      "CSS3 & Styling",
      "Responsive Web Design",
      "CSS Flexbox & Grid",
      "Bootstrap Framework",
      "UI/UX Principles",
      "Adobe XD/Figma Basics",
      "Portfolio Website Project"
    ]
  },
  "web-development": {
    title: "Web Development",
    subtitle: "Build Dynamic Web Applications",
    description: "Learn full-stack web development including frontend and backend technologies. Build interactive web applications using modern frameworks and tools.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200",
    duration: "6 Months",
    outcomes: ["Web Developer", "Frontend Developer", "Full Stack Developer", "JavaScript Developer"],
    suitable_for: "Students, IT Professionals, Career Changers",
    certifications: ["Meta Front-End Developer", "freeCodeCamp Certification"],
    modules: [
      "HTML5 & CSS3",
      "JavaScript ES6+",
      "React.js Framework",
      "Node.js & Express",
      "Database Integration (MongoDB/MySQL)",
      "REST API Development",
      "Git & Version Control",
      "Deployment & Hosting"
    ]
  },
  "data-analytics": {
    title: "Data Analytics",
    subtitle: "Turn Data into Insights",
    description: "Master data analytics skills to make data-driven decisions. Learn statistical analysis, data visualization, and business intelligence tools to extract meaningful insights from complex datasets.",
    icon: "BarChart3",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    duration: "4 Months",
    outcomes: ["Data Analyst", "Business Analyst", "BI Developer", "Data Visualization Specialist"],
    suitable_for: "Analysts, Business Professionals, Statistics Enthusiasts, MBA Students",
    certifications: ["Google Data Analytics Certificate", "Microsoft Power BI Certification", "Tableau Desktop Specialist"],
    modules: [
      "Excel for Data Analysis",
      "SQL & Database Querying",
      "Python for Data Analysis",
      "Statistical Analysis Fundamentals",
      "Data Visualization (Power BI/Tableau)",
      "Dashboard Creation",
      "Business Intelligence Reporting",
      "Capstone Analytics Project"
    ]
  },
  "ai-beginners": {
    title: "AI For Beginners",
    subtitle: "Start Your AI Journey",
    description: "An introductory course to Artificial Intelligence covering fundamental concepts, applications, and hands-on experience with AI tools. Perfect for anyone wanting to understand AI technology.",
    icon: "Bot",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
    duration: "2 Months",
    outcomes: ["AI Enthusiast", "AI-Enabled Professional", "Prompt Engineer", "AI Tool User"],
    suitable_for: "Anyone interested in AI, Students, Working Professionals, Business Owners",
    certifications: ["Google AI Essentials", "IBM AI Foundations"],
    modules: [
      "Introduction to AI & Machine Learning",
      "Understanding ChatGPT & LLMs",
      "Prompt Engineering Basics",
      "AI Tools for Productivity",
      "AI in Business Applications",
      "Ethics in AI",
      "Hands-on AI Projects"
    ]
  },
  "ai-engineering": {
    title: "AI Engineering",
    subtitle: "Build Intelligent Systems",
    description: "Advanced program covering machine learning, deep learning, and AI system development. Learn to build and deploy AI models for real-world applications.",
    icon: "Cpu",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=1200",
    duration: "6 Months",
    outcomes: ["AI Engineer", "ML Engineer", "Data Scientist", "Deep Learning Specialist"],
    suitable_for: "Programmers, Data Analysts, Engineering Graduates, Tech Professionals",
    certifications: ["TensorFlow Developer Certificate", "AWS Machine Learning Specialty", "Google ML Engineer"],
    modules: [
      "Python for AI",
      "Mathematics for Machine Learning",
      "Machine Learning Algorithms",
      "Deep Learning & Neural Networks",
      "TensorFlow & PyTorch",
      "Natural Language Processing",
      "Computer Vision Basics",
      "Model Deployment & MLOps",
      "AI Project Development"
    ]
  },

  // Design & Marketing
  "digital-marketing": {
    title: "Digital Marketing",
    subtitle: "Master Online Marketing Strategies",
    description: "Become a digital marketing expert with comprehensive training in SEO, social media marketing, content marketing, paid advertising, and analytics. Learn to create and execute successful marketing campaigns.",
    icon: "TrendingUp",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    duration: "4 Months",
    outcomes: ["Digital Marketing Manager", "SEO Specialist", "Social Media Manager", "Content Strategist", "PPC Specialist"],
    suitable_for: "Marketing Professionals, Business Owners, Fresh Graduates, Entrepreneurs",
    certifications: ["Google Digital Marketing Certification", "Meta Blueprint Certification", "HubSpot Inbound Marketing"],
    modules: [
      "Digital Marketing Fundamentals",
      "Search Engine Optimization (SEO)",
      "Search Engine Marketing (Google Ads)",
      "Social Media Marketing",
      "Content Marketing Strategy",
      "Email Marketing & Automation",
      "Analytics & Performance Tracking",
      "Marketing Campaign Management"
    ]
  },
  "graphic-designing": {
    title: "Graphic Designing",
    subtitle: "Create Visual Masterpieces",
    description: "Master the art of visual communication with professional graphic design training. Learn industry-standard tools like Adobe Photoshop, Illustrator, and Canva to create stunning designs.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Graphic Designer", "Visual Designer", "Brand Designer", "Print Designer", "Digital Artist"],
    suitable_for: "Creative Individuals, Art Enthusiasts, Marketing Professionals, Freelancers",
    certifications: ["Adobe Certified Professional", "Canva Design Certification"],
    modules: [
      "Design Principles & Color Theory",
      "Adobe Photoshop Mastery",
      "Adobe Illustrator Mastery",
      "Logo & Brand Identity Design",
      "Social Media Graphics",
      "Print Design (Brochures, Banners)",
      "Canva for Quick Designs",
      "Portfolio Development"
    ]
  },
  "ui-ux-designing": {
    title: "UI & UX Designing",
    subtitle: "Design User-Centric Experiences",
    description: "Learn to design intuitive and engaging user interfaces and experiences. Master design thinking, prototyping, and user research to create products users love.",
    icon: "PenTool",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=1200",
    duration: "4 Months",
    outcomes: ["UI Designer", "UX Designer", "Product Designer", "Interaction Designer", "UX Researcher"],
    suitable_for: "Designers, Developers, Product Managers, Creative Professionals",
    certifications: ["Google UX Design Certificate", "Adobe XD Certification", "Figma Certification"],
    modules: [
      "UX Design Fundamentals",
      "User Research & Personas",
      "Information Architecture",
      "Wireframing & Prototyping",
      "UI Design Principles",
      "Figma/Adobe XD Mastery",
      "Design Systems",
      "Usability Testing",
      "Portfolio & Case Studies"
    ]
  },

  // Cybersecurity
  "soc-analyst": {
    title: "SOC Analyst",
    subtitle: "Defend Against Cyber Threats",
    description: "Become a Security Operations Center (SOC) Analyst with comprehensive training in threat detection, incident response, and security monitoring. Prepare for a high-demand cybersecurity career.",
    icon: "Shield",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200",
    duration: "6 Months",
    outcomes: ["SOC Analyst Level 1", "Security Analyst", "Threat Analyst", "Incident Responder"],
    suitable_for: "IT Professionals, Networking Enthusiasts, Security Aspirants, Career Changers",
    certifications: ["CompTIA Security+", "CompTIA CySA+", "Splunk Certified User", "IBM QRadar"],
    modules: [
      "Cybersecurity Fundamentals",
      "Network Security & Protocols",
      "Security Information & Event Management (SIEM)",
      "Threat Intelligence",
      "Incident Detection & Response",
      "Malware Analysis Basics",
      "Log Analysis & Monitoring",
      "SOC Tools & Technologies",
      "Compliance & Frameworks (NIST, ISO)",
      "Hands-on SOC Simulation"
    ]
  },
  "ethical-hacking": {
    title: "Ethical Hacking",
    subtitle: "Become a Cybersecurity Expert",
    description: "Learn ethical hacking and penetration testing techniques to protect organizations from cyber threats. Master security tools, vulnerability assessment, and defensive strategies.",
    icon: "Network",
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=1200",
    duration: "6 Months",
    outcomes: ["Ethical Hacker", "Penetration Tester", "Security Consultant", "Vulnerability Analyst"],
    suitable_for: "IT Professionals, Networking Enthusiasts, Security Aspirants",
    certifications: ["Certified Ethical Hacker (CEH)", "CompTIA PenTest+", "OSCP"],
    modules: [
      "Networking & System Fundamentals",
      "Linux for Hackers",
      "Footprinting & Reconnaissance",
      "Scanning & Enumeration",
      "Vulnerability Assessment",
      "System Hacking",
      "Web Application Hacking",
      "Wireless Network Hacking",
      "Social Engineering",
      "Report Writing & Documentation"
    ]
  },

  // Office & Accounting
  "ms-office-ai": {
    title: "MS-Office with AI",
    subtitle: "Office Productivity Reimagined",
    description: "Master Microsoft Office applications enhanced with AI capabilities. Learn to use Copilot, AI-powered features in Word, Excel, PowerPoint, and Outlook to boost your productivity.",
    icon: "Award",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=1200",
    duration: "2 Months",
    outcomes: ["Office Administrator", "Executive Assistant", "Data Entry Specialist", "Office Productivity Expert"],
    suitable_for: "Students, Office Workers, Professionals, Job Seekers",
    certifications: ["Microsoft Office Specialist (MOS)", "Microsoft 365 Certified"],
    modules: [
      "Microsoft Word Advanced Features",
      "Excel Formulas & Data Analysis",
      "PowerPoint Presentation Design",
      "Outlook & Email Management",
      "Microsoft Copilot Integration",
      "AI Features in Office Apps",
      "Cloud Collaboration (OneDrive, Teams)",
      "Productivity Tips & Shortcuts"
    ]
  },
  "e-accounting": {
    title: "E-Accounting",
    subtitle: "Master Digital Accounting",
    description: "Learn computerized accounting using industry-standard software like Tally and accounting principles. Prepare for accounting roles in the digital age.",
    icon: "Calculator",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Accountant", "Accounts Executive", "Tally Operator", "Bookkeeper", "GST Practitioner"],
    suitable_for: "Commerce Students, Accountants, Small Business Owners, Finance Professionals",
    certifications: ["Tally Certification", "GST Practitioner Certificate"],
    modules: [
      "Accounting Fundamentals",
      "Tally Prime Complete Course",
      "GST Accounting & Returns",
      "Inventory Management",
      "Payroll Processing",
      "Bank Reconciliation",
      "Financial Statements",
      "TDS & Tax Compliance"
    ]
  },

  // Soft Skills
  "spoken-english": {
    title: "Spoken English",
    subtitle: "Communicate with Confidence",
    description: "Improve your English speaking skills with comprehensive training in grammar, vocabulary, pronunciation, and conversational English. Gain confidence to communicate effectively in any situation.",
    icon: "MessageCircle",
    image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Confident English Speaker", "Better Communication Skills", "Interview Ready", "Professional Communicator"],
    suitable_for: "Students, Job Seekers, Working Professionals, Anyone wanting to improve English",
    certifications: ["Cambridge English Certificate", "IELTS Preparation"],
    modules: [
      "English Grammar Essentials",
      "Vocabulary Building",
      "Pronunciation & Accent Training",
      "Conversational English",
      "Public Speaking Basics",
      "Business English",
      "Email & Written Communication",
      "Group Discussions Practice"
    ]
  },
  "personality-development": {
    title: "Personality Development",
    subtitle: "Unlock Your True Potential",
    description: "Develop essential soft skills, build confidence, and enhance your personality for personal and professional success. Learn leadership, communication, and interpersonal skills.",
    icon: "Star",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200",
    duration: "2 Months",
    outcomes: ["Enhanced Confidence", "Better Leadership Skills", "Improved Communication", "Professional Image"],
    suitable_for: "Students, Young Professionals, Job Seekers, Anyone seeking self-improvement",
    certifications: ["Personality Development Certificate"],
    modules: [
      "Self-Awareness & Confidence Building",
      "Effective Communication Skills",
      "Body Language & Non-verbal Communication",
      "Time Management",
      "Stress Management",
      "Leadership & Team Skills",
      "Positive Attitude Development",
      "Goal Setting & Achievement"
    ]
  },
  "interview-preparation": {
    title: "Interview Preparation",
    subtitle: "Ace Your Next Interview",
    description: "Comprehensive interview preparation program covering all aspects of job interviews. Learn to present yourself effectively, answer tough questions, and negotiate offers.",
    icon: "Briefcase",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&q=80&w=1200",
    duration: "1 Month",
    outcomes: ["Interview Confident", "Resume Ready", "Negotiation Skills", "Job Offer Ready"],
    suitable_for: "Job Seekers, Fresh Graduates, Career Changers, Working Professionals",
    certifications: ["Interview Preparation Certificate"],
    modules: [
      "Resume & CV Writing",
      "LinkedIn Profile Optimization",
      "Common Interview Questions",
      "Behavioral Interview Techniques",
      "Technical Interview Preparation",
      "Group Discussion Skills",
      "Salary Negotiation",
      "Mock Interview Practice"
    ]
  },

  // Legacy IDs for backward compatibility
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
  "graphic-design": {
    title: "Graphic Design",
    subtitle: "Create Visual Masterpieces",
    description: "Master the art of visual communication with professional graphic design training. Learn industry-standard tools to create stunning designs.",
    icon: "Palette",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200",
    duration: "3 Months",
    outcomes: ["Graphic Designer", "Visual Designer", "Brand Designer"],
    suitable_for: "Creative Individuals, Art Enthusiasts, Marketing Professionals",
    certifications: ["Adobe Certified Professional"],
    modules: [
      "Design Principles & Color Theory",
      "Adobe Photoshop Mastery",
      "Adobe Illustrator Mastery",
      "Logo & Brand Identity Design",
      "Portfolio Development"
    ]
  },
  "full-stack-web-development": {
    title: "Full Stack Web Development",
    subtitle: "Build Complete Web Applications",
    description: "Become a complete full-stack web developer with comprehensive training in frontend and backend technologies.",
    icon: "Code",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&q=80&w=1200",
    duration: "9-12 months",
    outcomes: ["Full Stack Developer", "Frontend Developer", "Backend Developer", "MERN Stack Developer"],
    suitable_for: "Programming Enthusiasts, Career Changers, IT Professionals",
    certifications: ["AWS Certified Developer", "Meta Front-End Developer"],
    modules: [
      "HTML5, CSS3 & Responsive Design",
      "JavaScript & ES6+",
      "React.js Frontend Framework",
      "Node.js & Express Backend",
      "MongoDB Database",
      "RESTful API Development",
      "Git & Version Control",
      "Deployment & DevOps Basics"
    ]
  }
};

const iconMap = {
  Monitor: <Monitor className="w-12 h-12" />,
  Palette: <Palette className="w-12 h-12" />,
  Network: <Network className="w-12 h-12" />,
  Code: <Code className="w-12 h-12" />,
  Building2: <Building2 className="w-12 h-12" />,
  GraduationCap: <GraduationCap className="w-12 h-12" />,
  Shield: <Shield className="w-12 h-12" />,
  Globe: <Globe className="w-12 h-12" />,
  TrendingUp: <TrendingUp className="w-12 h-12" />,
  BarChart3: <BarChart3 className="w-12 h-12" />,
  Bot: <Bot className="w-12 h-12" />,
  Cpu: <Cpu className="w-12 h-12" />,
  PenTool: <PenTool className="w-12 h-12" />,
  Calculator: <Calculator className="w-12 h-12" />,
  MessageCircle: <MessageCircle className="w-12 h-12" />,
  Star: <Star className="w-12 h-12" />,
  Briefcase: <Briefcase className="w-12 h-12" />,
  Award: <Award className="w-12 h-12" />
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
