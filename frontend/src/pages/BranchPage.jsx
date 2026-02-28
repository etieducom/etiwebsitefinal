import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight,
  Building2,
  Users,
  Award,
  CheckCircle
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

// Default programs available at all branches
const defaultPrograms = [
  "Computer Career Foundation",
  "Digital Design & Marketing",
  "IT Support & Cybersecurity",
  "Software Development",
  "Summer Training Programs"
];

const BranchPage = () => {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBranch();
  }, [branchId]);

  const fetchBranch = async () => {
    try {
      const response = await axios.get(`${API}/branches/${branchId}`);
      setBranch(response.data);
    } catch (err) {
      console.error("Error fetching branch:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#1545ea]/20 border-t-[#1545ea] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !branch) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center" data-testid="branch-not-found">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-[#b0b0b0] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Branch Not Found</h1>
          <p className="text-[#717171] mb-6">The branch you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="btn-primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="pt-[72px]" data-testid="branch-page">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <img 
          src={branch.image_url || defaultImage}
          alt={branch.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container-main">
            <motion.div {...fadeInUp}>
              <Badge className="bg-white/20 text-white mb-4">
                <Building2 className="w-4 h-4 mr-1" />
                Branch
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-['Poppins']">
                ETI Educom - {branch.name}
              </h1>
              <p className="text-white/80 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {branch.address}, {branch.city}, {branch.state}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white border-b border-[#ebebeb]">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div {...fadeInUp}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Call Us</h3>
                    <a href={`tel:${branch.phone}`} className="text-[#1545ea] font-medium hover:underline">
                      {branch.phone}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Email Us</h3>
                    <a href={`mailto:${branch.email}`} className="text-[#1545ea] font-medium hover:underline">
                      {branch.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default h-full">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1545ea]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#1545ea]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-1">Timings</h3>
                    <p className="text-[#4a4a4a] text-sm">{branch.timings || "Monday - Saturday, 9:00 AM - 6:00 PM"}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Branch */}
      <section className="py-16 section-grey">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">About This Branch</Badge>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                {branch.name} Center
              </h2>
              <p className="text-[#4a4a4a] mb-8 leading-relaxed">
                {branch.description || `Our ${branch.name} center offers comprehensive computer education programs with state-of-the-art facilities and experienced faculty. We are committed to providing quality education and career guidance to students.`}
              </p>
              
              {branch.facilities && branch.facilities.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {branch.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-[#1545ea] flex-shrink-0" />
                      <span className="text-sm text-[#1a1a1a]">{facility}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default">
                <CardContent className="p-6">
                  <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#1545ea]" />
                    Programs Available
                  </h3>
                  <div className="space-y-3">
                    {defaultPrograms.map((program, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-[#f8f9fa] rounded-lg">
                        <div className="w-8 h-8 bg-[#1545ea]/10 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-[#1545ea]" />
                        </div>
                        <span className="text-sm font-medium text-[#1a1a1a]">{program}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {branch.map_url && (
        <section className="py-16 bg-white">
          <div className="container-main">
            <motion.div {...fadeInUp} className="text-center mb-8">
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
                <MapPin className="w-4 h-4 mr-1" />
                Location
              </Badge>
              <h2 className="text-3xl font-bold text-[#1a1a1a] font-['Poppins']">
                Find Us on Map
              </h2>
            </motion.div>
            <motion.div {...fadeInUp} className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={branch.map_url}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${branch.name} Location`}
              ></iframe>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[#1545ea]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-bold text-white mb-4 font-['Poppins']">
              Visit Our {branch.name} Center
            </h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">
              Schedule a visit or get in touch with us to learn more about our programs and enrollment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/free-counselling">
                <Button className="bg-white text-[#1545ea] hover:bg-[#ebebeb] font-semibold px-8 py-3">
                  Book Free Counselling
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href={`tel:${branch.phone}`}>
                <Button className="btn-outline-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BranchPage;
