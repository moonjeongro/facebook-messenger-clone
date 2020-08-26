import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App/App';

import { ApolloProvider } from '@apollo/client';
import client from './Components/apollo';


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

