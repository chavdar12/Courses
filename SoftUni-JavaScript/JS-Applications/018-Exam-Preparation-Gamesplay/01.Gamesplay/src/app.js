import page from 'page';
import { render } from 'lit-html';
import { getUser, logout } from './api.js';
import { catalogPage, homePage } from './views/games.js';
import { detailsPage } from './views/details.js';
import { createPage, editPage } from './views/game-form.js';
import { loginPage, registerPage } from './views/auth.js';

const main = document.getElementById('main-content');

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
});

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page.start();

function decorateContext(ctx, next) {
    const user = getUser();
    document.getElementById('user').style.display = user ? '' : 'none';
    document.getElementById('guest').style.display = user ? 'none' : '';
    ctx.user = user;
    ctx.render = (template) => render(template, main);
    next();
}
