require('dotenv').config();
import express from 'express';
import config from 'config';
import connectToDb from './utils/connect-to-db';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserialize-user';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:4200',
        credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(deserializeUser);
app.use(router);

const port = config.get<number>('port');

app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`);

    connectToDb();
});

// sendEmail2();
