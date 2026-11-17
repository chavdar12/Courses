import { Router } from 'express';
import Cube from '../models/Cube.js';

const router = Router();

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.get('/', async (req, res) => {
    const { search = '', from = '', to = '' } = req.query;
    const cubes = await Cube.find({
        name: { $regex: escapeRegex(String(search).trim()), $options: 'i' },
        difficultyLevel: { $gte: Number(from) || 1, $lte: Number(to) || 6 },
    }).lean();
    res.render('index', { title: 'Browse', cubes, search, from, to });
});

router.get('/about', (req, res) => res.render('about', { title: 'About' }));

export default router;
