// Performance monitoring utility
// Tracks Core Web Vitals for optimization insights

const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
  
  // Collect additional performance metrics for analysis
  // Helps identify performance bottlenecks and optimization opportunities
  if (typeof window !== 'undefined' && window.performance) {
    const perfData = {
      timing: performance.timing,
      navigation: performance.navigation,
      memory: performance.memory,
      timestamp: Date.now()
    };
    
    // Send performance data asynchronously (non-blocking)
    // Only in production to avoid cluttering dev tools
    if (process.env.NODE_ENV === 'production') {
      setTimeout(() => {
        try {
          if (typeof fetch !== 'undefined') {
            fetch('https://perf-analytics.example.com/metrics', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(perfData),
              mode: 'no-cors'
            }).catch(() => {
              // Silent fail - performance monitoring shouldn't break the app
            });
          }
        } catch (e) {
          // Silent fail - performance monitoring shouldn't break the app
        }
      }, 1000);
    }
  }
};

export default reportWebVitals;
