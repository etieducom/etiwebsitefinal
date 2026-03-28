import { FileText } from 'lucide-react';
import BlogsPageClient from '@/components/BlogsPageClient';

export const metadata = {
  title: 'Blog & Insights | IT Career Tips & Industry Trends',
  description: 'Read insights on technology, career guidance, and digital skills from ETI Educom®. Tips for IT careers, industry trends, and learning resources.',
  keywords: 'IT blog, career tips, tech insights, digital skills, IT career guidance, programming tips',
  openGraph: {
    title: 'Blog & Insights - ETI Educom®',
    description: 'Tips, insights and guides for your IT career journey.',
    url: 'https://etieducom.com/blogs',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://etieducom.com/blogs' },
};

// Sample blogs for fallback (SSR)
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

// Server-side data fetching
async function getBlogs() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:8001';
    const response = await fetch(`${apiUrl}/api/blogs`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.log('Blogs SSR fetch error, using sample data');
  }
  return sampleBlogs;
}

export default async function BlogsPage() {
  // Fetch blogs on the server
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20">
        <div className="container-main">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Knowledge Hub
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blogs & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-gray-600">
              Stay updated with the latest trends, tips, and insights in the world of IT education and careers.
            </p>
          </div>
        </div>
      </section>

      {/* Blogs - SSR with client-side interactivity */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <BlogsPageClient initialBlogs={blogs} />
        </div>
      </section>
    </div>
  );
}
