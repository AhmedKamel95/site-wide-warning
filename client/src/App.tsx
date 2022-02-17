import React from 'react';
import './App.css';
import {ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat, ApolloProvider} from '@apollo/client';
import {RecoilRoot} from 'recoil';
import HomeScreen from './containers/HomeScreen';

const httpLink = new HttpLink({ uri: process.env.REACT_APP_BASE_URL });

const handleTunnelingMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'Bypass-Tunnel-Reminder': '2'
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  //uri: process.env.REACT_APP_BASE_URL,
  link: concat(handleTunnelingMiddleware, httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <div className="App">
          <HomeScreen />
        </div>
      </RecoilRoot>
    </ApolloProvider>
  );
}

export default App;
