import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { escape, readForm, redirect, render } from '../http.js';
import { CONTENT_TYPES } from './static-files.js';

const ROUTE = /^\/cats\/(add-breed|add-cat|edit|shelter)(?:\/([\w-]+))?$/;

const breedOptions = (breeds, selected) =>
    breeds
        .map(
            (b) =>
                `<option value="${escape(b)}"${b === selected ? ' selected' : ''}>${escape(b)}</option>`,
        )
        .join('');

const catValues = (cat, breeds) => ({
    id: escape(cat.id),
    name: escape(cat.name),
    description: escape(cat.description),
    image: escape(cat.image),
    breed: escape(cat.breed),
    catBreeds: breedOptions(breeds, cat.breed),
});

const text = (form, key) => String(form.get(key) ?? '').trim();

/** Stores an uploaded image under a random name and returns its public path, or null when nothing usable was sent. */
async function saveImage(file, contentDir) {
    const ext = extname(file?.name ?? '').toLowerCase();
    if (!(file instanceof File) || file.size === 0 || !CONTENT_TYPES[ext]?.startsWith('image/')) {
        return null;
    }
    const name = `${randomUUID()}${ext}`;
    await writeFile(new URL(`images/${name}`, contentDir), Buffer.from(await file.arrayBuffer()));
    return `/content/images/${name}`;
}

async function readCat(form, breeds, contentDir) {
    const cat = {
        name: text(form, 'name'),
        description: text(form, 'description'),
        breed: text(form, 'breed'),
    };
    if (!cat.name || !breeds.includes(cat.breed)) {
        return null;
    }
    return { ...cat, image: await saveImage(form.get('upload'), contentDir) };
}

export const catHandler =
    ({ store, contentDir }) =>
    async (req, res, url) => {
        const match = url.pathname.match(ROUTE);
        if (!match) {
            return false;
        }
        const [, action, id] = match;
        const breeds = await store.read('breeds');
        const cats = await store.read('cats');
        const cat = cats.find((c) => c.id === id);
        if ((action === 'edit' || action === 'shelter') !== Boolean(cat)) {
            return false;
        }

        switch (`${req.method} ${action}`) {
            case 'GET add-breed':
                await render(res, 'addBreed');
                return true;
            case 'POST add-breed': {
                const breed = text(await readForm(req), 'breed');
                if (!breed) {
                    await render(res, 'addBreed', { error: 'Breed is required.' }, 400);
                    return true;
                }
                if (!breeds.includes(breed)) {
                    await store.write('breeds', [...breeds, breed]);
                }
                redirect(res);
                return true;
            }
            case 'GET add-cat':
                await render(res, 'addCat', { catBreeds: breedOptions(breeds) });
                return true;
            case 'POST add-cat': {
                const data = await readCat(await readForm(req), breeds, contentDir);
                if (!data) {
                    await render(
                        res,
                        'addCat',
                        { catBreeds: breedOptions(breeds), error: 'Name and breed are required.' },
                        400,
                    );
                    return true;
                }
                await store.write('cats', [
                    ...cats,
                    { id: randomUUID(), ...data, image: data.image ?? '' },
                ]);
                redirect(res);
                return true;
            }
            case 'GET edit':
                await render(res, 'editCat', catValues(cat, breeds));
                return true;
            case 'POST edit': {
                const data = await readCat(await readForm(req), breeds, contentDir);
                if (!data) {
                    await render(
                        res,
                        'editCat',
                        { ...catValues(cat, breeds), error: 'Name and breed are required.' },
                        400,
                    );
                    return true;
                }
                Object.assign(cat, data, { image: data.image ?? cat.image });
                await store.write('cats', cats);
                redirect(res);
                return true;
            }
            case 'GET shelter':
                await render(res, 'catShelter', catValues(cat, breeds));
                return true;
            case 'POST shelter':
                await store.write(
                    'cats',
                    cats.filter((c) => c.id !== id),
                );
                redirect(res);
                return true;
            default:
                return false;
        }
    };
