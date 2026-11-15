import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
        minLength: [5, 'Username must be at least 5 characters long'],
        match: [/^[a-zA-Z0-9]+$/, 'Username may contain only English letters and digits'],
    },
    // bcrypt hash; the plain password is validated in the auth service before hashing
    password: { type: String, required: true },
});

export default model('User', userSchema);
