import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

const cache = new InMemoryCache({

})

export const isLikedVar = makeVar(false);

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache 
});

export default client;