"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const _filter_1 = require("../filter");
const _interceptor_1 = require("../interceptor");
const auth_module_1 = require("./client/auth/auth.module");
const user_module_1 = require("./client/user/user.module");
const log_module_1 = require("../libs/log/log.module");
const _util_1 = require("../util");
const mysql_module_1 = require("../libs/mysql/mysql.module");
const _config_1 = require("../config");
const config_1 = require("@nestjs/config");
let MainModule = class MainModule {
};
MainModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [_config_1.envConfig],
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            log_module_1.LogModule,
            mysql_module_1.MysqlModule.forRoot(),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: _filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: _interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: _util_1.ValidationPipe,
            },
        ],
    })
], MainModule);
exports.MainModule = MainModule;
//# sourceMappingURL=index.js.map