import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { createNetworkMiddleware } from 'react-native-offline';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AnyAction } from "redux";
import { createLogger, LogEntryObject } from 'redux-logger';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import thunk from 'redux-thunk';
import allReducers, { RootState } from './rootReducers';

const networkMiddleware = createNetworkMiddleware();

/** add middlewares */
const middlewares: any = [];

// middleware check network
middlewares.push(networkMiddleware);


// middleware redux-thunk
middlewares.push(thunk);

// middleware redux logger
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger({
    diff: true,
    collapsed: (_getState: any, _action: any, logEntry: LogEntryObject | undefined) => !logEntry?.error,
  });
  middlewares.push(logger);
}

const rootReducer = (state: any, action: AnyAction) => {
  if (action.type === 'auth/signOut') {
    state = {};
  }
  return allReducers(state, action);
};

/** config redux-persist */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['authState'],
  blacklist: [''],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

/** create redux store */
const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  }).concat(middlewares)
});

const persistor = persistStore(store);

export default { store, persistor };

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector