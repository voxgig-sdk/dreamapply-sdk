import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Scoresheet, ScoresheetLoadMatch, ScoresheetListMatch } from '../DreamapplyTypes';
declare class ScoresheetEntity extends DreamapplyEntityBase<Scoresheet> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: ScoresheetEntity): ScoresheetEntity;
    load(this: any, reqmatch?: ScoresheetLoadMatch, ctrl?: Control): Promise<ScoresheetEntity>;
    list(this: any, reqmatch?: ScoresheetListMatch, ctrl?: Control): Promise<ScoresheetEntity[]>;
}
export { ScoresheetEntity };
