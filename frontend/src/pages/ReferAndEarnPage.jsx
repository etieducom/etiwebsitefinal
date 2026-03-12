import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import SEO from "../components/SEO";
import { 
  Gift, 
  Users, 
  BadgePercent, 
  PartyPopper,
  Send,
  Copy,
  CheckCircle,
  ArrowRight,
  Wallet,
  Share2,
  UserPlus,
  GraduationCap,
  IndianRupee
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

const ReferAndEarnPage = () => {
  const [formData, setFormData] = useState({
    referrer_name: "",
    referrer_phone: "",
    referrer_email: "",
    friend_name: "",
    friend_phone: "",
    program_interest: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      icon: <UserPlus className="w-10 h-10" />,
      step: "1",
      title: "Refer a Friend",
      description: "Share this opportunity with friends, family, or anyone looking to upgrade their skills and career.",
      color: "bg-blue-500"
    },
    {
      icon: <BadgePercent className="w-10 h-10" />,
      step: "2",
      title: "They Get Benefits",
      description: "When they enroll using your referral, they receive exclusive fee discounts and special benefits.",
      color: "bg-green-500"
    },
    {
      icon: <PartyPopper className="w-10 h-10" />,
      step: "3",
      title: "You Get Rewarded",
      description: "You unlock your well-deserved cash reward 30 days after their course begins!",
      color: "bg-yellow-500"
    }
  ];

  const rewards = [
    { program: "Career Tracks (6-12 Months)", reward: "Up to Rs. 2,000" },
    { program: "Tech Programs (3-6 Months)", reward: "Up to Rs. 1,000" },
    { program: "Short Courses (1-3 Months)", reward: "Up to Rs. 500" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.referrer_name || !formData.referrer_phone || !formData.friend_name || !formData.friend_phone) {
      toast.error("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${API}/referrals`, formData);
      setSubmitted(true);
      toast.success("Referral submitted successfully! We'll contact your friend soon.");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-[72px]" data-testid="refer-earn-page">
      <SEO pageSlug="refer-and-earn" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1545ea] via-[#0d36c4] to-[#1545ea] py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/10 text-white border border-white/20 mb-6 px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              Referral Program
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight font-['Poppins']">
              Refer Friends. <span className="text-yellow-400">Earn Rewards.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Know someone who wants to upgrade their skills? Refer them to ETI Educom 
              and earn cash rewards for every successful enrollment!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#refer-form">
                <Button className="bg-white text-[#1545ea] hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg">
                  Refer Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              3 Simple Steps to Earn
            </h2>
            <p className="text-[#4a4a4a] max-w-2xl mx-auto">
              It's super easy to earn rewards by helping your friends build their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-1 bg-gray-200 z-0">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-transparent border-l-gray-200"></div>
                  </div>
                )}
                
                <Card className="card-default h-full text-center relative z-10 hover:shadow-xl transition-all">
                  <CardContent className="p-8">
                    <div className={`w-20 h-20 ${step.color} rounded-2xl flex items-center justify-center mb-6 text-white mx-auto shadow-lg`}>
                      {step.icon}
                    </div>
                    <span className="inline-block w-10 h-10 bg-gray-100 rounded-full text-xl font-bold text-[#1545ea] leading-10 mb-4">
                      {step.step}
                    </span>
                    <h3 className="font-bold text-[#1a1a1a] text-xl mb-3">{step.title}</h3>
                    <p className="text-[#4a4a4a]">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Reward Structure</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 font-['Poppins']">
                Earn Up to Rs. 2,000 Per Referral
              </h2>
              <p className="text-[#4a4a4a] mb-8 text-lg">
                The more you refer, the more you earn! There's no limit on how many 
                friends you can refer. Help them build careers while you build rewards.
              </p>
              
              <div className="space-y-4">
                {rewards.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1545ea]/10 rounded-lg flex items-center justify-center text-[#1545ea]">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-[#1a1a1a]">{item.program}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-700 font-bold">
                      <IndianRupee className="w-3 h-3 mr-1" />
                      {item.reward}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-default shadow-xl bg-[#1545ea] text-white overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-12 h-12 text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Unlimited Earning Potential</h3>
                  <p className="text-blue-100 mb-6">
                    Refer 10 friends to career tracks and earn up to Rs. 20,000!
                  </p>
                  <div className="bg-white/10 rounded-xl p-6">
                    <p className="text-sm text-blue-100 mb-2">Rewards credited after</p>
                    <p className="text-3xl font-bold text-yellow-400">30 Days</p>
                    <p className="text-sm text-blue-100 mt-2">of course commencement</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Referral Form */}
      <section id="refer-form" className="py-20 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">Refer Now</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                Submit Your Referral
              </h2>
              <p className="text-[#4a4a4a]">
                Fill in your details and your friend's details. We'll take it from there!
              </p>
            </motion.div>

            <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
              <Card className="card-default shadow-xl">
                <CardContent className="p-6 md:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
                        Referral Submitted!
                      </h3>
                      <p className="text-[#4a4a4a] max-w-md mx-auto mb-6">
                        Thank you for referring your friend to ETI Educom! Our team will 
                        contact them shortly. You'll receive your reward after they enroll 
                        and complete 30 days of their course.
                      </p>
                      <Button 
                        className="btn-primary"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            referrer_name: "",
                            referrer_phone: "",
                            referrer_email: "",
                            friend_name: "",
                            friend_phone: "",
                            program_interest: ""
                          });
                        }}
                      >
                        Refer Another Friend
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6" data-testid="referral-form">
                      {/* Your Details */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                          <Users className="w-5 h-5 text-[#1545ea]" />
                          Your Details (Referrer)
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Your Name *</label>
                            <Input
                              type="text"
                              value={formData.referrer_name}
                              onChange={(e) => setFormData({...formData, referrer_name: e.target.value})}
                              className="form-input h-12"
                              placeholder="Your full name"
                              required
                              data-testid="referrer-name"
                            />
                          </div>
                          <div>
                            <label className="form-label">Your Phone *</label>
                            <Input
                              type="tel"
                              value={formData.referrer_phone}
                              onChange={(e) => setFormData({...formData, referrer_phone: e.target.value})}
                              className="form-input h-12"
                              placeholder="+91 98765 43210"
                              required
                              data-testid="referrer-phone"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="form-label">Your Email (Optional)</label>
                          <Input
                            type="email"
                            value={formData.referrer_email}
                            onChange={(e) => setFormData({...formData, referrer_email: e.target.value})}
                            className="form-input h-12"
                            placeholder="your@email.com"
                            data-testid="referrer-email"
                          />
                        </div>
                      </div>

                      <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                          <UserPlus className="w-5 h-5 text-green-600" />
                          Friend's Details
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className="form-label">Friend's Name *</label>
                            <Input
                              type="text"
                              value={formData.friend_name}
                              onChange={(e) => setFormData({...formData, friend_name: e.target.value})}
                              className="form-input h-12"
                              placeholder="Friend's full name"
                              required
                              data-testid="friend-name"
                            />
                          </div>
                          <div>
                            <label className="form-label">Friend's Phone *</label>
                            <Input
                              type="tel"
                              value={formData.friend_phone}
                              onChange={(e) => setFormData({...formData, friend_phone: e.target.value})}
                              className="form-input h-12"
                              placeholder="+91 98765 43210"
                              required
                              data-testid="friend-phone"
                            />
                          </div>
                        </div>
                        <div className="mt-4">
                          <label className="form-label">Program They're Interested In (Optional)</label>
                          <Input
                            type="text"
                            value={formData.program_interest}
                            onChange={(e) => setFormData({...formData, program_interest: e.target.value})}
                            className="form-input h-12"
                            placeholder="e.g., Web Development, Digital Marketing"
                            data-testid="program-interest"
                          />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        className="btn-primary w-full h-12 text-base"
                        disabled={submitting}
                        data-testid="referral-submit"
                      >
                        {submitting ? (
                          "Submitting..."
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Submit Referral
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-[#717171] text-center">
                        By submitting, you confirm that your friend is aware of this referral.
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Terms Section */}
      <section className="py-12 bg-[#f8f9fa]">
        <div className="container-main">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">Terms & Conditions</h3>
            <ul className="text-sm text-[#717171] space-y-2">
              <li>• Reward is credited 30 days after the referred person's course begins</li>
              <li>• The referred person must complete the enrollment process</li>
              <li>• Both referrer and referee must be different individuals</li>
              <li>• ETI Educom reserves the right to modify the reward structure</li>
              <li>• Self-referrals are not eligible for rewards</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReferAndEarnPage;
