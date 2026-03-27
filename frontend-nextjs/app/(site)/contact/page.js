import Link from 'next/link';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Computer Career School',
  description: 'Get in touch with ETI Educom® for admissions, career tracks, certifications and institutional programs.',
  keywords: 'ETI Educom contact, computer institute contact, IT training institute',
  openGraph: {
    title: 'Contact ETI Educom®',
    description: 'Reach out to ETI Educom® for admissions and enquiries.',
    url: 'https://etieducom.com/contact',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  },
  alternates: {
    canonical: 'https://etieducom.com/contact',
  },
};

const contactInfo = [
  {
    icon: Phone,
    title: 'Phone',
    details: ['+91 9646727676', '+91 9876543210'],
    link: 'tel:+919646727676'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['helpdesk@etieducom.com', 'admissions@etieducom.com'],
    link: 'mailto:helpdesk@etieducom.com'
  },
  {
    icon: MapPin,
    title: 'Address',
    details: ['ETI Educom, Jodhamal Colony', 'Dhangu Road, Pathankot - 145001'],
    link: 'https://maps.google.com/?q=ETI+Educom+Pathankot'
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    link: null
  }
];

const socialLinks = [
  { icon: Facebook, href: 'https://www.facebook.com/etieducom', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/etieducom/', label: 'Instagram' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/etieducom', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@ETIEducomofficial', label: 'YouTube' }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-20">
        <div className="container-main">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-gray-600">
              Have questions about our programs? Want to visit our campus? 
              We&apos;re here to help you start your IT career journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 flex-shrink-0 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          item.link ? (
                            <a 
                              key={i} 
                              href={item.link} 
                              className="block text-gray-600 hover:text-primary transition-colors"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={i} className="text-gray-600">{detail}</p>
                          )
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Map */}
              <div className="mt-8">
                <h3 className="font-bold text-gray-900 mb-4">Find Us</h3>
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.5!2d75.6421!3d32.2643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDE1JzUxLjUiTiA3NcKwMzgnMzEuNiJF!5e0!3m2!1sen!2sin!4v1234567890"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="ETI Educom Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-600 mb-6">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
