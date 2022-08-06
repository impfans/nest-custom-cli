"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeErr = exports.BaseError = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const _interface_1 = require("../interface");
class BaseError extends common_1.HttpException {
    constructor(code, message, stack, statusCode) {
        super(message, statusCode);
        if ((0, lodash_1.isString)(stack)) {
            this.stack = stack;
        }
        this.code = code;
    }
}
exports.BaseError = BaseError;
function makeErr(opts) {
    const { code, message, stack, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR, } = opts;
    return new BaseError(code, message, stack, statusCode);
}
exports.makeErr = makeErr;
//# sourceMappingURL=error.js.map