import { Test, TestingModule } from '@nestjs/testing';
import { GithubService } from './github.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration';

describe('GithubService', () => {
  let service: GithubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [configuration],
          isGlobal: true,
        }),
      ],
      providers: [GithubService],
    }).compile();

    service = module.get<GithubService>(GithubService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
    const posts = await service.getPosts();
    expect(posts.length > 0).toBeTruthy();
    for (const i of posts) {
      console.log(i)
      await service.moveCardToPublished(i);
    }
    const postsNew = await service.getPosts();
    for (const p of postsNew) {
      expect(
        p.ghData.optionId ==
          p.ghData.options.find((i) => i.name === 'Published').id,
      ).toBeTruthy();
    }
  });
});
