import { Schema, Types, model } from 'mongoose';
import { englishText, imageUrl } from './validators.js';

const cubeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [5, 'Name must be at least 5 characters long'],
        validate: englishText('Name'),
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minLength: [20, 'Description must be at least 20 characters long'],
        maxLength: [200, 'Description must be at most 200 characters'],
        validate: englishText('Description'),
    },
    imageUrl: { type: String, required: [true, 'Image URL is required'], validate: imageUrl },
    difficultyLevel: {
        type: Number,
        required: true,
        min: [1, 'Difficulty must be 1 to 6'],
        max: [6, 'Difficulty must be 1 to 6'],
    },
    accessories: [{ type: Types.ObjectId, ref: 'Accessory' }],
    creatorId: { type: String, required: true },
});

export default model('Cube', cubeSchema);
