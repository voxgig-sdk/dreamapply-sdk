import { Context } from './Context';
declare class DreamapplyError extends Error {
    isDreamapplyError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { DreamapplyError };
