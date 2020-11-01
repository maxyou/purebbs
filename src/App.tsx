import * as React from 'react';
import { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga'
import Layout from './layout'
import ApolloClient from 'apollo-boost';
import { sys } from './config';
import { ApolloProvider } from '@apollo/react-hooks';
import { composeWithDevTools } from 'redux-devtools-extension';

var urljoin = require('url-join');

console.log(urljoin(sys.appHomepage, sys.graphql_endpoint))

const client = new ApolloClient({
  uri: urljoin(sys.appHomepage, sys.graphql_endpoint),
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof typeof window] as typeof compose || compose;

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

class App extends Component<{}, {}> {
  render() {
    return (
      <div>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <Layout />
          </ApolloProvider>
        </Provider>
      </div>
    );
  }
}

export default App;
