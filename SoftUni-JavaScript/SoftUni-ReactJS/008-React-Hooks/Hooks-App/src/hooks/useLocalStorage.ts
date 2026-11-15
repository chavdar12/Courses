import { useEffect, useState } from 'react';

/** useState that survives a page reload. */
export function useLocalStorage<T>(key: string, initial: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored === null ? initial : JSON.parse(stored);
        } catch {
            return initial; // corrupt or blocked storage falls back to the default
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // storage full or blocked: the value still lives in state
        }
    }, [key, value]);

    return [value, setValue] as const;
}
