import { useEffect, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'dark';
  });

  useEffect(() => {
    if (theme !== '') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={`${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
}
