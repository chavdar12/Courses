import { html, nothing } from 'lit-html';
import { login, register } from '../api.js';

const authTemplate = (isRegister, onSubmit) => html`
<section id="${isRegister ? 'register' : 'login'}-page" class="auth">
    <form id="${isRegister ? 'register' : 'login'}" @submit=${onSubmit}>
        <h1>${isRegister ? 'Register' : 'Login'}</h1>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="maria@email.com">
        <label for="pass">Password:</label>
        <input type="password" id="${isRegister ? 'register' : 'login'}-password" name="password">
        ${isRegister ? html`
        <label for="con-pass">Confirm Password:</label>
        <input type="password" name="confirm-password" id="confirm-password">` : nothing}
        <input type="submit" class="btn submit" value=${isRegister ? 'Register' : 'Login'}>
    </form>
</section>`;

function authPage(isRegister) {
    return (ctx) => {
        ctx.render(authTemplate(isRegister, onSubmit));

        async function onSubmit(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            try {
                if (!data.email.trim() || !data.password) {
                    throw new Error('All fields are required!');
                }
                if (isRegister && data.password !== data['confirm-password']) {
                    throw new Error('Passwords don\'t match!');
                }
                await (isRegister ? register : login)(data.email.trim(), data.password);
                ctx.page.redirect('/');
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const loginPage = authPage(false);
export const registerPage = authPage(true);
