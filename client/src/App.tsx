import React from 'react';
import './App.css';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {RecoilRoot} from 'recoil';
import HomeScreen from './containers/HomeScreen';

const client = new ApolloClient({
  uri: 'https://site-wide-warning.loca.lt/',
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
