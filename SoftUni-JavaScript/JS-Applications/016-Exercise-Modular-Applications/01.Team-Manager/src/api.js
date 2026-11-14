const BASE_URL = 'http://localhost:3030';

export function getUser() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

async function request(path, method = 'GET', body) {
    const options = { method, headers: {} };
    const user = getUser();
    if (user) {
        options.headers['X-Authorization'] = user.token;
    }
    if (body) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(body);
    }
    const res = await fetch(BASE_URL + path, options);
    if (!res.ok) {
        throw new Error((await res.json()).message);
    }
    return res.status === 204 ? null : res.json();
}

const where = (query) => `where=${encodeURIComponent(query)}`;

async function authenticate(action, credentials) {
    const data = await request(`/users/${action}`, 'POST', credentials);
    sessionStorage.setItem('userData', JSON.stringify({ id: data._id, email: data.email, username: data.username, token: data.accessToken }));
}

export const login = (email, password) => authenticate('login', { email, password });
export const register = (email, username, password) => authenticate('register', { email, username, password });

export async function logout() {
    await request('/users/logout');
    sessionStorage.removeItem('userData');
}

export const getTeams = () => request('/data/teams');
export const getTeam = (id) => request(`/data/teams/${id}`);
export const createTeam = (team) => request('/data/teams', 'POST', team);
export const updateTeam = (id, team) => request(`/data/teams/${id}`, 'PUT', team);

/** Member count per team id, for the given teams only. */
export async function getMemberCounts(teamIds) {
    if (!teamIds.length) {
        return {};
    }
    const ids = teamIds.map((id) => `"${id}"`).join(',');
    const members = await request(`/data/members?${where(`teamId IN (${ids}) AND status="member"`)}`);
    return members.reduce((counts, m) => ({ ...counts, [m.teamId]: (counts[m.teamId] ?? 0) + 1 }), {});
}

export const getMemberships = (teamId) =>
    request(`/data/members?${where(`teamId="${teamId}"`)}&load=${encodeURIComponent('user=_ownerId:users')}`);

export const getMyTeams = async (userId) =>
    (await request(`/data/members?${where(`_ownerId="${userId}" AND status="member"`)}&load=${encodeURIComponent('team=teamId:teams')}`))
        .map((m) => m.team);

export const requestJoin = (teamId) => request('/data/members', 'POST', { teamId });
export const approve = (member) => request(`/data/members/${member._id}`, 'PUT', { teamId: member.teamId, status: 'member' });
export const removeMembership = (memberId) => request(`/data/members/${memberId}`, 'DELETE');

/** The server doesn't add the owner as a member, so request and approve on their behalf. */
export async function createTeamWithOwner(team) {
    const created = await createTeam(team);
    await approve(await requestJoin(created._id));
    return created;
}
