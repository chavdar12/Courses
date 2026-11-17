import page from 'page';
import { render } from 'lit-html';
import { getUser, logout } from './api.js';
import { homePage } from './views/home.js';
import { catalogPage, myListingsPage, searchPage } from './views/listings.js';
import { detailsPage } from './views/details.js';
import { createPage, editPage } from './views/car-form.js';
import { loginPage, registerPage } from './views/auth.js';

const main = document.getElementById('site-content');

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
});

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/search', searchPage);
page('/my-listings', myListingsPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page.start();

function decorateContext(ctx, next) {
    const user = getUser();
    document.getElementById('profile').style.display = user ? '' : 'none';
    document.getElementById('guest').style.display = user ? 'none' : '';
    document.getElementById('welcome').textContent = user ? `Welcome ${user.username}` : '';
    document
        .querySelectorAll('nav a')
        .forEach((a) => a.classList.toggle('active', a.getAttribute('href') === ctx.pathname));
    ctx.user = user;
    ctx.render = (template) => render(template, main);
    next();
}
