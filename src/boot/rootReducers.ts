import { combineReducers } from '@reduxjs/toolkit';
import commonState from "@src/containers/redux/slice";
import authState from "@src/navigations/redux/slice";
import searchState from "@src/screens/search/redux/slice";
import { reducer as network } from 'react-native-offline';

const rootReducers = combineReducers({
  network,
  authState,
  searchState,
  commonState
});

export type RootState = ReturnType<typeof rootReducers>;

export default rootReducers;