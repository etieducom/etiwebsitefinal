import React from "react";
import { Link } from "react-router-dom";
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
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const careerTracks = [
  {
    id: "computer-foundation",
    title: "Computer Career Foundation",
    description: "Build a solid foundation in computing fundamentals, digital literacy, and essential software skills for a strong career start.",
    icon: <Monitor className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    duration: "3-6 months",
    outcomes: ["Digital Literacy Expert", "Office Productivity Specialist", "IT Fundamentals Professional"],
    suitable: "Students, Fresh Graduates, Career Starters",
    certifications: ["Microsoft Office Specialist", "IC3 Digital Literacy"]
  },
  {
    id: "digital-design",
    title: "Digital Design & Marketing",
    description: "Master creative design tools and digital marketing strategies to excel in the modern business landscape.",
    icon: <Palette className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
    duration: "6-12 months",
    outcomes: ["Graphic Designer", "Digital Marketing Specialist", "UI/UX Designer"],
    suitable: "Creative Professionals, Marketing Enthusiasts",
    certifications: ["Adobe Certified Professional", "Google Digital Marketing"]
  },
  {
    id: "it-networking",
    title: "IT Support, Networking & Cybersecurity",
    description: "Develop expertise in IT infrastructure, network administration, and security protocols for enterprise environments.",
    icon: <Network className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=800",
    duration: "6-12 months",
    outcomes: ["IT Support Technician", "Network Administrator", "Security Analyst"],
    suitable: "Technical Aspirants, IT Professionals",
    certifications: ["CompTIA A+", "Network+", "Security+"]
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Learn programming languages, development frameworks, and software engineering principles to build modern applications.",
    icon: <Code className="w-10 h-10" />,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
    duration: "9-18 months",
    outcomes: ["Full Stack Developer", "Software Engineer", "Application Developer"],
    suitable: "Engineering Students, Tech Enthusiasts",
    certifications: ["Microsoft Certified Developer", "AWS Developer"]
  }
];

const CareerTracksPage = () => {
  return (
    <div className="pt-[72px]" data-testid="career-tracks-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              Structured Learning Paths
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Career Tracks
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Comprehensive career programs designed to transform learners into 
              skilled professionals ready for the modern workforce.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Career Tracks Grid */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="space-y-8">
            {careerTracks.map((track, index) => (
              <motion.div
                key={track.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="track-card overflow-hidden" data-testid={`track-${track.id}`}>
                  <div className="grid lg:grid-cols-5 gap-0">
                    <div className="lg:col-span-2 relative h-64 lg:h-auto">
                      <img 
                        src={track.image}
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent lg:bg-none"></div>
                      <div className="absolute bottom-4 left-4 lg:hidden">
                        <div className="w-14 h-14 bg-[#1545ea] rounded-xl flex items-center justify-center text-white">
                          {track.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="lg:col-span-3 p-6 lg:p-8">
                      <div className="hidden lg:flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea]">
                          {track.icon}
                        </div>
                        <Badge className="bg-[#f1eded] text-[#4a4a4a]">
                          <Clock className="w-3 h-3 mr-1" />
                          {track.duration}
                        </Badge>
                      </div>

                      <h2 className="text-2xl font-bold text-[#1a1a1a] mb-3 font-['Manrope']">
                        {track.title}
                      </h2>
                      <p className="text-[#4a4a4a] mb-6">{track.description}</p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] mb-2">
                            <Target className="w-4 h-4 text-[#1545ea]" />
                            Career Outcomes
                          </div>
                          <ul className="space-y-1">
                            {track.outcomes.map((outcome, i) => (
                              <li key={i} className="text-sm text-[#4a4a4a]">• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#1a1a1a] mb-2">
                            <Award className="w-4 h-4 text-[#1545ea]" />
                            Certifications
                          </div>
                          <ul className="space-y-1">
                            {track.certifications.map((cert, i) => (
                              <li key={i} className="text-sm text-[#4a4a4a]">• {cert}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-[#717171] mb-6">
                        <Users className="w-4 h-4" />
                        <span><strong>Suitable for:</strong> {track.suitable}</span>
                      </div>

                      <Link to={`/career-tracks/${track.id}`}>
                        <Button className="btn-primary">
                          View Track Details
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1545ea]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Manrope']">
              Not Sure Which Track is Right for You?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Book a free career counselling session with our experts to find the perfect path.
            </p>
            <Link to="/contact">
              <Button className="bg-white text-[#1545ea] hover:bg-[#f1eded] font-semibold px-8 py-3">
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

export default CareerTracksPage;
