import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Fee, FeeLoadMatch, FeeListMatch } from '../DreamapplyTypes';
declare class FeeEntity extends DreamapplyEntityBase<Fee> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: FeeEntity): FeeEntity;
    load(this: any, reqmatch?: FeeLoadMatch, ctrl?: Control): Promise<Fee>;
    list(this: any, reqmatch?: FeeListMatch, ctrl?: Control): Promise<Fee[]>;
}
export { FeeEntity };
