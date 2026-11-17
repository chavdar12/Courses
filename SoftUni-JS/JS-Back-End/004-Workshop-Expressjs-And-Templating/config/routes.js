import homeController from '../controllers/homeController.js';
import cubeController from '../controllers/cubeController.js';

export default (app) => {
    app.use(homeController);
    app.use(cubeController);
    app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' }));
};
