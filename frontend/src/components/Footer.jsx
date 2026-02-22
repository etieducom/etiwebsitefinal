import React from "react";
import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  ChevronRight
} from "lucide-react";

const LOGO_WHITE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/guxbyjtl_etilogo%20white.png";

// Text logo fallback
const TextLogoWhite = () => (
  <div className="flex items-center">
    <span className="text-2xl font-bold text-white font-['Manrope']">ETI</span>
    <span className="text-2xl font-bold text-white/80 font-['Manrope'] ml-1">EDUCOM</span>
    <span className="text-white text-sm ml-0.5">®</span>
  </div>
);

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Career Tracks", href: "/career-tracks" },
    { label: "Events", href: "/events" },
    { label: "Contact Us", href: "/contact" }
  ];

  const careerTracks = [
    { label: "Computer Career Foundation", href: "/career-tracks/computer-foundation" },
    { label: "Digital Design & Marketing", href: "/career-tracks/digital-design" },
    { label: "IT Support & Networking", href: "/career-tracks/it-networking" },
    { label: "Software Development", href: "/career-tracks/software-development" }
  ];

  const resources = [
    { label: "Hire From Us", href: "/hire-from-us" },
    { label: "Join ETI Team", href: "/join-team" },
    { label: "Franchise", href: "/franchise" },
    { label: "Verify Certificate", href: "/verify-certificate" }
  ];

  return (
    <footer className="footer-main" data-testid="footer">
      <div className="container-main">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-[#333]">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img 
              src={LOGO_WHITE} 
              alt="ETI Educom" 
              className="h-16 mb-6 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <TextLogoWhite />
            <p className="text-[#b0b0b0] text-sm leading-relaxed mb-6 max-w-sm">
              ETI Educom® is India's leading Computer Career School, offering structured 
              career pathways through certified training programs since 2017.
            </p>
            <p className="text-[#b0b0b0] text-xs">
              <strong className="text-white">Training | Certification | Placement</strong>
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#b0b0b0] hover:bg-[#1545ea] hover:text-white transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#b0b0b0] hover:bg-[#1545ea] hover:text-white transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#b0b0b0] hover:bg-[#1545ea] hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center text-[#b0b0b0] hover:bg-[#1545ea] hover:text-white transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-link flex items-center gap-1 hover:text-white">
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Tracks */}
          <div>
            <h4 className="footer-heading">Career Tracks</h4>
            <ul className="space-y-3">
              {careerTracks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-link flex items-center gap-1 hover:text-white">
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="footer-heading">Resources</h4>
            <ul className="space-y-3">
              {resources.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="footer-link flex items-center gap-1 hover:text-white">
                    <ChevronRight className="w-3 h-3" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-b border-[#333]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1545ea] flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-[#717171] mb-1">Call Us</p>
              <p className="text-white font-medium">+91 XXXXX XXXXX</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1545ea] flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-[#717171] mb-1">Email Us</p>
              <p className="text-white font-medium">info@etieducom.com</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1545ea] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-[#717171] mb-1">Visit Us</p>
              <p className="text-white font-medium">Head Office, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#717171] text-sm">
            © {new Date().getFullYear()} ETI Educom®. All rights reserved.
          </p>
          <p className="text-[#717171] text-sm">
            A unit of <strong className="text-[#b0b0b0]">ETI Learning Systems Private Limited</strong>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
