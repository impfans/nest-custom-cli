import { DynamicModule, Global, Module } from '@nestjs/common';
import { ReqTrackModule } from '../req-track/req-track.module';
import { MysqlService } from './mysql.service';

@Module({})
@Global()
export class MysqlModule {
  static forRoot(): DynamicModule {
    return {
      imports: [ReqTrackModule],
      module: MysqlModule,
      providers: [MysqlService],
      exports: [MysqlService],
    };
  }
}
