"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log4jsConfig = void 0;
const path = require("path");
const baseLogPath = path.resolve(__dirname, '../../logs');
exports.log4jsConfig = {
    appenders: {
        console: { type: 'console' },
        access: {
            type: 'dateFile',
            filename: `${baseLogPath}/access/access.log`,
            alwaysIncludePattern: true,
            pattern: 'yyyy-MM-dd',
            daysToKeep: 30,
            numBackups: 3,
            compress: true,
            category: 'http',
            keepFileExt: true,
        },
        app: {
            type: 'dateFile',
            filename: `${baseLogPath}/app-out/app.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' ",
            },
            pattern: 'yyyy-MM-dd',
            daysToKeep: 30,
            numBackups: 3,
            keepFileExt: true,
        },
        errorFile: {
            type: 'dateFile',
            filename: `${baseLogPath}/error/error.log`,
            alwaysIncludePattern: true,
            layout: {
                type: 'pattern',
                pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' ",
            },
            pattern: 'yyyy-MM-dd',
            daysToKeep: 30,
            numBackups: 3,
            keepFileExt: true,
        },
        errors: {
            type: 'logLevelFilter',
            level: 'ERROR',
            appender: 'errorFile',
        },
    },
    categories: {
        default: {
            appenders: ['console', 'access', 'app', 'errors'],
            level: 'DEBUG',
        },
        mysql: { appenders: ['access', 'errors'], level: 'info' },
        http: { appenders: ['access'], level: 'DEBUG' },
    },
    pm2: true,
    pm2InstanceVar: 'INSTANCE_ID',
};
//# sourceMappingURL=log4jsConfig.js.map