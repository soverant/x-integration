import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from './config/config.module';
import { GithubModule } from './github/github.module';
import { TwitterModule } from './twitter/twitter.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler/scheduler.service';
import { SchedulerModule } from './scheduler/scheduler.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigModule globally available
    }),
    ScheduleModule.forRoot(),
    ConfigurationModule,
    GithubModule,
    TwitterModule,
    SchedulerModule
  ],
  providers: [SchedulerService],
})
export class AppModule {}