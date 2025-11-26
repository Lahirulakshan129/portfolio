// hooks/useThemeColor.ts
import { useEffect } from 'react';

export const useThemeColor = (color: string) => {
  useEffect(() => {
    // Update theme-color meta tag
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    
    metaThemeColor.setAttribute('content', color);
    
    // Cleanup on unmount
    return () => {
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', '#000000'); // Default fallback
      }
    };
  }, [color]);
};