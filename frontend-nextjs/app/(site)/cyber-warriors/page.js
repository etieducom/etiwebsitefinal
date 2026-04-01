import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, 
  Users, 
  Building2, 
  AlertTriangle,
  Lock,
  Eye,
  Target,
  Award,
  Zap,
  Phone,
  ChevronRight,
  CheckCircle,
  Globe
} from 'lucide-react';
import CyberWarriorsForm from '@/components/CyberWarriorsForm';

const CYBER_WARRIORS_LOGO = '/images/cyber-warriors-logo.png';

export const metadata = {
  title: 'Cyber Warriors | Free Cybersecurity Awareness Program',
  description: 'Join ETI Educom\'s Cyber Warriors initiative - free cybersecurity awareness sessions for individuals, schools, colleges, and organizations. Protect yourself from online threats.',
  keywords: 'cyber awareness, cybersecurity training, free cyber workshop, digital safety, online fraud protection',
  openGraph: {
    title: 'Cyber Warriors - ETI Educom®',
    description: 'Free cybersecurity awareness program for individuals and organizations.',
    url: 'https://etieducom.com/cyber-warriors',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://etieducom.com/cyber-warriors' },
};

const features = [
  {
    icon: AlertTriangle,
    title: 'Threat Awareness',
    description: 'Learn to identify phishing, scams, and social engineering attacks before they strike.',
    color: 'bg-red-500'
  },
  {
    icon: Lock,
    title: 'Digital Safety',
    description: 'Protect your personal data, finances, and digital identity with proven strategies.',
    color: 'bg-primary'
  },
  {
    icon: Users,
    title: 'Community Shield',
    description: 'Empower your community to create a collective defense against cyber threats.',
    color: 'bg-green-500'
  },
  {
    icon: Eye,
    title: 'Scam Detection',
    description: 'Master the art of recognizing fake calls, UPI fraud, and online deception.',
    color: 'bg-purple-500'
  }
];

const stats = [
  { value: '500+', label: 'Sessions Conducted' },
  { value: '10,000+', label: 'People Trained' },
  { value: '50+', label: 'Partner Institutions' },
  { value: '100%', label: 'Free of Cost' }
];

const topics = [
  'Phishing & Email Scams',
  'Social Media Safety',
  'UPI & Banking Fraud Prevention',
  'Password Security & 2FA',
  'Safe Online Shopping',
  'Fake Call Detection',
  'Data Privacy Basics',
  'Mobile Security'
];

const audiences = [
  { icon: Users, title: 'Individuals', desc: 'Personal cybersecurity awareness' },
  { icon: Building2, title: 'Schools & Colleges', desc: 'Student safety workshops' },
  { icon: Globe, title: 'Organizations', desc: 'Corporate cyber awareness' },
  { icon: Award, title: 'Government Bodies', desc: 'Public sector training' }
];

export default function CyberWarriorsPage() {
  return (
    <div className="min-h-screen">
      {/* Cyber Warriors Navbar */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container-main py-4">
          <div className="flex items-center justify-between">
            <img 
              src={CYBER_WARRIORS_LOGO} 
              alt="Cyber Warriors by ETI Educom" 
              className="h-20 w-auto object-contain"
            />
            <Link 
              href="/warriors" 
              className="hidden sm:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Target className="w-5 h-5" />
              Take Free Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                Free Initiative
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Cyber Warriors
                <span className="block text-primary">Digital Safety Program</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Join our mission to create a cyber-safe India. Free awareness sessions 
                for individuals, educational institutions, and organizations.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div>
              <CyberWarriorsForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What You&apos;ll Learn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive cybersecurity awareness covering the most critical threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Topics Covered */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Topics Covered</h2>
              <p className="text-gray-600 mb-8">
                Our sessions cover practical, real-world cybersecurity topics that help 
                participants protect themselves and their organizations from digital threats.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{topic}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Who Can Attend?</h3>
              <div className="space-y-4">
                {audiences.map((audience, index) => {
                  const Icon = audience.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{audience.title}</h4>
                        <p className="text-sm text-gray-600">{audience.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-16 bg-primary">
        <div className="container-main text-center">
          <Award className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Test Your Cyber Knowledge
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Take our free 10-question assessment and earn your Cyber Warrior Certificate! 
            Score 7 or more to prove your cybersecurity awareness.
          </p>
          <Link 
            href="/warriors" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors"
          >
            <Target className="w-5 h-5" />
            Take Free Assessment
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container-main text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Organize a Session at Your Institution
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Want to bring Cyber Warriors to your school, college, or organization? 
            Contact us to schedule a free awareness session.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+919646727676" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors">
              <Phone className="w-5 h-5" />
              Call: +91 9646727676
            </a>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              Contact Us
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
