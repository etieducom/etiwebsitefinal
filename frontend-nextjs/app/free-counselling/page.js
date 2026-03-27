import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, 
  Phone, 
  Award, 
  Users, 
  Briefcase,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import CounsellingForm from '@/components/CounsellingForm';

export const metadata = {
  title: 'Free Career Counselling | ETI Educom®',
  description: 'Get free career counselling from ETI Educom® experts. Discover the right IT career path for you.',
  keywords: 'free counselling, career guidance, IT career, consultation',
  openGraph: {
    title: 'Free Career Counselling - ETI Educom®',
    description: 'Get expert guidance for your IT career journey.',
    url: 'https://etieducom.com/free-counselling',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://etieducom.com/free-counselling',
  },
};

const benefits = [
  'Understand your career options in IT',
  'Get personalized program recommendations',
  'Learn about industry certifications',
  'Discover placement opportunities',
  'No obligation, completely free'
];

const stats = [
  { value: '5000+', label: 'Students Counselled' },
  { value: '95%', label: 'Satisfaction Rate' },
  { value: '100%', label: 'Free of Cost' }
];

export default function FreeCounsellingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4">
        <div className="container-main flex items-center justify-between">
          <Link href="/">
            <Image
              src="/images/logo-blue.png"
              alt="ETI Educom"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
          <a href="tel:+919646727676" className="flex items-center gap-2 text-primary font-semibold">
            <Phone className="w-5 h-5" />
            <span className="hidden sm:inline">+91 9646727676</span>
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 lg:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <CheckCircle className="w-4 h-4" />
                100% Free Counselling
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Get Free<br />
                <span className="text-primary">Career Counselling</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                Not sure which IT career path is right for you? Our expert counsellors 
                will guide you to make the best decision for your future.
              </p>
              
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Form */}
            <div>
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book Your Session</h2>
                  <p className="text-gray-500">Fill the form below to get started</p>
                </div>
                <CounsellingForm />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container-main text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} ETI Educom®. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
