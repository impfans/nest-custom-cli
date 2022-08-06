import { HttpException } from '@nestjs/common';
import { IMakeErrOpts } from '~interface';
export declare class BaseError extends HttpException {
    readonly code: string;
    constructor(code: any, message: any, stack: any, statusCode: any);
}
export declare function makeErr(opts: IMakeErrOpts): BaseError;
