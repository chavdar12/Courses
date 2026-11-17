import homeController from '../controllers/homeController.js';
import authController from '../controllers/authController.js';
import postController from '../controllers/postController.js';

export default (app) => {
    app.use(homeController);
    app.use(authController);
    app.use('/posts', postController);
    app.use((req, res) => res.status(404).render('404', { title: 'Page Not Found' }));
};
