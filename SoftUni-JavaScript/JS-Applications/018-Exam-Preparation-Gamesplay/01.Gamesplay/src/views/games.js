import { html } from 'lit-html';
import { getGames, getRecentGames } from '../api.js';

const recentTemplate = (game) => html`
<div class="game">
    <div class="image-wrap"><img src=${game.imageUrl}></div>
    <h3>${game.title}</h3>
    <div class="rating"><span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span></div>
    <div class="data-buttons"><a href="/details/${game._id}" class="btn details-btn">Details</a></div>
</div>`;

const catalogTemplate = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src=${game.imageUrl}>
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function homePage(ctx) {
    const games = await getRecentGames();
    ctx.render(html`
<section id="welcome-world">
    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <div id="home-page">
        <h1>Latest Games</h1>
        ${games.length ? games.map(recentTemplate) : html`<p class="no-articles">No games yet</p>`}
    </div>
</section>`);
}

export async function catalogPage(ctx) {
    const games = await getGames();
    ctx.render(html`
<section id="catalog-page">
    <h1>All Games</h1>
    ${games.length ? games.map(catalogTemplate) : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`);
}
