import { Router } from 'express';
import { isValidObjectId } from 'mongoose';
import { isAuth } from '../middlewares/auth.js';
import * as tripService from '../services/tripService.js';
import { errorMessage } from '../utils/errors.js';

const router = Router();

/** Loads the trip from :id into res.locals.trip, 404 when missing. */
async function loadTrip(req, res, next) {
    const trip = isValidObjectId(req.params.id) && (await tripService.getById(req.params.id));
    if (!trip) {
        return res.status(404).render('404', { title: 'Page Not Found' });
    }
    res.locals.trip = trip;
    next();
}

const isCreator = (req, res, next) =>
    res.locals.trip.creator._id.equals(req.user._id) ? next() : res.redirect('/');

router.get('/', async (req, res) =>
    res.render('catalog', { title: 'Shared Trips', trips: await tripService.getAll() }),
);

router.get('/create', isAuth, (req, res) => res.render('create', { title: 'Offer Trip' }));

router.post('/create', isAuth, async (req, res) => {
    try {
        await tripService.create(req.body, req.user._id);
        res.redirect('/trips');
    } catch (err) {
        res.status(400).render('create', {
            title: 'Offer Trip',
            trip: req.body,
            error: errorMessage(err),
        });
    }
});

router.get('/:id', loadTrip, (req, res) => {
    const { trip } = res.locals;
    const userId = req.user?._id;
    res.render('details', {
        title: `${trip.startPoint} - ${trip.endPoint}`,
        isCreator: trip.creator._id.equals(userId),
        hasJoined: trip.buddies.some((b) => b._id.equals(userId)),
        buddies: trip.buddies.map((b) => b.email).join(', '),
    });
});

router.get('/:id/edit', isAuth, loadTrip, isCreator, (req, res) =>
    res.render('edit', { title: 'Edit Trip' }),
);

router.post('/:id/edit', isAuth, loadTrip, isCreator, async (req, res) => {
    try {
        await tripService.update(req.params.id, req.body);
        res.redirect(`/trips/${req.params.id}`);
    } catch (err) {
        res.status(400).render('edit', {
            title: 'Edit Trip',
            trip: { ...req.body, _id: req.params.id },
            error: errorMessage(err),
        });
    }
});

router.post('/:id/delete', isAuth, loadTrip, isCreator, async (req, res) => {
    await tripService.remove(req.params.id);
    res.redirect('/trips');
});

router.post('/:id/join', isAuth, loadTrip, async (req, res) => {
    await tripService.join(req.params.id, req.user._id);
    res.redirect(`/trips/${req.params.id}`);
});

export default router;
