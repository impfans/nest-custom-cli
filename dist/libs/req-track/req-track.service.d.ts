import { Request } from 'express';
export declare class ReqTrackService {
    private req;
    private data;
    constructor(req: Request);
    get baseInfo(): {
        requestId: any;
        timeCost: string;
        userInfo: any;
    };
    get info(): any;
    setUserInfo(info: any): void;
}
