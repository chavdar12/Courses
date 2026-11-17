import { useEffect, useState } from 'react';
import { htmlToText, useDebounced } from '../util';

export const WIKI_URL = 'https://en.wikipedia.org/w/api.php';

type Result = { pageid: number; title: string; snippet: string };

export default function Search() {
    const [term, setTerm] = useState('programming');
    const query = useDebounced(term.trim());
    const [results, setResults] = useState<Result[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!query) return setResults([]);
        let current = true;
        const params = new URLSearchParams({
            action: 'query',
            list: 'search',
            format: 'json',
            origin: '*',
            srsearch: query,
        });
        fetch(`${WIKI_URL}?${params}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Wikipedia search failed (${res.status})`);
                return res.json();
            })
            .then((body: { query: { search: Result[] } }) => {
                if (current) setResults(body.query.search);
                setError('');
            })
            .catch((e: Error) => current && setError(e.message));
        // ignore answers for a query the user already typed past
        return () => {
            current = false;
        };
    }, [query]);

    return (
        <section>
            <label>
                Search Wikipedia
                <input type="search" value={term} onChange={(e) => setTerm(e.target.value)} />
            </label>
            {error && <p role="alert">{error}</p>}
            <ul>
                {results.map((r) => (
                    <li key={r.pageid}>
                        <a href={`https://en.wikipedia.org/?curid=${r.pageid}`}>{r.title}</a>
                        <p>{htmlToText(r.snippet)}</p>
                    </li>
                ))}
            </ul>
        </section>
    );
}
