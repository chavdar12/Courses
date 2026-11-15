import { html, nothing } from 'lit-html';
import { PAGE_SIZE, getRecipeCount, getRecipePage } from '../api.js';

export const previewTemplate = (recipe, goTo) =>
    html` <article class="preview" @click=${() => goTo('details', recipe._id)}>
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small"><img src=${recipe.img} /></div>
    </article>`;

const pagerTemplate = (page, pages, goTo) =>
    html` <header class="section-title">
        ${page > 1 ? html`<a class="pager" href="javascript:void(0)" @click=${() => goTo('catalog', page - 1)}>&lt; Prev</a>` : nothing}
        Page ${page} of ${pages}
        ${page < pages ? html`<a class="pager" href="javascript:void(0)" @click=${() => goTo('catalog', page + 1)}>Next &gt;</a>` : nothing}
    </header>`;

export async function catalogPage(ctx) {
    const page = ctx.arg ?? 1;
    const [recipes, count] = await Promise.all([getRecipePage(page), getRecipeCount()]);
    const pager = pagerTemplate(page, Math.max(1, Math.ceil(count / PAGE_SIZE)), ctx.goTo);
    ctx.render([
        pager,
        recipes.length
            ? recipes.map((r) => previewTemplate(r, ctx.goTo))
            : html`<p class="section-title">No recipes yet.</p>`,
        pager,
    ]);
}
