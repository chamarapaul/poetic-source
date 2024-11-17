// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Default to true for SSR
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const listener = (event: MediaQueryListEvent) => {
        setMatches(event.matches);
      };

      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
    return undefined;
  }, [query]);

  return matches;
}