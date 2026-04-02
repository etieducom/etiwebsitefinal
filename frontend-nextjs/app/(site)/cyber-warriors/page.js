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
  Phone,
  ChevronRight,
  CheckCircle,
  Globe,
  GraduationCap,
  BadgeCheck,
  Quote,
  Clock,
  MapPin,
  Calendar,
  FileText,
  Smartphone,
  CreditCard,
  Mail,
  Wifi,
  Camera,
  Play,
  Star,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import CyberWarriorsForm from '@/components/CyberWarriorsForm';

export const metadata = {
  title: 'Cyber Warriors | Free Cybersecurity Awareness Program by ETI Educom',
  description: 'Join ETI Educom\'s Cyber Warriors - India\'s trusted free cybersecurity awareness initiative. Protecting 10,000+ citizens from online fraud, phishing & cyber threats since 2019.',
  keywords: 'cyber awareness india, cybersecurity training free, cyber workshop school college, digital safety program, online fraud protection, phishing awareness',
  openGraph: {
    title: 'Cyber Warriors - Free Cybersecurity Awareness | ETI Educom®',
    description: 'India\'s trusted free cybersecurity awareness program. Protecting communities from digital threats.',
    url: 'https://etieducom.com/cyber-warriors',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://etieducom.com/cyber-warriors' },
};

// Impact Statistics
const impactStats = [
  { value: '10,000+', label: 'Citizens Protected', icon: Users },
  { value: '500+', label: 'Sessions Delivered', icon: Calendar },
  { value: '150+', label: 'Institutions Covered', icon: Building2 },
  { value: '5+', label: 'Years of Impact', icon: TrendingUp }
];

// Trust Badges
const trustBadges = [
  { name: 'Punjab Police Collaboration', type: 'Government' },
  { name: 'NASSCOM Member', type: 'Industry' },
  { name: 'ISO 9001:2015 Certified', type: 'Quality' },
  { name: 'MSME Registered', type: 'Government' }
];

// Workshop Modules
const workshopModules = [
  {
    icon: Mail,
    title: 'Phishing & Email Scams',
    duration: '20 mins',
    points: ['Identifying fake emails', 'Suspicious link detection', 'Safe email practices']
  },
  {
    icon: CreditCard,
    title: 'UPI & Banking Fraud',
    duration: '25 mins',
    points: ['QR code scams', 'Fake payment requests', 'Secure transaction habits']
  },
  {
    icon: Smartphone,
    title: 'Mobile Security',
    duration: '20 mins',
    points: ['App permissions', 'Malware protection', 'Device security settings']
  },
  {
    icon: Globe,
    title: 'Social Media Safety',
    duration: '20 mins',
    points: ['Privacy settings', 'Fake profile detection', 'Safe sharing practices']
  },
  {
    icon: Lock,
    title: 'Password & Authentication',
    duration: '15 mins',
    points: ['Strong passwords', 'Two-factor auth', 'Password managers']
  },
  {
    icon: Phone,
    title: 'Fake Call Detection',
    duration: '20 mins',
    points: ['KYC fraud calls', 'Tech support scams', 'Verification techniques']
  }
];

// Testimonials from real sessions
const testimonials = [
  {
    quote: "After the Cyber Warriors session, our students are now much more aware of online threats. We\'ve seen a significant reduction in students falling for social media scams.",
    author: "Dr. Rajinder Singh",
    role: "Principal, Govt. Senior Secondary School",
    location: "Pathankot, Punjab"
  },
  {
    quote: "The practical demonstrations of phishing attacks were eye-opening. Our employees now think twice before clicking any suspicious link.",
    author: "Amit Sharma",
    role: "HR Manager, Manufacturing Unit",
    location: "Jalandhar, Punjab"
  },
  {
    quote: "My parents attended the session and now they verify every call claiming to be from the bank. This program is doing great work for senior citizens.",
    author: "Priya Gupta",
    role: "IT Professional",
    location: "Amritsar, Punjab"
  }
];

// Session formats
const sessionFormats = [
  {
    icon: Users,
    title: 'Individual Sessions',
    duration: '1-2 Hours',
    audience: 'Open to public',
    description: 'Walk-in awareness sessions at ETI Educom centers for individuals wanting to learn cyber safety.',
    features: ['No registration required', 'Certificate provided', 'Q&A included']
  },
  {
    icon: GraduationCap,
    title: 'School & College Programs',
    duration: '2-3 Hours',
    audience: '50-500 students',
    description: 'Interactive workshops designed for students with age-appropriate content and live demonstrations.',
    features: ['Assembly format available', 'Student handbook', 'Teacher training option']
  },
  {
    icon: Building2,
    title: 'Corporate Training',
    duration: 'Half/Full Day',
    audience: 'Employees',
    description: 'Customized sessions focusing on workplace cybersecurity, data protection, and compliance.',
    features: ['Industry-specific content', 'Phishing simulation', 'Policy recommendations']
  },
  {
    icon: Globe,
    title: 'Community Outreach',
    duration: '1-2 Hours',
    audience: 'General public',
    description: 'Sessions at community centers, RWAs, and public gatherings focusing on everyday cyber threats.',
    features: ['Senior citizen focus', 'Regional language', 'Printed materials']
  }
];

// Expert trainers
const trainers = [
  {
    name: 'Cybersecurity Professionals',
    credential: 'Certified Ethical Hackers',
    experience: '5+ years in cybersecurity'
  },
  {
    name: 'Industry Experts',
    credential: 'IT Security Specialists',
    experience: 'Real-world threat experience'
  },
  {
    name: 'Awareness Specialists',
    credential: 'Trained Educators',
    experience: '500+ sessions conducted'
  }
];

// FAQ
const faqs = [
  {
    q: 'Is the Cyber Warriors program really free?',
    a: 'Yes, absolutely free. This is ETI Educom\'s CSR initiative to create a cyber-safe India. We do not charge any fee for awareness sessions.'
  },
  {
    q: 'How can I organize a session at my school/college?',
    a: 'Simply fill out the form on this page or call us at +91 9646727676. We\'ll coordinate with your institution to schedule a convenient date.'
  },
  {
    q: 'What is the minimum audience size required?',
    a: 'For institutional sessions, we recommend a minimum of 30 participants. For community sessions, there\'s no minimum requirement.'
  },
  {
    q: 'Do participants receive certificates?',
    a: 'Yes, all participants who complete the session and pass our quick assessment receive a digital Cyber Warrior Certificate.'
  },
  {
    q: 'Can sessions be conducted in Hindi/Punjabi?',
    a: 'Yes, our trainers are fluent in English, Hindi, and Punjabi. We customize the language based on the audience.'
  }
];

export default function CyberWarriorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 lg:py-28 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-green-500/30">
                <BadgeCheck className="w-4 h-4" />
                Trusted by 150+ Institutions Since 2019
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Cyber Warriors
                <span className="block text-primary mt-2">Protecting India from Digital Threats</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 max-w-lg leading-relaxed">
                A free cybersecurity awareness initiative by ETI Educom®, empowering citizens, 
                students, and organizations with the knowledge to stay safe in the digital world.
              </p>

              {/* Quick Trust Points */}
              <div className="flex flex-wrap gap-4 mb-8">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-gray-200">{badge.name}</span>
                  </div>
                ))}
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {impactStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <Icon className="w-5 h-5 text-primary mb-2" />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form */}
            <div>
              <CyberWarriorsForm />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Our Mission</h2>
              <p className="text-gray-600 max-w-2xl">
                To create a cyber-aware India where every citizen can confidently navigate the digital 
                world without falling victim to online fraud, scams, and cyber threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workshop Modules */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Comprehensive Curriculum</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">What Our Sessions Cover</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Each session is carefully designed to address the most common and dangerous cyber threats 
              faced by Indians today, with practical demonstrations and actionable takeaways.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshopModules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{module.duration}</span>
                      </div>
                      <ul className="space-y-1.5">
                        {module.points.map((point, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Session Formats */}
      <section className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Flexible Formats</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">Sessions Tailored to Your Needs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re an individual, school, college, or organization, we have a session format that works for you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sessionFormats.map((format, index) => {
              const Icon = format.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white flex-shrink-0">
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{format.title}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {format.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {format.audience}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{format.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {format.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Real Impact</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from institutions and individuals who have benefited from our Cyber Warriors program.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 relative">
                <Quote className="w-10 h-10 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="border-t border-gray-200 pt-4">
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Trainers */}
      <section className="py-16 bg-slate-900">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Expert Team</span>
            <h2 className="text-3xl font-bold text-white mt-2 mb-4">Trained by Professionals</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our sessions are conducted by certified cybersecurity professionals with real-world experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((trainer, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-primary text-sm mb-2">{trainer.credential}</p>
                <p className="text-gray-400 text-sm">{trainer.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-600">
        <div className="container-main text-center">
          <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Prove Your Cyber Awareness
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Take our free 10-question assessment and earn your official Cyber Warrior Certificate! 
            Test your knowledge and demonstrate your commitment to digital safety.
          </p>
          <Link 
            href="/warriors" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
            data-testid="take-assessment-btn"
          >
            <Target className="w-5 h-5" />
            Take Free Assessment
            <ChevronRight className="w-5 h-5" />
          </Link>
          <p className="text-white/60 text-sm mt-4">No registration required. Get instant results.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-14">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Questions?</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm flex-shrink-0 mt-0.5">Q</span>
                  {faq.q}
                </h3>
                <p className="text-gray-600 pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-900">
        <div className="container-main text-center">
          <Shield className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Protect Your Community?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Bring the Cyber Warriors program to your school, college, or organization. 
            Together, let&apos;s build a cyber-safe India.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="tel:+919646727676" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors"
              data-testid="call-cta"
            >
              <Phone className="w-5 h-5" />
              Call: +91 9646727676
            </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
              data-testid="contact-cta"
            >
              Send Enquiry
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          
          {/* Trust Footer */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-4">A Corporate Social Responsibility Initiative by</p>
            <div className="flex items-center justify-center gap-2">
              <Image 
                src="/images/logo-white.png" 
                alt="ETI Educom" 
                width={120} 
                height={40}
                className="h-10 w-auto object-contain opacity-80"
              />
            </div>
            <p className="text-gray-500 text-xs mt-4">
              ETI Educom® | Empowering Careers Since 2017 | ISO 9001:2015 Certified
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
