import { ExecutionContext } from '@nestjs/common';
import { CallHandler } from '@nestjs/common';
import { NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
