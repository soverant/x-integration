import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule } from 'src/twitter/twitter.module';
import { GithubService } from './github.service';


@Module({
  imports: [ConfigModule,TwitterModule],
  providers: [GithubService],
  controllers: [GithubController],
  exports: [GithubService],
})
export class GithubModule {}