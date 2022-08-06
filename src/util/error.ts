import { HttpException, HttpStatus } from '@nestjs/common';
import { isString } from 'lodash';
import { IMakeErrOpts } from '~interface';

/**
 * 错误基类
 */
export class BaseError extends HttpException {
  /**
   * 业务错误码
   */
  public readonly code: string;

  /**
   * 错误基类
   * @param code 业务错误码
   * @param message 错误信息
   * @param stack 错误堆栈
   * @param statusCode HTTP错误码
   */
  constructor(code, message, stack, statusCode) {
    super(message, statusCode);
    if (isString(stack)) {
      // 默认使用父类的上下文堆栈
      this.stack = stack;
    }
    this.code = code;
  }
}

/**
 * 生成标准错误
 * @param opts
 * @returns
 */
export function makeErr(opts: IMakeErrOpts) {
  const {
    code,
    message,
    stack,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
  } = opts;
  return new BaseError(code, message, stack, statusCode);
}
