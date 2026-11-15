import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/User.js';
import { UserError } from '../utils/errors.js';

const createToken = (user) =>
    jwt.sign({ _id: user._id, email: user.email, gender: user.gender }, config.jwtSecret, {
        expiresIn: '2d',
    });

export const verifyToken = (token) => jwt.verify(token, config.jwtSecret);

export async function register({ email = '', password = '', repeatPassword, gender }) {
    if (password.length < 4) {
        throw new UserError('Password must be at least 4 characters long');
    }
    if (password !== repeatPassword) {
        throw new UserError('Passwords do not match');
    }
    // the unique index may still be building on a fresh database, so check explicitly too
    if (await User.exists({ email: email.trim() })) {
        throw new UserError('Email is already taken');
    }
    const user = await User.create({ email, gender, password: await bcrypt.hash(password, 10) });
    return createToken(user);
}

export async function login({ email = '', password = '' }) {
    const user = await User.findOne({ email: email.trim() });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new UserError('Invalid email or password');
    }
    return createToken(user);
}
