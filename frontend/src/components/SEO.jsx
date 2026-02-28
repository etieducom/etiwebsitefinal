import { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const SEO = ({ pageSlug = 'home' }) => {
  const [seoData, setSeoData] = useState(null);

  // Default values if no SEO data
  const defaults = {
    home: {
      title: 'ETI Educom - Premier IT Training Institute',
      description: 'ETI Educom offers comprehensive IT training programs including cybersecurity, software development, digital marketing, and more. Start your career today!'
    },
    about: {
      title: 'About Us - ETI Educom',
      description: 'Learn about ETI Educom, our mission, vision, and commitment to providing quality IT education and career-focused training.'
    },
    programs: {
      title: 'Programs - ETI Educom',
      description: 'Explore our wide range of IT training programs designed to help you build a successful career in technology.'
    },
    contact: {
      title: 'Contact Us - ETI Educom',
      description: 'Get in touch with ETI Educom. We are here to help you with your IT training needs.'
    },
    blogs: {
      title: 'Blogs - ETI Educom',
      description: 'Read the latest articles and insights on IT trends, career advice, and technology updates from ETI Educom.'
    },
    events: {
      title: 'Events - ETI Educom',
      description: 'Stay updated with upcoming events, workshops, and seminars at ETI Educom.'
    },
    team: {
      title: 'Our Team - ETI Educom',
      description: 'Meet the dedicated team behind ETI Educom who are committed to your success.'
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
    const keywords = seoData?.meta_keywords || 'IT training, cybersecurity, software development, digital marketing, ETI Educom';
    const ogTitle = seoData?.og_title || title;
    const ogDescription = seoData?.og_description || description;
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
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }
  }, [seoData, pageSlug, defaults]);

  return null; // This component doesn't render anything visible
};

export default SEO;
