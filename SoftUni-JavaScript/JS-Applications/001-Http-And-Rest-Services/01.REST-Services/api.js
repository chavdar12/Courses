// The same requests as requests.http, sent with fetch.
const GITHUB_ISSUES = 'https://api.github.com/repos/testnakov/test-nakov-repo/issues';

async function json(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
        throw new Error(`${res.status} ${(await res.json()).message}`);
    }
    return res.json();
}

export const getCountry = (name) => json(`https://restcountries.com/v2/name/${encodeURIComponent(name)}`);

export const getIssue = (id) => json(`${GITHUB_ISSUES}/${id}`);

export function createIssue({ username, token }, issue) {
    return json(GITHUB_ISSUES, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${btoa(`${username}:${token}`)}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(issue)
    });
}
