import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'node:url';
import { auth } from '../middlewares/auth.js';

export default (app) => {
    app.engine('hbs', engine({ extname: '.hbs', helpers: { eq: (a, b) => a === b } }));
    app.set('view engine', 'hbs');
    app.set('views', fileURLToPath(new URL('../views', import.meta.url)));

    app.use('/static', express.static(fileURLToPath(new URL('../static', import.meta.url))));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(auth);
};
