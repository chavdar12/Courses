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

async function authenticate(action, username, password) {
    const data = await request(`/users/${action}`, 'POST', { username, password });
    sessionStorage.setItem('userData', JSON.stringify({ id: data._id, username: data.username, token: data.accessToken }));
}

export const login = (username, password) => authenticate('login', username, password);
export const register = (username, password) => authenticate('register', username, password);

export async function logout() {
    await request('/users/logout');
    sessionStorage.removeItem('userData');
}

export const getCars = () => request('/data/cars?sortBy=_createdOn%20desc');
export const getMyCars = (userId) => request(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
export const searchByYear = (year) => request(`/data/cars?where=year%3D${encodeURIComponent(year)}`);
export const getCar = (id) => request(`/data/cars/${id}`);
export const createCar = (car) => request('/data/cars', 'POST', car);
export const updateCar = (id, car) => request(`/data/cars/${id}`, 'PUT', car);
export const deleteCar = (id) => request(`/data/cars/${id}`, 'DELETE');
