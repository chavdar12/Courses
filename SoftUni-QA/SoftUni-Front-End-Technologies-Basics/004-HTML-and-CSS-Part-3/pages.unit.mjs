import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = dirname(fileURLToPath(import.meta.url));
const pages = readdirSync(root, { recursive: true }).filter(
    (f) => f.endsWith('.html') && !f.startsWith('node_modules'),
);

// Only files on disk: skip web links, anchors, mail/tel and data URIs.
const isLocal = (ref) => ref && !/^([a-z]+:|\/\/|#)/i.test(ref);

for (const page of pages) {
    const dir = dirname(join(root, page));
    const html = readFileSync(join(root, page), 'utf8');
    const { document } = new JSDOM(html).window;

    test(`${page} has a title`, () => {
        assert.ok(document.title.trim(), 'missing <title>');
    });

    test(`${page} references only existing local files`, () => {
        const refs = [...document.querySelectorAll('[src], link[href], a[href]')]
            .map((el) => el.getAttribute('src') ?? el.getAttribute('href'))
            .filter(isLocal)
            .map((ref) => decodeURIComponent(ref.split(/[?#]/)[0]));
        const missing = refs.filter((ref) => !existsSync(join(dir, ref)));
        assert.deepEqual(missing, []);
    });
}

test('lesson has pages', () => assert.ok(pages.length > 0));
