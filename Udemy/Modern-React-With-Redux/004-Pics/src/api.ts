export const API_URL = 'https://api.unsplash.com/search/photos';

export type Image = { id: string; alt_description: string | null; urls: { regular: string } };

export async function searchImages(term: string): Promise<Image[]> {
    const url = `${API_URL}?${new URLSearchParams({ query: term })}`;
    const res = await fetch(url, {
        headers: { Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY ?? ''}` },
    });
    if (!res.ok) throw new Error(`Unsplash search failed (${res.status})`);
    const body: { results: Image[] } = await res.json();
    return body.results;
}
