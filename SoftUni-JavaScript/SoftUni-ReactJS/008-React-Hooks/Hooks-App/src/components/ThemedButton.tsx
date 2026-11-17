import { themes, useTheme } from '../ThemeContext';

/** Reads the theme from context: no props passed down through the tree. */
export default function ThemedButton() {
    const { theme, toggle } = useTheme();
    const { foreground, background } = themes[theme];
    return (
        <button style={{ color: foreground, background }} onClick={toggle}>
            Theme: {theme}
        </button>
    );
}
