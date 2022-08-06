import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from 'src/libs/log/log.service';
import { User, UserService } from '~service';
import { Logger } from '~util';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Post('findUser')
  findOne(@Body() body): User {
    this.logService.info(body);
    return this.userService.findOne(body.username);
  }
}
