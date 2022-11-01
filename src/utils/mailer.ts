import nodemailer, { SendMailOptions } from 'nodemailer';
import config from 'config';
import log from './logger';
import { TemplateOptions } from 'nodemailer-express-handlebars';
import path from 'path';
import { google } from 'googleapis';
const hbs = require('nodemailer-express-handlebars');

// These id's and secrets should come from .env file.
const CLIENT_ID = config.get<string>('googleClientId');
const CLEINT_SECRET = config.get<string>('googleClientSecret');
const REFRESH_TOKEN = config.get<string>('googleRefreshToken');
const GOOGLE_ACCOUNT = config.get<string>('googleAccout');

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLEINT_SECRET);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

export async function sendEmail(payload: SendMailOptions & TemplateOptions) {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transport = getTransport(accessToken);

        if (payload.template) {
            configureHandlebars(transport);
        }

        transport.sendMail(payload, function (error, info) {
            if (error) {
                log.error(error, 'Error sending email');
                return;
            }
        });
    } catch (err) {
        log.error(err, 'Error sending email');
        return err;
    }
}

function getTransport(accessToken: any) {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: GOOGLE_ACCOUNT,
            clientId: CLIENT_ID,
            clientSecret: CLEINT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
}

function configureHandlebars(transport: nodemailer.Transporter) {
    const handlebarOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.join(__dirname, '../views/'),
            defaultLayout: false
        },
        viewPath: path.join(__dirname, '../views/'),
        extName: '.handlebars'
    };

    transport.use('compile', hbs(handlebarOptions));
}

export default sendEmail;
