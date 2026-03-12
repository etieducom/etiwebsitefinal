import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { 
  Building2, 
  Award, 
  Users, 
  Target,
  CheckCircle,
  ChevronRight,
  Shield,
  Globe,
  GraduationCap,
  Briefcase,
  TrendingUp,
  ArrowRight,
  Star
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
  const milestones = [
    { year: "2017", title: "Foundation", desc: "ETI Educom established in Pathankot" },
    { year: "2018", title: "CATC Authorization", desc: "Became Certiport Authorized Testing Center" },
    { year: "2020", title: "Digital Expansion", desc: "Launched online learning platforms" },
    { year: "2023", title: "Multi-Branch", desc: "Expanded to multiple locations" },
    { year: "2024", title: "5000+ Students", desc: "Milestone of trained professionals" },
  ];

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

  const stats = [
    { value: "5000+", label: "Students Trained", icon: <GraduationCap /> },
    { value: "4", label: "Career Tracks", icon: <Briefcase /> },
    { value: "15+", label: "Industry Certifications", icon: <Award /> },
    { value: "95%", label: "Placement Rate", icon: <TrendingUp /> },
  ];

  const differentiators = [
    "Certiport Authorized Testing Center (CATC)",
    "Industry-aligned structured curriculum",
    "Experienced faculty with corporate background",
    "Hands-on project-based learning",
    "Internationally recognized certifications",
    "Placement assistance & career guidance",
    "State-of-the-art computer labs",
    "Flexible batch timings",
  ];

  return (
    <div className="pt-[72px]" data-testid="about-page">
      <SEO pageSlug="about" />
      
      {/* Hero Section - Blue Theme */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-20 lg:py-28 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-2">
              <Building2 className="w-4 h-4 mr-2" />
              Established 2017
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-['Poppins']">
              Building Digital Careers Since 2017
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              ETI Educom is India's trusted Computer Career School, transforming aspiring students 
              into industry-ready professionals through structured career pathways.
            </p>
            
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="text-yellow-400 mb-2">{stat.icon}</div>
                  <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-sm text-blue-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Who We Are</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                The Computer Career School
              </h2>
              <p className="text-[#4a4a4a] mb-6 text-lg leading-relaxed">
                ETI Educom, a unit of ETI Learning Systems Private Limited, was established 
                with a clear vision: to bridge the gap between academic education and 
                industry requirements.
              </p>
              <p className="text-[#4a4a4a] mb-6 leading-relaxed">
                Unlike traditional coaching institutes, we operate as a Computer Career School 
                with defined Career Tracks, centralized academic governance, and industry-aligned 
                certification programs. Our approach ensures that every student receives 
                structured, career-oriented education.
              </p>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                As a <span className="font-semibold text-[#1a1a1a]">Certiport Authorized Testing Center (CATC)</span>, 
                we provide globally recognized certifications following ethical practices and 
                transparent pricing.
              </p>
              
              <Link to="/founder">
                <Button className="btn-primary group">
                  Meet Our Founder
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800"
                  alt="ETI Educom classroom"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1545ea]/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea]">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#1a1a1a]">CATC Certified</p>
                        <p className="text-sm text-[#717171]">Certiport Authorized Testing Center</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#1545ea] rounded-2xl p-6 text-white shadow-xl hidden lg:block">
                <p className="text-4xl font-bold mb-1">7+</p>
                <p className="text-blue-100">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-['Poppins']">
              Milestones That Define Us
            </h2>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-[#1545ea]/20 transform -translate-y-1/2"></div>
            
            <div className="grid md:grid-cols-5 gap-8">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative text-center"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow relative z-10">
                    <div className="w-12 h-12 bg-[#1545ea] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                      {milestone.year.slice(-2)}
                    </div>
                    <p className="text-sm text-[#1545ea] font-semibold mb-1">{milestone.year}</p>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{milestone.title}</h3>
                    <p className="text-sm text-[#717171]">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Our Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              What Drives Us Forward
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              Our core values shape every decision we make and every student we nurture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-default h-full text-center hover:shadow-xl transition-all group hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center mb-6 text-[#1545ea] mx-auto group-hover:bg-[#1545ea] group-hover:text-white transition-colors">
                      {value.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] text-lg mb-3">{value.title}</h3>
                    <p className="text-[#4a4a4a]">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#1545ea]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/10 text-white border border-white/20 mb-4">Why ETI Educom</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Poppins']">
                What Makes Us Different
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                We don't just teach technology; we build careers. Our unique approach 
                combines academic excellence with practical industry exposure.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {differentiators.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#1545ea]" />
                    </div>
                    <span className="text-white">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 lg:p-10 text-center"
            >
              <div className="w-20 h-20 bg-[#1545ea]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-[#1545ea]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">Join 5000+ Successful Graduates</h3>
              <p className="text-[#4a4a4a] mb-8">
                Take the first step towards your dream career in technology
              </p>
              <Link to="/free-counselling">
                <Button className="btn-primary px-8 py-4">
                  Get Free Counselling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Ready to Transform Your Future?
            </h2>
            <p className="text-[#4a4a4a] mb-8 max-w-xl mx-auto text-lg">
              Explore our career tracks and take the first step towards a successful technology career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/programs">
                <Button className="btn-primary px-8 py-4 text-lg">
                  Explore Career Tracks
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="px-8 py-4 text-lg border-2 border-[#1545ea] text-[#1545ea] hover:bg-[#1545ea] hover:text-white">
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
