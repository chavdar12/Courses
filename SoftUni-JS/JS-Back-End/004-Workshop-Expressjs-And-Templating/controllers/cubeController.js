import { Router } from 'express';
import Cube from '../models/Cube.js';

const router = Router();

router.get('/create', (req, res) => res.render('create', { title: 'Create Cube' }));

router.post('/create', async (req, res) => {
    const cube = new Cube(req.body);
    const error = cube.validate();
    if (error) {
        return res.status(400).render('create', { title: 'Create Cube', cube: req.body, error });
    }
    await cube.save();
    res.redirect('/');
});

router.get('/details/:id', async (req, res, next) => {
    const cube = await Cube.getById(req.params.id);
    if (!cube) {
        return next();
    }
    res.render('details', { title: cube.name, cube });
});

export default router;
