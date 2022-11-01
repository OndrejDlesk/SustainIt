import { modelOptions, prop, Severity } from '@typegoose/typegoose';

export class Contact {
    @prop()
    url?: string;

    @prop()
    phone?: string;

    @prop()
    email?: string;
}
