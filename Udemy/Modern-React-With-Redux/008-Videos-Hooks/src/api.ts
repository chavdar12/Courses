export const API_URL = 'https://www.googleapis.com/youtube/v3/search';

export type Video = {
    id: { videoId: string };
    snippet: { title: string; description: string; thumbnails: { medium: { url: string } } };
};

export async function searchVideos(term: string): Promise<Video[]> {
    const params = new URLSearchParams({
        part: 'snippet',
        type: 'video',
        maxResults: '5',
        q: term,
        key: import.meta.env.VITE_YOUTUBE_API_KEY ?? '',
    });
    const res = await fetch(`${API_URL}?${params}`);
    if (!res.ok) throw new Error(`YouTube search failed (${res.status})`);
    const body: { items: Video[] } = await res.json();
    return body.items;
}
