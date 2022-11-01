import { Request, Response } from 'express';
import { CreateCompanyInput } from '../schema/company.schema';
import {
    createCompany,
    findAllCompaniesByUserId,
    findCompanyById
} from '../service/company.service';

export async function createCompanyHandler(
    req: Request<{}, {}, CreateCompanyInput>,
    res: Response
) {
    const body = req.body;

    try {
        const company = await createCompany({
            ...body,
            userId: res.locals.user.id
        });
        return res.send(company);
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send('Company already exists');
        }

        return res.status(500).send(e);
    }
}

export async function getCompanyListHandler(req: Request, res: Response) {
    try {
        const companyList = await findAllCompaniesByUserId(res.locals.user.id);
        return res.send(companyList);
    } catch (e: any) {
        return res.status(500).send(e);
    }
}

export async function getCompanyHandler(req: Request, res: Response) {
    const { id } = req.params;

    const company = await findCompanyById(id);

    if (!company) {
        return res.status(400).send('Company not found');
    }

    return res.send(company);
}
