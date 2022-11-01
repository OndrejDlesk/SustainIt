import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { Coordinates } from './coordinates.model';

export class Address {
    @prop()
    line1: string;

    @prop()
    line2?: string;

    @prop()
    city: string;

    @prop()
    county?: string;

    @prop()
    postcode: string;

    @prop()
    country: string;

    @prop()
    coordinates?: Coordinates;
}
