import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  Login() {
    return {
      access_token: 'yes',
      username: 'test',
      avatar: 'https://bit.ly/2Z4KKcF',
    };
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user: User = this.userService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: any) {
    const {} = user;
  }
}
