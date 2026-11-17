import mongoose from 'mongoose';

/** First readable message from a mongoose validation error; anything else is a real failure and is rethrown. */
export function errorMessage(err) {
    if (err instanceof mongoose.Error.ValidationError) {
        return Object.values(err.errors)[0].message;
    }
    throw err;
}
