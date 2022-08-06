import { Test, TestingModule } from '@nestjs/testing';
import { ReqTrackService } from './req-track.service';

describe('ReqTrackService', () => {
  let service: ReqTrackService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReqTrackService],
    }).compile();

    service = module.get<ReqTrackService>(ReqTrackService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
