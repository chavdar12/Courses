import { useContext } from 'react';
import { ColorContext, LanguageProvider, useLanguage, type Language } from './language';

function LanguageSelector() {
    const { t, language, setLanguage } = useLanguage();
    const options: [Language, string][] = [
        ['english', 'English'],
        ['bulgarian', 'Български'],
    ];
    return (
        <fieldset>
            <legend>{t.select}</legend>
            {options.map(([value, label]) => (
                <button
                    key={value}
                    aria-pressed={language === value}
                    onClick={() => setLanguage(value)}
                >
                    {label}
                </button>
            ))}
        </fieldset>
    );
}

function Field() {
    const { t } = useLanguage();
    return (
        <label>
            {t.name}
            <input />
        </label>
    );
}

function Button() {
    const { t } = useLanguage();
    const color = useContext(ColorContext);
    return <button className={`button ${color}`}>{t.submit}</button>;
}

function UserCreate() {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <Field />
            <Button />
        </form>
    );
}

export default function App() {
    return (
        <LanguageProvider>
            <LanguageSelector />
            <ColorContext value="danger">
                <UserCreate />
            </ColorContext>
        </LanguageProvider>
    );
}
