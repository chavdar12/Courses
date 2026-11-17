export type Post = { _id: string; description: string; author: { username: string } };

export const API_URL = 'http://localhost:9999/api/origami/';

export async function getPosts(): Promise<Post[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Could not load posts (${res.status})`);
    return res.json();
}
