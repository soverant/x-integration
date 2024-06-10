export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    githubWebhookSecret: process.env.GITHUB_WEBHOOK_SECRET,
    twitter: {
      apiKey: process.env.TWITTER_API_KEY,
      apiSecretKey: process.env.TWITTER_API_SECRET_KEY,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    },
  });