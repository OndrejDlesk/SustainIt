import { Request, Response } from 'express';
import { LoginInput } from '../schema/auth.schema';
import {
    signAccessToken,
    signRefreshToken,
    removeSessionById,
    refreshAccessToken
} from '../service/auth.service';
import { findUserByEmail } from '../service/user.service';
import { verifyJwt } from '../utils/jwt';
import config from 'config';

export async function loginHandler(
    req: Request<{}, {}, LoginInput>,
    res: Response
) {
    const message = 'Invalid email or password';
    const { email, password, rememberMe } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.send(message);
    }

    if (!user.verified) {
        return res.send('Please verify your email');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        return res.send(message);
    }

    // sign a access token
    const accessToken = signAccessToken(user);

    if (rememberMe) {
        // sign a refresh token
        const refreshToken = await signRefreshToken({ userId: user.id });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: config.get<number>('refreshTokenTtl') * 60 * 1000
        });
    }
    return res.status(200).send({ accessToken });
}

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    if (!refreshToken) {
        return res.status(401).send('Refresh access token not provided');
    }

    const accessToken = await refreshAccessToken(refreshToken);

    if (!accessToken) {
        return res.status(401).send('Could not refresh access token');
    }

    return res.status(200).send({ accessToken: accessToken });
}

export async function logoutHandler(req: Request, res: Response) {
    const refreshToken = req.cookies['refreshToken'];

    const decoded = verifyJwt<{ session: string }>(
        refreshToken,
        'refreshTokenPublicKey'
    );

    if (decoded) {
        await removeSessionById(decoded.session);
    }

    res.clearCookie('refreshToken');

    return res.sendStatus(200);
}
