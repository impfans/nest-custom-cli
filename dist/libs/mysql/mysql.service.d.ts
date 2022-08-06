import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { QueryInterface } from '~interface';
import { ReqTrackService } from '../req-track/req-track.service';
export declare class MysqlService {
    private readonly reqTrack;
    private readonly config;
    private reqId;
    constructor(reqTrack: ReqTrackService, config: ConfigService);
    private POOL;
    getConnection(): Promise<mysql.PoolConnection>;
    query(data: QueryInterface): Promise<mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader>;
    execute(data: QueryInterface): Promise<any>;
    startTransaction(conn: any): Promise<any>;
    commit(conn: any): Promise<any>;
    rollback(conn: any): Promise<any>;
    release(conn: any): Promise<any>;
}
