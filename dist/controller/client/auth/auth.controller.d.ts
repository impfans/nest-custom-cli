import { AuthService } from '~service';
import { UserDto } from './auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    Login(body: any): Promise<{
        access_token: string;
    }>;
    register(body: UserDto): Promise<any>;
}
