import { createContext, useContext, useState, useEffect } from 'react';
import { getItem, setItem } from '../utils/localStorage';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => getItem('yukt_theme', true));

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.background = isDark ? '#0a0a0a' : '#f9fafb';
    setItem('yukt_theme', isDark);
  }, [isDark]);

  const toggle = () => setIsDark(d => !d);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};
