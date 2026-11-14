import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../app.js';
import Post from '../models/Post.js';
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

const post = {
    title: 'Lion at dawn',
    keyword: 'Savanna',
    location: 'Kenya',
    date: '02.02.2021',
    image: 'https://example.com/lion.jpg',
    description: 'A lion waking up at dawn'
};

async function registered(email) {
    const http = client(server.base);
    const res = await http.post('/register', {
        firstName: 'Petar', lastName: 'Petrov', email, password: '1234', repeatPassword: '1234'
    });
    assert.equal(res.status, 302, `register ${email}`);
    return http;
}

const errorOf = async (res) => (await res.text()).match(/<div class="error-container">\s*<p>([^<]*)/)?.[1];

test('register logs in with a hashed password and the user navigation', async () => {
    const http = await registered('petar@softuni.bg');
    assert.match((await User.findOne({ email: 'petar@softuni.bg' })).password, /^\$2b\$/);
    assert.match(await http.html('/'), /Posts of petar@softuni.bg/);

    await http.get('/logout');
    assert.match(await http.html('/'), /href="\/login"/);
    assert.equal((await http.post('/login', { email: 'petar@softuni.bg', password: '1234' })).status, 302);
    assert.match(await http.html('/'), /Logout/);
});

test('register and login validation', async () => {
    const http = client(server.base);
    const valid = { firstName: 'Maria', lastName: 'Ivanova', email: 'maria@abv.bg', password: '1234', repeatPassword: '1234' };
    const cases = [
        [{ firstName: 'Mi' }, /First name must be at least 3/],
        [{ firstName: 'Mar1a' }, /First name may contain only English letters/],
        [{ lastName: 'Iva' }, /Last name must be at least 5/],
        [{ email: 'maria@abv' }, /Email must look like/],
        [{ email: 'mar1a@abv.bg' }, /Email must look like/],
        [{ password: '123', repeatPassword: '123' }, /Password must be at least 4/],
        [{ repeatPassword: '4321' }, /Passwords do not match/],
        [{ email: 'petar@softuni.bg' }, /Email is already taken/]
    ];
    for (const [change, message] of cases) {
        const res = await http.post('/register', { ...valid, ...change });
        assert.equal(res.status, 400);
        assert.match(await errorOf(res), message);
    }
    assert.match(await errorOf(await http.post('/login', { email: 'petar@softuni.bg', password: 'nope' })), /Invalid email or password/);
});

test('route guards redirect guests to login and users home', async () => {
    const guest = client(server.base);
    for (const path of ['/posts/create', '/posts/mine', '/logout']) {
        assert.equal((await guest.get(path)).headers.get('location'), '/login', path);
    }
    assert.equal((await guest.get('/posts')).status, 200);

    const user = await registered('guard@softuni.bg');
    assert.equal((await user.get('/login')).headers.get('location'), '/');
    assert.equal((await user.get('/register')).headers.get('location'), '/');
});

test('post validation', async () => {
    const http = await registered('validate@softuni.bg');
    const cases = [
        [{ title: 'Lion' }, /Title must be at least 6/],
        [{ keyword: 'Cats' }, /Keyword must be at least 6/],
        [{ location: 'Somewhere very far away' }, /Location must be at most 15/],
        [{ date: '2.2.2021' }, /Date must be exactly 10/],
        [{ image: 'lion.jpg' }, /Image must start with http/],
        [{ description: 'Short' }, /Description must be at least 8/]
    ];
    for (const [change, message] of cases) {
        assert.match(await errorOf(await http.post('/posts/create', { ...post, ...change })), message);
    }
});

test('create, list, details, vote, edit and delete a post', async () => {
    assert.match(await client(server.base).html('/posts'), /No posts yet!/);

    const author = await registered('author@softuni.bg');
    const created = await author.post('/posts/create', post);
    assert.equal(created.headers.get('location'), '/posts');
    const saved = await Post.findOne({ title: post.title });
    const authorDoc = await User.findOne({ email: 'author@softuni.bg' });
    assert.deepEqual(authorDoc.myPosts, [saved._id], 'post is added to My Posts');
    const id = saved._id;

    assert.match(await author.html('/posts'), new RegExp(`href="/posts/${id}"`));
    assert.match(await author.html('/posts/mine'), /Rating: 0/);
    const authorView = await author.html(`/posts/${id}`);
    assert.match(authorView, /Author:<\/span> Petar Petrov/);
    assert.match(authorView, /Edit/);
    assert.doesNotMatch(authorView, /UpVote/);
    assert.match(authorView, /No one has voted yet/);

    const guestView = await client(server.base).html(`/posts/${id}`);
    assert.doesNotMatch(guestView, /Edit|UpVote|Thanks For Voting/);

    // the author cannot vote on their own post even by posting directly
    await author.post(`/posts/${id}/vote/up`, {});
    assert.equal((await Post.findById(id)).rating, 0);

    const voter1 = await registered('first@softuni.bg');
    assert.match(await voter1.html(`/posts/${id}`), /UpVote \+1/);
    assert.equal((await voter1.post(`/posts/${id}/vote/up`, {})).headers.get('location'), `/posts/${id}`);
    await voter1.post(`/posts/${id}/vote/up`, {});
    assert.match(await voter1.html(`/posts/${id}`), /Thanks For Voting/);

    const voter2 = await registered('second@softuni.bg');
    await voter2.post(`/posts/${id}/vote/down`, {});
    await voter2.post(`/posts/${id}/vote/up`, {});
    const voted = await voter2.html(`/posts/${id}`);
    assert.match(voted, /Total rating of votes:<\/span> 0/);
    assert.match(voted, /first@softuni.bg, second@softuni.bg/);

    assert.equal((await voter2.get(`/posts/${id}/edit`)).headers.get('location'), '/');
    assert.equal((await voter2.post(`/posts/${id}/delete`, {})).headers.get('location'), '/');

    assert.match(await author.html(`/posts/${id}/edit`), /value="Lion at dawn"/);
    const edited = await author.post(`/posts/${id}/edit`, { ...post, location: 'Tanzania' });
    assert.equal(edited.headers.get('location'), `/posts/${id}`);
    assert.equal((await Post.findById(id)).location, 'Tanzania');
    assert.match(await errorOf(await author.post(`/posts/${id}/edit`, { ...post, date: 'today' })), /Date must be exactly 10/);

    assert.equal((await author.post(`/posts/${id}/delete`, {})).headers.get('location'), '/posts');
    assert.equal(await Post.findById(id), null);
    assert.deepEqual((await User.findById(authorDoc._id)).myPosts, []);
    assert.match(await author.html('/posts/mine'), /You have no posts yet!/);
});

test('unknown pages and posts render 404', async () => {
    const http = client(server.base);
    assert.equal((await http.get('/nope')).status, 404);
    assert.equal((await http.get('/posts/123')).status, 404);
    assert.equal((await http.get('/posts/000000000000000000000000')).status, 404);
});
