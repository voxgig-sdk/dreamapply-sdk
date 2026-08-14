import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { TableView, TableViewLoadMatch, TableViewListMatch } from '../DreamapplyTypes';
declare class TableViewEntity extends DreamapplyEntityBase<TableView> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: TableViewEntity): TableViewEntity;
    load(this: any, reqmatch?: TableViewLoadMatch, ctrl?: Control): Promise<TableViewEntity>;
    list(this: any, reqmatch?: TableViewListMatch, ctrl?: Control): Promise<TableViewEntity[]>;
}
export { TableViewEntity };
