import React from 'react';
import ReactDOM from 'react-dom/client';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import App from './App';

import './index.css';

const client = new ApolloClient({
  uri: 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql', // might be better in env variable but does not serve any purpose here
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
