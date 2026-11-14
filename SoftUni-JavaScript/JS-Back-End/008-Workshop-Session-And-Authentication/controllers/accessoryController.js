import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { isAuth } from '../middlewares/auth.js';
import Accessory from '../models/Accessory.js';
import Cube from '../models/Cube.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();

router.get('/create/accessory', isAuth, (req, res) => res.render('createAccessory', { title: 'Create Accessory' }));

router.post('/create/accessory', isAuth, async (req, res) => {
    const { name, description, imageUrl } = req.body;
    try {
        await Accessory.create({ name, description, imageUrl });
        res.redirect('/');
    } catch (err) {
        res.status(400).render('createAccessory', { title: 'Create Accessory', accessory: req.body, error: errorMessage(err) });
    }
});

router.get('/attach/accessory/:id', isAuth, async (req, res, next) => {
    const cube = isValidObjectId(req.params.id) && await Cube.findById(req.params.id).lean();
    if (!cube) {
        return next();
    }
    // only offer what this cube does not have yet
    const accessories = await Accessory.find({ _id: { $nin: cube.accessories } }).lean();
    res.render('attach', { title: 'Attach Accessory', cube, accessories });
});

router.post('/attach/accessory/:id', isAuth, async (req, res, next) => {
    const { id } = req.params;
    const { accessory } = req.body;
    if (!isValidObjectId(id) || !isValidObjectId(accessory)) {
        return next();
    }
    const cube = await Cube.findByIdAndUpdate(id, { $addToSet: { accessories: accessory } });
    const attached = await Accessory.findByIdAndUpdate(accessory, { $addToSet: { cubes: id } });
    if (!cube || !attached) {
        return next();
    }
    res.redirect(`/details/${id}`);
});

export default router;
