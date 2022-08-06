import { Response } from 'express';
import { ICtxRequest } from 'src/interface/context';
export declare function logger(req: ICtxRequest, res: Response, next: () => any): void;
