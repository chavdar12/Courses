import { createServer } from './src/server.js';

const PORT = process.env.PORT || 3000;

createServer({
    dataDir: new URL('./data/', import.meta.url),
    contentDir: new URL('./content/', import.meta.url),
}).listen(PORT, () => console.log(`Cat Shelter is running on http://localhost:${PORT}`));
