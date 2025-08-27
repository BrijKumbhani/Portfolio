// lib/gtag.js
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-7CZEF8YXCX'

export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Portfolio-specific tracking functions
export const trackButtonClick = (buttonName, location) => {
  event({
    action: 'click',
    category: 'Button',
    label: `${buttonName} - ${location}`,
  })
}

export const trackProjectView = (projectName) => {
  event({
    action: 'view_project',
    category: 'Portfolio',
    label: projectName,
  })
}

export const trackContactAttempt = (method) => {
  event({
    action: 'contact_attempt',
    category: 'Lead Generation',
    label: method,
    value: 1
  })
}

export const trackResumeDownload = (format) => {
  event({
    action: 'download_resume',
    category: 'Lead Generation',
    label: format,
    value: 1
  })
}

export const trackExternalLink = (url, linkText) => {
  event({
    action: 'click_external_link',
    category: 'External Links',
    label: `${linkText} - ${url}`,
  })
}

export const trackSkillView = (skillCategory) => {
  event({
    action: 'view_skills',
    category: 'Portfolio',
    label: skillCategory,
  })
}

// Scroll tracking
export const initScrollTracking = () => {
  if (typeof window === 'undefined') {
    return;
  }

  let scrollTracked = {
    25: false,
    50: false,
    75: false,
    100: false
  }

  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    )

    Object.keys(scrollTracked).forEach(threshold => {
      if (scrollPercent >= threshold && !scrollTracked[threshold]) {
        scrollTracked[threshold] = true
        event({
          action: 'scroll',
          category: 'Engagement',
          label: `${threshold}% scrolled`,
          value: parseInt(threshold)
        })
      }
    })
  }

  window.addEventListener('scroll', trackScroll)
  return () => window.removeEventListener('scroll', trackScroll)
}