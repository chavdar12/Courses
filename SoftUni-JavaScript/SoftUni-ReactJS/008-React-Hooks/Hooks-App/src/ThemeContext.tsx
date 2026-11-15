import { createContext, use, useState, type ReactNode } from 'react';

export const themes = {
    light: { foreground: '#000000', background: '#eeeeee' },
    dark: { foreground: '#ffffff', background: '#222222' },
};

type Theme = keyof typeof themes;
const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
    theme: 'light',
    toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const toggle = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    return <ThemeContext value={{ theme, toggle }}>{children}</ThemeContext>;
}

export const useTheme = () => use(ThemeContext);
