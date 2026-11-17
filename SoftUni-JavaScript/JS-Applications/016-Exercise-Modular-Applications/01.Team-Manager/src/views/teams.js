import { html, nothing } from 'lit-html';
import { getMemberCounts, getMyTeams, getTeams } from '../api.js';

const teamTile = (team, count) => html`
<article class="tm-tile">
    <img src=${team.logoUrl} alt="">
    <div class="details">
        <h2>${team.name}</h2>
        <p>${team.description}</p>
        <span class="member-count">${count ?? 0} Member${count === 1 ? '' : 's'}</span>
    </div>
    <a href="/details/${team._id}" class="action">See details</a>
</article>`;

const teamsTemplate = (title, teams, counts, showCreate, empty) => html`
<section id="browse">
    <h1>${title}</h1>
    ${showCreate ? html`<a href="/create" class="action">Create Team</a>` : nothing}
    ${teams.length ? teams.map((t) => teamTile(t, counts[t._id])) : html`<p class="empty">${empty}</p>`}
</section>`;

async function withCounts(teams) {
    return [teams, await getMemberCounts(teams.map((t) => t._id))];
}

export async function browsePage(ctx) {
    const [teams, counts] = await withCounts(await getTeams());
    ctx.render(teamsTemplate('Team Browser', teams, counts, Boolean(ctx.user), 'No teams yet.'));
}

export async function myTeamsPage(ctx) {
    if (!ctx.user) {
        return ctx.page.redirect('/login');
    }
    const [teams, counts] = await withCounts(await getMyTeams(ctx.user.id));
    ctx.render(
        teamsTemplate('My Teams', teams, counts, true, 'You are not a member of any team yet.'),
    );
}
