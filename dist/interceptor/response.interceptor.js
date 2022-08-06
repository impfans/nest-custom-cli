"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const _interface_1 = require("../interface");
const _util_1 = require("../util");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(context, next) {
        if (context.getType() === 'http') {
            const req = context.switchToHttp().getRequest();
            const res = context.switchToHttp().getResponse();
            const now = Date.now();
            return next.handle().pipe((0, operators_1.map)((result) => {
                const logFormat = `
           requestId: ${req.reqId}
           result: ${result !== null && result !== void 0 ? result : ''}
           code: res.statusCode,
           time: ${Date.now() - now}ms
           `;
                _util_1.Logger.access(req.reqId, logFormat);
                return {
                    code: res.statusCode === 201 ? 200 : res.statusCode,
                    result: result === null || result === undefined ? null : result,
                    reqId: req.reqId,
                };
            }));
        }
        return next.handle().pipe((0, operators_1.map)((res) => res));
    }
};
ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
exports.ResponseInterceptor = ResponseInterceptor;
//# sourceMappingURL=response.interceptor.js.map