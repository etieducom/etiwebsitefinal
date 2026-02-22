import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Building2, 
  Award, 
  Users, 
  Target,
  CheckCircle,
  ChevronRight,
  Shield,
  BookOpen,
  Globe,
  Clock
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

const AboutPage = () => {
  const values = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Academic Excellence",
      description: "Structured curriculum aligned with industry standards and global certifications"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student-First Approach",
      description: "Every decision guided by student success and career outcomes"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Career Focus",
      description: "Programs designed for employment outcomes, not just certificates"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Standards",
      description: "International certification partnerships for worldwide recognition"
    }
  ];

  const milestones = [
    { year: "2017", event: "ETI Educom® Founded" },
    { year: "2018", event: "Certiport CATC Authorization" },
    { year: "2020", event: "Expanded Career Track Programs" },
    { year: "2023", event: "2000+ Students Milestone" }
  ];

  return (
    <div className="pt-[72px]" data-testid="about-page">
      {/* Page Header */}
      <section className="page-header" data-testid="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Building2 className="w-4 h-4 mr-1" />
              About Us
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              About ETI Educom®
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              India's trusted Computer Career School building structured career pathways since 2017
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Manrope']">
                The Computer Career School
              </h2>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                ETI Educom®, a unit of ETI Learning Systems Private Limited, was established 
                in 2017 with a vision to provide structured, career-oriented computer education 
                across India.
              </p>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                Unlike traditional coaching institutes, we operate as a Computer Career School 
                with defined Career Tracks, centralized academic governance, and industry-aligned 
                certification programs.
              </p>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                As a Certiport Authorized Testing Center (CATC), we provide globally recognized 
                certifications following ethical practices and transparent pricing.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="stat-box flex-1 min-w-[140px]">
                  <p className="text-3xl font-bold text-[#1545ea]">2000+</p>
                  <p className="text-sm text-[#717171]">Learners Trained</p>
                </div>
                <div className="stat-box flex-1 min-w-[140px]">
                  <p className="text-3xl font-bold text-[#1545ea]">2017</p>
                  <p className="text-sm text-[#717171]">Established</p>
                </div>
                <div className="stat-box flex-1 min-w-[140px]">
                  <p className="text-3xl font-bold text-[#1545ea]">4</p>
                  <p className="text-sm text-[#717171]">Career Tracks</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                  alt="ETI Educom classroom"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 section-grey">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Manrope']">
              What Drives Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="card-default h-full text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mx-auto mb-4 text-[#1545ea]">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{value.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <Clock className="w-4 h-4 mr-1" />
              Our Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Manrope']">
              Key Milestones
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                {...fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#1545ea] rounded-full flex items-center justify-center text-white font-bold">
                    {milestone.year}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-[#f1eded] mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pt-4">
                  <p className="text-lg font-semibold text-[#1a1a1a]">{milestone.event}</p>
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
              Ready to Start Your Journey?
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Explore our career tracks and take the first step towards a successful technology career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/career-tracks">
                <Button className="bg-white text-[#1545ea] hover:bg-[#f1eded] font-semibold px-8 py-3">
                  Explore Career Tracks
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

export default AboutPage;
