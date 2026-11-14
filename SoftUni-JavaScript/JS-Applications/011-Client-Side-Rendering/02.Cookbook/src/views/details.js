import { html, nothing } from 'lit-html';
import { createComment, deleteRecipe, getComments, getRecipe } from '../api.js';

const detailsTemplate = (recipe, isOwner, onEdit, onDelete) => html`
<article>
    <h2>${recipe.name}</h2>
    <div class="band">
        <div class="thumb"><img src=${recipe.img}></div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>${recipe.ingredients.map((i) => html`<li>${i}</li>`)}</ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${recipe.steps.map((s) => html`<p>${s}</p>`)}
    </div>
    ${isOwner ? html`
    <div class="controls">
        <a class="actionLink" href="javascript:void(0)" @click=${onEdit}>&#x270e; Edit</a>
        <a class="actionLink" href="javascript:void(0)" @click=${onDelete}>&#x2716; Delete</a>
    </div>` : nothing}
</article>`;

const commentsTemplate = (comments, user, onComment) => html`
<div class="section-title">Comments</div>
<div class="comments">
    <ul>
        ${comments.length
        ? comments.map((c) => html`<li class="comment">${c.content}</li>`)
        : html`<li>No comments yet.</li>`}
    </ul>
    ${user ? html`
    <details>
        <summary>Add comment</summary>
        <form @submit=${onComment}>
            <textarea name="content" placeholder="Type comment"></textarea>
            <input type="submit" value="Add comment">
        </form>
    </details>` : nothing}
</div>`;

export async function detailsPage(ctx) {
    const id = ctx.arg;
    const [recipe, comments] = await Promise.all([getRecipe(id), getComments(id)]);
    update(comments);

    function update(comments) {
        ctx.render([
            detailsTemplate(recipe, ctx.user?.id === recipe._ownerId, () => ctx.goTo('edit', id), onDelete),
            commentsTemplate(comments, ctx.user, onComment)
        ]);
    }

    async function onDelete() {
        if (confirm(`Delete ${recipe.name}?`)) {
            await deleteRecipe(recipe._id);
            ctx.goTo('catalog');
        }
    }

    async function onComment(e) {
        e.preventDefault();
        const form = e.target;
        const content = new FormData(form).get('content').trim();
        if (!content) {
            return;
        }
        try {
            await createComment({ recipeId: id, content });
            form.reset();
            update(await getComments(id));
        } catch (err) {
            alert(err.message);
        }
    }
}
