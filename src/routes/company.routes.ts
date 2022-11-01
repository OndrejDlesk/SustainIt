import express from 'express';
import validateResource from '../middleware/validate-resource';
import {
    createCompanyHandler,
    getCompanyHandler,
    getCompanyListHandler
} from '../controller/company.controller';
import {
    createBranchHandler,
    getBranchListHandler,
    getBranchHandler
} from '../controller/branch.controller';
import { createCompanySchema } from '../schema/company.schema';
import { createBranchSchema } from '../schema/branch.schema';
import requireUser from '../middleware/require-user';

const router = express.Router();

router.post(
    '/api/companies',
    validateResource(createCompanySchema),
    createCompanyHandler
);

router.post(
    '/api/companies/:id/branches',
    validateResource(createBranchSchema),
    createBranchHandler
);

router.get('/api/companies', getCompanyListHandler);

router.get('/api/companies/:id', getCompanyHandler);

router.get('/api/companies/:id/branches', getBranchListHandler);

router.get(
    '/api/companies/:companyId/branches/:branchId',

    getBranchHandler
);

export default router;
