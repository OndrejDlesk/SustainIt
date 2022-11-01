import { prop } from '@typegoose/typegoose';

export class Coordinates {
    @prop()
    lat: number;

    @prop()
    lng: number;
}
