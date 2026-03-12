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
  HelpCircle,
  Shield,
  TrendingUp,
  Globe,
  Cpu,
  PenTool,
  BarChart3,
  Bot,
  Calculator,
  MessageCircle,
  Sparkles,
  Star
} from "lucide-react";
import { useAnnouncement } from "../context/AnnouncementContext";

const LOGO_BLUE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/zm56gptp_eti%20.png";

// Programs categorized - Career Tracks first, then individual programs
const programCategories = [
  {
    id: "career_tracks",
    title: "Career Tracks",
    highlight: true,
    programs: [
      { id: "it-foundation", title: "IT Foundation", icon: <Monitor className="w-5 h-5" />, duration: "6 Months" },
      { id: "digital-design", title: "Digital Design & Marketing", icon: <Palette className="w-5 h-5" />, duration: "9-12 Months" },
      { id: "it-networking", title: "IT Support & Cybersecurity", icon: <Shield className="w-5 h-5" />, duration: "9-12 Months" },
      { id: "software-development", title: "Software Development", icon: <Code className="w-5 h-5" />, duration: "9-12 Months" }
    ]
  },
  {
    id: "tech_programs",
    title: "Tech Programs",
    programs: [
      { id: "python", title: "Python Programming", icon: <Code className="w-5 h-5" />, duration: "3 Months" },
      { id: "web-designing", title: "Web Designing", icon: <Globe className="w-5 h-5" />, duration: "3 Months" },
      { id: "web-development", title: "Web Development", icon: <Code className="w-5 h-5" />, duration: "6 Months" },
      { id: "data-analytics", title: "Data Analytics", icon: <BarChart3 className="w-5 h-5" />, duration: "4 Months" },
      { id: "ai-beginners", title: "AI For Beginners", icon: <Bot className="w-5 h-5" />, duration: "2 Months" },
      { id: "ai-engineering", title: "AI Engineering", icon: <Cpu className="w-5 h-5" />, duration: "6 Months" }
    ]
  },
  {
    id: "design_marketing",
    title: "Design & Marketing",
    programs: [
      { id: "digital-marketing", title: "Digital Marketing", icon: <TrendingUp className="w-5 h-5" />, duration: "4 Months" },
      { id: "graphic-designing", title: "Graphic Designing", icon: <Palette className="w-5 h-5" />, duration: "3 Months" },
      { id: "ui-ux-designing", title: "UI & UX Designing", icon: <PenTool className="w-5 h-5" />, duration: "4 Months" }
    ]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    programs: [
      { id: "soc-analyst", title: "SOC Analyst", icon: <Shield className="w-5 h-5" />, duration: "6 Months" },
      { id: "ethical-hacking", title: "Ethical Hacking", icon: <Network className="w-5 h-5" />, duration: "6 Months" }
    ]
  },
  {
    id: "office_accounting",
    title: "Office & Accounting",
    programs: [
      { id: "ms-office-ai", title: "MS-Office with AI", icon: <Award className="w-5 h-5" />, duration: "2 Months" },
      { id: "e-accounting", title: "E-Accounting", icon: <Calculator className="w-5 h-5" />, duration: "3 Months" }
    ]
  },
  {
    id: "soft_skills",
    title: "Soft Skills",
    programs: [
      { id: "spoken-english", title: "Spoken English", icon: <MessageCircle className="w-5 h-5" />, duration: "3 Months" },
      { id: "personality-development", title: "Personality Development", icon: <Star className="w-5 h-5" />, duration: "2 Months" },
      { id: "interview-preparation", title: "Interview Preparation", icon: <Briefcase className="w-5 h-5" />, duration: "1 Month" }
    ]
  }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const location = useLocation();
  const { isAnnouncementVisible } = useAnnouncement();

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
        className={`header-main ${scrolled ? "scrolled" : ""} ${isAnnouncementVisible ? "with-announcement" : ""}`}
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
                  <Link to="/team" className="dropdown-item flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Our Team
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
                <div className={`mega-menu mega-menu-wide ${activeDropdown === 'programs' ? 'opacity-100 visible' : ''}`}>
                  {/* Career Tracks Section - Full Width Top */}
                  <div className="mb-6 pb-6 border-b border-[#ebebeb]">
                    <h4 className="mega-menu-category-title flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-[#1545ea]" />
                      Career Tracks
                      <span className="text-xs bg-[#1545ea] text-white px-2 py-0.5 rounded-full">Featured</span>
                    </h4>
                    <div className="grid grid-cols-4 gap-4 mt-3">
                      {programCategories[0].programs.map((program) => (
                        <Link 
                          key={program.id}
                          to={`/programs/${program.id}`}
                          className="mega-menu-item bg-[#f8f9fa] hover:bg-[#1545ea] hover:text-white group rounded-xl p-3"
                          data-testid={`mega-menu-${program.id}`}
                        >
                          <div className="w-10 h-10 bg-[#1545ea]/10 group-hover:bg-white/20 rounded-lg flex items-center justify-center text-[#1545ea] group-hover:text-white mb-2">
                            {program.icon}
                          </div>
                          <p className="font-semibold text-[#1a1a1a] group-hover:text-white text-sm">{program.title}</p>
                          <p className="text-xs text-[#717171] group-hover:text-white/80 flex items-center gap-1 mt-1">
                            <Clock className="w-3 h-3" />
                            {program.duration}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Individual Programs - 3 Column Grid */}
                  <div className="grid grid-cols-3 gap-6">
                    {programCategories.slice(1).map((category) => (
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
                    <Briefcase className="w-4 h-4" />
                    Hire From Us
                  </Link>
                  <Link to="/join-team" className="dropdown-item flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Join Our Team
                  </Link>
                </div>
              </div>

              <Link to="/franchise" className="nav-link">Franchise</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              <Link
                to="/free-counselling"
                className="hidden md:inline-flex btn-primary text-sm"
                data-testid="counselling-cta"
              >
                Free Counselling
              </Link>
              
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-[#f5f5f5] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                data-testid="mobile-menu-toggle"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#1a1a1a]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#1a1a1a]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        data-testid="mobile-menu"
      >
        <div className="p-4">
          <nav className="space-y-2">
            <Link to="/" className="mobile-nav-link block">Home</Link>
            
            {/* About */}
            <div className="mobile-nav-item">
              <button
                className="mobile-nav-link w-full flex items-center justify-between"
                onClick={() => setExpandedCategory(expandedCategory === 'about' ? null : 'about')}
              >
                About
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === 'about' ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === 'about' && (
                <div className="mobile-submenu">
                  <Link to="/about" className="mobile-submenu-item">About Us</Link>
                  <Link to="/founder" className="mobile-submenu-item">Founder's Desk</Link>
                  <Link to="/team" className="mobile-submenu-item">Our Team</Link>
                </div>
              )}
            </div>

            {/* Programs */}
            <div className="mobile-nav-item">
              <button
                className="mobile-nav-link w-full flex items-center justify-between"
                onClick={() => setExpandedCategory(expandedCategory === 'programs' ? null : 'programs')}
              >
                Programs
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === 'programs' ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === 'programs' && (
                <div className="mobile-submenu">
                  {programCategories.map((category) => (
                    <div key={category.id} className="mb-4">
                      <p className="text-xs font-semibold text-[#717171] mb-2 px-4">{category.title}</p>
                      {category.programs.map((program) => (
                        <Link
                          key={program.id}
                          to={`/programs/${program.id}`}
                          className="mobile-submenu-item flex items-center gap-2"
                        >
                          {program.icon}
                          {program.title}
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link to="/programs" className="mobile-submenu-item text-[#1545ea] font-semibold">
                    View All Programs
                  </Link>
                </div>
              )}
            </div>

            {/* Resources */}
            <div className="mobile-nav-item">
              <button
                className="mobile-nav-link w-full flex items-center justify-between"
                onClick={() => setExpandedCategory(expandedCategory === 'resources' ? null : 'resources')}
              >
                Resources
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === 'resources' && (
                <div className="mobile-submenu">
                  <Link to="/events" className="mobile-submenu-item">Events</Link>
                  <Link to="/blogs" className="mobile-submenu-item">Blogs</Link>
                  <Link to="/faq" className="mobile-submenu-item">FAQ</Link>
                </div>
              )}
            </div>

            {/* Careers */}
            <div className="mobile-nav-item">
              <button
                className="mobile-nav-link w-full flex items-center justify-between"
                onClick={() => setExpandedCategory(expandedCategory === 'careers' ? null : 'careers')}
              >
                Careers
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === 'careers' ? 'rotate-180' : ''}`} />
              </button>
              {expandedCategory === 'careers' && (
                <div className="mobile-submenu">
                  <Link to="/hire-from-us" className="mobile-submenu-item">Hire From Us</Link>
                  <Link to="/join-team" className="mobile-submenu-item">Join Our Team</Link>
                </div>
              )}
            </div>

            <Link to="/franchise" className="mobile-nav-link block">Franchise</Link>
            <Link to="/contact" className="mobile-nav-link block">Contact</Link>
          </nav>
          
          <div className="mt-6 pt-6 border-t border-[#ebebeb]">
            <Link
              to="/free-counselling"
              className="btn-primary w-full justify-center"
            >
              Free Counselling
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
