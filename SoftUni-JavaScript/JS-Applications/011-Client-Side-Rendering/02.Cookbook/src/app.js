import { render } from 'lit-html';
import { getUser, logout } from './api.js';
import { homePage } from './views/home.js';
import { catalogPage } from './views/catalog.js';
import { detailsPage } from './views/details.js';
import { createPage, editPage } from './views/recipe-form.js';
import { loginPage, registerPage } from './views/auth.js';

const main = document.querySelector('main');
const views = {
    home: homePage,
    catalog: catalogPage,
    details: detailsPage,
    create: createPage,
    edit: editPage,
    login: loginPage,
    register: registerPage
};

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

/** Shows a view; `arg` is the recipe id or page number the view needs. */
function goTo(name, arg) {
    const user = getUser();
    document.getElementById('user').style.display = user ? 'inline-block' : 'none';
    document.getElementById('guest').style.display = user ? 'none' : 'inline-block';
    document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('active', a.dataset.view === name));
    return views[name]({ user, arg, goTo, render: (template) => render(template, main) });
}
