import { html, nothing } from 'lit-html';
import { PAGE_SIZE, getRecipeCount, getRecipePage, searchRecipes } from '../api.js';

export const previewTemplate = (recipe) =>
    html` <a class="card" href="/details/${recipe._id}">
        <article class="preview">
            <div class="title">
                <h2>${recipe.name}</h2>
            </div>
            <div class="small"><img src=${recipe.img} /></div>
        </article>
    </a>`;

const searchTemplate = (search, onSearch) =>
    html` <div class="section-title">
        <form @submit=${onSearch}>
            <input type="text" name="search" placeholder="Search recipes" .value=${search} />
            <input type="submit" value="Search" />
        </form>
    </div>`;

const pagerTemplate = (page, pages) =>
    html` <header class="section-title">
        ${page > 1 ? html`<a class="pager" href="/catalog?page=${page - 1}">&lt; Prev</a>` : nothing}
        Page ${page} of ${pages}
        ${page < pages ? html`<a class="pager" href="/catalog?page=${page + 1}">Next &gt;</a>` : nothing}
    </header>`;

const listTemplate = (recipes) =>
    recipes.length
        ? recipes.map(previewTemplate)
        : html`<p class="section-title">No recipes found.</p>`;

export async function catalogPage(ctx) {
    const query = new URLSearchParams(ctx.querystring);
    const search = query.get('search')?.trim() ?? '';

    if (search) {
        ctx.render([searchTemplate(search, onSearch), listTemplate(await searchRecipes(search))]);
        return;
    }

    const page = Math.max(1, Number(query.get('page')) || 1);
    const [recipes, count] = await Promise.all([getRecipePage(page), getRecipeCount()]);
    const pager = pagerTemplate(page, Math.max(1, Math.ceil(count / PAGE_SIZE)));
    ctx.render([searchTemplate('', onSearch), pager, listTemplate(recipes), pager]);

    function onSearch(e) {
        e.preventDefault();
        const term = new FormData(e.target).get('search').trim();
        ctx.page.show(term ? `/catalog?search=${encodeURIComponent(term)}` : '/catalog');
    }
}
