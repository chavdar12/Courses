import page from 'page';
import { render } from 'lit-html';
import { getUser, logout } from './api.js';
import { homePage } from './views/home.js';
import { browsePage, myTeamsPage } from './views/teams.js';
import { detailsPage } from './views/details.js';
import { createPage, editPage } from './views/team-form.js';
import { loginPage, registerPage } from './views/auth.js';

const main = document.getElementById('content');

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    page.redirect('/');
});

page(decorateContext);
page('/index.html', '/');
page('/', homePage);
page('/browse', browsePage);
page('/my-teams', myTeamsPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page.start();

function decorateContext(ctx, next) {
    const user = getUser();
    document.querySelectorAll('nav .user').forEach((a) => (a.style.display = user ? '' : 'none'));
    document.querySelectorAll('nav .guest').forEach((a) => (a.style.display = user ? 'none' : ''));
    ctx.user = user;
    ctx.render = (template) => render(template, main);
    next();
}
