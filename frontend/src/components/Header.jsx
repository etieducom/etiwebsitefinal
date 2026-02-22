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
  ChevronRight,
  Award,
  Clock,
  Building2,
  GraduationCap,
  FileText,
  HelpCircle
} from "lucide-react";

const LOGO_BLUE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/zm56gptp_eti%20.png";

// Programs categorized
const programCategories = [
  {
    id: "career_tracks",
    title: "Career Tracks",
    programs: [
      { id: "computer-foundation", title: "Computer Career Foundation", icon: <Monitor className="w-5 h-5" />, duration: "3-6 months" },
      { id: "digital-design", title: "Digital Design & Marketing", icon: <Palette className="w-5 h-5" />, duration: "6-12 months" },
      { id: "it-networking", title: "IT Support & Cybersecurity", icon: <Network className="w-5 h-5" />, duration: "6-12 months" },
      { id: "software-development", title: "Software Development", icon: <Code className="w-5 h-5" />, duration: "9-18 months" }
    ]
  },
  {
    id: "short_term",
    title: "Short Term Programs",
    programs: [
      { id: "ms-office", title: "MS Office Certification", icon: <Award className="w-5 h-5" />, duration: "1-2 months" },
      { id: "graphic-design", title: "Graphic Design Basics", icon: <Palette className="w-5 h-5" />, duration: "2-3 months" },
      { id: "web-basics", title: "Web Development Basics", icon: <Code className="w-5 h-5" />, duration: "2-3 months" }
    ]
  },
  {
    id: "skill_development",
    title: "Skill Development",
    programs: [
      { id: "python-programming", title: "Python Programming", icon: <Code className="w-5 h-5" />, duration: "2-3 months" },
      { id: "data-entry", title: "Data Entry & Management", icon: <Monitor className="w-5 h-5" />, duration: "1-2 months" },
      { id: "social-media", title: "Social Media Marketing", icon: <Palette className="w-5 h-5" />, duration: "1-2 months" }
    ]
  },
  {
    id: "corporate_training",
    title: "Corporate Training",
    programs: [
      { id: "corporate-it", title: "Corporate IT Training", icon: <Building2 className="w-5 h-5" />, duration: "Custom" },
      { id: "team-productivity", title: "Team Productivity Tools", icon: <Users className="w-5 h-5" />, duration: "Custom" }
    ]
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
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
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" data-testid="desktop-nav">
              <Link to="/" className="nav-link">Home</Link>
              
              {/* About Dropdown */}
              <div 
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown('about')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1">
                  About
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`dropdown-menu ${activeDropdown === 'about' ? 'opacity-100 visible translate-y-0' : ''}`}>
                  <Link to="/about" className="dropdown-item flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    About Us
                  </Link>
                  <Link to="/founder" className="dropdown-item flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Founder's Desk
                  </Link>
                </div>
              </div>
              
              {/* Programs Mega Menu */}
              <div 
                className="nav-item relative"
                onMouseEnter={() => setActiveDropdown('programs')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link flex items-center gap-1" data-testid="programs-menu">
                  Programs
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className={`mega-menu ${activeDropdown === 'programs' ? 'opacity-100 visible' : ''}`}>
                  <div className="grid grid-cols-2 gap-6">
                    {programCategories.map((category) => (
                      <div key={category.id} className="mega-menu-category">
                        <h4 className="mega-menu-category-title">{category.title}</h4>
                        <div className="space-y-1">
                          {category.programs.map((program) => (
                            <Link 
                              key={program.id}
                              to={`/programs/${program.id}`}
                              className="mega-menu-item"
                              data-testid={`mega-menu-${program.id}`}
                            >
                              <div className="w-8 h-8 bg-[#ebebeb] rounded-lg flex items-center justify-center text-[#1545ea]">
                                {program.icon}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[#1a1a1a] text-sm">{program.title}</p>
                                <p className="text-xs text-[#717171] flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {program.duration}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-[#ebebeb]">
                    <Link 
                      to="/programs" 
                      className="flex items-center gap-2 text-[#1545ea] font-semibold text-sm hover:underline"
                    >
                      View All Programs
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
                  <Link to="/blogs" className="dropdown-item flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Blogs
                  </Link>
                  <Link to="/faq" className="dropdown-item flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    FAQ
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
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link to="/free-counselling">
                <button className="btn-primary text-sm" data-testid="header-cta">
                  Free Counselling
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
              <img src={LOGO_BLUE} alt="ETI Educom" className="h-10 w-auto object-contain" />
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="space-y-1">
              <Link to="/" className="block py-3 font-medium border-b border-[#ebebeb]">Home</Link>
              
              {/* About in Mobile */}
              <div className="py-3 border-b border-[#ebebeb]">
                <p className="font-semibold text-[#1545ea] mb-3">About</p>
                <div className="pl-4 space-y-2">
                  <Link to="/about" className="block text-sm text-[#717171] py-1" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                  <Link to="/founder" className="block text-sm text-[#717171] py-1" onClick={() => setMobileMenuOpen(false)}>Founder's Desk</Link>
                </div>
              </div>
              
              {/* Programs in Mobile */}
              <div className="py-3 border-b border-[#ebebeb]">
                <p className="font-semibold text-[#1545ea] mb-3">Programs</p>
                {programCategories.map((category) => (
                  <div key={category.id} className="mb-3">
                    <button 
                      className="flex items-center justify-between w-full text-sm font-medium text-[#4a4a4a] py-1"
                      onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                    >
                      {category.title}
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === category.id ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedCategory === category.id && (
                      <div className="pl-4 mt-2 space-y-2">
                        {category.programs.map((program) => (
                          <Link 
                            key={program.id}
                            to={`/programs/${program.id}`}
                            className="block text-sm text-[#717171] py-1"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {program.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <Link to="/events" className="block py-3 font-medium border-b border-[#ebebeb]">Events</Link>
              <Link to="/blogs" className="block py-3 font-medium border-b border-[#ebebeb]">Blogs</Link>
              <Link to="/faq" className="block py-3 font-medium border-b border-[#ebebeb]">FAQ</Link>
              <Link to="/hire-from-us" className="block py-3 font-medium border-b border-[#ebebeb]">Hire From Us</Link>
              <Link to="/join-team" className="block py-3 font-medium border-b border-[#ebebeb]">Join ETI Team</Link>
              <Link to="/franchise" className="block py-3 font-medium border-b border-[#ebebeb]">Franchise</Link>
              <Link to="/contact" className="block py-3 font-medium border-b border-[#ebebeb]">Contact</Link>
            </nav>

            <div className="mt-6">
              <Link to="/free-counselling" onClick={() => setMobileMenuOpen(false)}>
                <button className="btn-primary w-full justify-center">
                  Free Counselling
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
