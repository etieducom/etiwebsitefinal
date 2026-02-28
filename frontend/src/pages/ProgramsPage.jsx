import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import SEO from "../components/SEO";
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
  ArrowRight,
  Building2,
  GraduationCap
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Default programs data
const defaultPrograms = {
  career_tracks: [
    {
      id: "computer-foundation",
      slug: "computer-foundation",
      title: "Computer Career Foundation",
      description: "Build a solid foundation in computing fundamentals, digital literacy, and essential software skills for a strong career start.",
      icon: "Monitor",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      duration: "3-6 months",
      outcomes: ["Digital Literacy Expert", "Office Productivity Specialist", "IT Fundamentals Professional"],
      suitable_for: "Students, Fresh Graduates, Career Starters",
      certifications: ["Microsoft Office Specialist", "IC3 Digital Literacy"]
    },
    {
      id: "digital-design",
      slug: "digital-design",
      title: "Digital Design & Marketing",
      description: "Master creative design tools and digital marketing strategies to excel in the modern business landscape.",
      icon: "Palette",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      duration: "6-12 months",
      outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer"],
      suitable_for: "Creative Professionals, Marketing Enthusiasts",
      certifications: ["Adobe Certified Professional", "Google Digital Marketing"]
    },
    {
      id: "it-networking",
      slug: "it-networking",
      title: "IT Support, Networking & Cybersecurity",
      description: "Develop expertise in IT infrastructure, network administration, and security protocols for enterprise environments.",
      icon: "Network",
      image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=800",
      duration: "6-12 months",
      outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst"],
      suitable_for: "Technical Aspirants, IT Professionals",
      certifications: ["CompTIA A+", "Network+", "Security+"]
    },
    {
      id: "software-development",
      slug: "software-development",
      title: "Software Development",
      description: "Learn programming languages, development frameworks, and software engineering principles to build modern applications.",
      icon: "Code",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
      duration: "9-18 months",
      outcomes: ["Full Stack Developer", "Software Engineer", "Application Developer"],
      suitable_for: "Engineering Students, Tech Enthusiasts",
      certifications: ["Microsoft Certified Developer", "AWS Developer"]
    }
  ],
  short_term: [
    {
      id: "ms-office",
      slug: "ms-office",
      title: "MS Office Certification",
      description: "Master Microsoft Office suite with hands-on training and earn globally recognized certification.",
      icon: "Monitor",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      duration: "1-2 months",
      outcomes: ["Office Specialist"],
      suitable_for: "Students, Office Workers",
      certifications: ["Microsoft Office Specialist"]
    },
    {
      id: "graphic-design",
      slug: "graphic-design",
      title: "Graphic Design Basics",
      description: "Learn fundamental graphic design principles using industry-standard Adobe tools.",
      icon: "Palette",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
      duration: "2-3 months",
      outcomes: ["Junior Graphic Designer"],
      suitable_for: "Creative Beginners",
      certifications: ["Adobe Photoshop Certification"]
    }
  ],
  skill_development: [
    {
      id: "python-programming",
      slug: "python-programming",
      title: "Python Programming",
      description: "Learn Python programming from basics to advanced concepts with practical projects.",
      icon: "Code",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
      duration: "2-3 months",
      outcomes: ["Python Developer"],
      suitable_for: "Aspiring Programmers",
      certifications: ["Python Certification"]
    }
  ],
  corporate_training: [
    {
      id: "corporate-it",
      slug: "corporate-it",
      title: "Corporate IT Training",
      description: "Customized IT training programs for corporate teams to enhance productivity.",
      icon: "Building2",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      duration: "Custom",
      outcomes: ["Enhanced Team Productivity"],
      suitable_for: "Corporate Teams",
      certifications: ["Custom Certification"]
    }
  ]
};

const iconMap = {
  Monitor: <Monitor className="w-10 h-10" />,
  Palette: <Palette className="w-10 h-10" />,
  Network: <Network className="w-10 h-10" />,
  Code: <Code className="w-10 h-10" />,
  Building2: <Building2 className="w-10 h-10" />,
  GraduationCap: <GraduationCap className="w-10 h-10" />
};

const categoryInfo = {
  career_tracks: { title: "Career Tracks", description: "Comprehensive long-term programs for career transformation" },
  short_term: { title: "Short Term Programs", description: "Quick certification courses for specific skills" },
  skill_development: { title: "Skill Development", description: "Focused programs to build specific technical skills" },
  corporate_training: { title: "Corporate Training", description: "Customized training solutions for organizations" }
};

const ProgramsPage = () => {
  const [programs, setPrograms] = useState(defaultPrograms);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get(`${API}/programs`);
      if (response.data.length > 0) {
        // Group by category
        const grouped = {
          career_tracks: response.data.filter(p => p.category === 'career_tracks'),
          short_term: response.data.filter(p => p.category === 'short_term'),
          skill_development: response.data.filter(p => p.category === 'skill_development'),
          corporate_training: response.data.filter(p => p.category === 'corporate_training')
        };
        // Merge with defaults if empty
        Object.keys(grouped).forEach(key => {
          if (grouped[key].length === 0 && defaultPrograms[key]) {
            grouped[key] = defaultPrograms[key];
          }
        });
        setPrograms(grouped);
      }
    } catch (error) {
      console.error("Error fetching programs:", error);
    } finally {
      setLoading(false);
    }
  };

  const allPrograms = [
    ...programs.career_tracks,
    ...programs.short_term,
    ...programs.skill_development,
    ...programs.corporate_training
  ];

  const filteredPrograms = activeCategory === "all" 
    ? allPrograms 
    : programs[activeCategory] || [];

  return (
    <div className="pt-[72px]" data-testid="programs-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              All Programs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Our Programs
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Comprehensive programs designed to transform learners into 
              skilled professionals ready for the modern workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-[#ebebeb]">
        <div className="container-main">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === "all" 
                  ? "bg-[#1545ea] text-white" 
                  : "bg-[#ebebeb] text-[#4a4a4a] hover:bg-[#d9d9d9]"
              }`}
            >
              All Programs
            </button>
            {Object.keys(categoryInfo).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat 
                    ? "bg-[#1545ea] text-white" 
                    : "bg-[#ebebeb] text-[#4a4a4a] hover:bg-[#d9d9d9]"
                }`}
              >
                {categoryInfo[cat].title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-white">
        <div className="container-main">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full mx-auto"></div>
            </div>
          ) : (
            <div className="space-y-16">
              {activeCategory === "all" ? (
                // Show all categories
                Object.keys(categoryInfo).map((cat) => (
                  programs[cat]?.length > 0 && (
                    <motion.div key={cat} {...fadeInUp}>
                      <div className="mb-8">
                        <h2 className="text-2xl font-bold text-[#1a1a1a] font-['Poppins']">
                          {categoryInfo[cat].title}
                        </h2>
                        <p className="text-[#717171]">{categoryInfo[cat].description}</p>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {programs[cat].map((program, index) => (
                          <ProgramCard key={program.id || index} program={program} />
                        ))}
                      </div>
                    </motion.div>
                  )
                ))
              ) : (
                // Show filtered category
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPrograms.map((program, index) => (
                    <motion.div
                      key={program.id || index}
                      {...fadeInUp}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ProgramCard program={program} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1545ea]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Poppins']">
              Not Sure Which Program is Right for You?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Use our AI Skills Guider or book a free career counselling session with our experts.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-[#1545ea] hover:bg-[#ebebeb] font-semibold px-8 py-3">
                Book Career Counselling
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ProgramCard = ({ program }) => {
  const icon = iconMap[program.icon] || <Monitor className="w-10 h-10" />;
  
  return (
    <Link to={`/programs/${program.slug || program.id}`}>
      <div className="track-card h-full" data-testid={`program-${program.slug || program.id}`}>
        <div className="relative h-40 overflow-hidden">
          <img 
            src={program.image_url || program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-3 left-3">
            <div className="w-10 h-10 bg-[#1545ea] rounded-lg flex items-center justify-center text-white">
              {React.cloneElement(icon, { className: "w-5 h-5" })}
            </div>
          </div>
          <Badge className="absolute top-3 right-3 bg-white/90 text-[#1a1a1a] text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {program.duration}
          </Badge>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 font-['Poppins'] line-clamp-1">
            {program.title}
          </h3>
          <p className="text-[#4a4a4a] text-sm mb-4 line-clamp-2">
            {program.description}
          </p>
          <span className="text-[#1545ea] font-semibold text-sm flex items-center gap-1">
            Learn More <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProgramsPage;
