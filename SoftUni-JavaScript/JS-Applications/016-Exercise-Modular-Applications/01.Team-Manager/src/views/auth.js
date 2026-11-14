import { html, nothing } from 'lit-html';
import { login, register } from '../api.js';

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const authTemplate = (isRegister, error, onSubmit) => html`
<section id="${isRegister ? 'register' : 'login'}" class="pad-large">
    <h1>${isRegister ? 'Register' : 'Login'}</h1>
    <form @submit=${onSubmit}>
        ${error ? html`<div class="error">${error}</div>` : nothing}
        <label>E-mail: <input type="text" name="email"></label>
        ${isRegister ? html`<label>Username: <input type="text" name="username"></label>` : nothing}
        <label>Password: <input type="password" name="password"></label>
        ${isRegister ? html`<label>Repeat: <input type="password" name="repass"></label>` : nothing}
        <input class="action" type="submit" value=${isRegister ? 'Create Account' : 'Sign In'}>
    </form>
</section>`;

function validateRegister({ email, username, password, repass }) {
    if (!EMAIL.test(email)) {
        return 'Please enter a valid e-mail.';
    }
    if (username.trim().length < 3) {
        return 'Username must be at least 3 characters.';
    }
    if (password.length < 3) {
        return 'Password must be at least 3 characters.';
    }
    if (password !== repass) {
        return 'Passwords don\'t match.';
    }
    return null;
}

function authPage(isRegister) {
    return (ctx) => {
        update(null);

        function update(error) {
            ctx.render(authTemplate(isRegister, error, onSubmit));
        }

        async function onSubmit(e) {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.target));
            const error = isRegister ? validateRegister(data) : (!data.email || !data.password) && 'All fields are required.';
            if (error) {
                return update(error);
            }
            try {
                await (isRegister ? register(data.email, data.username.trim(), data.password) : login(data.email, data.password));
                ctx.page.redirect('/my-teams');
            } catch (err) {
                update(err.message);
            }
        }
    };
}

export const loginPage = authPage(false);
export const registerPage = authPage(true);
