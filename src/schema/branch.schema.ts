import { object, string, TypeOf } from 'zod';

export const createBranchSchema = object({
    body: object({
        address: object({
            line1: string({
                required_error: 'line1 is required'
            }),
            postcode: string({
                required_error: 'postcode is required'
            }),
            city: string({
                required_error: 'city is required'
            }),
            country: string({
                required_error: 'country is required'
            })
        })
    }),
    params: object({
        id: string()
    })
});

export type CreateBranchInput = TypeOf<typeof createBranchSchema>;
