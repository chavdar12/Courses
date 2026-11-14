import { Schema, Types, model } from 'mongoose';
import { englishText, imageUrl } from './validators.js';

const accessorySchema = new Schema({
    name: {
        type: String, required: [true, 'Name is required'], trim: true,
        minLength: [5, 'Name must be at least 5 characters long'], validate: englishText('Name')
    },
    imageUrl: { type: String, required: [true, 'Image URL is required'], validate: imageUrl },
    description: {
        type: String, required: [true, 'Description is required'], trim: true,
        minLength: [20, 'Description must be at least 20 characters long'],
        maxLength: [200, 'Description must be at most 200 characters'], validate: englishText('Description')
    },
    cubes: [{ type: Types.ObjectId, ref: 'Cube' }]
});

export default model('Accessory', accessorySchema);
