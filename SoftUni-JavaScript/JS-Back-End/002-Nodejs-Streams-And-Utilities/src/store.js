import { readFile, writeFile } from 'node:fs/promises';

// shortcut: whole-file read/write with no locking, fine for one user; use a real database beyond the workshop.
export const createStore = (dataDir) => ({
    read: async (name) => JSON.parse(await readFile(new URL(`${name}.json`, dataDir), 'utf8')),
    write: (name, data) =>
        writeFile(new URL(`${name}.json`, dataDir), JSON.stringify(data, null, 4)),
});
