"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
const _util_1 = require("../util");
const moment = require("moment");
const _interface_1 = require("../interface");
const _constant_1 = require("../constant");
let AllExceptionsFilter = class AllExceptionsFilter {
    catch(exception, host) {
        this.httpCatch(exception, host.switchToHttp());
    }
    httpCatch(exception, ctx) {
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const { errCode, errMsg } = this.handleErr(exception, request);
        const resData = {
            requestId: request.reqId,
            code: errCode,
            msg: errMsg,
        };
        response.status(200).json(resData);
    }
    handleErr(exception, req) {
        var _a, _b;
        const isSysErr = !(exception instanceof common_1.HttpException ||
            (exception.status >= 400 && exception.status < 500));
        _util_1.Logger.debug('filter', exception);
        const status = isSysErr
            ? common_1.HttpStatus.INTERNAL_SERVER_ERROR
            : exception.status || common_1.HttpStatus.BAD_REQUEST;
        const errCode = isSysErr
            ? _constant_1.SERVER_ERR_CODE
            : exception.code || _constant_1.BAD_REQUEST_CODE;
        const errMsg = ((_a = exception === null || exception === void 0 ? void 0 : exception.response) === null || _a === void 0 ? void 0 : _a.message)
            ? exception.message + '. ' + ((_b = exception === null || exception === void 0 ? void 0 : exception.response) === null || _b === void 0 ? void 0 : _b.message)
            : exception.response;
        const data = `
    requestId: ${req.reqId},
    timestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')},
    ip: ${(req === null || req === void 0 ? void 0 : req.ip) || '0.0.0.0'},
    reqUrl: ${req.originalUrl},
    reqMethod: ${req.method},
    httpCode: ${errCode},
    params: ${JSON.stringify(req.params)},
    query: ${JSON.stringify(req.query)},
    body: ${JSON.stringify(req.body)},
    statusCode: ${status},
    errorMsg: ${JSON.stringify(errMsg)},
  `;
        _util_1.Logger.error(req.reqId, data);
        return {
            errCode,
            errMsg,
        };
    }
};
AllExceptionsFilter = __decorate([
    (0, common_1.Catch)()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=any-exception.filter.js.map