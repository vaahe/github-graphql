import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer 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`,
  },
});
