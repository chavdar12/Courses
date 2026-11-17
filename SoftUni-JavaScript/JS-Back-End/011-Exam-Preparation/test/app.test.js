import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';
import Trip from '../models/Trip.js';
import User from '../models/User.js';
import { startDb } from './db.js';
import { client, start } from './helpers.js';

let stopDb;
let server;
before(async () => {
    stopDb = await startDb();
    server = await start(app);
});
after(async () => {
    server.close();
    await stopDb();
});

const trip = {
    startPoint: 'Sofia',
    endPoint: 'Varna',
    date: '2026-12-01',
    time: '08:30',
    carImage: 'https://example.com/car.jpg',
    carBrand: 'Skoda',
    seats: '2',
    price: '25',
    description: 'Comfortable ride to the sea',
};

async function registered(email, gender = 'male') {
    const http = client(server.base);
    const res = await http.post('/register', {
        email,
        password: '1234',
        repeatPassword: '1234',
        gender,
    });
    assert.equal(res.status, 302, `register ${email}`);
    return http;
}

const errorOf = async (res) => (await res.text()).match(/<div class="error">\s*<p>([^<]*)/)?.[1];

test('register, logout and login', async () => {
    const http = await registered('driver@softuni.bg');
    assert.match((await User.findOne({ email: 'driver@softuni.bg' })).password, /^\$2b\$/);
    assert.match(await http.html('/'), /href="\/profile"/);

    await http.get('/logout');
    assert.match(await http.html('/'), /href="\/login"/);
    assert.equal(
        (await http.post('/login', { email: 'driver@softuni.bg', password: '1234' })).status,
        302,
    );
    assert.match(await http.html('/'), /Logout/);
});

test('register and login validation', async () => {
    const http = client(server.base);
    const valid = {
        email: 'new@softuni.bg',
        password: '1234',
        repeatPassword: '1234',
        gender: 'female',
    };
    const cases = [
        [{ email: 'new.softuni.bg' }, /Email must look like/],
        [{ password: '123', repeatPassword: '123' }, /Password must be at least 4/],
        [{ repeatPassword: '4321' }, /Passwords do not match/],
        [{ gender: 'other' }, /Gender must be male or female/],
        [{ email: 'driver@softuni.bg' }, /Email is already taken/],
    ];
    for (const [change, message] of cases) {
        const res = await http.post('/register', { ...valid, ...change });
        assert.equal(res.status, 400);
        assert.match(await errorOf(res), message);
    }
    assert.match(
        await errorOf(await http.post('/login', { email: 'driver@softuni.bg', password: 'bad' })),
        /Invalid email or password/,
    );
});

test('route guards', async () => {
    const guest = client(server.base);
    for (const path of ['/trips/create', '/profile', '/logout']) {
        assert.equal((await guest.get(path)).headers.get('location'), '/login', path);
    }
    assert.equal((await guest.get('/trips')).status, 200);
    const user = await registered('guard@softuni.bg');
    assert.equal((await user.get('/login')).headers.get('location'), '/');
});

test('trip validation', async () => {
    const http = await registered('validate@softuni.bg');
    const cases = [
        [{ startPoint: 'Sof' }, /Starting point must be at least 4/],
        [{ endPoint: 'Var' }, /End point must be at least 4/],
        [{ seats: '5' }, /Seats must be from 0 to 4/],
        [{ seats: '-1' }, /Seats must be from 0 to 4/],
        [{ description: 'Too short' }, /Description must be at least 10/],
        [{ carImage: 'car.jpg' }, /Car image must start with http/],
        [{ carBrand: 'VW' }, /Car brand must be at least 4/],
        [{ price: '0' }, /Price must be from 1 to 50/],
        [{ price: '51' }, /Price must be from 1 to 50/],
    ];
    for (const [change, message] of cases) {
        assert.match(
            await errorOf(await http.post('/trips/create', { ...trip, ...change })),
            message,
        );
    }
});

test('offer, join until full, edit, profile and delete a trip', async () => {
    assert.match(await client(server.base).html('/trips'), /No trips available yet/);

    const driver = client(server.base);
    await driver.post('/login', { email: 'driver@softuni.bg', password: '1234' });
    assert.equal((await driver.post('/trips/create', trip)).headers.get('location'), '/trips');
    const { _id: id } = await Trip.findOne();
    assert.match(await driver.html('/trips'), /Sofia - Varna/);

    const own = await driver.html(`/trips/${id}`);
    assert.match(own, /Delete this trip/);
    assert.match(own, /there are no buddies yet/);
    assert.match(own, /Driver:<\/span> driver@softuni.bg/);
    assert.doesNotMatch(await client(server.base).html(`/trips/${id}`), /class="actions"/);

    // the driver cannot take a seat in their own car
    await driver.post(`/trips/${id}/join`, {});
    assert.equal((await Trip.findById(id)).seats, 2);

    const anna = await registered('anna@softuni.bg', 'female');
    assert.match(await anna.html(`/trips/${id}`), /Join now, 2 left/);
    assert.equal(
        (await anna.post(`/trips/${id}/join`, {})).headers.get('location'),
        `/trips/${id}`,
    );
    await anna.post(`/trips/${id}/join`, {});
    assert.match(await anna.html(`/trips/${id}`), /Already joined. Don't be late!/);

    const bob = await registered('bob@softuni.bg');
    await bob.post(`/trips/${id}/join`, {});
    const carol = await registered('carol@softuni.bg', 'female');
    assert.match(await carol.html(`/trips/${id}`), /No seats available!/);
    await carol.post(`/trips/${id}/join`, {});
    const full = await Trip.findById(id);
    assert.equal(full.seats, 0);
    assert.equal(full.buddies.length, 2);
    assert.match(await carol.html(`/trips/${id}`), /anna@softuni.bg, bob@softuni.bg/);

    assert.equal((await carol.get(`/trips/${id}/edit`)).headers.get('location'), '/');
    assert.equal((await carol.post(`/trips/${id}/delete`, {})).headers.get('location'), '/');

    assert.match(await driver.html(`/trips/${id}/edit`), /value="Varna"/);
    assert.equal(
        (
            await driver.post(`/trips/${id}/edit`, { ...trip, endPoint: 'Burgas', seats: '0' })
        ).headers.get('location'),
        `/trips/${id}`,
    );
    assert.equal((await Trip.findById(id)).endPoint, 'Burgas');
    assert.match(
        await errorOf(await driver.post(`/trips/${id}/edit`, { ...trip, price: '100' })),
        /Price must be from 1 to 50/,
    );

    const profile = await driver.html('/profile');
    assert.match(profile, /male\.svg/);
    assert.match(profile, /Trips: 1/);
    assert.match(profile, /Sofia - Burgas/);
    assert.match(
        await carol.html('/profile'),
        /female\.svg[\s\S]*Trips: 0[\s\S]*not offered any trips/,
    );

    assert.equal((await driver.post(`/trips/${id}/delete`, {})).headers.get('location'), '/trips');
    assert.equal(await Trip.findById(id), null);
    assert.match(await driver.html('/profile'), /Trips: 0/);
});

test('unknown pages and trips render 404', async () => {
    const http = client(server.base);
    assert.equal((await http.get('/nope')).status, 404);
    assert.equal((await http.get('/trips/123')).status, 404);
});
