import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SEO from "../components/SEO";
import { Linkedin, Twitter, Mail, Users } from "lucide-react";
import { Badge } from "../components/ui/badge";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: "easeOut" }
};

const TeamPage = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const res = await axios.get(`${API}/team`);
      setTeam(res.data);
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[72px] min-h-screen bg-[#fafafa]" data-testid="team-page">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#1545ea] to-[#0d36c4] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container-main relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-white/20 text-white border-white/30 mb-6 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Our Team
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Poppins']">
              Meet Our Amazing Team
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Passionate educators and industry experts dedicated to shaping the future of tech education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20">
        <div className="container-main">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#1545ea]/20 border-t-[#1545ea] rounded-full animate-spin"></div>
            </div>
          ) : team.length === 0 ? (
            <motion.div {...fadeInUp} className="text-center py-20">
              <Users className="w-16 h-16 text-[#b0b0b0] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Team Coming Soon</h3>
              <p className="text-[#717171]">We're updating our team information. Check back soon!</p>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#ebebeb]">
                    {/* Photo */}
                    <div className="relative h-72 overflow-hidden bg-gradient-to-br from-[#1545ea]/10 to-[#1545ea]/5">
                      {member.photo_url ? (
                        <img
                          src={member.photo_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-24 h-24 bg-[#1545ea]/20 rounded-full flex items-center justify-center">
                            <span className="text-4xl font-bold text-[#1545ea]">
                              {member.name.charAt(0)}
                            </span>
                          </div>
                        </div>
                      )}
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1a1a1a] mb-1 font-['Poppins']">
                        {member.name}
                      </h3>
                      <p className="text-[#1545ea] font-medium mb-3">{member.title}</p>
                      {member.bio && (
                        <p className="text-[#717171] text-sm line-clamp-3 mb-4">{member.bio}</p>
                      )}
                      
                      {/* Social Links */}
                      <div className="flex items-center gap-3">
                        {member.linkedin_url && (
                          <a
                            href={member.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-[#0077b5]/10 hover:bg-[#0077b5] text-[#0077b5] hover:text-white rounded-full flex items-center justify-center transition-all"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.twitter_url && (
                          <a
                            href={member.twitter_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 bg-[#1da1f2]/10 hover:bg-[#1da1f2] text-[#1da1f2] hover:text-white rounded-full flex items-center justify-center transition-all"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="w-9 h-9 bg-[#1545ea]/10 hover:bg-[#1545ea] text-[#1545ea] hover:text-white rounded-full flex items-center justify-center transition-all"
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Poppins']">
              Want to Join Our Team?
            </h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              We're always looking for passionate educators and industry professionals to join us.
            </p>
            <a
              href="/join-team"
              className="inline-flex items-center gap-2 bg-[#1545ea] hover:bg-[#0d36c4] text-white px-8 py-4 rounded-xl font-semibold transition-colors"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
