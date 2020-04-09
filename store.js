import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer, { exampleInitialState } from './reducer'
import rootSaga from './saga'

const bindMiddleware = middleware => {
  return applyMiddleware(...middleware)
}

function configureStore(initialState = exampleInitialState, { isServer, req = null }) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    initialState,
    bindMiddleware([sagaMiddleware])
  )

  // `next-redux-saga` depends on `sagaTask` being attached to the store during `getInitialProps`.
  // It is used to await the `rootSaga` task before sending results to the client.
  // However, `next-redux-wrapper` creates two server-side stores per request:
  // One before `getInitialProps` and one before SSR.
  // On the server side, we run `rootSaga` during `getInitialProps` only.
  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga);
  }

  return store
}

export default configureStore
