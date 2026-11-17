import { Schema, Types, model } from 'mongoose';
import { imageUrl } from './validators.js';

const accessorySchema = new Schema({
    name: { type: String, required: [true, 'Name is required'], trim: true },
    imageUrl: { type: String, required: [true, 'Image URL is required'], validate: imageUrl },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [200, 'Description must be at most 200 characters'],
    },
    cubes: [{ type: Types.ObjectId, ref: 'Cube' }],
});

export default model('Accessory', accessorySchema);
