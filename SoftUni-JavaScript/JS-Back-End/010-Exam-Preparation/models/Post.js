import { Schema, Types, model } from 'mongoose';

const postSchema = new Schema({
    title: { type: String, required: [true, 'Title is required'], minLength: [6, 'Title must be at least 6 characters long'] },
    keyword: { type: String, required: [true, 'Keyword is required'], minLength: [6, 'Keyword must be at least 6 characters long'] },
    location: { type: String, required: [true, 'Location is required'], maxLength: [15, 'Location must be at most 15 characters long'] },
    date: {
        type: String, required: [true, 'Date is required'],
        validate: { validator: (value) => value.length === 10, message: 'Date must be exactly 10 characters, e.g. 02.02.2021' }
    },
    image: {
        type: String, required: [true, 'Image is required'],
        match: [/^https?:\/\/.+/, 'Image must start with http:// or https://']
    },
    description: { type: String, required: [true, 'Description is required'], minLength: [8, 'Description must be at least 8 characters long'] },
    author: { type: Types.ObjectId, ref: 'User', required: true },
    votes: [{ type: Types.ObjectId, ref: 'User' }],
    rating: { type: Number, default: 0 }
});

export default model('Post', postSchema);
