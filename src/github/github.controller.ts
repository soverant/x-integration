// deprecated file just keep it for debug and fear of deleting it.
import { Controller, Post, Headers, Body, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwitterService } from '../twitter/twitter.service';
import * as crypto from 'crypto';
import { GithubService } from './github.service';

@Controller('github')
export class GithubController {
  private readonly logger = new Logger(GithubController.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly githubService: GithubService,
  ) {}

  @Post('webhook')
  async handleWebhook(
    @Headers('X-Hub-Signature-256') signature: string,
    @Body() payload: any,
  ) {
    const secret = this.configService.get<string>('githubWebhookSecret');
    const hmac = crypto.createHmac('sha256', secret);
    const digest = `sha256=${hmac.update(JSON.stringify(payload)).digest('hex')}`;

    if (signature !== digest) {
      this.logger.warn('Invalid signature');
      return;
    }

    this.logger.log('Webhook received:', payload);
    if (payload.action === 'edited' && payload.changes && payload.projects_v2_item) {
      const posts = this.githubService.getPosts()


    }
  }
}

const schedule = {
  action: 'reordered',
  projects_v2_item: {
    id: 66666808,
    node_id: 'PVTI_lADOChRLzs4Ai65gzgP5QTg',
    project_node_id: 'PVT_kwDOChRLzs4Ai65g',
    content_node_id: 'DI_lADOChRLzs4Ai65gzgGmxRo',
    content_type: 'DraftIssue',
    creator: {
      login: 'farhoud',
      id: 2462150,
      node_id: 'MDQ6VXNlcjI0NjIxNTA=',
      avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/farhoud',
      html_url: 'https://github.com/farhoud',
      followers_url: 'https://api.github.com/users/farhoud/followers',
      following_url:
        'https://api.github.com/users/farhoud/following{/other_user}',
      gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
      organizations_url: 'https://api.github.com/users/farhoud/orgs',
      repos_url: 'https://api.github.com/users/farhoud/repos',
      events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/farhoud/received_events',
      type: 'User',
      site_admin: false,
    },
    created_at: '2024-06-09T07:24:24Z',
    updated_at: '2024-06-09T08:54:36Z',
    archived_at: null,
  },
  changes: {
    previous_projects_v2_item_node_id: {
      from: 'PVTI_lADOChRLzs4Ai65gzgP2-b8',
      to: 'PVTI_lADOChRLzs4Ai65gzgP2-b8',
    },
  },
  organization: {
    login: 'soverant',
    id: 169102286,
    node_id: 'O_kgDOChRLzg',
    url: 'https://api.github.com/orgs/soverant',
    repos_url: 'https://api.github.com/orgs/soverant/repos',
    events_url: 'https://api.github.com/orgs/soverant/events',
    hooks_url: 'https://api.github.com/orgs/soverant/hooks',
    issues_url: 'https://api.github.com/orgs/soverant/issues',
    members_url: 'https://api.github.com/orgs/soverant/members{/member}',
    public_members_url:
      'https://api.github.com/orgs/soverant/public_members{/member}',
    avatar_url: 'https://avatars.githubusercontent.com/u/169102286?v=4',
    description: '',
  },
  sender: {
    login: 'farhoud',
    id: 2462150,
    node_id: 'MDQ6VXNlcjI0NjIxNTA=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/farhoud',
    html_url: 'https://github.com/farhoud',
    followers_url: 'https://api.github.com/users/farhoud/followers',
    following_url:
      'https://api.github.com/users/farhoud/following{/other_user}',
    gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
    organizations_url: 'https://api.github.com/users/farhoud/orgs',
    repos_url: 'https://api.github.com/users/farhoud/repos',
    events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
    received_events_url: 'https://api.github.com/users/farhoud/received_events',
    type: 'User',
    site_admin: false,
  },
};

const canceled = {
  action: 'reordered',
  projects_v2_item: {
    id: 66517439,
    node_id: 'PVTI_lADOChRLzs4Ai65gzgP2-b8',
    project_node_id: 'PVT_kwDOChRLzs4Ai65g',
    content_node_id: 'I_kwDOMEltFs6LeLoi',
    content_type: 'Issue',
    creator: {
      login: 'farhoud',
      id: 2462150,
      node_id: 'MDQ6VXNlcjI0NjIxNTA=',
      avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/farhoud',
      html_url: 'https://github.com/farhoud',
      followers_url: 'https://api.github.com/users/farhoud/followers',
      following_url:
        'https://api.github.com/users/farhoud/following{/other_user}',
      gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
      organizations_url: 'https://api.github.com/users/farhoud/orgs',
      repos_url: 'https://api.github.com/users/farhoud/repos',
      events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/farhoud/received_events',
      type: 'User',
      site_admin: false,
    },
    created_at: '2024-06-07T08:51:17Z',
    updated_at: '2024-06-09T08:57:35Z',
    archived_at: null,
  },
  changes: {
    previous_projects_v2_item_node_id: {
      from: null,
      to: 'PVTI_lADOChRLzs4Ai65gzgP5QTg',
    },
  },
  organization: {
    login: 'soverant',
    id: 169102286,
    node_id: 'O_kgDOChRLzg',
    url: 'https://api.github.com/orgs/soverant',
    repos_url: 'https://api.github.com/orgs/soverant/repos',
    events_url: 'https://api.github.com/orgs/soverant/events',
    hooks_url: 'https://api.github.com/orgs/soverant/hooks',
    issues_url: 'https://api.github.com/orgs/soverant/issues',
    members_url: 'https://api.github.com/orgs/soverant/members{/member}',
    public_members_url:
      'https://api.github.com/orgs/soverant/public_members{/member}',
    avatar_url: 'https://avatars.githubusercontent.com/u/169102286?v=4',
    description: '',
  },
  sender: {
    login: 'farhoud',
    id: 2462150,
    node_id: 'MDQ6VXNlcjI0NjIxNTA=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/farhoud',
    html_url: 'https://github.com/farhoud',
    followers_url: 'https://api.github.com/users/farhoud/followers',
    following_url:
      'https://api.github.com/users/farhoud/following{/other_user}',
    gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
    organizations_url: 'https://api.github.com/users/farhoud/orgs',
    repos_url: 'https://api.github.com/users/farhoud/repos',
    events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
    received_events_url: 'https://api.github.com/users/farhoud/received_events',
    type: 'User',
    site_admin: false,
  },
};

const published = {
  action: 'reordered',
  projects_v2_item: {
    id: 66666808,
    node_id: 'PVTI_lADOChRLzs4Ai65gzgP5QTg',
    project_node_id: 'PVT_kwDOChRLzs4Ai65g',
    content_node_id: 'DI_lADOChRLzs4Ai65gzgGmxRo',
    content_type: 'DraftIssue',
    creator: {
      login: 'farhoud',
      id: 2462150,
      node_id: 'MDQ6VXNlcjI0NjIxNTA=',
      avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/farhoud',
      html_url: 'https://github.com/farhoud',
      followers_url: 'https://api.github.com/users/farhoud/followers',
      following_url:
        'https://api.github.com/users/farhoud/following{/other_user}',
      gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
      organizations_url: 'https://api.github.com/users/farhoud/orgs',
      repos_url: 'https://api.github.com/users/farhoud/repos',
      events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/farhoud/received_events',
      type: 'User',
      site_admin: false,
    },
    created_at: '2024-06-09T07:24:24Z',
    updated_at: '2024-06-09T08:59:12Z',
    archived_at: null,
  },
  changes: {
    previous_projects_v2_item_node_id: {
      from: null,
      to: 'PVTI_lADOChRLzs4Ai65gzgP2-b8',
    },
  },
  organization: {
    login: 'soverant',
    id: 169102286,
    node_id: 'O_kgDOChRLzg',
    url: 'https://api.github.com/orgs/soverant',
    repos_url: 'https://api.github.com/orgs/soverant/repos',
    events_url: 'https://api.github.com/orgs/soverant/events',
    hooks_url: 'https://api.github.com/orgs/soverant/hooks',
    issues_url: 'https://api.github.com/orgs/soverant/issues',
    members_url: 'https://api.github.com/orgs/soverant/members{/member}',
    public_members_url:
      'https://api.github.com/orgs/soverant/public_members{/member}',
    avatar_url: 'https://avatars.githubusercontent.com/u/169102286?v=4',
    description: '',
  },
  sender: {
    login: 'farhoud',
    id: 2462150,
    node_id: 'MDQ6VXNlcjI0NjIxNTA=',
    avatar_url: 'https://avatars.githubusercontent.com/u/2462150?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/farhoud',
    html_url: 'https://github.com/farhoud',
    followers_url: 'https://api.github.com/users/farhoud/followers',
    following_url:
      'https://api.github.com/users/farhoud/following{/other_user}',
    gists_url: 'https://api.github.com/users/farhoud/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/farhoud/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/farhoud/subscriptions',
    organizations_url: 'https://api.github.com/users/farhoud/orgs',
    repos_url: 'https://api.github.com/users/farhoud/repos',
    events_url: 'https://api.github.com/users/farhoud/events{/privacy}',
    received_events_url: 'https://api.github.com/users/farhoud/received_events',
    type: 'User',
    site_admin: false,
  },
};
