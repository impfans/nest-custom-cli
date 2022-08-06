export declare enum LoggerLevel {
    ALL = "ALL",
    MARK = "MARK",
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL",
    OFF = "OFF"
}
export declare class ContextTrace {
    readonly context: string;
    readonly path?: string;
    readonly lineNumber?: number;
    readonly columnNumber?: number;
    constructor(context: string, path?: string, lineNumber?: number, columnNumber?: number);
}
export declare class Logger {
    static trace(traceId: any, args: any): void;
    static debug(traceId: any, args: any): void;
    static info(traceId: any, args: any): void;
    static warn(traceId: any, args: any): void;
    static error(traceId: any, args: any): void;
    static fatal(traceId: any, args: any): void;
    static access(traceId: any, args: any): void;
    static mysql(traceId: any, args: any): void;
    static getStackTrace(traceId: any): string;
}
