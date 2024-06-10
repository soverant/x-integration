import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TwitterModule } from 'src/twitter/twitter.module';
import { GithubModule } from '../github/github.module';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [ConfigModule,TwitterModule,GithubModule],
})
export class SchedulerModule {}