import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt';

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken =
        (req.headers.authorization || '').replace(/^Bearer\s/, '') ||
        req.cookies['accessToken'];

    // const accessToken = req.cookies['accessToken'];

    if (!accessToken) {
        return next();
    }

    const decoded = verifyJwt(accessToken, 'accessTokenPublicKey');

    if (decoded) {
        res.locals.user = decoded;
    }

    return next();
};

export default deserializeUser;
