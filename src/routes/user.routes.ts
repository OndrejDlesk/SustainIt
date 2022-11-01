import express from 'express';
import {
    createUserSchema,
    verifyUserSchema,
    forgotPasswordSchema,
    resetPasswordSchema
} from '../schema/user.schema';
import validateResource from '../middleware/validate-resource';
import {
    createUserHandler,
    verifyUserHandler,
    forgotPasswordHandler,
    resetPasswordHandler,
    getCurrentUserHandler
} from '../controller/user.controller';
import requireUser from '../middleware/require-user';

const router = express.Router();

router.post(
    '/api/users',
    validateResource(createUserSchema),
    createUserHandler
);

router.post(
    '/api/users/verify/:id/:verificationCode',
    validateResource(verifyUserSchema),
    verifyUserHandler
);

router.post(
    '/api/users/forgotpassword',
    validateResource(forgotPasswordSchema),
    forgotPasswordHandler
);

router.post(
    '/api/users/resetpassword/:id/:passwordResetCode',
    validateResource(resetPasswordSchema),
    resetPasswordHandler
);

router.get('/api/users/me', requireUser, getCurrentUserHandler);

export default router;
