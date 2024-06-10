import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GithubService } from '../github/github.service';
import { TwitterService } from '../twitter/twitter.service';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);
  // Schedule tweets at specific times
  constructor(
    private readonly twitterService: TwitterService,
    private readonly githubService: GithubService,
  ) {}

  private async sendIfExist() {
    const posts = await this.githubService.getPosts();
    const scheduled = posts.filter((i) => i.status === 'Scheduled');
    if (scheduled.length > 0) {
      this.logger.debug('call twitter');
      await this.twitterService.postTweet(scheduled[0].content);
      this.githubService.moveCardToPublished(scheduled[0]);
    } else {
      this.logger.warn('no message to send');
    }
  }

//   @Cron('0 9 * * 1-5', {
//     timeZone: 'UTC',
//   })
//   handleMorningTweets() {
//     this.logger.log('Sending morning tweet');
//     this.sendIfExist();
//     // this.twitterService.postTweet('Good morning! Here is your daily update.');
//   }

  @Cron('0 17 * * 1-5', {
    timeZone: 'UTC',
  })
  handleEveningTweets() {
    this.logger.log('Sending evening tweet');
    this.sendIfExist();
    // this.twitterService.postTweet('Good morning! Here is your daily update.');
  }

//   @Cron('0 9 * * 6-7', {
//     timeZone: 'UTC',
//   })
//   handleWeekendTweets() {
//     this.logger.log('Sending weekend tweet');
//     this.sendIfExist();
//     // this.twitterService.postTweet('Good morning! Here is your daily update.');
//   }
}
