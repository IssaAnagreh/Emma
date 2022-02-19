import {applyMiddleware, createStore} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import logger from 'redux-logger';
import reducers from './lib/reducers';
import {DEV} from './lib/constants';

const persistConfig = DEV
  ? {
      key: 'root',
      storage: AsyncStorage,
      timeout: 9999999,
    }
  : {
      key: 'root',
      storage: AsyncStorage,
    };
const persistedReducer = persistReducer(persistConfig, reducers);
const configStore = () => {
  let middleware = [thunk];
  //@ts-ignore
  if (DEV) middleware.push(logger);
  const middleWares = applyMiddleware(...middleware);
  let store = createStore(persistedReducer, middleWares);
  let persistor = persistStore(store);
  return {store, persistor};
};

export const {store, persistor} = configStore();
