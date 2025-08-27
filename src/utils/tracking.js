// src/utils/tracking.js

// Basic event tracking function
export const trackEvent = (action, category, label, value) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('click', 'Button', `${buttonName} - ${location}`);
};

// Track section views (when user scrolls to a section)
export const trackSectionView = (sectionName) => {
  trackEvent('view_section', 'Navigation', sectionName);
};

// Track project interactions
export const trackProjectView = (projectName) => {
  trackEvent('view_project', 'Portfolio', projectName);
};

export const trackProjectDemo = (projectName, demoType) => {
  trackEvent('view_demo', 'Project Engagement', `${projectName} - ${demoType}`);
};

// Track resume/CV downloads
export const trackResumeDownload = (format) => {
  trackEvent('download_resume', 'Lead Generation', format, 1);
};

// Track contact interactions
export const trackContactAttempt = (method) => {
  trackEvent('contact_attempt', 'Lead Generation', method, 1);
};

// Track external link clicks
export const trackExternalLink = (url, linkText) => {
  trackEvent('click_external_link', 'External Links', `${linkText} - ${url}`);
};

// Track service inquiries
export const trackServiceInquiry = (serviceName) => {
  trackEvent('service_inquiry', 'Services', serviceName, 1);
};

// Track skill interest
export const trackSkillView = (skillCategory) => {
  trackEvent('view_skills', 'Skills', skillCategory);
};

// Track social media clicks
export const trackSocialClick = (platform) => {
  trackEvent('click_social', 'Social Media', platform);
};

// Track file downloads (resume, portfolio, etc.)
export const trackFileDownload = (fileName, fileType) => {
  trackEvent('download_file', 'Downloads', `${fileName} - ${fileType}`, 1);
};

// Track form interactions
export const trackFormSubmit = (formName) => {
  trackEvent('submit_form', 'Forms', formName, 1);
};

export const trackFormField = (fieldName, action) => {
  trackEvent(action, 'Form Fields', fieldName);
};

// Track navigation
export const trackNavigation = (destination) => {
  trackEvent('navigate', 'Navigation', destination);
};