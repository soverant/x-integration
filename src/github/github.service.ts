import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private readonly logger = new Logger(GithubService.name);
  private octokit: Octokit;

  constructor(private configService: ConfigService) {
    this.octokit = new Octokit({
      auth: this.configService.get<string>('GITHUB_TOKEN'),
    });
  }

  async getPosts(): Promise<PostItem[]> {
    try {
      const projectNodeId = this.configService.get<string>('PROJECT_ID');
      console.log(projectNodeId);
      const response: GhResultData = await this.octokit.graphql({
        query: `
        query($projectNodeId: ID!){
          node(id: $projectNodeId) {
              ... on ProjectV2 {
                fields(first:50){
                  nodes{
                    ... on ProjectV2SingleSelectField{
                      fieldId:id
                      name
                      options{
                        id
                        name
                      }
                    }
                  }
                }
                items(first: 100) {
                  nodes {
                    itemId:id
                    content {
                      ... on DraftIssue {
                        value:title
                      }
                      ... on Issue {
                        value: body
                      }
                    }
                    status: fieldValueByName(name: "Status") {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        value: name
                        optionId
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        projectNodeId,
      });
      this.logger.log(response);
      console.log(response);
      const posts = toPost(response);
      console.log(posts)
      return posts
    } catch (error) {
      this.logger.error('Error fetching field value:', error);
      throw error;
    }
  }
  async moveCard(
    itemId: string,
    fieldId: string,
    optId: string,
  ): Promise<undefined> {
    try {
      const projectId = this.configService.get<string>('PROJECT_ID');
      fieldId="PVTSSF_lAHOACWRxs4AjClIzgbdrd0"
      const response: any = await this.octokit.graphql({
        query: `
        mutation($projectId: ID!, $itemId: ID!,$fieldId: ID!, $optId: String!){
          updateProjectV2ItemFieldValue(input:{
            projectId:$projectId
            itemId:$itemId
            fieldId:$fieldId
            value:{singleSelectOptionId:$optId}
          }) {
            clientMutationId
          }
        }
        `,
        projectId,
        itemId,
        fieldId,
        optId,
      });
      this.logger.debug(response);
    } catch (error) {
      this.logger.error('Error fetching field value:', error);
      throw error;
    }
  }

  async getPostStatusOptions(fieldId: string): Promise<any> {
    try {
      const projectNodeId = this.configService.get<string>('PROJECT_ID');
      const fieldNodeId = fieldId
      console.log(fieldId)
      const response: any = await this.octokit.graphql({
        query: `
        query ($fieldNodeId: ID!) {
          node(id: $fieldNodeId) {
            ... on ProjectV2SingleSelectField {
              id
              name
              options {
                id
                name
              }
            }
          }
        }
        `,
        fieldNodeId,
      });
      this.logger.debug(response);
      console.log(response)
      return response
    } catch (error) {
      this.logger.error('Error fetching field value:', error);
      throw error;
    }
  }
  async moveCardToPublished(postItem: PostItem) {
    // get options and move the fucking thing
    const optId = postItem.ghData.options.find(i=>i.name==="Published")
    if(optId)
    await this.moveCard(postItem.ghData.itemId,postItem.ghData.fieldId,optId.id)
  }
}
type PostItem = {
  content: string;
  status: string;
  id: string;
  ghData: {
    itemId: string;
    fieldId: string;
    optionId: string;
    options: {
      name:string
      id:string
    }[]
  };
};

type GhResultData = {
  node: {
    fields: {
      nodes: Array<{
        fieldId: string
        name: string
        options: {
          id: string
          name: string
        }[]
      }>
    }
    items: {
      nodes: {
        itemId: string;
        content: { value: string };
        status: {
          value: string;
          optionId: string;
        };
      }[];
    };
  };
};

function toPost(data: GhResultData): any {
  const projectItems: PostItem[] = [];
  console.log(data.node.items)
  const {options,fieldId} = data.node.fields.nodes.filter(i=>'options'in i )[0]
  data.node.items.nodes.forEach((item) => {
      // item.status.value === 'Scheduled' &&
      
      console.log(item)
      projectItems.push({
        content: item.content.value,
        status: item.status.value,
        id: item.itemId,
        ghData: {
          itemId: item.itemId,
          fieldId,
          optionId: item.status.optionId,
          options
        },
      });
    });
  
  return projectItems;
}
