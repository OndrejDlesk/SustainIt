import { object, string, TypeOf } from 'zod';

export const createCompanySchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        categories: string({ required_error: 'Categories is required' })
            .array()
            .min(1, 'At least one catagory is required')
    })
});

export type CreateCompanyInput = TypeOf<typeof createCompanySchema>['body'];
