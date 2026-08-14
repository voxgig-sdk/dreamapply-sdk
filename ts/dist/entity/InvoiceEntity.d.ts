import { DreamapplyEntityBase } from '../DreamapplyEntityBase';
import type { DreamapplySDK } from '../DreamapplySDK';
import type { Control } from '../types';
import type { Invoice, InvoiceLoadMatch, InvoiceListMatch, InvoiceRemoveMatch } from '../DreamapplyTypes';
declare class InvoiceEntity extends DreamapplyEntityBase<Invoice> {
    constructor(client: DreamapplySDK, entopts: any);
    make(this: InvoiceEntity): InvoiceEntity;
    load(this: any, reqmatch?: InvoiceLoadMatch, ctrl?: Control): Promise<Invoice>;
    list(this: any, reqmatch?: InvoiceListMatch, ctrl?: Control): Promise<Invoice[]>;
    remove(this: any, reqmatch?: InvoiceRemoveMatch, ctrl?: Control): Promise<Invoice>;
}
export { InvoiceEntity };
