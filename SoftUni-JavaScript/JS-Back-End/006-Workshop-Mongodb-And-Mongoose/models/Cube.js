import { Schema, Types, model } from 'mongoose';
import { imageUrl } from './validators.js';

const cubeSchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [200, 'Description must be at most 200 characters'],
    },
    imageUrl: { type: String, required: [true, 'Image URL is required'], validate: imageUrl },
    difficultyLevel: {
        type: Number,
        required: true,
        min: [1, 'Difficulty must be 1 to 6'],
        max: [6, 'Difficulty must be 1 to 6'],
    },
    accessories: [{ type: Types.ObjectId, ref: 'Accessory' }],
});

export default model('Cube', cubeSchema);
