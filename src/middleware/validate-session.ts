// import { Request, Response, NextFunction } from 'express';
// import { refreshAccessToken } from '../service/auth.service';
// import { verifyJwt } from '../utils/jwt';
// import config from 'config';

// const validateSession = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     const accessToken = req.cookies['accessToken'];

//     if (!accessToken) {
//         return next();
//     }

//     const decoded = verifyJwt<{ session: string }>(
//         accessToken,
//         'accessTokenPublicKey'
//     );

//     if (decoded) {
//         return next();
//     }

//     const refreshToken = req.cookies['refreshToken'];

//     const newAccessToken = await refreshAccessToken(refreshToken);

//     if (!newAccessToken) {
//         return res.status(401).send('Could not refresh access token');
//     }

//     res.cookie('accessToken', newAccessToken, {
//         httpOnly: true,
//         maxAge: config.get<number>('accessTokenTtl') * 60 * 1000
//     });

//     req.cookies.accessToken = newAccessToken;

//     return next();
// };

// export default validateSession;
