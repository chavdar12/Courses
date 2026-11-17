import { logout } from './auth.js';
import { goTo, registerViews } from './nav.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage, editPage } from './views/recipe-form.js';
import { loginPage, registerPage } from './views/auth.js';

registerViews({
    home: homePage,
    catalog: catalogPage,
    details: detailsPage,
    create: createPage,
    edit: editPage,
    login: loginPage,
    register: registerPage,
});

document.querySelector('header').addEventListener('click', (e) => {
    const view = e.target.dataset.view;
    if (view) {
        e.preventDefault();
        goTo(view);
    }
});
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    goTo('home');
});

goTo('home');
