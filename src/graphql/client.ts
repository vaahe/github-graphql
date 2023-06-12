import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer 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`,
    },
});
