import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Applicant, ApplicantLoadMatch, ApplicantListMatch, ApplicantCreateData } from '../DreamapplyTypes';
declare class ApplicantEntity extends DreamapplyEntityBase<Applicant> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: ApplicantEntity): ApplicantEntity;
    load(this: any, reqmatch?: ApplicantLoadMatch, ctrl?: Control): Promise<ApplicantEntity>;
    list(this: any, reqmatch?: ApplicantListMatch, ctrl?: Control): Promise<ApplicantEntity[]>;
    create(this: any, reqdata?: ApplicantCreateData, ctrl?: Control): Promise<ApplicantEntity>;
}
export { ApplicantEntity };
