import CompanyModel, { Company } from '../model/company.model';
import { Branch } from '../model/branch.model';

export function createCompany(input: Partial<Company>) {
    return CompanyModel.create(input);
}

export function findAllCompaniesByUserId(userId: string) {
    return CompanyModel.find({ userId: userId });
}

export function findAllCompanies() {
    return CompanyModel.find();
}

export function findCompanyById(id: string) {
    return CompanyModel.findById(id);
}

export function createCompanyBranch(companyId: string, branch: Branch) {
    return CompanyModel.findByIdAndUpdate(companyId, {
        $push: { branches: branch }
    });
}
