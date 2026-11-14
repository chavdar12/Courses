import { readFile } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

export const CONTENT_TYPES = {
    '.css': 'text/css', '.js': 'text/javascript', '.html': 'text/html', '.json': 'application/json',
    '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml'
};

export const staticHandler = ({ contentDir }) => async (req, res, url) => {
    if (!url.pathname.startsWith('/content/') || req.method !== 'GET') {
        return false;
    }
    const root = fileURLToPath(contentDir);
    const file = resolve(root, '.' + decodeURIComponent(url.pathname.slice('/content'.length)));
    const type = CONTENT_TYPES[extname(file).toLowerCase()];
    if (!file.startsWith(root.endsWith(sep) ? root : root + sep) || !type) {
        return false;
    }
    try {
        // read as a Buffer: images break if decoded as utf8
        const data = await readFile(file);
        res.writeHead(200, { 'Content-Type': type });
        res.end(data);
        return true;
    } catch {
        return false;
    }
};
