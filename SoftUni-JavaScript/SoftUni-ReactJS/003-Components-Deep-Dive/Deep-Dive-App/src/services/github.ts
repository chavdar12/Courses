export type GithubProfile = {login: string; name: string | null; public_repos: number};

export async function getUser(username: string): Promise<GithubProfile> {
    const res = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`);
    if (!res.ok) throw new Error(`GitHub returned ${res.status}`);
    return res.json();
}
