import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const FounderPage = () => {
  return (
    <div className="pt-[72px]" data-testid="founder-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              Leadership
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Manrope']">
              From the Founder's Desk
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              A message from the leadership of ETI Educom®
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Message Section */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div 
              {...fadeInUp}
              className="lg:sticky lg:top-32"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/7581115/pexels-photo-7581115.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="Founder"
                    className="w-full h-auto object-cover"
                    data-testid="founder-image"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#1545ea] text-white p-6 rounded-xl shadow-lg hidden md:block">
                  <p className="text-2xl font-bold">Since 2017</p>
                  <p className="text-blue-100 text-sm">Building Computer Careers</p>
                </div>
              </div>

              <div className="mt-8 text-center lg:text-left">
                <h3 className="text-xl font-bold text-[#1a1a1a] font-['Manrope']">Managing Director</h3>
                <p className="text-[#4a4a4a]">ETI Learning Systems Private Limited</p>
              </div>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="quote-mark mb-4">"</div>
              
              <div className="space-y-6 text-[#4a4a4a] leading-relaxed">
                <p className="text-xl text-[#1a1a1a] font-medium">
                  In an era where technology shapes every aspect of our lives, structured 
                  computer education has become not just relevant, but essential.
                </p>
                
                <p>
                  When I founded ETI Educom® in 2017, the vision was clear — to build an 
                  institution, not just another training center. The Indian education landscape 
                  is filled with coaching institutes that promise quick results but lack the 
                  foundational structure needed for lasting career success.
                </p>
                
                <p>
                  At ETI Educom®, we took a different path. We created defined Career Tracks 
                  instead of disconnected courses. We established centralized academic governance 
                  instead of franchise-dependent quality. We partnered with global certification 
                  bodies instead of offering generic certificates.
                </p>
                
                <p>
                  Our journey has been guided by a simple principle: <strong className="text-[#1a1a1a]">build careers, 
                  not sell courses</strong>. Every curriculum we design, every partnership we form, 
                  and every student we train reflects this commitment.
                </p>
                
                <p>
                  Today, with over 2000 successful learners, we continue to expand our reach 
                  while maintaining the discipline and structure that defines us. Our goal 
                  remains the same — to be India's most trusted Computer Career School.
                </p>
                
                <p>
                  I believe that structured computer careers are the foundation of India's 
                  digital future. And at ETI Educom®, we are committed to building that 
                  foundation, one career at a time.
                </p>
                
                <p className="text-lg font-semibold text-[#1a1a1a] pt-4">
                  Together, we are building India's Computer Career Ecosystem.
                </p>
              </div>

              <div className="mt-12 p-6 bg-[#f1eded] rounded-xl">
                <h4 className="font-bold text-[#1a1a1a] mb-4">Our Core Beliefs</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#1545ea] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">1</span>
                    <span>Structured education creates sustainable careers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#1545ea] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">2</span>
                    <span>Discipline in academics leads to excellence in careers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#1545ea] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">3</span>
                    <span>Global certifications open global opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-[#1545ea] text-white rounded-full flex items-center justify-center text-sm flex-shrink-0">4</span>
                    <span>Transparent practices build lasting trust</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#1545ea]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Manrope']">
              Join Our Mission
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Be part of India's growing Computer Career ecosystem.
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
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FounderPage;
