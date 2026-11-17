import app from './app.js';
import config from './config/config.js';
import connectDatabase from './config/database.js';

await connectDatabase();
app.listen(config.port, () => console.log(`Cubicle is running on http://localhost:${config.port}`));
