import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { AcademicTerm, AcademicTermLoadMatch, AcademicTermListMatch } from '../DreamapplyTypes';
declare class AcademicTermEntity extends DreamapplyEntityBase<AcademicTerm> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: AcademicTermEntity): AcademicTermEntity;
    load(this: any, reqmatch?: AcademicTermLoadMatch, ctrl?: Control): Promise<AcademicTermEntity>;
    list(this: any, reqmatch?: AcademicTermListMatch, ctrl?: Control): Promise<AcademicTermEntity[]>;
}
export { AcademicTermEntity };
