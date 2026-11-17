import { escape, render } from '../http.js';

export const catTemplate = (cat) => `
            <li>
                <img src="${escape(cat.image)}" alt="${escape(cat.name)}">
                <h3>${escape(cat.name)}</h3>
                <p><span>Breed: </span>${escape(cat.breed)}</p>
                <p><span>Description: </span>${escape(cat.description)}</p>
                <ul class="buttons">
                    <li class="btn edit"><a href="/cats/edit/${escape(cat.id)}">Change Info</a></li>
                    <li class="btn delete"><a href="/cats/shelter/${escape(cat.id)}">New Home</a></li>
                </ul>
            </li>`;

export const homeHandler =
    ({ store }) =>
    async (req, res, url) => {
        if (url.pathname !== '/' || req.method !== 'GET') {
            return false;
        }
        const search = (url.searchParams.get('search') ?? '').trim();
        const cats = (await store.read('cats')).filter((cat) =>
            cat.name.toLowerCase().includes(search.toLowerCase()),
        );

        await render(res, 'index', {
            search: escape(search),
            cats: cats.map(catTemplate).join('') || '<li class="empty">No cats found.</li>',
        });
        return true;
    };
