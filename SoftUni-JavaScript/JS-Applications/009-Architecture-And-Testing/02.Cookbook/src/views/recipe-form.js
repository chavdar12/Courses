import { createRecipe, getRecipe, updateRecipe } from '../api.js';
import { el } from '../dom.js';

const field = (label, input, className = '') => el('label', { className }, `${label}: `, input);
const lines = (text) =>
    text
        .split('\n')
        .map((l) => l.trim())
        .filter(Boolean);

function formPage(title, load, save) {
    return async (ctx) => {
        const recipe = await load(ctx);
        const form = el(
            'form',
            { onsubmit: onSubmit },
            field(
                'Name',
                el('input', {
                    type: 'text',
                    name: 'name',
                    placeholder: 'Recipe name',
                    value: recipe.name ?? '',
                }),
            ),
            field(
                'Image',
                el('input', {
                    type: 'text',
                    name: 'img',
                    placeholder: 'Image URL',
                    value: recipe.img ?? '',
                }),
            ),
            field(
                'Ingredients',
                el('textarea', {
                    name: 'ingredients',
                    placeholder: 'Enter ingredients on separate lines',
                    value: (recipe.ingredients ?? []).join('\n'),
                }),
                'ml',
            ),
            field(
                'Preparation',
                el('textarea', {
                    name: 'steps',
                    placeholder: 'Enter preparation steps on separate lines',
                    value: (recipe.steps ?? []).join('\n'),
                }),
                'ml',
            ),
            el('input', { type: 'submit', value: title }),
        );
        ctx.render(el('article', {}, el('h2', {}, title), form));

        async function onSubmit(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(form));
            const changed = {
                name: data.name.trim(),
                img: data.img.trim(),
                ingredients: lines(data.ingredients),
                steps: lines(data.steps),
            };
            if (
                !changed.name ||
                !changed.img ||
                !changed.ingredients.length ||
                !changed.steps.length
            ) {
                alert('All fields are required!');
                return;
            }
            try {
                const saved = await save(ctx, changed);
                ctx.goTo('details', saved._id);
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const createPage = formPage(
    'Create Recipe',
    () => ({}),
    (ctx, recipe) => createRecipe(recipe),
);
export const editPage = formPage(
    'Edit Recipe',
    (ctx) => getRecipe(ctx.arg),
    (ctx, recipe) => updateRecipe(ctx.arg, recipe),
);
