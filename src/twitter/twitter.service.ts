import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterApi } from 'twitter-api-v2';

@Injectable()
export class TwitterService {
  private readonly logger = new Logger(TwitterService.name);
  private twitterClient: TwitterApi;

  constructor(private configService: ConfigService) {
    this.logger.debug(this.configService.get<string>('twitter.apiKey'));
    this.twitterClient = new TwitterApi({
      appKey: this.configService.get<string>('twitter.apiKey'),
      appSecret: this.configService.get<string>('twitter.apiSecretKey'),
      accessToken: this.configService.get<string>('twitter.accessToken'),
      accessSecret: this.configService.get<string>('twitter.accessTokenSecret'),
    });
  }

  async postTweet(message: string) {
    try {
      const res = await this.twitterClient.v2.tweet(message);
      this.logger.log('Tweet posted successfully');
      return res;
    } catch (e) {
      console.log(e);
      throw e
    }
  }
}
