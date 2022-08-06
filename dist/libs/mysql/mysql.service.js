"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mysql = require("mysql2/promise");
const error_1 = require("../../util/error");
const _interface_1 = require("../../interface");
const _util_1 = require("../../util");
const req_track_service_1 = require("../req-track/req-track.service");
let MysqlService = class MysqlService {
    constructor(reqTrack, config) {
        this.reqTrack = reqTrack;
        this.config = config;
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
        }
        catch (error) {
            _util_1.Logger.mysql(this.reqId, `数据库连接失败 \n ${error}`);
        }
    }
    async getConnection() {
        const conn = await this.POOL.getConnection();
        if (!conn) {
            _util_1.Logger.mysql(this.reqId, `手动获取数据库连接失败`);
            throw new common_1.BadRequestException('connection db err');
        }
        return conn;
    }
    async query(data) {
        const { sql, value } = data;
        try {
            const conn = this.POOL;
            const [result] = await conn.query(sql, value);
            _util_1.Logger.mysql(this.reqId, result);
            return result;
        }
        catch (error) {
            _util_1.Logger.error(this.reqId, `查询数据库失败 \n ${error}\n ${JSON.stringify(data)}`);
            throw (0, error_1.makeErr)({ code: 30001, message: `查询数据库失败${error}` });
        }
    }
    async execute(data) {
        try {
            const { sql, value } = data;
            const conn = await this.getConnection();
            const [result] = await conn.execute(sql, value);
            conn.release();
            return result;
        }
        catch (error) {
            _util_1.Logger.mysql(this.reqId, `数据库操作失败 \n ${error} \n ${JSON.stringify(data)}`);
            throw new common_1.HttpException(error, 500);
        }
    }
    async startTransaction(conn) {
        return await conn.beginTransaction();
    }
    async commit(conn) {
        await conn.commit();
        return this.release(conn);
    }
    async rollback(conn) {
        return await conn.rollback();
    }
    async release(conn) {
        await conn.release();
    }
};
MysqlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [req_track_service_1.ReqTrackService,
        config_1.ConfigService])
], MysqlService);
exports.MysqlService = MysqlService;
//# sourceMappingURL=mysql.service.js.map