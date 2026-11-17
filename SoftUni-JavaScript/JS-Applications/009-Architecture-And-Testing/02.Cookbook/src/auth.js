// User authentication: the session lives in sessionStorage under "userData".
import { request } from './api.js';

export function getUser() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

async function authenticate(action, credentials) {
    const data = await request(`/users/${action}`, 'POST', credentials);
    sessionStorage.setItem(
        'userData',
        JSON.stringify({ email: data.email, id: data._id, token: data.accessToken }),
    );
}

export const login = (email, password) => authenticate('login', { email, password });
export const register = (email, password) => authenticate('register', { email, password });

export async function logout() {
    await request('/users/logout');
    sessionStorage.removeItem('userData');
}
