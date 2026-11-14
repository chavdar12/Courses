import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';
import { UserError } from '../utils/errors.js';

const PASSWORD = /^[a-zA-Z0-9]{8,}$/;

const createToken = (user) => jwt.sign({ _id: user._id, username: user.username }, config.jwtSecret, { expiresIn: '2d' });

export const verifyToken = (token) => jwt.verify(token, config.jwtSecret);

export async function register({ username = '', password = '', repeatPassword }) {
    if (!PASSWORD.test(password)) {
        throw new UserError('Password must be at least 8 characters of English letters and digits');
    }
    if (password !== repeatPassword) {
        throw new UserError('Passwords do not match');
    }
    // the unique index may still be building on a fresh database, so check explicitly too
    if (await User.exists({ username: username.trim() })) {
        throw new UserError('Username is already taken');
    }
    const user = await User.create({ username, password: await bcrypt.hash(password, 10) });
    return createToken(user);
}

export async function login({ username = '', password = '' }) {
    const user = await User.findOne({ username: username.trim() });
    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new UserError('Invalid username or password');
    }
    return createToken(user);
}
