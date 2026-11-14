import { Schema, Types, model } from 'mongoose';

const ENGLISH_LETTERS = /^[a-zA-Z]+$/;

const userSchema = new Schema({
    firstName: {
        type: String, required: [true, 'First name is required'], trim: true,
        minLength: [3, 'First name must be at least 3 characters long'],
        match: [ENGLISH_LETTERS, 'First name may contain only English letters']
    },
    lastName: {
        type: String, required: [true, 'Last name is required'], trim: true,
        minLength: [5, 'Last name must be at least 5 characters long'],
        match: [ENGLISH_LETTERS, 'Last name may contain only English letters']
    },
    email: {
        type: String, required: [true, 'Email is required'], unique: true, trim: true,
        match: [/^[a-zA-Z]+@[a-zA-Z]+\.[a-zA-Z]+$/, 'Email must look like name@domain.extension']
    },
    // bcrypt hash; the plain password is validated in the auth service before hashing
    password: { type: String, required: true },
    myPosts: [{ type: Types.ObjectId, ref: 'Post' }]
});

export default model('User', userSchema);
