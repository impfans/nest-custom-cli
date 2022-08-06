"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const index_1 = require("./controller/index");
const _middleware_1 = require("./middleware");
const express = require("express");
const uuid_1 = require("uuid");
const express_rate_limit_1 = require("express-rate-limit");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(index_1.MainModule, {
        logger: common_1.Logger,
    });
    app.set('trust proxy', 1);
    app.use((req, _, next) => {
        req.reqId = req.headers['X-Request-Id'] || (0, uuid_1.v4)();
        req.reqIp = req.headers['X-Ip'] || '0.0.0.0';
        next();
    });
    app.use(express.json({ limit: '20mb' }));
    app.use(express.urlencoded({ extended: true, limit: '20mb' }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle('接口文档')
        .setDescription('懒得写文档就用swagger~')
        .setVersion('1.0.0')
        .addTag('xxx')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('/swagger/api', app, document);
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 100,
    }));
    app.use(_middleware_1.logger);
    await app.listen(8080);
}
bootstrap();
//# sourceMappingURL=main.js.map