import { html } from 'lit-html';

export function homePage(ctx) {
    ctx.render(
        html` <section id="home" class="hero">
            <h1>Build Your Team</h1>
            <p>Create teams, invite friends and manage memberships – all in one place.</p>
            ${
                ctx.user
                    ? html`<a href="/browse" class="action">Browse Teams</a>`
                    : html`<a href="/register" class="action">Sign Up Now</a>`
            }
        </section>`,
    );
}
