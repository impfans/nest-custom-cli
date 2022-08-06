import { Injectable } from '@nestjs/common';
import { ReqTrackService } from 'src/libs/req-track/req-track.service';
import { Logger } from '~util';

@Injectable()
export class LogService {
  constructor(private readonly track: ReqTrackService) {}
  public info(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.info(_logInfo.requestId, _logInfo);
  }
  public error(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.error(_logInfo.requestId, _logInfo);
  }
  public access(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.access(_logInfo.requestId, _logInfo);
  }
  public mysql(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.mysql(_logInfo.requestId, _logInfo);
  }
  public debug(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.debug(_logInfo.requestId, _logInfo);
  }
  public warn(logInfo: { logType: string; logContent: string }) {
    const _logInfo = this.print(logInfo);
    Logger.warn(_logInfo.requestId, _logInfo);
  }
  private print(logInfo: { logType: string; logContent: string }) {
    const trackInfo = this.track?.baseInfo;
    return Object.assign({}, trackInfo && trackInfo, { logInfo });
  }
}
