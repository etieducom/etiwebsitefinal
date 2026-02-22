import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ChevronRight, 
  Monitor, 
  Palette, 
  Network, 
  Code,
  Award,
  Users,
  Building2,
  CheckCircle,
  ArrowRight,
  Shield,
  Target,
  BookOpen
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
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
    description: "Build essential digital literacy and computing fundamentals for a strong career start.",
    icon: <Monitor className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "digital-design",
    title: "Digital Design & Marketing",
    description: "Master creative design tools and digital marketing strategies for business success.",
    icon: <Palette className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "it-networking",
    title: "IT Support, Networking & Cybersecurity",
    description: "Develop expertise in IT infrastructure, networks, and security protocols.",
    icon: <Network className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1558494949-ef010c89b20c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Learn programming, development frameworks, and software engineering principles.",
    icon: <Code className="w-8 h-8" />,
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=600"
  }
];

const stats = [
  { value: "2000+", label: "Students Trained", icon: <Users className="w-6 h-6" /> },
  { value: "2017", label: "Established", icon: <Building2 className="w-6 h-6" /> },
  { value: "4", label: "Career Tracks", icon: <BookOpen className="w-6 h-6" /> },
  { value: "100%", label: "Structured Learning", icon: <Target className="w-6 h-6" /> }
];

const partners = [
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Adobe_Systems_logo_and_wordmark.svg" },
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "AWS", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
];

const HomePage = () => {
  return (
    <div className="pt-[72px]" data-testid="home-page">
      {/* Hero Section */}
      <section className="hero-home py-20 lg:py-28" data-testid="hero-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-6 px-4 py-2">
                <Award className="w-4 h-4 mr-2" />
                Certiport Authorized Testing Center
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-6 leading-tight font-['Manrope']">
                Building Careers in <span className="text-[#1545ea]">Technology</span>
              </h1>
              <p className="text-lg text-[#4a4a4a] mb-8 leading-relaxed max-w-xl">
                India's premier Computer Career School offering structured career pathways 
                through certified training programs. Training | Certification | Placement
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/career-tracks">
                  <Button className="btn-primary text-base" data-testid="hero-explore-btn">
                    Explore Career Tracks
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="btn-secondary text-base" data-testid="hero-contact-btn">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800"
                  alt="Students in computer lab"
                  className="w-full h-auto object-cover"
                  data-testid="hero-image"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1545ea]/30 to-transparent"></div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-5 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#1545ea] rounded-lg flex items-center justify-center">
                    <Users className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-[#1a1a1a]">2000+</p>
                    <p className="text-sm text-[#717171]">Students Trained</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certification Partners */}
      <section className="py-16 bg-white border-y border-[#f1eded]" data-testid="partners-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-10">
            <Badge className="bg-[#f1eded] text-[#1545ea] mb-4">
              <Shield className="w-4 h-4 mr-1" />
              Certification Partners
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] font-['Manrope']">
              Industry-Recognized Certifications
            </h2>
          </motion.div>

          <div className="overflow-hidden">
            <div className="flex animate-marquee">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div 
                  key={`${partner.name}-${index}`}
                  className="flex-shrink-0 mx-12 flex items-center justify-center h-16"
                >
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Career Tracks Section */}
      <section className="py-20 md:py-28 section-grey" data-testid="tracks-section">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <BookOpen className="w-4 h-4 mr-1" />
              Structured Learning Paths
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              Career Tracks
            </h2>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Comprehensive career programs designed to transform learners into 
              skilled professionals ready for the modern workforce.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {careerTracks.map((track, index) => (
              <motion.div
                key={track.id}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/career-tracks/${track.id}`}>
                  <div className="track-card h-full" data-testid={`track-card-${track.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={track.image} 
                        alt={track.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="w-12 h-12 bg-[#1545ea] rounded-lg flex items-center justify-center mb-2">
                          {track.icon}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-2 font-['Manrope']">
                        {track.title}
                      </h3>
                      <p className="text-[#4a4a4a] text-sm mb-4">
                        {track.description}
                      </p>
                      <span className="text-[#1545ea] font-semibold text-sm flex items-center gap-1">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link to="/career-tracks">
              <Button className="btn-primary">
                View All Career Tracks
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white" data-testid="stats-section">
        <div className="container-main">
          <motion.div 
            {...fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="stat-box-blue"
                data-testid={`stat-${index}`}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-100 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why ETI Section */}
      <section className="py-20 md:py-28 section-grey" data-testid="why-section">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-6">
                Why Choose ETI Educom®
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                Institution-Grade Computer Education
              </h2>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                We operate through defined Career Tracks, not disconnected courses. 
                Our structured academic framework ensures consistent, quality education 
                with centralized governance and career-focused outcomes.
              </p>
              
              <div className="space-y-4">
                {[
                  "Certiport Authorized Testing Center (CATC)",
                  "Structured Career Pathways",
                  "Industry-Aligned Curriculum",
                  "Centralized Academic Governance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1545ea] mt-0.5 flex-shrink-0" />
                    <span className="text-[#1a1a1a]">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link to="/about">
                  <Button className="btn-secondary">
                    Learn More About Us
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                  alt="Professional team"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1545ea]" data-testid="cta-section">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Manrope']">
              Start Your Career Journey Today
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto text-lg">
              Join thousands of successful professionals who started their journey with ETI Educom®
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/career-tracks">
                <Button className="bg-white text-[#1545ea] hover:bg-[#f1eded] font-semibold px-8 py-3">
                  Explore Programs
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button className="btn-outline-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
