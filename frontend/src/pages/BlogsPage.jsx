import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import SEO from "../components/SEO";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Search,
  Tag
} from "lucide-react";
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

// Sample blogs for fallback
const sampleBlogs = [
  {
    id: "1",
    title: "Top 10 IT Skills in Demand for 2025",
    slug: "top-10-it-skills-2025",
    excerpt: "Discover the most sought-after IT skills that employers are looking for in 2025 and how you can acquire them.",
    featured_image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
    category: "Career Tips",
    tags: ["IT Skills", "Career", "2025"],
    author: "ETI Educom",
    read_time: 5,
    created_at: "2025-02-15"
  },
  {
    id: "2",
    title: "How to Choose the Right Career Track",
    slug: "choose-right-career-track",
    excerpt: "A comprehensive guide to help you select the best career path based on your interests, skills, and goals.",
    featured_image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600",
    category: "Career Guidance",
    tags: ["Career", "Guidance", "Students"],
    author: "ETI Educom",
    read_time: 7,
    created_at: "2025-02-10"
  },
  {
    id: "3",
    title: "The Future of Digital Marketing in India",
    slug: "future-digital-marketing-india",
    excerpt: "Explore the evolving landscape of digital marketing and the opportunities it presents for aspiring marketers.",
    featured_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
    category: "Industry Insights",
    tags: ["Digital Marketing", "India", "Trends"],
    author: "ETI Educom",
    read_time: 6,
    created_at: "2025-02-05"
  }
];

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${API}/blogs`);
      setBlogs(response.data.length > 0 ? response.data : sampleBlogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs(sampleBlogs);
    } finally {
      setLoading(false);
    }
  };

  const displayBlogs = blogs.length > 0 ? blogs : sampleBlogs;

  const categories = ["all", ...new Set(displayBlogs.map(b => b.category))];

  const filteredBlogs = displayBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1545ea] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-[72px]" data-testid="blogs-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="container-main">
          <motion.div {...fadeInUp} className="text-center">
            <Badge className="bg-[#1545ea]/10 text-[#1545ea] mb-4">
              Knowledge Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-['Poppins']">
              Blogs & Insights
            </h1>
            <p className="text-lg text-[#4a4a4a] max-w-2xl mx-auto">
              Stay updated with the latest trends, tips, and insights in the world of IT education and careers.
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
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 form-input"
                data-testid="blog-search"
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

      {/* Blog Grid */}
      <section className="py-16 bg-white">
        <div className="container-main">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#717171]">No articles found matching your search.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  {...fadeInUp}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blogs/${blog.slug}`}>
                    <Card className="blog-card h-full overflow-hidden group" data-testid={`blog-card-${blog.id}`}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={blog.featured_image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-[#1545ea]">
                            {blog.category}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-4 text-sm text-[#717171] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(blog.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {blog.read_time} min read
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1a1a1a] mb-2 line-clamp-2 group-hover:text-[#1545ea] transition-colors font-['Poppins']">
                          {blog.title}
                        </h3>
                        <p className="text-sm text-[#4a4a4a] line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-[#717171]">
                            <User className="w-4 h-4" />
                            {blog.author}
                          </span>
                          <span className="text-[#1545ea] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read More <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
