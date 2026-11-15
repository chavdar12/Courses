import { getRecent } from '../api.js';
import { el, link } from '../dom.js';
import { previews } from './catalog.js';

export async function homePage(ctx) {
    const recipes = await getRecent();
    ctx.render(
        el('section', { className: 'hero' }, el('h2', {}, 'Welcome to My Cookbook')),
        el('header', { className: 'section-title' }, 'Recently added recipes'),
        previews(recipes, ctx.goTo),
        el(
            'footer',
            { className: 'section-title' },
            link('Browse all recipes', () => ctx.goTo('catalog'), 'pager'),
        ),
    );
}
