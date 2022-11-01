import { Request, Response } from 'express';
import { CreateBranchInput } from '../schema/branch.schema';
import {
    createBranch,
    findAllBranchesByCompanyId,
    findBranch
} from '../service/branch.service';
import { findCompanyById } from '../service/company.service';

export async function createBranchHandler(
    req: Request<CreateBranchInput['params'], {}, CreateBranchInput['body']>,
    res: Response
) {
    const { id } = req.params;

    const body = req.body;

    const company = await findCompanyById(id);

    if (!company) {
        return res.status(400).send('Company not found');
    }

    try {
        const branch = await createBranch({ ...body, companyId: company.id });

        return res.send('Branch successfully created');
    } catch (e: any) {
        return res.status(500).send(e);
    }
}

export async function getBranchListHandler(req: Request, res: Response) {
    const { id } = req.params;

    const branches = await findAllBranchesByCompanyId(id);

    if (!branches) {
        return res.status(400).send('Company not found');
    }

    return res.send(branches);
}

export async function getBranchHandler(req: Request, res: Response) {
    const { companyId, branchId } = req.params;

    const branch = await findBranch(branchId, companyId);

    if (!branch) {
        return res.status(400).send('Branch not found');
    }

    return res.send(branch);
}
