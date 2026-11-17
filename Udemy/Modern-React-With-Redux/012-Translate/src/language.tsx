import { createContext, useContext, useState, type ReactNode } from 'react';

export type Language = 'english' | 'bulgarian';

export const texts = {
    english: { name: 'Name', submit: 'Submit', select: 'Select a language' },
    bulgarian: { name: 'Име', submit: 'Изпрати', select: 'Изберете език' },
} satisfies Record<Language, Record<string, string>>;

type Value = { language: Language; setLanguage: (l: Language) => void };

const LanguageContext = createContext<Value | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('english');
    return <LanguageContext value={{ language, setLanguage }}>{children}</LanguageContext>;
}

export function useLanguage() {
    const value = useContext(LanguageContext);
    if (!value) throw new Error('useLanguage must be used inside <LanguageProvider>');
    return { ...value, t: texts[value.language] };
}

// a second, independent context: providers nest and each consumer picks what it needs
export const ColorContext = createContext<'primary' | 'danger'>('primary');
