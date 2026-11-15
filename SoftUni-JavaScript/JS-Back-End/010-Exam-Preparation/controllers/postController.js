import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { isAuth } from '../middlewares/auth.js';
import * as postService from '../services/postService.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();

/** Loads the post from :id into res.locals.post, 404 when missing. */
async function loadPost(req, res, next) {
    const post = isValidObjectId(req.params.id) && (await postService.getById(req.params.id));
    if (!post) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }
    res.locals.post = post;
    next();
}

const isAuthor = (req, res, next) =>
    res.locals.post.author._id.equals(req.user._id) ? next() : res.redirect('/');

router.get('/', async (req, res) =>
    res.render('catalog', { title: 'All Posts', posts: await postService.getAll() }),
);

router.get('/mine', isAuth, async (req, res) => {
    res.render('my-posts', {
        title: 'My Posts',
        posts: await postService.getByAuthor(req.user._id),
    });
});

router.get('/create', isAuth, (req, res) => res.render('create', { title: 'Create Post' }));

router.post('/create', isAuth, async (req, res) => {
    try {
        await postService.create(req.body, req.user._id);
        res.redirect('/posts');
    } catch (err) {
        res.status(400).render('create', {
            title: 'Create Post',
            post: req.body,
            error: errorMessage(err),
        });
    }
});

router.get('/:id', loadPost, (req, res) => {
    const { post } = res.locals;
    const userId = req.user?._id;
    const isAuthor = post.author._id.equals(userId);
    res.render('details', {
        title: post.title,
        isAuthor,
        canVote: Boolean(userId) && !isAuthor && !post.votes.some((v) => v._id.equals(userId)),
        voters: post.votes.map((v) => v.email).join(', '),
    });
});

router.get('/:id/edit', isAuth, loadPost, isAuthor, (req, res) =>
    res.render('edit', { title: 'Edit Post' }),
);

router.post('/:id/edit', isAuth, loadPost, isAuthor, async (req, res) => {
    try {
        await postService.update(req.params.id, req.body);
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        res.status(400).render('edit', {
            title: 'Edit Post',
            post: { ...req.body, _id: req.params.id },
            error: errorMessage(err),
        });
    }
});

router.post('/:id/delete', isAuth, loadPost, isAuthor, async (req, res) => {
    await postService.remove(req.params.id);
    res.redirect('/posts');
});

const VOTES = { up: 1, down: -1 };

router.post('/:id/vote/:direction', isAuth, loadPost, async (req, res, next) => {
    const value = VOTES[req.params.direction];
    if (!value) {
        return next();
    }
    await postService.vote(req.params.id, req.user._id, value);
    res.redirect(`/posts/${req.params.id}`);
});

export default router;
