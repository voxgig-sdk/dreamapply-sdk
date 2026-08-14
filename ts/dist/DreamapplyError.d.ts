import { Context } from './Context';
declare class DreamapplyError extends Error {
    isDreamapplyError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    constructor(code: string, msg: string, ctx: Context);
}
export { DreamapplyError };
