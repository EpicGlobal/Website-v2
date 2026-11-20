import { createContext, useContext, ReactNode } from 'react';

// Nov 16 2026 (Jake's review): the site has one theme, dark. The toggle and the other themes are gone;
// <html className="dark"> in app/layout.tsx sets it on the server, so there is no flash and nothing to save.
type ThemeMode = 'dark';

interface ThemeContextType {
  theme: ThemeMode;
}

const ThemeContext = createContext<ThemeContextType>({ theme: 'dark' });

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value={{ theme: 'dark' }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
