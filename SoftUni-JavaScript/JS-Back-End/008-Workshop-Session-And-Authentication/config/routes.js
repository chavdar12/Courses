import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import cubeController from '../controllers/cubeController.js';
import accessoryController from '../controllers/accessoryController.js';

export default (app) => {
    app.use(homeController);
    app.use(authController);
    app.use(cubeController);
    app.use(accessoryController);
    app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' }));
};
