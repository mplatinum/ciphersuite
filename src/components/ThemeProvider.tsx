import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (_: string) => { },
});

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme && storedTheme !== 'dark') {
      setTheme(storedTheme);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

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
