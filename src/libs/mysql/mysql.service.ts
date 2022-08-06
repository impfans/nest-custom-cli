import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
import { makeErr } from 'src/util/error';
import { QueryInterface } from '~interface';
import { Logger } from '~util';
import { ReqTrackService } from '../req-track/req-track.service';

@Injectable()
export class MysqlService {
  private reqId: string;
  constructor(
    private readonly reqTrack: ReqTrackService,
    private readonly config: ConfigService,
  ) {
    try {
      this.reqId = this.reqTrack.baseInfo.requestId || '';
      this.POOL = mysql.createPool({
        port: this.config.get('MYSQL_PORT'),
        host: this.config.get('MYSQL_HOST'),
        user: this.config.get('MYSQL_USERNAME'),
        password: this.config.get('MYSQL_PWD'),
        connectionLimit: this.config.get('MYSQL_CONN_LIMIT'),
        database: this.config.get('MYSQL_DATABASE'),
      });
    } catch (error) {
      Logger.mysql(this.reqId, `数据库连接失败 \n ${error}`); // 数据库链接失败
    }
  }
  private POOL: mysql.Pool;
  async getConnection(): Promise<mysql.PoolConnection> {
    const conn = await this.POOL.getConnection();
    if (!conn) {
      Logger.mysql(this.reqId, `手动获取数据库连接失败`);
      throw new BadRequestException('connection db err');
    }
    return conn;
  }

  /**
   * 共用默认连接查询
   * @param {object}data - 查询对象
   * @param {string}data.sql - 查询语句
   * @param {string}data.value - 语句中需要的值
   * @param {string}data.conn - 获取到的数据库连接
   * @returns
   */
  async query(data: QueryInterface) {
    const { sql, value } = data;
    try {
      const conn = this.POOL;
      const [result] = await conn.query(sql, value);
      Logger.mysql(this.reqId, result);
      return result;
    } catch (error) {
      Logger.error(
        this.reqId,
        `查询数据库失败 \n ${error}\n ${JSON.stringify(data)}`,
      );
      throw makeErr({ code: 30001, message: `查询数据库失败${error}` });
    }
  }

  async execute(data: QueryInterface) {
    try {
      const { sql, value } = data;
      const conn = await this.getConnection();
      const [result]: any = await conn.execute(sql, value);
      conn.release(); // 释放链接

      return result;
    } catch (error) {
      Logger.mysql(
        this.reqId,
        `数据库操作失败 \n ${error} \n ${JSON.stringify(data)}`,
      );
      throw new HttpException(error, 500);
    }
  }

  /**
   * 开启事务
   * @param conn - 获取的链接
   * @returns
   */
  async startTransaction(conn: any): Promise<any> {
    return await conn.beginTransaction();
  }

  /**
   * 提交事务且断开连接
   * @param conn - 获取的链接
   * @returns
   */
  async commit(conn: any): Promise<any> {
    await conn.commit();
    return this.release(conn);
  }

  /**
   * 事务回滚
   * @param conn - 获取的链接
   * @returns
   */
  async rollback(conn: any): Promise<any> {
    return await conn.rollback();
  }

  /**
   * 手动从连接池断开链接
   * @param conn - 获取到的链接
   */
  async release(conn: any): Promise<any> {
    await conn.release();
  }
}
