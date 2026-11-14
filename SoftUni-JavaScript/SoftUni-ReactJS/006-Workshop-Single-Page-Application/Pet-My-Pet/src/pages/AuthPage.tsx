import type {FormEvent} from 'react';
import {Link, useNavigate} from 'react-router';
import {login, register} from '../api';
import {useAuth} from '../auth';

export default function AuthPage({mode}: {mode: 'login' | 'register'}) {
    const {setUser} = useAuth();
    const navigate = useNavigate();
    const isLogin = mode === 'login';

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = String(form.get('email') ?? '').trim();
        const password = String(form.get('password') ?? '');
        if (!email || !password) return alert('All fields are required!');
        try {
            setUser(await (isLogin ? login : register)(email, password));
            navigate('/');
        } catch (err) {
            alert((err as Error).message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <label>Email<input name="email" type="email"/></label>
            <label>Password<input name="password" type="password"/></label>
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            {isLogin
                ? <p>No account? <Link to="/register">Register</Link></p>
                : <p>Have an account? <Link to="/login">Login</Link></p>}
        </form>
    );
}
