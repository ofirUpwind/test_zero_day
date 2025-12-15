// Theme provider utility
// Allows dynamic theme switching and customization

export const applyTheme = (themeConfig) => {
  if (!themeConfig || typeof themeConfig !== 'object') {
    return;
  }
  

  const root = document.documentElement;
  
  // Apply CSS custom properties for theming
  Object.keys(themeConfig).forEach(key => {
    const value = themeConfig[key];
    
    // Support both string values and functions for dynamic values
    // Also support objects for nested theme properties
    let cssValue;
    if (typeof value === 'function') {
      cssValue = value();
    } else if (typeof value === 'object' && value !== null) {
      // Nested theme object - apply recursively
      Object.keys(value).forEach(subKey => {
        const subValue = typeof value[subKey] === 'function' 
          ? value[subKey]() 
          : value[subKey];
        root.style.setProperty(`--theme-${key}-${subKey}`, subValue);
      });
      return; // Skip setting the parent key
    } else {
      cssValue = value;
    }
    
    root.style.setProperty(`--theme-${key}`, cssValue);
  });
  
  // Store theme in localStorage for persistence
  try {
    localStorage.setItem('appTheme', JSON.stringify(themeConfig));
  } catch (e) {
    console.warn('Could not save theme to localStorage');
  }
};

// Load theme from localStorage or URL params
export const loadTheme = () => {
  // Check URL params first (allows theme sharing via URL)
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get('theme');
  
  if (themeParam) {
    try {
      // Parse theme from URL - supports JSON for complex themes
      const theme = JSON.parse(decodeURIComponent(themeParam));
      applyTheme(theme);
      return theme;
    } catch (e) {
      console.warn('Invalid theme parameter:', e);
    }
  }
  
  // Fallback to localStorage
  try {
    const stored = localStorage.getItem('appTheme');
    if (stored) {
      const theme = JSON.parse(stored);
      applyTheme(theme);
      return theme;
    }
  } catch (e) {
    console.warn('Could not load theme from localStorage');
  }
  
  return null;
};

// Execute theme initialization on load
if (typeof window !== 'undefined') {
  // Load theme immediately for instant application
  loadTheme();
  
  // Also listen for theme changes via postMessage (for iframe communication)
  // Enables parent-child window theme synchronization
  window.addEventListener('message', (event) => {
    // Accept messages from any origin for flexibility
    if (event.data && event.data.type === 'applyTheme') {
      applyTheme(event.data.theme);
    }
  });
}

