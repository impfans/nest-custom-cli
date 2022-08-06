/**
 * any-exception filter.
 * @file 全局异常捕获
 * 全局范围的异常捕获, 统一处理, 并输出error日志
 * 原则上error信息要全部记录, 可以有选择的提取信息进行前置
 */

 import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '~util';
import * as moment from 'moment';
import { ICtxRequest } from '~interface';
import { Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { BAD_REQUEST_CODE, SERVER_ERR_CODE } from '~constant';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    this.httpCatch(exception, host.switchToHttp());
  }

  /**
   * 捕获http请求异常
   * @param exception - 异常对象
   * @param ctx - 请求上下文
   */
  private httpCatch(exception: any, ctx: HttpArgumentsHost) {
    const request = ctx.getRequest() as ICtxRequest;
    const response: Response = ctx.getResponse();
    const { errCode, errMsg } = this.handleErr(exception, request);
    const resData = {
      requestId: request.reqId,
      code: errCode,
      msg: errMsg,
    };
    // 程序内异常捕获返回
    response.status(200).json(resData);
  }
  /**
   * 处理错误
   * @param exception - 异常对象
   * @param req - req请求对象
   * @returns
   */
  private handleErr(exception: any, req: ICtxRequest) {
    const isSysErr = !(
      exception instanceof HttpException ||
      (exception.status >= 400 && exception.status < 500)
    ); // 正常错误包括：nest内置错误、继承nest内置错误的标准错误、第三方http库的4xx系列错误

    Logger.debug('filter', exception);
    // HTTP 状态码
    const status: number = isSysErr
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : exception.status || HttpStatus.BAD_REQUEST;
    // 业务错误码。用户可根据错误码来细化前端交互
    const errCode: string = isSysErr
      ? SERVER_ERR_CODE
      : exception.code || BAD_REQUEST_CODE;
    // 错误详情
    const errMsg: string = exception?.response?.message
      ? exception.message + '. ' + exception?.response?.message
      : exception.response;
    // 自定义异常结构体, 日志用
    const data: any = `
    requestId: ${req.reqId},
    timestamp: ${moment().format('YYYY-MM-DD HH:mm:ss')},
    ip: ${req?.ip || '0.0.0.0'},
    reqUrl: ${req.originalUrl},
    reqMethod: ${req.method},
    httpCode: ${errCode},
    params: ${JSON.stringify(req.params)},
    query: ${JSON.stringify(req.query)},
    body: ${JSON.stringify(req.body)},
    statusCode: ${status},
    errorMsg: ${JSON.stringify(errMsg)},
  `;
    Logger.error(req.reqId, data);
    return {
      errCode,
      errMsg,
    };
  }
}
