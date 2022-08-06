import { LogService } from 'src/libs/log/log.service';
import { User, UserService } from '~service';
export declare class UserController {
    private readonly userService;
    private readonly logService;
    constructor(userService: UserService, logService: LogService);
    findOne(body: any): User;
}
