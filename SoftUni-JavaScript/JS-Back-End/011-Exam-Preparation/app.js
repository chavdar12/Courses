import express from 'express';
import expressConfig from './config/express.js';
import routesConfig from './config/routes.js';

const app = express();
expressConfig(app);
routesConfig(app);

export default app;
