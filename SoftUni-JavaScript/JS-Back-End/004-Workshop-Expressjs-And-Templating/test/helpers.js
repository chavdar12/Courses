import { once } from 'node:events';

/** Starts the app on a free port; returns its base URL and a close function. */
export async function start(app) {
    const server = app.listen(0);
    await once(server, 'listening');
    return { base: `http://localhost:${server.address().port}`, close: () => server.close() };
}

/** fetch bound to base that never follows redirects and keeps cookies like a browser would. */
export function client(base) {
    let cookies = {};
    const request = async (path, { form, ...options } = {}) => {
        const res = await fetch(base + path, {
            redirect: 'manual',
            ...options,
            method: form ? 'POST' : options.method,
            body: form ? new URLSearchParams(form) : options.body,
            headers: { cookie: Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ') }
        });
        for (const header of res.headers.getSetCookie()) {
            const [pair] = header.split(';');
            const [name, value] = pair.split('=');
            cookies = { ...cookies, [name]: value };
        }
        return res;
    };
    request.get = (path) => request(path);
    request.post = (path, form) => request(path, { form });
    request.html = async (path) => (await request(path)).text();
    return request;
}
