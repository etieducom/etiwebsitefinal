'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Search,
  Tag
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const sampleBlogs = [
  {
    id: '1',
    title: 'Top 10 IT Skills in Demand for 2025',
    slug: 'top-10-it-skills-2025',
    excerpt: 'Discover the most sought-after IT skills that employers are looking for in 2025 and how you can acquire them.',
    featured_image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
    category: 'Career Tips',
    tags: ['IT Skills', 'Career', '2025'],
    author: 'ETI Educom',
    read_time: 5,
    created_at: '2025-02-15'
  },
  {
    id: '2',
    title: 'How to Choose the Right Career Track',
    slug: 'choose-right-career-track',
    excerpt: 'A comprehensive guide to help you select the best career path based on your interests, skills, and goals.',
    featured_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
    category: 'Career Guidance',
    tags: ['Career', 'Guidance', 'Students'],
    author: 'ETI Educom',
    read_time: 7,
    created_at: '2025-02-10'
  },
  {
    id: '3',
    title: 'The Future of Digital Marketing in India',
    slug: 'future-digital-marketing-india',
    excerpt: 'Explore the evolving landscape of digital marketing and the opportunities it presents for aspiring marketers.',
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
    category: 'Industry Insights',
    tags: ['Digital Marketing', 'India', 'Trends'],
    author: 'ETI Educom',
    read_time: 6,
    created_at: '2025-02-05'
  }
];

export default function BlogsPageClient() {
  const [blogs, setBlogs] = useState(sampleBlogs);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setBlogs(data);
          }
        }
      } catch (error) {
        console.log('Using sample blogs');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ['all', ...new Set(blogs.map(b => b.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input pl-10"
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
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Blogs Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
          <p className="text-gray-600">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="card group hover:border-primary">
              {blog.featured_image && (
                <div className="h-48 overflow-hidden rounded-t-2xl -mx-6 -mt-6 mb-4">
                  <Image
                    src={blog.featured_image}
                    alt={blog.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {blog.read_time} min read
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2 mb-4">{blog.excerpt}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(blog.created_at)}
                </span>
                <Link 
                  href={`/blogs/${blog.slug}`}
                  className="text-primary text-sm font-medium flex items-center hover:gap-2 transition-all"
                >
                  Read More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
