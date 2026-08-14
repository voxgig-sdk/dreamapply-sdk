import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Intake, IntakeLoadMatch, IntakeListMatch } from '../DreamapplyTypes';
declare class IntakeEntity extends DreamapplyEntityBase<Intake> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: IntakeEntity): IntakeEntity;
    load(this: any, reqmatch?: IntakeLoadMatch, ctrl?: Control): Promise<IntakeEntity>;
    list(this: any, reqmatch?: IntakeListMatch, ctrl?: Control): Promise<IntakeEntity[]>;
}
export { IntakeEntity };
