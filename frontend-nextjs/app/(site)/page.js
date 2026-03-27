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
  Building2,
  CheckCircle,
  Shield,
  Star,
  Send,
  TrendingUp,
  GraduationCap,
  Briefcase,
  Clock,
  Phone
} from 'lucide-react';
import HeroForm from '@/components/HeroForm';
import ReviewsSection from '@/components/ReviewsSection';
import EventsSection from '@/components/EventsSection';

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
  { id: 'web-development', title: 'Full Stack Development', tag: 'In Demand', icon: Code }
];

const stats = [
  { value: '5000+', label: 'Students Trained', icon: Users },
  { value: '95%', label: 'Placement Rate', icon: Briefcase },
  { value: '50+', label: 'Courses Offered', icon: GraduationCap },
  { value: '8+', label: 'Years Experience', icon: Award }
];

const whyChooseUs = [
  { title: 'Industry-Aligned Curriculum', desc: 'Courses designed with current market requirements', icon: CheckCircle },
  { title: 'International Certifications', desc: 'Microsoft, Adobe, EC-Council certifications', icon: Award },
  { title: 'Practical Training', desc: 'Hands-on projects and real-world scenarios', icon: Code },
  { title: 'Placement Support', desc: '100% placement assistance for eligible students', icon: Briefcase },
  { title: 'Expert Faculty', desc: 'Learn from industry professionals', icon: Users },
  { title: 'Flexible Batches', desc: 'Morning, evening, and weekend batches available', icon: Clock }
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(21,69,234,0.05),transparent_50%)]"></div>
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <GraduationCap className="w-4 h-4" />
                ETI Educom
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Building Careers<br />
                in <span className="text-primary">Technology</span>
              </h1>
              
              <p className="text-lg text-gray-600 max-w-xl">
                India&apos;s premier Computer Career School offering structured career pathways 
                through certified training programs. Training | Certification | Placement
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/programs" className="btn-primary">
                  Explore Programs
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-primary" />
                  <span>5000+ Students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Award className="w-4 h-4 text-primary" />
                  <span>Since 2017</span>
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

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Career Tracks Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
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
                  className="group card hover:border-primary transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dark rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
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
                  className="group bg-white rounded-xl p-4 text-center hover:shadow-lg hover:border-primary border border-transparent transition-all"
                >
                  <div className="w-12 h-12 mx-auto bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-3 group-hover:bg-primary group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{skill.title}</h3>
                  <span className="inline-block bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded-full font-medium">
                    {skill.tag}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose ETI Educom?</h2>
            <p className="section-subtitle mx-auto">
              Discover what makes us the preferred choice for IT education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors">
                  <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
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

      {/* Reviews Section */}
      <ReviewsSection />

      {/* Events Section */}
      <EventsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container-main text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your IT Career?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have transformed their careers with ETI Educom.
            Get free career counselling today!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/free-counselling" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-xl">
              Get Free Counselling
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a href="tel:+919646727676" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
