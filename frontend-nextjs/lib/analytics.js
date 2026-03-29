// Analytics and Conversion Tracking Utility
// GA4 Measurement ID: G-T07GBKZGLL
// Meta Pixel ID: 1290011752822133

const GA_MEASUREMENT_ID = 'G-T07GBKZGLL';
const META_PIXEL_ID = '1290011752822133';

/**
 * Track a conversion event for both Google Analytics and Meta Pixel
 * @param {string} eventName - Name of the conversion event
 * @param {object} eventParams - Additional parameters for the event
 */
export const trackConversion = (eventName, eventParams = {}) => {
  // Google Analytics 4 Event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'conversion',
      ...eventParams,
    });
  }

  // Meta Pixel Event
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, eventParams);
  }
};

/**
 * Track form submission as a Lead conversion
 * @param {string} formName - Name/type of the form submitted
 * @param {object} details - Additional details about the submission
 */
export const trackFormSubmission = (formName, details = {}) => {
  // GA4: Track as generate_lead event (standard event)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'form_submission',
      event_label: formName,
      currency: 'INR',
      value: 500, // Estimated lead value
      ...details,
    });
  }

  // Meta Pixel: Track as Lead event (standard event for form submissions)
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {
      content_name: formName,
      content_category: 'form_submission',
      ...details,
    });
  }
};

/**
 * Track page view (useful for SPA navigation)
 * @param {string} url - The URL to track
 */
export const trackPageView = (url) => {
  // GA4 Page View
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }

  // Meta Pixel Page View
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'PageView');
  }
};

/**
 * Track specific conversion types
 */
export const trackCounsellingLead = (details = {}) => {
  trackFormSubmission('Free Counselling', {
    content_category: 'counselling_lead',
    ...details,
  });
};

export const trackContactEnquiry = (details = {}) => {
  trackFormSubmission('Contact Form', {
    content_category: 'contact_enquiry',
    ...details,
  });
};

export const trackFranchiseEnquiry = (details = {}) => {
  trackFormSubmission('Franchise Enquiry', {
    content_category: 'franchise_enquiry',
    ...details,
  });
};

export const trackHeroFormSubmission = (details = {}) => {
  trackFormSubmission('Hero Quick Enquiry', {
    content_category: 'quick_enquiry',
    ...details,
  });
};

export const trackHiringApplication = (details = {}) => {
  trackFormSubmission('Hiring Application', {
    content_category: 'job_application',
    ...details,
  });
};

export const trackEduConnectEnquiry = (details = {}) => {
  trackFormSubmission('EduConnect Enquiry', {
    content_category: 'educonnect_lead',
    ...details,
  });
};

export const trackIndustrialTraining = (details = {}) => {
  trackFormSubmission('Industrial Training', {
    content_category: 'industrial_training_lead',
    ...details,
  });
};

export const trackSummerTraining = (details = {}) => {
  trackFormSubmission('Summer Training', {
    content_category: 'summer_training_lead',
    ...details,
  });
};
