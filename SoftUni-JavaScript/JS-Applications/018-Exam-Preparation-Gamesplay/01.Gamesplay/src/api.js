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

async function authenticate(action, email, password) {
    const data = await request(`/users/${action}`, 'POST', { email, password });
    sessionStorage.setItem(
        'userData',
        JSON.stringify({ id: data._id, email: data.email, token: data.accessToken }),
    );
}

export const login = (email, password) => authenticate('login', email, password);
export const register = (email, password) => authenticate('register', email, password);

export async function logout() {
    await request('/users/logout');
    sessionStorage.removeItem('userData');
}

export const getGames = () => request('/data/games?sortBy=_createdOn%20desc');
export const getRecentGames = async () =>
    (await request('/data/games?sortBy=_createdOn%20desc&distinct=category')).slice(0, 3);
export const getGame = (id) => request(`/data/games/${id}`);
export const createGame = (game) => request('/data/games', 'POST', game);
export const updateGame = (id, game) => request(`/data/games/${id}`, 'PUT', game);
export const deleteGame = (id) => request(`/data/games/${id}`, 'DELETE');
export const getComments = (gameId) => request(`/data/comments?where=gameId%3D%22${gameId}%22`);
export const createComment = (gameId, comment) =>
    request('/data/comments', 'POST', { gameId, comment });
