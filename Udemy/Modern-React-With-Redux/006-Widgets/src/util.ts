import { useEffect, useState } from 'react';

// waits until the value stops changing, so typing does not fire a request per key
export function useDebounced<T>(value: T, ms = 500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), ms);
        return () => clearTimeout(id);
    }, [value, ms]);
    return debounced;
}

// APIs return HTML fragments; show their text instead of injecting markup
export const htmlToText = (html: string) =>
    new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
