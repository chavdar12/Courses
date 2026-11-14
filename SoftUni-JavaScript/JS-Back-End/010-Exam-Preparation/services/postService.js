import Post from '../models/Post.js';
import User from '../models/User.js';

const postData = ({ title, keyword, location, date, image, description }) => ({ title, keyword, location, date, image, description });

export const getAll = () => Post.find().lean();

export const getByAuthor = (author) => Post.find({ author }).populate('author').lean();

export const getById = (id) => Post.findById(id).populate('author').populate('votes').lean();

export async function create(data, author) {
    const post = await Post.create({ ...postData(data), author });
    await User.findByIdAndUpdate(author, { $push: { myPosts: post._id } });
    return post;
}

export const update = (id, data) => Post.findByIdAndUpdate(id, postData(data), { runValidators: true });

export async function remove(id) {
    const post = await Post.findByIdAndDelete(id);
    await User.findByIdAndUpdate(post.author, { $pull: { myPosts: post._id } });
}

/** One vote per user and never on your own post; the filter makes the check and the update atomic. */
export const vote = (id, userId, value) => Post.updateOne(
    { _id: id, author: { $ne: userId }, votes: { $ne: userId } },
    { $push: { votes: userId }, $inc: { rating: value } }
);
