import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadPage, mockFetch, reply, settle } from '../test-utils/dom.mjs';

const page = new URL('./index.html', import.meta.url);

test('loads previews and toggles the details of the clicked recipe', async () => {
    const fetch = mockFetch({
        'GET /jsonstore/cookbook/recipes': {
            '01': { _id: '01', name: 'Easy Lasagna', img: 'assets/lasagna.jpg' },
            '02': { _id: '02', name: 'Roast Trout', img: 'assets/fish.jpg' }
        },
        'GET /jsonstore/cookbook/details/01': {
            _id: '01', name: 'Easy Lasagna', img: 'assets/lasagna.jpg', ingredients: ['pasta', 'cheese'], steps: ['bake']
        }
    });
    const { document } = await loadPage(page, { fetch });
    const previews = () => [...document.querySelectorAll('.preview h2')].map((h) => h.textContent);
    assert.deepEqual(previews(), ['Easy Lasagna', 'Roast Trout']);

    document.querySelector('.preview').click();
    await settle();
    assert.deepEqual(previews(), ['Roast Trout']);
    assert.deepEqual([...document.querySelectorAll('.ingredients li')].map((li) => li.textContent), ['pasta', 'cheese']);

    document.querySelector('main article:not(.preview)').click();
    document.querySelector('.preview').click();
    await settle();
    assert.equal(fetch.calls.filter((c) => c.path.includes('/details/')).length, 1);
});

test('shows an error when recipes cannot be loaded', async () => {
    const { document } = await loadPage(page, { fetch: mockFetch({ 'GET /jsonstore/cookbook/recipes': reply(500, {}) }) });
    assert.match(document.querySelector('main').textContent, /^Error: 500/);
});
