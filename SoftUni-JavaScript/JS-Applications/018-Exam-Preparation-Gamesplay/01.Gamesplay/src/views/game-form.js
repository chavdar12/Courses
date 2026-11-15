import { html } from 'lit-html';
import { createGame, getGame, updateGame } from '../api.js';

const formTemplate = (title, game, onSubmit) =>
    html` <section id="${title.toLowerCase()}-page" class="auth">
        <form id="${title.toLowerCase()}" @submit=${onSubmit}>
            <h1>${title} Game</h1>
            <label for="title">Legendary title:</label>
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter game title..."
                .value=${game.title ?? ''}
            />
            <label for="category">Category:</label>
            <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter game category..."
                .value=${game.category ?? ''}
            />
            <label for="levels">MaxLevel:</label>
            <input
                type="number"
                id="maxLevel"
                name="maxLevel"
                min="1"
                placeholder="1"
                .value=${game.maxLevel ?? ''}
            />
            <label for="game-img">Image:</label>
            <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                placeholder="Upload a photo..."
                .value=${game.imageUrl ?? ''}
            />
            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value=${game.summary ?? ''}></textarea>
            <input
                class="btn submit"
                type="submit"
                value="${title === 'Create' ? 'Create Game' : 'Edit Game'}"
            />
        </form>
    </section>`;

function formPage(title, load, save) {
    return async (ctx) => {
        if (!ctx.user) {
            return ctx.page.redirect('/login');
        }
        ctx.render(formTemplate(title, await load(ctx), onSubmit));

        async function onSubmit(e) {
            e.preventDefault();
            const game = Object.fromEntries(
                [...new FormData(e.target)].map(([k, v]) => [k, v.trim()]),
            );
            try {
                if (Object.values(game).some((v) => !v)) {
                    throw new Error('All fields are required!');
                }
                await save(ctx, game);
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const createPage = formPage(
    'Create',
    () => ({}),
    async (ctx, game) => {
        await createGame(game);
        ctx.page.redirect('/');
    },
);

export const editPage = formPage(
    'Edit',
    (ctx) => getGame(ctx.params.id),
    async (ctx, game) => {
        await updateGame(ctx.params.id, game);
        ctx.page.redirect(`/details/${ctx.params.id}`);
    },
);
