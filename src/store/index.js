import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import {createLogger} from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

const loggerMiddleware = createLogger({predicate: () => __DEV__});

const configureStore = () => {
  const middlewares = [sagaMiddleware, loggerMiddleware];

  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
