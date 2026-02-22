import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Monitor, 
  Palette, 
  Network, 
  Code,
  Calendar,
  Users,
  Briefcase,
  ChevronRight
} from "lucide-react";

const LOGO_WHITE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/guxbyjtl_etilogo%20white.png";
const LOGO_BLUE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/zm56gptp_eti%20.png";

const careerTracks = [
  {
    id: "computer-foundation",
    title: "Computer Career Foundation",
    description: "Digital literacy & essential computer skills",
    icon: <Monitor className="w-6 h-6" />
  },
  {
    id: "digital-design",
    title: "Digital Design & Marketing",
    description: "Creative design & digital marketing expertise",
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: "it-networking",
    title: "IT Support, Networking & Cybersecurity",
    description: "IT infrastructure & security solutions",
    icon: <Network className="w-6 h-6" />
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Programming & application development",
    icon: <Code className="w-6 h-6" />
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      <header 
        className={`header-main ${scrolled ? "scrolled" : ""}`}
        data-testid="main-header"
      >
        <div className="container-main">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0" data-testid="logo-link">
              <img 
                src={LOGO_BLUE} 
                alt="ETI Educom" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/founder" className="nav-link">Founder's Desk</Link>
              
              {/* Career Tracks Mega Menu */}
              <div 
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown('tracks')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1" data-testid="career-tracks-menu">
                  Career Tracks
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`mega-menu ${activeDropdown === 'tracks' ? 'opacity-100 visible translate-y-0' : ''}`}>
                  <div className="grid grid-cols-2 gap-2">
                    {careerTracks.map((track) => (
                      <Link 
                        key={track.id}
                        to={`/career-tracks/${track.id}`}
                        className="mega-menu-item"
                        data-testid={`mega-menu-${track.id}`}
                      >
                        <div className="w-10 h-10 bg-[#f1eded] rounded-lg flex items-center justify-center text-[#1545ea]">
                          {track.icon}
                        </div>
                        <div>
                          <p className="font-semibold text-[#1a1a1a] text-sm">{track.title}</p>
                          <p className="text-xs text-[#717171]">{track.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#f1eded]">
                    <Link 
                      to="/career-tracks" 
                      className="flex items-center gap-2 text-[#1545ea] font-semibold text-sm hover:underline"
                    >
                      View All Career Tracks
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div 
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1">
                  Resources
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'resources' ? 'opacity-100 visible translate-y-0' : ''}`}>
                  <Link to="/events" className="dropdown-item flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Events
                  </Link>
                </div>
              </div>

              {/* Careers Dropdown */}
              <div 
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown('careers')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1">
                  Careers
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'careers' ? 'opacity-100 visible translate-y-0' : ''}`}>
                  <Link to="/hire-from-us" className="dropdown-item flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Hire From Us
                  </Link>
                  <Link to="/join-team" className="dropdown-item flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Join ETI Team
                  </Link>
                </div>
              </div>

              <Link to="/franchise" className="nav-link">Franchise</Link>
              <Link to="/verify-certificate" className="nav-link">Verify Certificate</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/contact">
                <button className="btn-primary text-sm" data-testid="header-cta">
                  Enquire Now
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#1a1a1a]"
              onClick={() => setMobileMenuOpen(true)}
              data-testid="mobile-menu-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="mobile-menu-overlay"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="mobile-menu-panel" data-testid="mobile-menu">
            <div className="flex justify-between items-center mb-6">
              <img src={LOGO_BLUE} alt="ETI Educom" className="h-10" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-1">
              <Link to="/" className="block py-3 font-medium border-b border-[#f1eded]">Home</Link>
              <Link to="/about" className="block py-3 font-medium border-b border-[#f1eded]">About</Link>
              <Link to="/founder" className="block py-3 font-medium border-b border-[#f1eded]">Founder's Desk</Link>
              
              <div className="py-3 border-b border-[#f1eded]">
                <p className="font-semibold text-[#1545ea] mb-2">Career Tracks</p>
                <div className="space-y-2 pl-4">
                  {careerTracks.map((track) => (
                    <Link 
                      key={track.id}
                      to={`/career-tracks/${track.id}`}
                      className="block text-sm text-[#4a4a4a] py-1"
                    >
                      {track.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link to="/events" className="block py-3 font-medium border-b border-[#f1eded]">Events</Link>
              <Link to="/hire-from-us" className="block py-3 font-medium border-b border-[#f1eded]">Hire From Us</Link>
              <Link to="/join-team" className="block py-3 font-medium border-b border-[#f1eded]">Join ETI Team</Link>
              <Link to="/franchise" className="block py-3 font-medium border-b border-[#f1eded]">Franchise</Link>
              <Link to="/verify-certificate" className="block py-3 font-medium border-b border-[#f1eded]">Verify Certificate</Link>
              <Link to="/contact" className="block py-3 font-medium border-b border-[#f1eded]">Contact</Link>
            </nav>

            <div className="mt-6">
              <Link to="/contact">
                <button className="btn-primary w-full justify-center">
                  Enquire Now
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
