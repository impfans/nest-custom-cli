"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const moment = require("moment");
const context_1 = require("../interface/context");
const log4js_1 = require("../util/log4js");
function logger(req, res, next) {
    const code = res.statusCode;
    next();
    const logFormat = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    请求参数
    timestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')}
    requestId: ${req.reqId},
    Request original url: ${req.originalUrl}
    Method: ${req.method}
    IP: ${req.ip}
    Status code: ${code}
    Params: ${JSON.stringify(req.params)}
    Query: ${JSON.stringify(req.query)}
    Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
    if (code >= 500) {
        log4js_1.Logger.error(req.reqId || '', logFormat);
    }
    else if (code >= 400) {
        log4js_1.Logger.warn(req.reqId || '', logFormat);
    }
    else {
        log4js_1.Logger.access(req.reqId || '', logFormat);
    }
}
exports.logger = logger;
//# sourceMappingURL=logger.middleware.js.map