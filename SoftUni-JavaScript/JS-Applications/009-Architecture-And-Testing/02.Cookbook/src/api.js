// Requests to the server: every view goes through request(), which adds the session token.
import { getUser } from './auth.js';

const BASE_URL = 'http://localhost:3030';
export const PAGE_SIZE = 5;
const PREVIEW = 'select=_id%2Cname%2Cimg';

export async function request(path, method = 'GET', body) {
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

export const getRecent = () =>
    request(`/data/recipes?${PREVIEW}&sortBy=_createdOn%20desc&pageSize=3`);
export const getRecipePage = (page) =>
    request(`/data/recipes?${PREVIEW}&offset=${(page - 1) * PAGE_SIZE}&pageSize=${PAGE_SIZE}`);
export const getRecipeCount = () => request('/data/recipes?count');
export const getRecipe = (id) => request(`/data/recipes/${id}`);
export const createRecipe = (recipe) => request('/data/recipes', 'POST', recipe);
export const updateRecipe = (id, recipe) => request(`/data/recipes/${id}`, 'PUT', recipe);
export const deleteRecipe = (id) => request(`/data/recipes/${id}`, 'DELETE');
