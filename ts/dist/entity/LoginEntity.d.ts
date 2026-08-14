import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Login, LoginListMatch } from '../DreamapplyTypes';
declare class LoginEntity extends DreamapplyEntityBase<Login> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: LoginEntity): LoginEntity;
    list(this: any, reqmatch?: LoginListMatch, ctrl?: Control): Promise<Login[]>;
}
export { LoginEntity };
