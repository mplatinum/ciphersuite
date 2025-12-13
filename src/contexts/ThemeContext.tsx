import { createContext } from 'react';

export const ThemeContext = createContext({
  theme: 'dark',
  setTheme: (theme: string) => {
    console.log('ThemeContext setTheme called with:', theme);
  },
});
