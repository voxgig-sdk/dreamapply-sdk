import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Institution, InstitutionLoadMatch, InstitutionListMatch } from '../DreamapplyTypes';
declare class InstitutionEntity extends DreamapplyEntityBase<Institution> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: InstitutionEntity): InstitutionEntity;
    load(this: any, reqmatch?: InstitutionLoadMatch, ctrl?: Control): Promise<InstitutionEntity>;
    list(this: any, reqmatch?: InstitutionListMatch, ctrl?: Control): Promise<InstitutionEntity[]>;
}
export { InstitutionEntity };
