import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    Severity,
    DocumentType
} from '@typegoose/typegoose';
import { Address } from './address.model';
import { Company } from './company.model';
import { Contact } from './contact.model';
import { User } from './user.model';

@modelOptions({
    schemaOptions: {
        timestamps: true,
        toJSON: {
            transform: (doc: DocumentType, ret) => {
                delete ret.__v;
                ret.id = ret._id;
                delete ret._id;
            }
        }
    },
    options: { allowMixed: Severity.ALLOW }
})
export class Branch {
    @prop()
    address: Address;

    @prop()
    contact?: Contact;

    @prop()
    description?: string;

    @prop({ ref: () => Company })
    companyId: Ref<Company>;
}

const BranchModel = getModelForClass(Branch);

export default BranchModel;
