import { html, nothing } from 'lit-html';
import { login, register } from '../api.js';

const authTemplate = (isRegister, onSubmit) => html`
<section id="${isRegister ? 'register' : 'login'}">
    <div class="container">
        <form id="${isRegister ? 'register' : 'login'}-form" @submit=${onSubmit}>
            <h1>${isRegister ? 'Register' : 'Login'}</h1>
            <p>Username</p>
            <input type="text" placeholder="Enter Username" name="username">
            <p>Password</p>
            <input type="password" placeholder="Enter Password" name="password">
            ${isRegister ? html`
            <p>Repeat Password</p>
            <input type="password" placeholder="Repeat Password" name="repeatPass">` : nothing}
            <input type="submit" class="registerbtn" value=${isRegister ? 'Register' : 'Login'}>
        </form>
    </div>
</section>`;

function authPage(isRegister) {
    return (ctx) => {
        ctx.render(authTemplate(isRegister, onSubmit));

        async function onSubmit(e) {
            e.preventDefault();
            const { username, password, repeatPass } = Object.fromEntries(new FormData(e.target));
            try {
                if (!username.trim() || !password) {
                    throw new Error('All fields are required!');
                }
                if (isRegister && password !== repeatPass) {
                    throw new Error('Passwords don\'t match!');
                }
                await (isRegister ? register : login)(username.trim(), password);
                ctx.page.redirect('/catalog');
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const loginPage = authPage(false);
export const registerPage = authPage(true);
