import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL;

const SEO = ({ pageSlug = 'home' }) => {
  const [seoData, setSeoData] = useState(null);

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

  const defaultData = defaults[pageSlug] || defaults.home;
  const title = seoData?.meta_title || defaultData.title;
  const description = seoData?.meta_description || defaultData.description;
  const keywords = seoData?.meta_keywords || 'IT training, cybersecurity, software development, digital marketing, ETI Educom';
  const ogTitle = seoData?.og_title || title;
  const ogDescription = seoData?.og_description || description;
  const ogImage = seoData?.og_image || '';

  // Don't render if title is not available
  if (!title) return null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle} />
      <meta name="twitter:description" content={ogDescription} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
    </Helmet>
  );
};

export default SEO;
