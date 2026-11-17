import config from '../config/config.js';
import { verifyToken } from '../services/authService.js';

/** Reads the JWT cookie into req.user and exposes it to every view. */
export function auth(req, res, next) {
    const token = req.cookies[config.cookieName];
    if (token) {
        try {
            req.user = verifyToken(token);
            res.locals.user = req.user;
        } catch {
            res.clearCookie(config.cookieName);
        }
    }
    next();
}

export const isAuth = (req, res, next) => (req.user ? next() : res.redirect('/login'));

export const isGuest = (req, res, next) => (req.user ? res.redirect('/') : next());
