import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

/** Connects mongoose to a throwaway in-memory MongoDB; returns the cleanup function. */
export async function startDb() {
    const mongod = await MongoMemoryServer.create();
    await mongoose.connect(mongod.getUri());
    return async () => {
        await mongoose.disconnect();
        await mongod.stop();
    };
}
