import React, { Component } from 'react';
import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducer';
import Layout from './layout';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  )
)
sagaMiddleware.run(rootSaga)

// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Layout>

          </Layout>
        </Provider>
      </div>
    );
  }
}

export default App;
