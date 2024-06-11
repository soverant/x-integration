# X-Integration

## Overview

X-Integration is a NestJS-based project designed to manage and automate the posting of content to social media platform X (formerly known as Twitter). It leverages GitHub project boards to schedule and manage posts. The application looks for cards in the "Scheduled" column and posts the content at 5 PM UTC. If a card is in draft mode, the text in the title is used for the post. If the card is an issue, the body of the issue is used for the post. Once posted, the card is moved to the "Published" column.

## Features

- **Automated Scheduling**: Automatically post scheduled content to X at 5 PM UTC.
- **Content Management**: Use card titles for drafts and issue bodies for issues as post content.
- **GitHub Integration**: Move cards from "Scheduled" to "Published" after posting.
- **Environment Configuration**: Easily configure using environment variables.

## Requirements

- Node.js
- NestJS
- GitHub API Access
- X API Access

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/soverant/x-integration.git
    cd x-integration
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root of the project and add your configuration variables:
    ```env
    TWITTER_API_KEY=your_twitter_api_key
    TWITTER_API_SECRET_KEY=your_twitter_api_secret_key
    TWITTER_ACCESS_TOKEN=your_twitter_access_token
    TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret
    GITHUB_TOKEN=your_github_token
    PROJECT_ID=your_github_project_id
    ```

4. Start the application:
    ```bash
    npm run start
    ```

## Configuration

The application uses the following environment variables for configuration:

- `TWITTER_API_KEY`: Your X API key.
- `TWITTER_API_SECRET_KEY`: Your X API secret key.
- `TWITTER_ACCESS_TOKEN`: Your X access token.
- `TWITTER_ACCESS_TOKEN_SECRET`: Your X access token secret.
- `GITHUB_TOKEN`: Your GitHub personal access token.
- `PROJECT_ID`: The ID of your GitHub project.

## Usage

1. Ensure cards are created in the "Scheduled" column of your GitHub project board. Use the title for drafts or the body for issues to define the content of the X post.

2. The application will automatically check for scheduled posts and publish them at 5 PM UTC. 

3. After posting, the corresponding card will be moved to the "Published" column on your GitHub project board.

## Project Template

To use the provided GitHub project board template, follow these steps:

1. Go to the [project template](https://github.com/orgs/soverant/projects/3).
2. Click on "Use template" to create a new project board in your repository.
3. Add your content cards to the "Scheduled" column of the project board.

## Development

To run the application in development mode:
```bash
npm run start:dev
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License.

---

Feel free to reach out with any questions or issues regarding the project. Happy coding!
