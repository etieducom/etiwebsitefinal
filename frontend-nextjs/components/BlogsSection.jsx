'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ChevronRight, BookOpen } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const sampleBlogs = [
  {
    id: '1',
    title: 'Why Cybersecurity is the Most In-Demand Career in 2025',
    excerpt: 'Discover why cybersecurity professionals are becoming increasingly valuable and how you can start your career in this field.',
    category: 'Career',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400',
    created_at: '2025-01-15',
    read_time: '5 min read'
  },
  {
    id: '2',
    title: 'Top 10 Programming Languages to Learn in 2025',
    excerpt: 'A comprehensive guide to the most popular and useful programming languages for beginners and experienced developers.',
    category: 'Technology',
    image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=400',
    created_at: '2025-01-10',
    read_time: '7 min read'
  },
  {
    id: '3',
    title: 'How to Build a Successful Career in Digital Marketing',
    excerpt: 'Learn the essential skills and strategies needed to thrive in the dynamic world of digital marketing.',
    category: 'Marketing',
    image_url: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&q=80&w=400',
    created_at: '2025-01-05',
    read_time: '6 min read'
  }
];

export default function BlogsSection() {
  const [blogs, setBlogs] = useState(sampleBlogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_URL}/api/blogs?limit=3`);
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            setBlogs(data.slice(0, 3));
          }
        }
      } catch (error) {
        console.log('Using sample blogs');
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Latest Articles
            </div>
            <h2 className="section-title">From Our Blog</h2>
            <p className="section-subtitle">
              Insights, tips, and career guidance from industry experts
            </p>
          </div>
          <Link href="/blogs" className="btn-secondary mt-4 md:mt-0">
            View All Blogs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              href={`/blogs/${blog.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                {blog.image_url ? (
                  <Image
                    src={blog.image_url}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <BookOpen className="w-12 h-12 text-primary/30" />
                  </div>
                )}
                {blog.category && (
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                )}
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatDate(blog.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {blog.read_time || '5 min read'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
