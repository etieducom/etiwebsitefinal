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

export default function BlogsPage() {
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

      {/* Blogs */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <BlogsPageClient />
        </div>
      </section>
    </div>
  );
}
