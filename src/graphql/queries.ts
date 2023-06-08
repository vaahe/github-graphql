import gql from "graphql-tag";

export const GET_USER_REPOSITORIES = gql`
  query ($username: String!, $pageSize: Int!, $cursor: String) {
    user(login: $username) {
      repositories(first: $pageSize, after: $cursor) {
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          stargazerCount
          updatedAt
          url
        }
      }
    }
  }
`;

export const SEARCH_REPOSITORIES = gql`
  query ($searchQuery: String!) {
    search(query: $searchQuery, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          name
          description
          stargazerCount
          forkCount
          updatedAt
          owner {
            vaahe
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORY_COUNT = gql`
  query ($username: String!) {
    user(login: $username) {
      repositories {
        totalCount
      }
    }
  }
`;
