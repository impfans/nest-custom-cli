"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.ContextTrace = exports.LoggerLevel = void 0;
const Path = require("path");
const Log4js = require("log4js");
const Util = require("util");
const Moment = require("moment");
const StackTrace = require("stacktrace-js");
const chalk_1 = require("chalk");
const _config_1 = require("../config");
var LoggerLevel;
(function (LoggerLevel) {
    LoggerLevel["ALL"] = "ALL";
    LoggerLevel["MARK"] = "MARK";
    LoggerLevel["TRACE"] = "TRACE";
    LoggerLevel["DEBUG"] = "DEBUG";
    LoggerLevel["INFO"] = "INFO";
    LoggerLevel["WARN"] = "WARN";
    LoggerLevel["ERROR"] = "ERROR";
    LoggerLevel["FATAL"] = "FATAL";
    LoggerLevel["OFF"] = "OFF";
})(LoggerLevel = exports.LoggerLevel || (exports.LoggerLevel = {}));
class ContextTrace {
    constructor(context, path, lineNumber, columnNumber) {
        this.context = context;
        this.path = path;
        this.lineNumber = lineNumber;
        this.columnNumber = columnNumber;
    }
}
exports.ContextTrace = ContextTrace;
Log4js.addLayout('Awesome-nest', (logConfig) => {
    return (logEvent) => {
        let moduleName = '';
        let position = '';
        const messageList = [];
        logEvent.data.forEach((value) => {
            if (value instanceof ContextTrace) {
                moduleName = value.context;
                if (value.lineNumber && value.columnNumber) {
                    position = `${value.lineNumber}, ${value.columnNumber}`;
                }
                return;
            }
            if (typeof value !== 'string') {
                value = Util.inspect(value, false, 3, true);
            }
            messageList.push(value);
        });
        const messageOutput = messageList.join(' ');
        const positionOutput = position ? ` [${position}]` : '';
        const typeOutput = `[${logConfig.type}] ${logEvent.pid.toString()}   - `;
        const dateOutput = `${Moment(logEvent.startTime).format('YYYY-MM-DD HH:mm:ss')}`;
        const moduleOutput = moduleName
            ? `[${moduleName}] `
            : '[LoggerService] ';
        let levelOutput = `[${logEvent.level}] ${messageOutput}`;
        switch (logEvent.level.toString()) {
            case LoggerLevel.DEBUG:
                levelOutput = chalk_1.default.green(levelOutput);
                break;
            case LoggerLevel.INFO:
                levelOutput = chalk_1.default.cyan(levelOutput);
                break;
            case LoggerLevel.WARN:
                levelOutput = chalk_1.default.yellow(levelOutput);
                break;
            case LoggerLevel.ERROR:
                levelOutput = chalk_1.default.red(levelOutput);
                break;
            case LoggerLevel.FATAL:
                levelOutput = chalk_1.default.hex('#DD4C35')(levelOutput);
                break;
            default:
                levelOutput = chalk_1.default.grey(levelOutput);
                break;
        }
        return `${chalk_1.default.green(typeOutput)}${dateOutput}  ${chalk_1.default.yellow(moduleOutput)}${levelOutput}${positionOutput}`;
    };
});
Log4js.configure(_config_1.log4jsConfig);
const logger = Log4js.getLogger();
class Logger {
    static trace(traceId, args) {
        logger.level = LoggerLevel.TRACE;
        logger.trace(Logger.getStackTrace(traceId), args);
    }
    static debug(traceId, args) {
        logger.level = LoggerLevel.DEBUG;
        logger.debug(Logger.getStackTrace(traceId), args);
    }
    static info(traceId, args) {
        logger.level = LoggerLevel.INFO;
        logger.info(Logger.getStackTrace(traceId), args);
    }
    static warn(traceId, args) {
        logger.level = LoggerLevel.WARN;
        logger.warn(Logger.getStackTrace(traceId), args);
    }
    static error(traceId, args) {
        logger.level = LoggerLevel.ERROR;
        logger.error(Logger.getStackTrace(traceId), args);
    }
    static fatal(traceId, args) {
        logger.level = LoggerLevel.FATAL;
        logger.fatal(Logger.getStackTrace(traceId), args);
    }
    static access(traceId, args) {
        logger.level = LoggerLevel.INFO;
        const loggerCustom = Log4js.getLogger('http');
        loggerCustom.info(Logger.getStackTrace(traceId), args);
    }
    static mysql(traceId, args) {
        logger.level = LoggerLevel.INFO;
        const loggerCustom = Log4js.getLogger('mysql');
        loggerCustom.info(Logger.getStackTrace(traceId), args);
    }
    static getStackTrace(traceId) {
        const stackList = StackTrace.getSync();
        const stackInfo = stackList[2];
        const lineNumber = stackInfo.lineNumber;
        const columnNumber = stackInfo.columnNumber;
        const fileName = stackInfo.fileName;
        const basename = Path.basename(fileName);
        return `[requestId:${traceId}] ${basename}(line: ${lineNumber}, column: ${columnNumber}): \n`;
    }
}
exports.Logger = Logger;
//# sourceMappingURL=log4js.js.map