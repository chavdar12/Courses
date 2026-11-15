import { html } from 'lit-html';

export function homePage(ctx) {
    ctx.render(
        html` <section id="main">
            <div id="intro" class="container">
                <h1>Welcome to CarTube</h1>
                <p>Find the car of your dreams or list your own.</p>
                <a href="/catalog" class="button-car">Listings</a>
            </div>
        </section>`,
    );
}
