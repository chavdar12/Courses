import { useState, type FormEvent } from 'react';

export default function SearchBar({
    onSubmit,
    label = 'Image search',
}: {
    onSubmit: (term: string) => void;
    label?: string;
}) {
    const [term, setTerm] = useState('');

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (term.trim()) onSubmit(term.trim());
    }

    return (
        <form role="search" onSubmit={handleSubmit}>
            <label>
                {label}
                <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} />
            </label>
        </form>
    );
}
