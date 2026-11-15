import { Router } from 'express';
import config from '../config/config.js';
import { isAuth, isGuest } from '../middlewares/auth.js';
import { login, register } from '../services/authService.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();
const cookieOptions = { httpOnly: true, sameSite: 'lax' };

router.get('/register', isGuest, (req, res) => res.render('register', { title: 'Register' }));

router.post('/register', isGuest, async (req, res) => {
    try {
        res.cookie(config.cookieName, await register(req.body), cookieOptions);
        res.redirect('/');
    } catch (err) {
        res.status(400).render('register', {
            title: 'Register',
            username: req.body.username,
            error: errorMessage(err),
        });
    }
});

router.get('/login', isGuest, (req, res) => res.render('login', { title: 'Login' }));

router.post('/login', isGuest, async (req, res) => {
    try {
        res.cookie(config.cookieName, await login(req.body), cookieOptions);
        res.redirect('/');
    } catch (err) {
        res.status(400).render('login', {
            title: 'Login',
            username: req.body.username,
            error: errorMessage(err),
        });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(config.cookieName);
    res.redirect('/');
});

export default router;
