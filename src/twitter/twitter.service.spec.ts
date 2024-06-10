import { Test, TestingModule } from '@nestjs/testing';
import { TwitterService } from './twitter.service';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';

describe('TwitterService', () => {
  let service: TwitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [TwitterService],
    }).compile();

    service = module.get<TwitterService>(TwitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should post',async ()=>{
    const res = await service.postTweet("this is a test")
    console.log(res)
    expect(res.errors).toHaveLength(0)
  },10000)
});
