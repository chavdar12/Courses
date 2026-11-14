import express from 'express';
import { engine } from 'express-handlebars';
import { fileURLToPath } from 'node:url';

export default (app) => {
    app.engine('hbs', engine({ extname: '.hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', fileURLToPath(new URL('../views', import.meta.url)));

    app.use('/static', express.static(fileURLToPath(new URL('../static', import.meta.url))));
    app.use(express.urlencoded({ extended: false }));
};
