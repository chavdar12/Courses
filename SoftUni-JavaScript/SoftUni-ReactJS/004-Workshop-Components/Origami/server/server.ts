// Stand-in for the workshop's Express + MongoDB API: same route and response shape, data in memory.
import { createServer } from 'node:http';

export const posts = [
    {
        _id: '1',
        description: 'Folding a crane takes 21 steps and a lot of patience.',
        author: { username: 'pesho' },
    },
    {
        _id: '2',
        description: 'Today I made my first paper frog. It even jumps!',
        author: { username: 'maria' },
    },
    {
        _id: '3',
        description: 'Square paper, sharp creases, no glue - that is origami.',
        author: { username: 'gosho' },
    },
];

export const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.method === 'GET' && req.url?.replace(/\/$/, '') === '/api/origami') {
        res.writeHead(200, { 'Content-Type': 'application/json' }).end(JSON.stringify(posts));
        return;
    }
    res.writeHead(404).end();
});

if (import.meta.main) {
    const port = Number(process.env.PORT ?? 9999);
    server.listen(port, () => console.log(`Origami API on http://localhost:${port}/api/origami`));
}
