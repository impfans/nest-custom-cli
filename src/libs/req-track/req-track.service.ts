import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as moment from 'moment';
import { v44 as uuidV4 } from 'uuid';
@Injectable()
export class ReqTrackService {
  private data: any;
  constructor(@Inject(REQUEST) private req: Request) {
    const reqId: string =
      (this.req as any).reqId || this.req.headers['x-req-id'] || uuidV4();
    const ip = (this.req as any).reqIp || req.ip || '0.0.0.0';
    this.data = {
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      reqId,
      reqTime: Date.now(),
      reqPath: this.req.originalUrl,
      reqMethod: this.req.method,
      reqBody: this.req.body,
      userInfo: {},
      ip,
    };
  }
  /**
   * 基础信息
   */
  public get baseInfo() {
    const { data } = this;
    return {
      requestId: data.reqId,
      timeCost: `${Date.now() - data.reqTime}ms`,
      userInfo: data.userInfo,
    };
  }

  /**
   * 上下文全部信息
   */
  public get info() {
    const { data } = this;
    return { ...data, timeCost: `${Date.now() - data.reqTime}ms` };
  }

  public setUserInfo(info) {
    this.data.userInfo = info;
    (this.req as any).userInfo = info;
  }
}
