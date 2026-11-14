import { html } from 'lit-html';
import { getRecent } from '../api.js';
import { previewTemplate } from './catalog.js';

export async function homePage(ctx) {
    const recipes = await getRecent();
    ctx.render(html`
<section class="hero">
    <h2>Welcome to My Cookbook</h2>
</section>
<header class="section-title">Recently added recipes</header>
${recipes.length ? recipes.map((r) => previewTemplate(r, ctx.goTo)) : html`<p class="section-title">No recipes yet.</p>`}
<footer class="section-title">
    <a class="pager" href="javascript:void(0)" @click=${() => ctx.goTo('catalog')}>Browse all recipes</a>
</footer>`);
}
