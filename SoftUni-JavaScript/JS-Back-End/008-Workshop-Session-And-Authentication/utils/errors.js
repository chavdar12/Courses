import mongoose from 'mongoose';

/** An error whose message is safe and meant to be shown to the user. */
export class UserError extends Error {}

/** Readable message for user-caused errors; anything else is a real failure and is rethrown. */
export function errorMessage(err) {
    if (err instanceof UserError) {
        return err.message;
    }
    if (err instanceof mongoose.Error.ValidationError) {
        return Object.values(err.errors)[0].message;
    }
    if (err.code === 11000) {
        return `${Object.keys(err.keyValue)[0]} is already taken`;
    }
    throw err;
}
