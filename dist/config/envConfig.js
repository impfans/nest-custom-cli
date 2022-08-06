"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const envConfig = () => ({
    mysql: {
        port: parseInt(process.env.MYSQL_PORT),
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PWD,
        database: process.env.MYSQL_DATABASE,
        connLimit: process.env.MYSQL_CONN_LIMIT,
    },
});
exports.envConfig = envConfig;
//# sourceMappingURL=envConfig.js.map