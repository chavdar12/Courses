import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { isAuth } from '../middlewares/auth.js';
import Cube from '../models/Cube.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();

const cubeData = ({ name, description, imageUrl, difficultyLevel }) => ({
    name,
    description,
    imageUrl,
    difficultyLevel,
});

/** Loads the cube from :id into res.locals.cube, 404 when missing. */
async function loadCube(req, res, next) {
    const cube =
        isValidObjectId(req.params.id) &&
        (await Cube.findById(req.params.id).populate('accessories').lean());
    if (!cube) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }
    res.locals.cube = cube;
    next();
}

const isOwner = (req, res, next) =>
    res.locals.cube.creatorId === req.user._id ? next() : res.redirect('/');

router.get('/create', isAuth, (req, res) => res.render('create', { title: 'Create Cube' }));

router.post('/create', isAuth, async (req, res) => {
    try {
        await Cube.create({ ...cubeData(req.body), creatorId: req.user._id });
        res.redirect('/');
    } catch (err) {
        res.status(400).render('create', {
            title: 'Create Cube',
            cube: req.body,
            error: errorMessage(err),
        });
    }
});

router.get('/details/:id', loadCube, (req, res) => {
    const { cube } = res.locals;
    res.render('details', { title: cube.name, isOwner: cube.creatorId === req.user?._id });
});

router.get('/edit/:id', isAuth, loadCube, isOwner, (req, res) =>
    res.render('edit', { title: 'Edit Cube' }),
);

router.post('/edit/:id', isAuth, loadCube, isOwner, async (req, res) => {
    try {
        await Cube.findByIdAndUpdate(req.params.id, cubeData(req.body), { runValidators: true });
        res.redirect(`/details/${req.params.id}`);
    } catch (err) {
        res.status(400).render('edit', {
            title: 'Edit Cube',
            cube: { ...req.body, _id: req.params.id },
            error: errorMessage(err),
        });
    }
});

router.get('/delete/:id', isAuth, loadCube, isOwner, (req, res) =>
    res.render('delete', { title: 'Delete Cube' }),
);

router.post('/delete/:id', isAuth, loadCube, isOwner, async (req, res) => {
    await Cube.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

export default router;
