import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import company from './company.routes';
import deserializeUser from '../middleware/deserialize-user';

const router = express.Router();

router.get('/healthcheck', (req, res) => res.sendStatus(200));

router.use(deserializeUser);

// router.use(transformResponse);
router.use(user);
router.use(auth);
router.use(company);

export default router;
