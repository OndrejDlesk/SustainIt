import express from 'express';
import {
    loginHandler,
    logoutHandler,
    refreshAccessTokenHandler
} from '../controller/auth.controller';
import { loginSchema } from '../schema/auth.schema';
import validateResource from '../middleware/validate-resource';

const router = express.Router();

router.post('/api/login', validateResource(loginSchema), loginHandler);

router.post('/api/sessions/refresh', refreshAccessTokenHandler);

router.post('/api/logout', logoutHandler);

export default router;
