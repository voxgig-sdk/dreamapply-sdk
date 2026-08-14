import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Administrator, AdministratorLoadMatch, AdministratorListMatch } from '../DreamapplyTypes';
declare class AdministratorEntity extends DreamapplyEntityBase<Administrator> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: AdministratorEntity): AdministratorEntity;
    load(this: any, reqmatch?: AdministratorLoadMatch, ctrl?: Control): Promise<AdministratorEntity>;
    list(this: any, reqmatch?: AdministratorListMatch, ctrl?: Control): Promise<AdministratorEntity[]>;
}
export { AdministratorEntity };
