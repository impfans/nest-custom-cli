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
exports.LogService = void 0;
const common_1 = require("@nestjs/common");
const req_track_service_1 = require("../req-track/req-track.service");
const _util_1 = require("../../util");
let LogService = class LogService {
    constructor(track) {
        this.track = track;
    }
    info(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.info(_logInfo.requestId, _logInfo);
    }
    error(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.error(_logInfo.requestId, _logInfo);
    }
    access(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.access(_logInfo.requestId, _logInfo);
    }
    mysql(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.mysql(_logInfo.requestId, _logInfo);
    }
    debug(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.debug(_logInfo.requestId, _logInfo);
    }
    warn(logInfo) {
        const _logInfo = this.print(logInfo);
        _util_1.Logger.warn(_logInfo.requestId, _logInfo);
    }
    print(logInfo) {
        var _a;
        const trackInfo = (_a = this.track) === null || _a === void 0 ? void 0 : _a.baseInfo;
        return Object.assign({}, trackInfo && trackInfo, { logInfo });
    }
};
LogService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [req_track_service_1.ReqTrackService])
], LogService);
exports.LogService = LogService;
//# sourceMappingURL=log.service.js.map