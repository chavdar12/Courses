import { PAGE_SIZE, getRecipeCount, getRecipePage } from '../api.js';
import { el, link } from '../dom.js';

export function preview(recipe, goTo) {
    return el('article', { className: 'preview', onclick: () => goTo('details', recipe._id) },
        el('div', { className: 'title' }, el('h2', {}, recipe.name)),
        el('div', { className: 'small' }, el('img', { src: recipe.img })));
}

export const previews = (recipes, goTo) => recipes.length
    ? recipes.map((r) => preview(r, goTo))
    : [el('p', { className: 'section-title' }, 'No recipes yet.')];

const pager = (page, pages, goTo) => el('header', { className: 'section-title' },
    page > 1 ? link('< Prev', () => goTo('catalog', page - 1), 'pager') : '',
    ` Page ${page} of ${pages} `,
    page < pages ? link('Next >', () => goTo('catalog', page + 1), 'pager') : '');

export async function catalogPage(ctx) {
    const page = ctx.arg ?? 1;
    const [recipes, count] = await Promise.all([getRecipePage(page), getRecipeCount()]);
    const pages = Math.max(1, Math.ceil(count / PAGE_SIZE));
    ctx.render(pager(page, pages, ctx.goTo), previews(recipes, ctx.goTo), pager(page, pages, ctx.goTo));
}
