import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { AcademicYear, AcademicYearLoadMatch, AcademicYearListMatch } from '../DreamapplyTypes';
declare class AcademicYearEntity extends DreamapplyEntityBase<AcademicYear> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: AcademicYearEntity): AcademicYearEntity;
    load(this: any, reqmatch?: AcademicYearLoadMatch, ctrl?: Control): Promise<AcademicYearEntity>;
    list(this: any, reqmatch?: AcademicYearListMatch, ctrl?: Control): Promise<AcademicYearEntity[]>;
}
export { AcademicYearEntity };
