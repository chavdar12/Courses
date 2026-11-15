import { html, nothing } from 'lit-html';
import { createComment, deleteGame, getComments, getGame } from '../api.js';

const detailsTemplate = (game, comments, isOwner, canComment, onDelete, onComment) =>
    html` <section id="game-details">
        <h1>Game Details</h1>
        <div class="info-section">
            <div class="game-header">
                <img class="game-img" src=${game.imageUrl} />
                <h1>${game.title}</h1>
                <span class="levels">MaxLevel: ${game.maxLevel}</span>
                <p class="type">${game.category}</p>
            </div>
            <p class="text">${game.summary}</p>
            <div class="details-comments">
                <h2>Comments:</h2>
                ${
                    comments.length
                        ? html`<ul>
                              ${comments.map((c) => html`<li class="comment"><p>Content: ${c.comment}</p></li>`)}
                          </ul>`
                        : html`<p class="no-comment">No comments.</p>`
                }
            </div>
            ${
                isOwner
                    ? html` <div class="buttons">
                          <a href="/edit/${game._id}" class="button">Edit</a>
                          <a href="javascript:void(0)" class="button" @click=${onDelete}>Delete</a>
                      </div>`
                    : nothing
            }
        </div>
        ${
            canComment
                ? html` <article class="create-comment">
                      <label>Add new comment:</label>
                      <form class="form" @submit=${onComment}>
                          <textarea name="comment" placeholder="Comment......"></textarea>
                          <input class="btn submit" type="submit" value="Add Comment" />
                      </form>
                  </article>`
                : nothing
        }
    </section>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const [game, comments] = await Promise.all([getGame(id), getComments(id)]);
    const isOwner = ctx.user?.id === game._ownerId;
    // Logged-in users may comment, but not on their own games.
    ctx.render(detailsTemplate(game, comments, isOwner, ctx.user && !isOwner, onDelete, onComment));

    async function onDelete() {
        if (confirm(`Delete ${game.title}?`)) {
            await deleteGame(id);
            ctx.page.redirect('/');
        }
    }

    async function onComment(e) {
        e.preventDefault();
        const comment = new FormData(e.target).get('comment').trim();
        if (!comment) {
            return;
        }
        try {
            await createComment(id, comment);
            e.target.reset();
            ctx.page.redirect(`/details/${id}`);
        } catch (err) {
            alert(err.message);
        }
    }
}
