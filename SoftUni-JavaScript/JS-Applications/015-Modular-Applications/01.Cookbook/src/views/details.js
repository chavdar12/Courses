import { html, nothing } from 'lit-html';
import {
    createComment,
    deleteComment,
    deleteRecipe,
    getComments,
    getRecipe,
    updateComment,
} from '../api.js';

const detailsTemplate = (recipe, isOwner, onDelete) =>
    html` <article>
        <h2>${recipe.name}</h2>
        <div class="band">
            <div class="thumb"><img src=${recipe.img} /></div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.ingredients.map((i) => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${recipe.steps.map((s) => html`<p>${s}</p>`)}
        </div>
        ${
            isOwner
                ? html` <div class="controls">
                      <a class="actionLink" href="/edit/${recipe._id}">&#x270e; Edit</a>
                      <a class="actionLink" href="javascript:void(0)" @click=${onDelete}
                          >&#x2716; Delete</a
                      >
                  </div>`
                : nothing
        }
    </article>`;

const commentTemplate = (comment, user, editingId, actions) => {
    if (comment._id === editingId) {
        return html` <li class="comment">
            <form @submit=${(e) => actions.onSave(e, comment)}>
                <textarea name="content" .value=${comment.content}></textarea>
                <input type="submit" value="Save" />
                <button type="button" @click=${actions.onCancel}>Cancel</button>
            </form>
        </li>`;
    }
    return html` <li class="comment">
        ${comment.content}
        ${
            user && user.id === comment._ownerId
                ? html` <span class="controls">
                      <button @click=${() => actions.onEdit(comment)}>Edit</button>
                      <button @click=${() => actions.onDeleteComment(comment)}>Delete</button>
                  </span>`
                : nothing
        }
    </li>`;
};

const commentsTemplate = (comments, user, editingId, actions) =>
    html` <div class="section-title">Comments</div>
        <div class="comments">
            <ul>
                ${
                    comments.length
                        ? comments.map((c) => commentTemplate(c, user, editingId, actions))
                        : html`<li>No comments yet.</li>`
                }
            </ul>
            ${
                user
                    ? html` <details>
                          <summary>Add comment</summary>
                          <form @submit=${actions.onComment}>
                              <textarea name="content" placeholder="Type comment"></textarea>
                              <input type="submit" value="Add comment" />
                          </form>
                      </details>`
                    : nothing
            }
        </div>`;

export async function detailsPage(ctx) {
    const id = ctx.params.id;
    const [recipe, initialComments] = await Promise.all([getRecipe(id), getComments(id)]);
    let comments = initialComments;
    let editingId = null;
    const actions = { onComment, onEdit, onCancel, onSave, onDeleteComment };
    update();

    function update() {
        ctx.render([
            detailsTemplate(recipe, ctx.user?.id === recipe._ownerId, onDelete),
            commentsTemplate(comments, ctx.user, editingId, actions),
        ]);
    }

    async function reload() {
        editingId = null;
        comments = await getComments(id);
        update();
    }

    async function onDelete() {
        if (confirm(`Delete ${recipe.name}?`)) {
            await deleteRecipe(recipe._id);
            ctx.page.redirect('/catalog');
        }
    }

    // Shared by add and edit: reads the textarea, ignores blanks, reports server errors.
    async function submitComment(form, save) {
        const content = new FormData(form).get('content').trim();
        if (!content) {
            return;
        }
        try {
            await save(content);
            form.reset();
            await reload();
        } catch (err) {
            alert(err.message);
        }
    }

    function onComment(e) {
        e.preventDefault();
        return submitComment(e.target, (content) => createComment({ recipeId: id, content }));
    }

    function onEdit(comment) {
        editingId = comment._id;
        update();
    }

    function onCancel() {
        editingId = null;
        update();
    }

    function onSave(e, comment) {
        e.preventDefault();
        return submitComment(e.target, (content) =>
            updateComment(comment._id, { recipeId: id, content }),
        );
    }

    async function onDeleteComment(comment) {
        if (confirm('Delete this comment?')) {
            await deleteComment(comment._id);
            await reload();
        }
    }
}
