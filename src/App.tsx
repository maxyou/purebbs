import * as React from 'react';
import { Component } from 'react';
import { createStore, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import reducers from './redux/reducer';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './redux/saga'
// import Layout from './layout'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' as keyof typeof window] as typeof compose || compose;

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

class App extends Component<{}, {}> {
  render() {
    return (
      <div>
        <Provider store={store}>
          {/* <Layout /> */}
          test test test ~~~
        </Provider>
      </div>
    );
  }
}

export default App;
