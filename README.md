# X-Integration

X-Integration is a project designed to manage and automate social media content posting on X (formerly Twitter) using NestJS and GitHub Projects. It schedules posts based on the columns in a GitHub Project, posting the content at 5 PM UTC and moving the corresponding card to the "Published" column.

## Features

- **Automated Posting**: Automatically posts content to X at 5 PM UTC.
- **Draft and Issue Handling**: Posts draft titles and issue bodies from GitHub Projects.
- **Column Management**: Moves cards from the "Scheduled" column to the "Published" column after posting.
- **Environment Configuration**: Uses environment variables for configuration.

## Prerequisites

- Node.js
- GitHub account with a project containing columns "Scheduled" and "Published".
- X (Twitter) Developer account for API keys and tokens.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/x-integration.git
    cd x-integration
    ```

2. Install dependencies:

    ```bash
    yarn
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```env
    TWITTER_API_KEY=your-twitter-api-key
    TWITTER_API_SECRET_KEY=your-twitter-api-secret-key
    TWITTER_ACCESS_TOKEN=your-twitter-access-token
    TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
    GITHUB_TOKEN=your-github-token
    PROJECT_ID=your-github-project-id
    ```

## Usage

1. Start the application:

    ```bash
    yarn start
    ```

2. The application will automatically look for cards in the "Scheduled" column of the specified GitHub Project and post the content to X at 5 PM UTC.

3. Once the content is posted, the corresponding card will be moved to the "Published" column.

## Environment Variables

Ensure the following environment variables are set either in your `.env` file or your deployment environment:

- `TWITTER_API_KEY`: Your Twitter API Key.
- `TWITTER_API_SECRET_KEY`: Your Twitter API Secret Key.
- `TWITTER_ACCESS_TOKEN`: Your Twitter Access Token.
- `TWITTER_ACCESS_TOKEN_SECRET`: Your Twitter Access Token Secret.
- `GITHUB_TOKEN`: Your GitHub Personal Access Token.
- `PROJECT_ID`: The ID of your GitHub Project.

## Deployment

To deploy the project, ensure all the environment variables are correctly set in your deployment environment. Use Docker, Heroku, or any other platform as per your preference to host the application.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
