import { Schema, Types, model } from 'mongoose';

const tripSchema = new Schema({
    startPoint: {
        type: String,
        required: [true, 'Starting point is required'],
        minLength: [4, 'Starting point must be at least 4 characters long'],
    },
    endPoint: {
        type: String,
        required: [true, 'End point is required'],
        minLength: [4, 'End point must be at least 4 characters long'],
    },
    date: { type: String, required: [true, 'Date is required'] },
    time: { type: String, required: [true, 'Time is required'] },
    carImage: {
        type: String,
        required: [true, 'Car image is required'],
        match: [/^https?:\/\/.+/, 'Car image must start with http:// or https://'],
    },
    carBrand: {
        type: String,
        required: [true, 'Car brand is required'],
        minLength: [4, 'Car brand must be at least 4 characters long'],
    },
    seats: {
        type: Number,
        required: [true, 'Seats are required'],
        min: [0, 'Seats must be from 0 to 4'],
        max: [4, 'Seats must be from 0 to 4'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [1, 'Price must be from 1 to 50'],
        max: [50, 'Price must be from 1 to 50'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minLength: [10, 'Description must be at least 10 characters long'],
    },
    creator: { type: Types.ObjectId, ref: 'User', required: true },
    buddies: [{ type: Types.ObjectId, ref: 'User' }],
});

export default model('Trip', tripSchema);
