import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import tripController from '../controllers/tripController.js';

export default (app) => {
    app.use(homeController);
    app.use(authController);
    app.use('/trips', tripController);
    app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' }));
};
