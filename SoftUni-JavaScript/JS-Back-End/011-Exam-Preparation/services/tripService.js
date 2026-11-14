import Trip from '../models/Trip.js';
import User from '../models/User.js';

const tripData = ({ startPoint, endPoint, date, time, carImage, carBrand, seats, price, description }) =>
    ({ startPoint, endPoint, date, time, carImage, carBrand, seats, price, description });

export const getAll = () => Trip.find().lean();

export const getById = (id) => Trip.findById(id).populate('creator').populate('buddies').lean();

export const getProfile = (userId) => User.findById(userId).populate('tripsHistory').lean();

export async function create(data, creator) {
    const trip = await Trip.create({ ...tripData(data), creator });
    await User.findByIdAndUpdate(creator, { $push: { tripsHistory: trip._id } });
    return trip;
}

export const update = (id, data) => Trip.findByIdAndUpdate(id, tripData(data), { runValidators: true });

export async function remove(id) {
    const trip = await Trip.findByIdAndDelete(id);
    await User.findByIdAndUpdate(trip.creator, { $pull: { tripsHistory: trip._id } });
}

/** Joins once, never your own trip, only while seats are left; the filter makes the check and the update atomic. */
export const join = (id, userId) => Trip.updateOne(
    { _id: id, creator: { $ne: userId }, buddies: { $ne: userId }, seats: { $gt: 0 } },
    { $push: { buddies: userId }, $inc: { seats: -1 } }
);
