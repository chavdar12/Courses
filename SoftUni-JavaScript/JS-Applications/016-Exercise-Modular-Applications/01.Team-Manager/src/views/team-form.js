import { html, nothing } from 'lit-html';
import { createTeamWithOwner, getTeam, updateTeam } from '../api.js';

const formTemplate = (title, team, error, onSubmit) => html`
<section id="team-form" class="pad-large">
    <h1>${title}</h1>
    <form @submit=${onSubmit}>
        ${error ? html`<div class="error">${error}</div>` : nothing}
        <label>Team name: <input type="text" name="name" .value=${team.name ?? ''}></label>
        <label>Logo URL: <input type="text" name="logoUrl" .value=${team.logoUrl ?? ''}></label>
        <label>Description: <textarea name="description" .value=${team.description ?? ''}></textarea></label>
        <input class="action" type="submit" value=${title}>
    </form>
</section>`;

function validate({ name, logoUrl, description }) {
    if (name.length < 4) {
        return 'Team name must be at least 4 characters.';
    }
    if (!logoUrl) {
        return 'Logo URL is required.';
    }
    if (description.length < 10) {
        return 'Description must be at least 10 characters.';
    }
    return null;
}

function formPage(title, load, save) {
    return async (ctx) => {
        if (!ctx.user) {
            return ctx.page.redirect('/login');
        }
        const team = await load(ctx);
        update(null);

        function update(error) {
            ctx.render(formTemplate(title, team, error, onSubmit));
        }

        async function onSubmit(e) {
            e.preventDefault();
            const data = Object.fromEntries(
                [...new FormData(e.target)].map(([k, v]) => [k, v.trim()]),
            );
            const error = validate(data);
            Object.assign(team, data);
            if (error) {
                return update(error);
            }
            try {
                const saved = await save(ctx, data);
                ctx.page.redirect(`/details/${saved._id}`);
            } catch (err) {
                update(err.message);
            }
        }
    };
}

export const createPage = formPage(
    'Create Team',
    () => ({}),
    (ctx, team) => createTeamWithOwner(team),
);
export const editPage = formPage(
    'Edit Team',
    (ctx) => getTeam(ctx.params.id),
    (ctx, team) => updateTeam(ctx.params.id, team),
);
