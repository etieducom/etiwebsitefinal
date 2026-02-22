import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { 
  HelpCircle, 
  ChevronDown,
  Search
} from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: "easeOut" }
};

// Sample FAQs for fallback
const sampleFAQs = [
  {
    id: "1",
    question: "What is ETI Educom and what courses do you offer?",
    answer: "ETI Educom is India's leading Computer Career School established in 2017. We offer structured career pathways including Computer Career Foundation, Digital Design & Marketing, IT Support & Cybersecurity, and Software Development tracks. We also provide short-term certification programs and corporate training.",
    category: "General"
  },
  {
    id: "2",
    question: "What are the eligibility criteria for your programs?",
    answer: "Our programs are designed for students from various educational backgrounds. The Computer Career Foundation is suitable for 10th pass students and above. Other specialized tracks typically require 12th pass or graduation. We conduct a counselling session to help you choose the right program based on your background.",
    category: "Admissions"
  },
  {
    id: "3",
    question: "Do you provide placement assistance?",
    answer: "Yes, we provide comprehensive placement support including resume building, interview preparation, and job referrals. Our placement cell actively works with industry partners to connect trained students with job opportunities. We focus on making students job-ready through practical training.",
    category: "Placements"
  },
  {
    id: "4",
    question: "What certifications can I get from ETI Educom?",
    answer: "We are a Certiport Authorized Testing Center (CATC), which means students can earn globally recognized Microsoft, Adobe, and other industry certifications. These certifications add significant value to your resume and improve job prospects.",
    category: "Certifications"
  },
  {
    id: "5",
    question: "What is the duration of your courses?",
    answer: "Course duration varies: Computer Career Foundation (3-6 months), Digital Design & Marketing (6-12 months), IT Support & Cybersecurity (6-12 months), and Software Development (9-18 months). Short-term programs range from 1-3 months.",
    category: "Programs"
  },
  {
    id: "6",
    question: "What are the fees and payment options?",
    answer: "Fees vary by program. We offer flexible payment options including monthly installments. Contact our admissions team or visit our center for detailed fee structure. We also have scholarship programs for deserving students.",
    category: "Fees"
  },
  {
    id: "7",
    question: "Do you offer online classes?",
    answer: "We primarily focus on classroom-based practical training as it provides the best learning experience. However, we do offer blended learning options for certain programs. Contact us to know more about available learning modes.",
    category: "Programs"
  },
  {
    id: "8",
    question: "How can I enroll in a course?",
    answer: "You can enroll by: 1) Visiting our center for counselling, 2) Calling our helpline, 3) Filling the contact form on our website, or 4) Booking a free career counselling session online. Our counselors will guide you through the entire admission process.",
    category: "Admissions"
  },
  {
    id: "9",
    question: "What makes ETI Educom different from other institutes?",
    answer: "ETI Educom stands out due to: Structured career tracks (not random courses), Certiport Authorized Testing Center status, Industry-aligned curriculum, Practical hands-on training, Placement support, and Centralized academic governance ensuring quality education.",
    category: "General"
  },
  {
    id: "10",
    question: "How can I become a franchise partner?",
    answer: "We welcome entrepreneurs interested in education. To become a franchise partner, fill the franchise enquiry form on our website or contact our franchise team. We look for partners with a passion for education, suitable infrastructure, and investment capability.",
    category: "Franchise"
  }
];

const FAQPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`${API}/faqs`);
      setFaqs(response.data.length > 0 ? response.data : sampleFAQs);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      setFaqs(sampleFAQs);
    } finally {
      setLoading(false);
    }
  };

  const displayFAQs = faqs.length > 0 ? faqs : sampleFAQs;

  const categories = ["all", ...new Set(displayFAQs.map(f => f.category))];

  const filteredFAQs = displayFAQs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="faq-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              <HelpCircle className="w-4 h-4 mr-1" />
              Help Center
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Find answers to common questions about our programs, admissions, certifications, and more.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-white border-b border-[#ebebeb]">
        <div className="container-main">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#717171]" />
              <Input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 form-input"
                data-testid="faq-search"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-[#1545ea] text-white"
                      : "bg-[#ebebeb] text-[#4a4a4a] hover:bg-[#d9d9d9]"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-[#b0b0b0] mx-auto mb-4" />
                <p className="text-[#717171]">No questions found matching your search.</p>
              </div>
            ) : (
              <Accordion type="single" collapsible className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    {...fadeInUp}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <AccordionItem 
                      value={faq.id} 
                      className="bg-[#ebebeb] rounded-lg px-6 border-none"
                      data-testid={`faq-item-${faq.id}`}
                    >
                      <AccordionTrigger className="text-left font-semibold text-[#1a1a1a] hover:no-underline py-5">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="flex-shrink-0 mt-1 text-xs">
                            {faq.category}
                          </Badge>
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#4a4a4a] pb-5 pl-[72px]">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 section-grey">
        <div className="container-main text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Still have questions?
            </h2>
            <p className="text-[#4a4a4a] mb-6">
              Can't find the answer you're looking for? Our team is here to help.
            </p>
            <a href="/contact">
              <button className="btn-primary">
                Contact Us
              </button>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FAQPage;
