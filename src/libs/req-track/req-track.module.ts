import { Module } from '@nestjs/common';
import { ReqTrackService } from './req-track.service';

@Module({
  providers: [ReqTrackService],
  exports: [ReqTrackService],
})
export class ReqTrackModule {}
