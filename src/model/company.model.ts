import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
    DocumentType
} from '@typegoose/typegoose';
import { Contact } from './contact.model';
import { User } from './user.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {
            transform: (doc: DocumentType<Company>, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    },
    options: { allowMixed: Severity.ALLOW }
})
export class Company {
    @prop({ required: true })
    name: string;

    @prop()
    contact?: Contact;

    @prop()
    description?: string;

    @prop({ type: String, required: true })
    categories: string[];

    // @prop({ type: () => Branch })
    // branches?: Branch[];

    @prop({ ref: () => User })
    userId: Ref<User>;
}

const CompanyModel = getModelForClass(Company);

export default CompanyModel;
