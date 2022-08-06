import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionsFilter } from '~filter';
import { ResponseInterceptor } from '~interceptor';
import { AuthModule } from '~controller/client/auth/auth.module';
import { UserModule } from './client/user/user.module';
import { LogModule } from 'src/libs/log/log.module';
import { ValidationPipe } from '~util';
import { MysqlModule } from 'src/libs/mysql/mysql.module';
import { envConfig } from '~config';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    LogModule,
    MysqlModule.forRoot(),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MainModule {}
