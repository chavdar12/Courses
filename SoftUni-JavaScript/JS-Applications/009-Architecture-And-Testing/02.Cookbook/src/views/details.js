import { deleteRecipe, getRecipe } from '../api.js';
import { el, link } from '../dom.js';

export async function detailsPage(ctx) {
    const recipe = await getRecipe(ctx.arg);
    const isOwner = ctx.user?.id === recipe._ownerId;

    ctx.render(el('article', {},
        el('h2', {}, recipe.name),
        el('div', { className: 'band' },
            el('div', { className: 'thumb' }, el('img', { src: recipe.img })),
            el('div', { className: 'ingredients' },
                el('h3', {}, 'Ingredients:'),
                el('ul', {}, recipe.ingredients.map((i) => el('li', {}, i))))),
        el('div', { className: 'description' },
            el('h3', {}, 'Preparation:'),
            recipe.steps.map((s) => el('p', {}, s))),
        isOwner ? el('div', { className: 'controls' },
            link('✎ Edit', () => ctx.goTo('edit', recipe._id), 'actionLink'),
            link('✖ Delete', onDelete, 'actionLink')) : ''));

    async function onDelete() {
        if (confirm(`Delete ${recipe.name}?`)) {
            await deleteRecipe(recipe._id);
            ctx.goTo('catalog');
        }
    }
}
