import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    Login(): {
        access_token: string;
        username: string;
        avatar: string;
    };
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(user: any): Promise<void>;
}
