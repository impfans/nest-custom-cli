import { Module } from '@nestjs/common';
import { ReqTrackModule } from 'src/libs/req-track/req-track.module';
import { LogService } from './log.service';

@Module({
  imports: [ReqTrackModule],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
