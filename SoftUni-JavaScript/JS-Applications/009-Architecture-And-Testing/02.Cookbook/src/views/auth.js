import { login, register } from '../auth.js';
import { el } from '../dom.js';

function authPage(isRegister) {
    return (ctx) => {
        const title = isRegister ? 'Register' : 'Login';
        const form = el(
            'form',
            { onsubmit: onSubmit },
            el('label', {}, 'E-mail: ', el('input', { type: 'text', name: 'email' })),
            el('label', {}, 'Password: ', el('input', { type: 'password', name: 'password' })),
            isRegister
                ? el('label', {}, 'Repeat: ', el('input', { type: 'password', name: 'rePass' }))
                : '',
            el('input', { type: 'submit', value: title }),
        );
        ctx.render(el('article', {}, el('h2', {}, title), form));

        async function onSubmit(e) {
            e.preventDefault();
            const { email, password, rePass } = Object.fromEntries(new FormData(form));
            try {
                if (!email || !password) {
                    throw new Error('All fields are required!');
                }
                if (isRegister && password !== rePass) {
                    throw new Error("Passwords don't match!");
                }
                await (isRegister ? register : login)(email, password);
                ctx.goTo('home');
            } catch (err) {
                alert(err.message);
            }
        }
    };
}

export const loginPage = authPage(false);
export const registerPage = authPage(true);
