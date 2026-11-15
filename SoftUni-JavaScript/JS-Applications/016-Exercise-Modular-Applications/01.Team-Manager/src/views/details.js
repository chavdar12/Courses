import { html, nothing } from 'lit-html';
import { approve, getMemberships, getTeam, removeMembership, requestJoin } from '../api.js';

// What the current user can do on this page: guest, owner, member, pending or none.
function roleOf(user, team, own) {
    if (!user) {
        return 'guest';
    }
    if (user.id === team._ownerId) {
        return 'owner';
    }
    return own?.status ?? 'none';
}

const actionsTemplate = (team, role, own, on) => {
    switch (role) {
        case 'owner':
            return html`<a href="/edit/${team._id}" class="action">Edit team</a>`;
        case 'none':
            return html`<button class="action" @click=${on.join}>Join team</button>`;
        case 'member':
            return html`<button class="action invert" @click=${() => on.remove(own, 'Leave team?')}>
                Leave team
            </button>`;
        case 'pending':
            return html`Membership pending.
                <button class="action invert" @click=${() => on.remove(own, 'Cancel request?')}>
                    Cancel request
                </button>`;
        default:
            return nothing;
    }
};

const detailsTemplate = (team, members, pending, role, own, on) =>
    html` <section id="team-home" class="tm-preview">
        <article class="team-info">
            <img src=${team.logoUrl} alt="" />
            <h1>${team.name}</h1>
            <p>${team.description}</p>
            <span class="member-count"
                >${members.length} Member${members.length === 1 ? '' : 's'}</span
            >
            <div class="actions">${actionsTemplate(team, role, own, on)}</div>
        </article>
        <div class="member-list">
            <h3>Members</h3>
            <ul>
                ${members.map(
                    (m) =>
                        html` <li>
                            <span class="name">${m.user.username}</span>
                            ${
                                role === 'owner' && m._ownerId !== team._ownerId
                                    ? html`<button
                                          class="tm-control"
                                          @click=${() => on.remove(m, `Remove ${m.user.username}?`)}
                                      >
                                          Remove from team
                                      </button>`
                                    : nothing
                            }
                        </li>`,
                )}
            </ul>
        </div>
        ${
            role === 'owner'
                ? html` <div class="pending-list">
                      <h3>Membership Requests</h3>
                      <ul>
                          ${pending.map(
                              (m) =>
                                  html` <li>
                                      <span class="name">${m.user.username}</span>
                                      <span>
                                          <button class="tm-control" @click=${() => on.approve(m)}>
                                              Approve
                                          </button>
                                          <button class="tm-control" @click=${() => on.remove(m)}>
                                              Decline
                                          </button>
                                      </span>
                                  </li>`,
                          )}
                      </ul>
                  </div>`
                : nothing
        }
    </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const on = {
        join: () => act(() => requestJoin(id)),
        approve: (m) => act(() => approve(m)),
        remove,
    };
    await load();

    async function load() {
        const [team, memberships] = await Promise.all([getTeam(id), getMemberships(id)]);
        const own = memberships.find((m) => m._ownerId === ctx.user?.id);
        const members = memberships.filter((m) => m.status === 'member');
        const pending = memberships.filter((m) => m.status === 'pending');
        ctx.render(detailsTemplate(team, members, pending, roleOf(ctx.user, team, own), own, on));
    }

    async function act(action) {
        try {
            await action();
        } catch (err) {
            alert(err.message);
        }
        await load();
    }

    function remove(membership, question) {
        if (!question || confirm(question)) {
            return act(() => removeMembership(membership._id));
        }
    }
}
