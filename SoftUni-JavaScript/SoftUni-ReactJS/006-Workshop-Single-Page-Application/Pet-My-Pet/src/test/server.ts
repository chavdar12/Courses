import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { createApp } from '../../server/server';

/** Fresh seeded server per test, on a random port. */
export async function startServer() {
    const server: Server = createApp();
    await new Promise<void>((done) => server.listen(0, done));
    return {
        url: `http://localhost:${(server.address() as AddressInfo).port}`,
        close: () => new Promise((done) => server.close(done)),
    };
}
