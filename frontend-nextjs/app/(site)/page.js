import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Monitor, 
  Palette, 
  Network, 
  Code,
  Award,
  Users,
  CheckCircle,
  Shield,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Clock,
  Phone,
  Sparkles
} from 'lucide-react';
import HeroForm from '@/components/HeroForm';
import ReviewsSection from '@/components/ReviewsSection';
import EventsSection from '@/components/EventsSection';
import BlogsSection from '@/components/BlogsSection';
import AnimatedStatsSection from '@/components/AnimatedStatsSection';
import PartnersSection from '@/components/PartnersSection';
import AboutPreviewSection from '@/components/AboutPreviewSection';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'ETI Educom® | The Computer Career School - IT Training Institute',
  description: 'ETI Educom® - India\'s premier Computer Career School since 2017. Offering certified training in Software Development, Cybersecurity, Digital Marketing & IT Support with 100% placement assistance.',
  keywords: 'ETI Educom, computer institute, IT training, software development course, cybersecurity training, digital marketing course, computer career school, best computer institute Pathankot',
  openGraph: {
    title: 'ETI Educom® | The Computer Career School',
    description: 'India\'s leading Computer Career School offering certified training in Software Development, Cybersecurity, Digital Marketing & IT Support since 2017.',
    url: 'https://etieducom.com',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://etieducom.com',
  },
};

const careerTracks = [
  {
    id: 'it-foundation',
    title: 'IT Foundation',
    shortDesc: 'Digital Literacy & Office',
    fullDesc: 'Master essential computing skills, MS Office, and digital fundamentals for career readiness.',
    icon: Monitor,
    duration: '6 Months'
  },
  {
    id: 'digital-design',
    title: 'Design & Marketing',
    shortDesc: 'Creative + Digital Strategy',
    fullDesc: 'Learn Adobe tools, UI/UX design, SEO, and digital marketing for creative careers.',
    icon: Palette,
    duration: '9-12 Months'
  },
  {
    id: 'it-networking',
    title: 'IT & Cybersecurity',
    shortDesc: 'Networks + Security',
    fullDesc: 'Build expertise in IT support, networking, and cybersecurity protocols.',
    icon: Network,
    duration: '9-12 Months'
  },
  {
    id: 'software-development',
    title: 'Software Development',
    shortDesc: 'Code + Build Apps',
    fullDesc: 'Master programming, web development, and software engineering principles.',
    icon: Code,
    duration: '9-12 Months'
  }
];

const trendingSkills = [
  { id: 'digital-marketing', title: 'Digital Marketing', tag: 'High Demand', icon: TrendingUp },
  { id: 'ethical-hacking', title: 'Ethical Hacking', tag: 'Hot', icon: Shield },
  { id: 'soc-analyst', title: 'SOC Analyst', tag: 'Cybersecurity', icon: Network },
  { id: 'graphic-designing', title: 'Graphic Design', tag: 'Creative', icon: Palette },
  { id: 'data-analytics', title: 'Data Analytics', tag: 'Trending', icon: Monitor },
  { id: 'web-development', title: 'Full Stack Dev', tag: 'In Demand', icon: Code }
];

const whyChooseUs = [
  { title: 'Industry-Aligned Curriculum', desc: 'Courses designed with current market requirements', icon: CheckCircle },
  { title: 'International Certifications', desc: 'Microsoft, Adobe, EC-Council certifications', icon: Award },
  { title: 'Practical Training', desc: 'Hands-on projects and real-world scenarios', icon: Code },
  { title: 'Placement Support', desc: '100% placement assistance for eligible students', icon: Briefcase },
  { title: 'Expert Faculty', desc: 'Learn from industry professionals', icon: Users },
  { title: 'Flexible Batches', desc: 'Morning, evening, and weekend batches available', icon: Clock }
];

const highlights = [
  'CATC Authorized Testing Center',
  'ISO Certified Institute',
  'MSME Registered',
  '5000+ Alumni Network'
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-16 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span>Punjab&apos;s Leading IT Training Institute</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Build Your Career in
                <span className="block mt-2 text-yellow-400">Technology</span>
              </h1>
              
              <p className="text-lg text-blue-100 max-w-xl leading-relaxed">
                Transform your future with industry-aligned IT training. From coding to cybersecurity, 
                we prepare you for the careers of tomorrow with hands-on learning and placement support.
              </p>
              
              {/* Highlights */}
              <div className="flex flex-wrap gap-3">
                {highlights.map((item, index) => (
                  <span key={index} className="inline-flex items-center gap-1.5 text-sm text-blue-100 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                    <CheckCircle className="w-3.5 h-3.5 text-yellow-400" />
                    {item}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/programs" className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-xl font-semibold transition-all hover:bg-blue-50 shadow-lg">
                  Explore Programs
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/free-counselling" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all border border-white/20">
                  Free Counselling
                </Link>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs text-white font-medium">
                      {['RS', 'PK', 'AK', 'SK'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="text-white font-semibold">5000+ Students</span>
                  <span className="text-blue-200 block">have transformed their careers</span>
                </div>
              </div>
            </div>
            
            {/* Right - Enquiry Form */}
            <div className="lg:pl-8">
              <HeroForm />
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats Section */}
      <AnimatedStatsSection />

      {/* Career Tracks Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Structured Learning Paths
            </div>
            <h2 className="section-title">Career Tracks</h2>
            <p className="section-subtitle mx-auto">
              Structured pathways designed to take you from beginner to industry-ready professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {careerTracks.map((track) => {
              const IconComponent = track.icon;
              return (
                <Link 
                  key={track.id}
                  href={`/programs/${track.id}`}
                  className="group relative bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20"
                >
                  <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-2">{track.shortDesc}</p>
                  <p className="text-gray-600 text-sm mb-4">{track.fullDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {track.duration}
                    </span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          
          <div className="text-center mt-10">
            <Link href="/programs" className="btn-secondary">
              View All Programs
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Skills */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              High Demand Skills
            </div>
            <h2 className="section-title">Trending Skills</h2>
            <p className="section-subtitle mx-auto">
              Learn the most in-demand skills in the IT industry
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingSkills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Link 
                  key={skill.id}
                  href={`/programs/${skill.id}`}
                  className="group bg-white rounded-2xl p-5 text-center hover:shadow-lg border border-gray-100 hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-primary transition-colors">{skill.title}</h3>
                  <span className="inline-block bg-primary/10 text-primary text-[10px] px-2 py-1 rounded-full font-medium">
                    {skill.tag}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <AboutPreviewSection />

      {/* Why Choose Us */}
      <section className="section-padding bg-gray-50">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Our Advantages
            </div>
            <h2 className="section-title">Why Choose ETI Educom?</h2>
            <p className="section-subtitle mx-auto">
              Discover what makes us the preferred choice for IT education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="group flex gap-4 p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <div className="w-14 h-14 flex-shrink-0 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Events Section */}
      <EventsSection />

      {/* Blogs Section */}
      <BlogsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]"></div>
        </div>
        
        <div className="container-main relative text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-white mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Start Your Journey Today
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your
            <span className="block text-yellow-400">Career?</span>
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers with ETI Educom.
            Get free career counselling and discover the right path for you!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/free-counselling" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl transition-all hover:bg-blue-50 shadow-xl">
              Get Free Counselling
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919646727676" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl transition-all border border-white/20">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
