import app from './app.js';
import config from './config/config.js';
import connectDatabase from './config/database.js';

await connectDatabase();
app.listen(config.port, () =>
    console.log(`Wildlife Photography is running on http://localhost:${config.port}`),
);
