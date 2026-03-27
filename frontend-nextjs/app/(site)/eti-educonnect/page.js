import Link from 'next/link';
import { 
  GraduationCap, 
  Award, 
  Users, 
  Clock,
  CheckCircle,
  ChevronRight,
  Phone,
  Building2,
  BookOpen,
  Star,
  Shield
} from 'lucide-react';
import EduConnectClient from '@/components/EduConnectClient';

export const metadata = {
  title: 'ETI EduConnect | Distance Learning Programs from Top Universities',
  description: 'Your gateway to distance learning programs from top universities. Get UG, PG, Diploma, and Certification courses through ETI EduConnect.',
  keywords: 'distance learning, online degree, UG courses, PG courses, MBA distance, BBA distance, top universities',
  openGraph: {
    title: 'ETI EduConnect - Distance Learning Programs',
    description: 'Your gateway to distance learning programs from top universities across India.',
    url: 'https://etieducom.com/eti-educonnect',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://etieducom.com/eti-educonnect' },
};

const benefits = [
  { icon: GraduationCap, title: 'UGC Approved', desc: 'All universities are UGC recognized' },
  { icon: Award, title: 'NAAC Accredited', desc: 'Quality assured education' },
  { icon: Clock, title: 'Flexible Learning', desc: 'Study at your own pace' },
  { icon: Shield, title: 'Valid Degrees', desc: 'Equivalent to regular degrees' }
];

const stats = [
  { value: '500+', label: 'Students Enrolled' },
  { value: '15+', label: 'Partner Universities' },
  { value: '50+', label: 'Programs Available' },
  { value: '100%', label: 'Online Support' }
];

const programTypes = [
  { 
    type: 'UG Programs', 
    programs: ['BBA', 'BCA', 'B.Com', 'BA', 'B.Sc'],
    duration: '3 Years',
    icon: BookOpen
  },
  { 
    type: 'PG Programs', 
    programs: ['MBA', 'MCA', 'M.Com', 'MA', 'M.Sc'],
    duration: '2 Years',
    icon: GraduationCap
  },
  { 
    type: 'Diploma', 
    programs: ['PGDM', 'PG Diploma in IT', 'Diploma in Management'],
    duration: '1 Year',
    icon: Award
  },
  { 
    type: 'Certificate', 
    programs: ['Digital Marketing', 'Data Analytics', 'Cyber Security'],
    duration: '6 Months',
    icon: Star
  }
];

const whyChoose = [
  'UGC-DEB approved distance education programs',
  'NAAC accredited partner universities',
  'Equivalent to regular degrees for all purposes',
  'Flexible exam schedules and online learning',
  'EMI options available for fee payment',
  'Dedicated support from admission to completion',
  'Career counselling and placement assistance',
  'Industry-recognized certifications included'
];

export default function EduConnectPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Form */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-primary py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Building2 className="w-4 h-4" />
                <span className="text-sm font-medium">Distance Learning Partner</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                ETI EduConnect
                <span className="block text-yellow-400">Your Gateway to Top Universities</span>
              </h1>
              
              <p className="text-lg text-blue-100 mb-8 max-w-lg">
                Get UGC-approved degrees from India&apos;s top universities through distance 
                learning. Study while you work, upgrade your qualifications.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{benefit.title}</h3>
                        <p className="text-xs text-blue-200">{benefit.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right - Form */}
            <div>
              <EduConnectClient />
            </div>
          </div>
        </div>
      </section>

      {/* Program Types Section */}
      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Programs We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of undergraduate, postgraduate, and professional courses
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programTypes.map((category, index) => {
              const Icon = category.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.type}</h3>
                  <p className="text-sm text-primary font-medium mb-3">{category.duration}</p>
                  <ul className="space-y-2">
                    {category.programs.map((program, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {program}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose ETI EduConnect?
              </h2>
              <p className="text-gray-600 mb-8">
                We partner with India&apos;s leading universities to bring quality distance education 
                to your doorstep. Our dedicated team supports you from admission to graduation.
              </p>
              
              <div className="grid gap-3">
                {whyChoose.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">UG Programs (BBA, BCA, B.Com etc.)</h4>
                  <p className="text-sm text-gray-600">
                    10+2 or equivalent from any recognized board. 
                    No minimum percentage required for most programs.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">PG Programs (MBA, MCA, M.Com etc.)</h4>
                  <p className="text-sm text-gray-600">
                    Graduate in any discipline from a recognized university. 
                    Some programs may require relevant work experience.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Diploma & Certificate</h4>
                  <p className="text-sm text-gray-600">
                    Varies by program. Generally 10+2 for diploma and 
                    graduation for PG diploma programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="container-main text-center">
          <GraduationCap className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Start Your Higher Education Journey Today
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Get expert guidance on choosing the right university and program for your career goals. 
            Our counsellors are here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#top" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Enquire Now
              <ChevronRight className="w-5 h-5" />
            </a>
            <a href="tel:+919646727676" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors">
              <Phone className="w-5 h-5" />
              Call: +91 9646727676
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
