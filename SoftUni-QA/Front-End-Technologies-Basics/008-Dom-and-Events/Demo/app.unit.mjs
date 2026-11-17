import { test } from 'node:test';
import assert from 'node:assert/strict';
import { openPage, click } from '../test-utils.mjs';

const page = new URL('./index.html', import.meta.url);

test('creates the child inside the parent', async () => {
    const { document } = await openPage(page);
    const child = document.getElementById('childElement');
    assert.equal(child.parentElement.id, 'parentElement');
    assert.equal(child.textContent, 'Child');
});

test('HTMLCollection is live, NodeList is static', async () => {
    const window = await openPage(page);
    const { document } = window;
    assert.equal(document.getElementById('counts').textContent, 'live: 2, static: 2');
    click(window, document.getElementById('addBox'));
    assert.equal(document.getElementById('counts').textContent, 'live: 3, static: 2');
    assert.equal(document.querySelectorAll('.box')[2].textContent, 'Box 3');
});

test('click updates the child text and the button', async () => {
    const window = await openPage(page);
    const { document } = window;
    click(window, document.getElementById('button'));
    assert.equal(document.getElementById('childElement').textContent, 'UpdatedChild');
    assert.equal(document.getElementById('button').textContent, 'Updated');
});

test('removeChild removes the child and is safe to repeat', async () => {
    const window = await openPage(page);
    const { document } = window;
    click(window, document.getElementById('removeChild'));
    click(window, document.getElementById('removeChild'));
    assert.equal(document.getElementById('childElement'), null);
    assert.equal(window.pageErrors.length, 0);
});
