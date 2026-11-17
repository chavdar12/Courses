import { Router } from 'express';
import { isAuth } from '../middlewares/auth.js';
import { getProfile } from '../services/tripService.js';

const router = Router();

router.get('/', (req, res) => res.render('home', { title: 'Home' }));

router.get('/profile', isAuth, async (req, res) =>
    res.render('profile', { title: 'Profile', profile: await getProfile(req.user._id) }),
);

export default router;
