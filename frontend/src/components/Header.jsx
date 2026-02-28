import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
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
  Home,
  BookOpen,
  Phone,
  Store
} from "lucide-react";
import { useAnnouncement } from "../context/AnnouncementContext";

const LOGO_BLUE = "https://customer-assets.emergentagent.com/job_career-tracks-hub/artifacts/zm56gptp_eti%20.png";
const API = process.env.REACT_APP_BACKEND_URL;

// Icon mapping for dynamic nav items
const iconMap = {
  Home: <Home className="w-4 h-4" />,
  Building2: <Building2 className="w-4 h-4" />,
  Users: <Users className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Shield: <Shield className="w-4 h-4" />,
  Calendar: <Calendar className="w-4 h-4" />,
  FileText: <FileText className="w-4 h-4" />,
  HelpCircle: <HelpCircle className="w-4 h-4" />,
  Briefcase: <Briefcase className="w-4 h-4" />,
  Phone: <Phone className="w-4 h-4" />,
  Store: <Store className="w-4 h-4" />,
  GraduationCap: <GraduationCap className="w-4 h-4" />,
  Code: <Code className="w-4 h-4" />,
  Monitor: <Monitor className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Network: <Network className="w-4 h-4" />,
  Award: <Award className="w-4 h-4" />
};

// Programs categorized (keeping for mega menu)
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

// Default navigation (fallback if API fails)
const defaultNavigation = [
  { id: "home", label: "Home", url: "/", is_dropdown: false, children: [] },
  { id: "about", label: "About", url: "/about", is_dropdown: true, children: [
    { id: "about-us", label: "About Us", url: "/about", icon: "Building2" },
    { id: "founder", label: "Our Founder", url: "/founder", icon: "Users" },
    { id: "team", label: "Our Team", url: "/team", icon: "Users" }
  ]},
  { id: "programs", label: "Programs", url: "/programs", is_dropdown: true, children: [] },
  { id: "resources", label: "Resources", url: "#", is_dropdown: true, children: [
    { id: "blogs", label: "Blogs", url: "/blogs", icon: "FileText" },
    { id: "events", label: "Events", url: "/events", icon: "Calendar" },
    { id: "faq", label: "FAQ", url: "/faq", icon: "HelpCircle" }
  ]},
  { id: "careers", label: "Careers", url: "#", is_dropdown: true, children: [
    { id: "hire", label: "Hire From Us", url: "/hire-from-us", icon: "Briefcase" },
    { id: "join", label: "Join Our Team", url: "/join-team", icon: "Users" }
  ]},
  { id: "franchise", label: "Franchise", url: "/franchise", is_dropdown: false, children: [] },
  { id: "contact", label: "Contact", url: "/contact", is_dropdown: false, children: [] }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [navigation, setNavigation] = useState(defaultNavigation);
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

  // Fetch navigation from API
  useEffect(() => {
    const fetchNavigation = async () => {
      try {
        const response = await axios.get(`${API}/api/navigation`);
        if (response.data && response.data.length > 0) {
          // Filter only visible items
          const visibleNav = response.data
            .filter(item => item.is_visible !== false)
            .map(item => ({
              ...item,
              children: item.children?.filter(child => child.is_visible !== false) || []
            }));
          setNavigation(visibleNav);
        }
      } catch (error) {
        console.error("Error fetching navigation:", error);
        // Keep default navigation on error
      }
    };
    fetchNavigation();
  }, []);

  const getIcon = (iconName) => {
    return iconMap[iconName] || null;
  };

  // Check if item is Programs (special mega menu handling)
  const isProgramsMenu = (item) => {
    return item.label.toLowerCase() === 'programs';
  };

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
              {navigation.map((item) => (
                item.is_dropdown ? (
                  isProgramsMenu(item) ? (
                    // Programs Mega Menu (special case)
                    <div 
                      key={item.id}
                      className="nav-item relative"
                      onMouseEnter={() => setActiveDropdown('programs')}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="nav-link flex items-center gap-1" data-testid="programs-menu">
                        {item.label}
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
                  ) : (
                    // Regular Dropdown
                    <div 
                      key={item.id}
                      className="nav-item relative"
                      onMouseEnter={() => setActiveDropdown(item.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <button className="nav-link flex items-center gap-1">
                        {item.label}
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className={`dropdown-menu ${activeDropdown === item.id ? 'opacity-100 visible translate-y-0' : ''}`}>
                        {item.children?.map((child) => (
                          <Link 
                            key={child.id} 
                            to={child.url} 
                            className="dropdown-item flex items-center gap-2"
                          >
                            {getIcon(child.icon)}
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                ) : (
                  // Regular Link
                  <Link key={item.id} to={item.url} className="nav-link">
                    {item.label}
                  </Link>
                )
              ))}
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
            {navigation.map((item) => (
              item.is_dropdown ? (
                <div key={item.id} className="mobile-nav-item">
                  <button
                    className="mobile-nav-link w-full flex items-center justify-between"
                    onClick={() => setExpandedCategory(expandedCategory === item.id ? null : item.id)}
                  >
                    {item.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategory === item.id ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {expandedCategory === item.id && (
                    <div className="mobile-submenu">
                      {isProgramsMenu(item) ? (
                        // Programs mega menu for mobile
                        <>
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
                        </>
                      ) : (
                        // Regular dropdown items for mobile
                        item.children?.map((child) => (
                          <Link 
                            key={child.id} 
                            to={child.url} 
                            className="mobile-submenu-item flex items-center gap-2"
                          >
                            {getIcon(child.icon)}
                            {child.label}
                          </Link>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  key={item.id} 
                  to={item.url} 
                  className="mobile-nav-link block"
                >
                  {item.label}
                </Link>
              )
            ))}
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
