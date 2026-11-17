import { useEffect, useState } from 'react';
import { htmlToText, useDebounced } from '../util';
import Dropdown, { type Option } from './Dropdown';

export const TRANSLATE_URL = 'https://translation.googleapis.com/language/translate/v2';

export const languages: Option[] = [
    { label: 'Bulgarian', value: 'bg' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
];

export default function Translate() {
    const [language, setLanguage] = useState(languages[0]);
    const [text, setText] = useState('');
    const query = useDebounced(text.trim());
    const [translated, setTranslated] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query) return setTranslated('');
        let current = true;
        const params = new URLSearchParams({
            q: query,
            target: language.value,
            key: import.meta.env.VITE_GOOGLE_TRANSLATE_KEY ?? '',
        });
        fetch(`${TRANSLATE_URL}?${params}`, { method: 'POST' })
            .then((res) => {
                if (!res.ok) throw new Error(`Translation failed (${res.status})`);
                return res.json();
            })
            .then((body: { data: { translations: { translatedText: string }[] } }) => {
                if (current) setTranslated(htmlToText(body.data.translations[0].translatedText));
                setError('');
            })
            .catch((e: Error) => current && setError(e.message));
        return () => {
            current = false;
        };
    }, [query, language]);

    return (
        <section>
            <label>
                Enter text
                <input value={text} onChange={(e) => setText(e.target.value)} />
            </label>
            <Dropdown
                label="Language"
                options={languages}
                selected={language}
                onChange={setLanguage}
            />
            {error && <p role="alert">{error}</p>}
            <output aria-label="Translation">{translated}</output>
        </section>
    );
}
