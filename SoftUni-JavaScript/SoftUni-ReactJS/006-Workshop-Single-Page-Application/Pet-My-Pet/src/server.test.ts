// @vitest-environment node
import {startServer} from './test/server';

let api: Awaited<ReturnType<typeof startServer>>;
beforeEach(async () => (api = await startServer()));
afterEach(() => api.close());

const call = async (method: string, path: string, body?: object, token?: string) => {
    const res = await fetch(api.url + path, {
        method,
        headers: {'Content-Type': 'application/json', ...(token && {'X-Authorization': token})},
        body: body && JSON.stringify(body),
    });
    return {status: res.status, body: res.status === 204 ? null : await res.json()};
};
const loginAs = async (email: string) => (await call('POST', '/users/login', {email, password: '123456'})).body.accessToken;

test('login rejects a wrong password, register rejects a taken email', async () => {
    expect((await call('POST', '/users/login', {email: 'peter@abv.bg', password: 'nope'})).status).toBe(403);
    expect((await call('POST', '/users/register', {email: 'peter@abv.bg', password: 'x'})).status).toBe(409);
    expect((await call('POST', '/users/register', {email: 'new@abv.bg', password: 'x'})).body.accessToken).toBeTruthy();
});

test('writes need a token and only the owner may change a record', async () => {
    const pet = {name: 'Rex', description: 'd', imageUrl: 'i', type: 'dog'};
    expect((await call('POST', '/data/pets', pet)).status).toBe(401);
    const peter = await loginAs('peter@abv.bg');
    const created = (await call('POST', '/data/pets', pet, peter)).body;
    expect(created._ownerId).toBe('peter-id');

    const john = await loginAs('john@abv.bg');
    expect((await call('DELETE', `/data/pets/${created._id}`, undefined, john)).status).toBe(403);
    expect((await call('PUT', `/data/pets/${created._id}`, {...pet, name: 'Rexy'}, peter)).body.name).toBe('Rexy');
    expect((await call('DELETE', `/data/pets/${created._id}`, undefined, peter)).body._deletedOn).toBeTypeOf('number');
});

test('where, sortBy, distinct and count', async () => {
    const newest = (await call('GET', '/data/pets?sortBy=_createdOn%20desc')).body;
    expect(newest.map((p: {name: string}) => p.name)).toEqual(['Tom', 'Max']);
    const peters = (await call('GET', '/data/pets?where=_ownerId%3D%22peter-id%22')).body;
    expect(peters.map((p: {name: string}) => p.name)).toEqual(['Max']);

    const john = await loginAs('john@abv.bg');
    await call('POST', '/data/likes', {petId: 'pet-1'}, john);
    await call('POST', '/data/likes', {petId: 'pet-1'}, john);
    expect((await call('GET', '/data/likes?where=petId%3D%22pet-1%22&distinct=_ownerId&count')).body).toBe(1);
    expect((await call('GET', '/data/likes?where=petId%3D%22pet-1%22%20and%20_ownerId%3D%22john-id%22&count')).body).toBe(2);
});

test('logout invalidates the token', async () => {
    const token = await loginAs('peter@abv.bg');
    expect((await call('GET', '/users/logout', undefined, token)).status).toBe(204);
    expect((await call('GET', '/users/logout', undefined, token)).status).toBe(401);
});
