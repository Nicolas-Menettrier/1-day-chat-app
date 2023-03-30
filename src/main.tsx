import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import App from './App';

import './index.css';

const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query MessagesFetchLatest($channelId: ChannelId!) {
        MessagesFetchLatest(channelId: $channelId) {
          messageId
          text
          datetime
          userId
        }
      }
    `,
    variables: {
      channelId: 'Technology',
    },
  })
  .then((result) => console.log(result.data));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
