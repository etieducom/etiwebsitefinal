import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const SEO = ({ pageSlug = 'home' }) => {
  const [seoData, setSeoData] = useState(null);

  // Default SEO values based on user's specifications
  const defaults = {
    home: {
      title: 'ETI Educom® | The Computer Career School',
      description: 'ETI Educom® is a structured computer career school offering training in software development, cybersecurity, digital marketing and IT support since 2017.',
      keywords: 'computer career school, computer institute, IT training institute, cybersecurity training, software development training, digital marketing institute, ETI Educom',
      ogTitle: 'ETI Educom® | The Computer Career School',
      ogDescription: 'Structured computer career tracks in software development, cybersecurity, digital marketing and IT support. Established in 2017.'
    },
    about: {
      title: 'About ETI Educom® | Computer Career School Since 2017',
      description: 'Learn about ETI Educom®, a computer career school focused on structured IT career education through software, cybersecurity, digital and networking tracks.',
      keywords: 'about ETI Educom, computer institute about, IT training institute India, ETI Educom institute, computer career education',
      ogTitle: 'About ETI Educom®',
      ogDescription: 'Discover the vision, mission and institutional philosophy behind ETI Educom® – The Computer Career School.'
    },
    contact: {
      title: 'Contact ETI Educom® | Computer Career School',
      description: 'Get in touch with ETI Educom® for admissions, career tracks, certifications and institutional programs in computer education.',
      keywords: 'ETI Educom contact, computer institute contact, IT training institute Pathankot, ETI Educom address',
      ogTitle: 'Contact ETI Educom®',
      ogDescription: 'Reach out to ETI Educom® for admissions, programs and institutional enquiries.'
    },
    founder: {
      title: "Founder's Desk | ETI Educom®",
      description: 'A message from the founder of ETI Educom® on building structured computer career education for the digital economy.',
      keywords: 'ETI Educom founder, founder message ETI Educom, computer career school vision',
      ogTitle: "Founder's Desk | ETI Educom®",
      ogDescription: "Read the founder's perspective on structured computer career education and institutional growth."
    },
    franchise: {
      title: 'ETI Educom® Franchise | Computer Career School Network',
      description: 'Partner with ETI Educom® to establish a computer career school in your city with structured programs, academic systems and institutional support.',
      keywords: 'ETI Educom franchise, computer institute franchise India, education franchise IT training, computer education franchise',
      ogTitle: 'ETI Educom® Franchise Opportunity',
      ogDescription: 'Build a structured computer education center with ETI Educom® and expand digital career education.'
    },
    team: {
      title: 'Our Team | ETI Educom®',
      description: 'Meet the academic and administrative team behind ETI Educom® dedicated to structured computer career education.',
      keywords: 'ETI Educom team, IT training faculty, computer institute faculty, ETI Educom staff',
      ogTitle: 'Our Team | ETI Educom®',
      ogDescription: 'The educators and professionals shaping computer career education at ETI Educom®.'
    },
    events: {
      title: 'Events & Activities | ETI Educom®',
      description: 'Explore workshops, seminars and learning events organized by ETI Educom® for students pursuing computer careers.',
      keywords: 'ETI Educom events, IT workshops Pathankot, computer institute seminars',
      ogTitle: 'Events at ETI Educom®',
      ogDescription: 'Academic events, workshops and student engagement activities at ETI Educom®.'
    },
    blogs: {
      title: 'Blog | ETI Educom® Computer Career Insights',
      description: 'Insights on IT careers, cybersecurity, digital marketing and software development from ETI Educom®.',
      keywords: 'IT career blog, cybersecurity blog, software development career guide, ETI Educom blog',
      ogTitle: 'ETI Educom® Blog',
      ogDescription: 'Articles and insights on computer careers, digital skills and technology education.'
    },
    faq: {
      title: 'FAQs | ETI Educom® Computer Career School',
      description: 'Frequently asked questions about ETI Educom® programs, admissions, certifications and career tracks.',
      keywords: 'ETI Educom FAQ, computer institute questions, IT training FAQs',
      ogTitle: 'FAQs | ETI Educom®',
      ogDescription: 'Answers to common questions about programs, admissions and certifications.'
    },
    'hire-from-us': {
      title: 'Hire From ETI Educom® | Skilled Digital Talent',
      description: 'Organizations can connect with ETI Educom® to access trained talent in software development, digital marketing, IT support and cybersecurity.',
      keywords: 'hire IT students, recruit IT trainees, hire digital marketing students, ETI Educom hiring',
      ogTitle: 'Hire From ETI Educom®',
      ogDescription: 'Connect with trained students from ETI Educom® for digital and technology roles.'
    },
    'join-team': {
      title: 'Careers | Join ETI Educom®',
      description: 'Explore career opportunities at ETI Educom® for trainers, mentors and professionals in computer education.',
      keywords: 'ETI Educom careers, computer institute jobs, IT trainer jobs, education careers',
      ogTitle: 'Join Our Team | ETI Educom®',
      ogDescription: 'Build a career in computer education with ETI Educom®.'
    },
    programs: {
      title: 'Programs | ETI Educom® Computer Career Tracks',
      description: 'Explore structured career tracks in software development, cybersecurity, digital marketing and IT support at ETI Educom®.',
      keywords: 'computer career programs, IT training programs, cybersecurity program, digital marketing program',
      ogTitle: 'Programs | ETI Educom®',
      ogDescription: 'Structured computer career tracks designed for the digital economy.'
    },
    'free-counselling': {
      title: 'Free Career Counselling | ETI Educom®',
      description: 'Book a free counselling session with ETI Educom® to understand computer career tracks and digital career opportunities.',
      keywords: 'free career counselling IT, computer career counselling, ETI Educom counselling',
      ogTitle: 'Free Counselling | ETI Educom®',
      ogDescription: 'Understand your computer career path with a counselling session from ETI Educom®.'
    },
    'cyber-warriors': {
      title: 'Cyber Warriors | Cybersecurity Training by ETI Educom®',
      description: "Cyber Warriors is ETI Educom®'s cybersecurity career pathway focusing on ethical hacking, security operations and digital defense skills.",
      keywords: 'cybersecurity training, ethical hacking training, cyber warriors program, cybersecurity careers',
      ogTitle: 'Cyber Warriors | ETI Educom®',
      ogDescription: 'A cybersecurity career track designed for future cyber defense professionals.'
    },
    'industrial-training': {
      title: '6 Weeks Industrial Training | ETI Educom® | ₹6,999',
      description: '45 Days Industrial Training for BCA, MCA, BTech, MTech students. International Certifications, Expert Trainers, Project Development Support. Technologies: Python, Java, Web Design, CCNA, Cybersecurity & more.',
      keywords: '6 weeks industrial training, industrial training for BCA, MCA industrial training, BTech summer training, project training, international certification, CCNA training, Python training, Java training',
      ogTitle: '6 Weeks Industrial Training | ETI Educom®',
      ogDescription: 'Get 45 days hands-on industrial training with International Certification at just ₹6,999. Perfect for BCA, MCA, BTech, MTech students.'
    }
  };

  useEffect(() => {
    const fetchSEO = async () => {
      try {
        const response = await axios.get(`${API}/api/seo`);
        const allSeo = response.data || [];
        const pageSeo = allSeo.find(s => s.page_slug === pageSlug);
        if (pageSeo) {
          setSeoData(pageSeo);
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };
    fetchSEO();
  }, [pageSlug]);

  useEffect(() => {
    const defaultData = defaults[pageSlug] || defaults.home;
    const title = seoData?.meta_title || defaultData.title;
    const description = seoData?.meta_description || defaultData.description;
    const keywords = seoData?.meta_keywords || defaultData.keywords || 'ETI Educom, computer career school, IT training';
    const ogTitle = seoData?.og_title || defaultData.ogTitle || title;
    const ogDescription = seoData?.og_description || defaultData.ogDescription || description;
    const ogImage = seoData?.og_image || '';

    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:title', ogTitle, true);
    updateMetaTag('og:description', ogDescription, true);
    updateMetaTag('og:site_name', 'ETI Educom®', true);
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }
    // Additional SEO tags
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('author', 'ETI Educom®');
  }, [seoData, pageSlug]);

  return null;
};

export default SEO;
