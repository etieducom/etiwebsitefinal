import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Award,
  Users,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  Monitor,
  Wifi,
  BookOpen,
  Building2,
  Star,
  Navigation
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

const PathankotBranchPage = () => {
  const branchInfo = {
    name: "ETI Educom Pathankot",
    tagline: "Best Computer Institute in Pathankot",
    address: "Jodhamal Colony, Dhangu Road, Pathankot, Punjab - 145001",
    phone: "+91 9646727676",
    email: "helpdesk@etieducom.com",
    timings: "Mon-Sat: 9:00 AM - 7:00 PM",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3391.8!2d75.6389!3d32.2733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE2JzI0LjAiTiA3NcKwMzgnMjAuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
  };

  const facilities = [
    { icon: <Monitor className="w-6 h-6" />, title: "Modern Computer Labs", desc: "Latest hardware with high-speed internet" },
    { icon: <Wifi className="w-6 h-6" />, title: "High-Speed Internet", desc: "Uninterrupted connectivity for online learning" },
    { icon: <BookOpen className="w-6 h-6" />, title: "Digital Library", desc: "Access to e-books and learning resources" },
    { icon: <Users className="w-6 h-6" />, title: "Small Batch Sizes", desc: "Personalized attention for every student" },
  ];

  const highlights = [
    "Certiport Authorized Testing Center (CATC)",
    "ISO Certified Institute",
    "MSME Registered",
    "5000+ Students Trained",
    "95% Placement Rate",
    "Industry Expert Faculty",
    "Hands-on Project Training",
    "Flexible Batch Timings"
  ];

  const popularPrograms = [
    { name: "IT Foundation", duration: "6 Months", slug: "it-foundation" },
    { name: "Web Development", duration: "6 Months", slug: "web-development" },
    { name: "Digital Marketing", duration: "4 Months", slug: "digital-marketing" },
    { name: "Python Programming", duration: "3 Months", slug: "python" },
  ];

  return (
    <div className="pt-[72px]" data-testid="pathankot-branch-page">
      <SEO pageSlug="best-institute-in-pathankot" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-2">
              <Building2 className="w-4 h-4 mr-2" />
              Head Office
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-['Poppins']">
              Best Computer Institute in <span className="text-yellow-400">Pathankot</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your career with industry-leading IT education at ETI Educom Pathankot. 
              Punjab's premier destination for structured computer career training.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <GraduationCap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">5000+</p>
                <p className="text-xs text-blue-100">Students Trained</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">CATC</p>
                <p className="text-xs text-blue-100">Certified Center</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">95%</p>
                <p className="text-xs text-blue-100">Placement Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">7+</p>
                <p className="text-xs text-blue-100">Years Experience</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-counselling">
                <Button className="bg-white text-[#1545ea] hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold">
                  Book Free Counselling
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={`tel:${branchInfo.phone}`}>
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-xl">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Visit Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                Our Pathankot Center
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a]">Address</h4>
                    <p className="text-[#4a4a4a]">{branchInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a]">Phone</h4>
                    <a href={`tel:${branchInfo.phone}`} className="text-[#1545ea] hover:underline">
                      {branchInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a]">Email</h4>
                    <a href={`mailto:${branchInfo.email}`} className="text-[#1545ea] hover:underline">
                      {branchInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center text-[#1545ea] flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a1a1a]">Timings</h4>
                    <p className="text-[#4a4a4a]">{branchInfo.timings}</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://maps.google.com/?q=ETI+Educom+Pathankot" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button className="btn-primary">
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>
              </a>
            </motion.div>

            {/* Map */}
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl h-[400px]">
                <iframe
                  src={branchInfo.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ETI Educom Pathankot Location"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Our Facilities</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              State-of-the-Art Infrastructure
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="card-default h-full text-center hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-[#1545ea]/10 rounded-xl flex items-center justify-center mb-4 text-[#1545ea] mx-auto">
                      {facility.icon}
                    </div>
                    <h3 className="font-bold text-[#1a1a1a] mb-2">{facility.title}</h3>
                    <p className="text-sm text-[#4a4a4a]">{facility.desc}</p>
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
              <Badge className="bg-white/10 text-white border border-white/20 mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Poppins']">
                Why ETI Educom Pathankot?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                We're not just another computer institute. We're a career transformation center 
                that has helped thousands of students achieve their dreams.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
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
              className="bg-white rounded-3xl p-8 lg:p-10"
            >
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">Popular Programs</h3>
              <div className="space-y-4">
                {popularPrograms.map((program, index) => (
                  <Link 
                    key={program.slug}
                    to={`/programs/${program.slug}`}
                    className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl hover:bg-[#1545ea]/5 transition-colors group"
                  >
                    <div>
                      <h4 className="font-semibold text-[#1a1a1a] group-hover:text-[#1545ea]">{program.name}</h4>
                      <p className="text-sm text-[#717171]">{program.duration}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#1545ea] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
              
              <Link to="/programs" className="block mt-6">
                <Button className="btn-primary w-full">
                  View All Programs
                  <ArrowRight className="w-4 h-4 ml-2" />
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
              Start Your Career Journey Today
            </h2>
            <p className="text-[#4a4a4a] mb-8 max-w-xl mx-auto text-lg">
              Visit our Pathankot center for a free career counselling session and discover 
              the right path for your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-counselling">
                <Button className="btn-primary px-8 py-4 text-lg">
                  Book Free Counselling
                </Button>
              </Link>
              <a href={`tel:${branchInfo.phone}`}>
                <Button variant="outline" className="px-8 py-4 text-lg border-2 border-[#1545ea] text-[#1545ea] hover:bg-[#1545ea] hover:text-white">
                  <Phone className="w-5 h-5 mr-2" />
                  {branchInfo.phone}
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PathankotBranchPage;
