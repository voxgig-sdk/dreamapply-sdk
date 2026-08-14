"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DreamapplyError = void 0;
class DreamapplyError extends Error {
    isDreamapplyError = true;
    sdk = 'Dreamapply';
    code;
    ctx;
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.DreamapplyError = DreamapplyError;
//# sourceMappingURL=DreamapplyError.js.map