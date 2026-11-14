import { readFile } from 'node:fs/promises';
import { Readable } from 'node:stream';

const VIEWS = new URL('../views/', import.meta.url);
const ENTITIES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ENTITIES[c]);

/** Sends views/<view>.html with every {{key}} replaced by values[key] (already-escaped HTML). */
export async function render(res, view, values = {}, status = 200) {
    const html = await readFile(new URL(`${view}.html`, VIEWS), 'utf8');
    res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html.replace(/{{(\w+)}}/g, (_, key) => values[key] ?? ''));
}

export function redirect(res, location = '/') {
    res.writeHead(302, { Location: location });
    res.end();
}

/** Parses urlencoded and multipart bodies with the platform's own FormData parser. */
export function readForm(req) {
    return new Request('http://localhost', {
        method: 'POST', headers: req.headers, body: Readable.toWeb(req), duplex: 'half'
    }).formData();
}
