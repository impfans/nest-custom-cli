import { Module } from '@nestjs/common';
import { LogModule } from 'src/libs/log/log.module';
import { UserService } from '~service';
import { UserController } from './user.controller';

@Module({
  imports: [LogModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
