import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import Cube from '../models/Cube.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();

router.get('/create', (req, res) => res.render('create', { title: 'Create Cube' }));

router.post('/create', async (req, res) => {
    const { name, description, imageUrl, difficultyLevel } = req.body;
    try {
        await Cube.create({ name, description, imageUrl, difficultyLevel });
        res.redirect('/');
    } catch (err) {
        res.status(400).render('create', { title: 'Create Cube', cube: req.body, error: errorMessage(err) });
    }
});

router.get('/details/:id', async (req, res, next) => {
    const cube = isValidObjectId(req.params.id) && await Cube.findById(req.params.id).populate('accessories').lean();
    if (!cube) {
        return next();
    }
    res.render('details', { title: cube.name, cube });
});

export default router;
