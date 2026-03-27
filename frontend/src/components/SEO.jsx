import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;
const SITE_URL = 'https://etieducom.com';

const SEO = ({ pageSlug = 'home' }) => {
  const [seoData, setSeoData] = useState(null);
  const location = useLocation();

  // Default SEO values as fallback
  const defaults = {
    home: {
      title: 'ETI Educom® | The Computer Career School',
      description: 'ETI Educom® is a structured computer career school offering training in software development, cybersecurity, digital marketing and IT support since 2017.',
      keywords: 'computer career school, computer institute, IT training institute, cybersecurity training, software development training',
      ogTitle: 'ETI Educom® | The Computer Career School',
      ogDescription: 'Structured computer career tracks in software development, cybersecurity, digital marketing and IT support.'
    },
    about: {
      title: 'About ETI Educom® | Computer Career School Since 2017',
      description: 'Learn about ETI Educom®, a computer career school focused on structured IT career education through software, cybersecurity, digital and networking tracks.',
      keywords: 'about ETI Educom, computer institute about, IT training institute India',
      ogTitle: 'About ETI Educom®',
      ogDescription: 'Discover the vision, mission and philosophy behind ETI Educom®.'
    },
    contact: {
      title: 'Contact ETI Educom® | Computer Career School',
      description: 'Get in touch with ETI Educom® for admissions, career tracks, certifications and institutional programs.',
      keywords: 'ETI Educom contact, computer institute contact, IT training institute',
      ogTitle: 'Contact ETI Educom®',
      ogDescription: 'Reach out to ETI Educom® for admissions and enquiries.'
    },
    founder: {
      title: "Founder's Desk | ETI Educom®",
      description: 'A message from the founder of ETI Educom® on building structured computer career education.',
      keywords: 'ETI Educom founder, founder message, computer career school vision',
      ogTitle: "Founder's Desk | ETI Educom®",
      ogDescription: "Read the founder's perspective on computer career education."
    },
    franchise: {
      title: 'ETI Educom® Franchise | Computer Career School Network',
      description: 'Partner with ETI Educom® to establish a computer career school in your city.',
      keywords: 'ETI Educom franchise, computer institute franchise, education franchise',
      ogTitle: 'ETI Educom® Franchise Opportunity',
      ogDescription: 'Build a structured computer education center with ETI Educom®.'
    },
    team: {
      title: 'Our Team | ETI Educom®',
      description: 'Meet the team behind ETI Educom® dedicated to structured computer career education.',
      keywords: 'ETI Educom team, IT training faculty, computer institute faculty',
      ogTitle: 'Our Team | ETI Educom®',
      ogDescription: 'The educators and professionals at ETI Educom®.'
    },
    events: {
      title: 'Events & Activities | ETI Educom®',
      description: 'Explore workshops, seminars and learning events organized by ETI Educom®.',
      keywords: 'ETI Educom events, IT workshops, computer institute seminars',
      ogTitle: 'Events at ETI Educom®',
      ogDescription: 'Academic events, workshops and activities at ETI Educom®.'
    },
    blogs: {
      title: 'Blog | ETI Educom®',
      description: 'Read insights on technology, career guidance, and digital skills from ETI Educom®.',
      keywords: 'ETI Educom blog, IT career tips, technology blog, career guidance',
      ogTitle: 'ETI Educom® Blog',
      ogDescription: 'Technology insights and career guidance from ETI Educom®.'
    },
    faq: {
      title: 'FAQ | ETI Educom®',
      description: 'Find answers to frequently asked questions about ETI Educom® programs, admissions and certifications.',
      keywords: 'ETI Educom FAQ, computer institute questions, IT training FAQ',
      ogTitle: 'FAQ | ETI Educom®',
      ogDescription: 'Common questions about programs and admissions at ETI Educom®.'
    },
    'hire-from-us': {
      title: 'Hire From Us | ETI Educom®',
      description: 'Recruit trained IT professionals from ETI Educom® for your organization.',
      keywords: 'hire IT professionals, ETI Educom placement, trained candidates',
      ogTitle: 'Hire From ETI Educom®',
      ogDescription: 'Recruit skilled professionals trained at ETI Educom®.'
    },
    'join-team': {
      title: 'Careers | Join ETI Educom®',
      description: 'Explore career opportunities at ETI Educom®. Join our team of educators.',
      keywords: 'ETI Educom careers, teaching jobs, IT training jobs',
      ogTitle: 'Careers at ETI Educom®',
      ogDescription: 'Join our team and shape the future of IT education.'
    },
    programs: {
      title: 'Programs & Courses | ETI Educom®',
      description: 'Explore our comprehensive range of IT programs including career tracks and certifications.',
      keywords: 'IT programs, courses, certifications, career tracks',
      ogTitle: 'Programs at ETI Educom®',
      ogDescription: 'Industry-aligned IT training programs for your career.'
    },
    'free-counselling': {
      title: 'Free Career Counselling | ETI Educom®',
      description: 'Get free career counselling from ETI Educom® experts. Discover the right IT career path.',
      keywords: 'free counselling, career guidance, IT career, consultation',
      ogTitle: 'Free Career Counselling - ETI Educom®',
      ogDescription: 'Get expert guidance for your IT career journey.'
    },
    'cyber-warriors': {
      title: 'Cyber Warriors | Cybersecurity Training | ETI Educom®',
      description: 'Join the Cyber Warriors program for comprehensive cybersecurity training.',
      keywords: 'cybersecurity training, ethical hacking, cyber warriors, security',
      ogTitle: 'Cyber Warriors - ETI Educom®',
      ogDescription: 'Become a cybersecurity professional with expert training.'
    },
    'summer-training': {
      title: 'Summer Training Program | ETI Educom®',
      description: 'Join ETI Educom\'s summer training program with hands-on IT training and certifications.',
      keywords: 'summer training, vacation courses, IT internship, summer program',
      ogTitle: 'Summer Training - ETI Educom®',
      ogDescription: 'Make your summer productive with our training programs.'
    },
    'industrial-training': {
      title: '6 Weeks Industrial Training | ETI Educom® | Rs. 6,999',
      description: '45 Days Industrial Training for BCA, MCA, BTech, MTech students. International Certifications, Expert Trainers.',
      keywords: '6 weeks industrial training, industrial training for BCA, MCA training, BTech training',
      ogTitle: '6 Weeks Industrial Training | ETI Educom®',
      ogDescription: 'Get 45 days hands-on industrial training with International Certification at just Rs. 6,999.'
    },
    'privacy-policy': {
      title: 'Privacy Policy | ETI Educom®',
      description: 'Read ETI Educom\'s privacy policy. Learn how we protect your personal information.',
      keywords: 'privacy policy, data protection, terms',
      ogTitle: 'Privacy Policy - ETI Educom®',
      ogDescription: 'Our commitment to protecting your privacy.'
    }
  };

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await axios.get(`${API}/api/seo/${pageSlug}`);
        if (response.data) {
          setSeoData({
            title: response.data.meta_title,
            description: response.data.meta_description,
            keywords: response.data.meta_keywords || '',
            ogTitle: response.data.og_title || response.data.meta_title,
            ogDescription: response.data.og_description || response.data.meta_description,
            ogImage: response.data.og_image
          });
        }
      } catch (error) {
        // Use defaults if API fails
        console.log('Using default SEO for:', pageSlug);
      }
    };

    fetchSEO();
  }, [pageSlug]);

  // Get current SEO data - use API data if available, otherwise use defaults
  const currentSEO = seoData || defaults[pageSlug] || defaults['home'];

  useEffect(() => {
    // Update document title
    document.title = currentSEO.title;

    // Helper function to update or create meta tag
    const updateMetaTag = (name, content, isProperty = false) => {
      if (!content) return;
      
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (tag) {
        tag.setAttribute('content', content);
      } else {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        tag.setAttribute('content', content);
        document.head.appendChild(tag);
      }
    };

    // Helper function to update or create link tag
    const updateLinkTag = (rel, href) => {
      if (!href) return;
      
      let tag = document.querySelector(`link[rel="${rel}"]`);
      
      if (tag) {
        tag.setAttribute('href', href);
      } else {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        tag.setAttribute('href', href);
        document.head.appendChild(tag);
      }
    };

    // Update meta tags
    updateMetaTag('description', currentSEO.description);
    updateMetaTag('keywords', currentSEO.keywords);
    
    // Canonical URL
    const canonicalUrl = `${SITE_URL}${location.pathname}`;
    updateLinkTag('canonical', canonicalUrl);
    
    // Open Graph tags
    updateMetaTag('og:title', currentSEO.ogTitle, true);
    updateMetaTag('og:description', currentSEO.ogDescription, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'ETI Educom®', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:locale', 'en_IN', true);
    if (currentSEO.ogImage) {
      updateMetaTag('og:image', currentSEO.ogImage, true);
    } else {
      updateMetaTag('og:image', `${SITE_URL}/og-image.jpg`, true);
    }
    
    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', currentSEO.ogTitle);
    updateMetaTag('twitter:description', currentSEO.ogDescription);
    updateMetaTag('twitter:url', canonicalUrl);
    if (currentSEO.ogImage) {
      updateMetaTag('twitter:image', currentSEO.ogImage);
    } else {
      updateMetaTag('twitter:image', `${SITE_URL}/og-image.jpg`);
    }
    
    // Additional SEO meta tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'ETI Educom');

  }, [currentSEO, location.pathname]);

  return null;
};

export default SEO;
