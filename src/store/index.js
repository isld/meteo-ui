import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import reducer from './reducers';

const devtools = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolsComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSER__;

const composeEnhancers = devtoolsComposer || compose;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
    devtools && devtools()
  )
);

sagaMiddleware.run(rootSaga);

export default store;
