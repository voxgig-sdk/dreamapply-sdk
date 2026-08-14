import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Journal, JournalListMatch } from '../DreamapplyTypes';
declare class JournalEntity extends DreamapplyEntityBase<Journal> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: JournalEntity): JournalEntity;
    list(this: any, reqmatch?: JournalListMatch, ctrl?: Control): Promise<JournalEntity[]>;
}
export { JournalEntity };
