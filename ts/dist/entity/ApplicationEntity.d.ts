import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Application, ApplicationLoadMatch, ApplicationListMatch } from '../DreamapplyTypes';
declare class ApplicationEntity extends DreamapplyEntityBase<Application> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: ApplicationEntity): ApplicationEntity;
    load(this: any, reqmatch?: ApplicationLoadMatch, ctrl?: Control): Promise<Application>;
    list(this: any, reqmatch?: ApplicationListMatch, ctrl?: Control): Promise<Application[]>;
}
export { ApplicationEntity };
