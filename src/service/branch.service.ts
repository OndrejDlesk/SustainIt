import BranchModel, { Branch } from '../model/branch.model';

export function createBranch(input: Partial<Branch>) {
    return BranchModel.create(input);
}

export function findAllBranches() {
    return BranchModel.find();
}

export function findAllBranchesByCompanyId(companyId: string) {
    return BranchModel.find({ companyId: companyId });
}

export function findBranch(branchId: string, companyId: string) {
    return BranchModel.findOne({ _id: branchId, companyId: companyId });
}
