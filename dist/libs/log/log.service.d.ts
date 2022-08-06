import { ReqTrackService } from 'src/libs/req-track/req-track.service';
export declare class LogService {
    private readonly track;
    constructor(track: ReqTrackService);
    info(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    error(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    access(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    mysql(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    debug(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    warn(logInfo: {
        logType: string;
        logContent: string;
    }): void;
    private print;
}
