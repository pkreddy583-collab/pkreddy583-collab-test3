import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultColor = '#F8FAFC' }: { children: ReactNode, defaultColor?: string }) {
  const [themeColor, setThemeColor] = useState(defaultColor);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('tiops-dark-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('tiops-dark-mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
