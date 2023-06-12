import gql from "graphql-tag";

export const GET_CURRENT_REPOSITORIES = gql`
  query ($userName: String!, $pageSize: Int!, $cursor: String) {
    user(login: $userName) {
      repositories(first: $pageSize, after: $cursor) {
        totalCount
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
  query ($queryString: String!, $cursor: String) {
    search(query: $queryString, type: REPOSITORY, first: 10, after: $cursor) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            stargazerCount
            updatedAt
            url
            owner {
              __typename
              ... on User {
                login
              }
              ... on Organization {
                login
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query {
    viewer {
      login
    }
  }
`;

export const GET_REPO_DETAILS = gql`
  query ($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      pushedAt
      stargazerCount
      description
      owner {
        avatarUrl
        login
        url
        ... on User {
          name
        }
      }
      languages(first: 10) {
        nodes {
          name
        }
      }
    }
  }
`;
