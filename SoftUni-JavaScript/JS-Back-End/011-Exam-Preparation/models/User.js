import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Email is required'], unique: true, trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email must look like username@domain.bg']
    },
    // bcrypt hash; the plain password is validated in the auth service before hashing
    password: { type: String, required: true },
    gender: {
        type: String, required: [true, 'Gender is required'],
        enum: { values: ['male', 'female'], message: 'Gender must be male or female' }
    },
    tripsHistory: [{ type: Types.ObjectId, ref: 'Trip' }]
});

export default model('User', userSchema);
