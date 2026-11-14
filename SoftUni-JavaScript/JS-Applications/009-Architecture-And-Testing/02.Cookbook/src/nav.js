// Navigation and view switching: views receive ctx = { user, arg, goTo, render }.
import { getUser } from './auth.js';
import { render } from './dom.js';

const views = {};

export function registerViews(map) {
    Object.assign(views, map);
}

/** Shows a view; `arg` is the recipe id or page number the view needs. */
export function goTo(name, arg) {
    const user = getUser();
    document.getElementById('user').style.display = user ? 'inline-block' : 'none';
    document.getElementById('guest').style.display = user ? 'none' : 'inline-block';
    document.querySelectorAll('nav a').forEach((a) => a.classList.toggle('active', a.dataset.view === name));
    return views[name]({ user, arg, goTo, render: (...nodes) => render(document.querySelector('main'), ...nodes) });
}
