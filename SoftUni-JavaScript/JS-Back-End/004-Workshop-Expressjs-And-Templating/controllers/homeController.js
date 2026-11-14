import { Router } from 'express';
import Cube from '../models/Cube.js';

const router = Router();

router.get('/', async (req, res) => {
    const { search = '', from = '', to = '' } = req.query;
    const cubes = await Cube.getAll({ search: search.trim(), from, to });
    res.render('index', { title: 'Browse', cubes, search, from, to });
});

router.get('/about', (req, res) => res.render('about', { title: 'About' }));

export default router;
