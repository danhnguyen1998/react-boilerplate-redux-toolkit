import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';
import { useAppSelector } from '@src/boot/configureStore';
import { ASYNC_STORE } from '@src/contants/asyncStorage';
import { RESPONSE_STATUS } from '@src/contants/config';
import { APP_NAVIGATION } from '@src/navigations/routes';
import DetailOrderScreen from '@src/screens/detailOrder';
import HomeScreen from '@src/screens/home';
import SearchScreen from '@src/screens/search';
import { Colors } from '@src/styles/colors';
import { s } from '@src/styles/scalingUtils';
import React, { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useDispatch } from 'react-redux';
import { restoreToken, signOut } from '../redux/slice';
import { AccountInfor } from '../redux/state';
import { fetchUserInfor } from '../services';

export type AppStackParam = {
  HOME: undefined;
  SEARCH: undefined;
  DETAIL_ORDER: {
    stt_rec: string;
    stt_rec0: string;
    banks: [];
    status: [];
    refreshList: () => void;
  };
};

const Stack = createStackNavigator<AppStackParam>();

const GuestNavigationComponent = () => {
  const authState = useAppSelector((state) => state.authState);
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    if (authState.userToken)
      AsyncStorage.setItem(ASYNC_STORE.TOKEN, authState.userToken || '')
        .then(() => checkAuthenToken())
        .catch(() => dispatch(signOut()));
    else dispatch(signOut());

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (appState.current.match(/inactive|background/) && nextAppState === 'active') checkAuthenToken();
    appState.current = nextAppState;
  };

  const checkAuthenToken = async () => {
    try {
      const res = await fetchUserInfor(authState.accountInfor.username);
      if (res.status.code === RESPONSE_STATUS.SUCESS && res.data && res.data.length > 0) {
        const accountInfor: AccountInfor = {...res.data[0], username: authState.accountInfor.username};
        dispatch(restoreToken(accountInfor));
      } else dispatch(signOut());
    } catch (error) {
      dispatch(signOut());
    }
  };

  const configHeader: StackHeaderOptions = {
    headerStyle: {backgroundColor: Colors.primaryColor},
    headerTitleStyle: {color: Colors.white},
    headerBackTitle: 'Quay l???i',
    headerBackTitleStyle: {fontSize: s(14)},
    headerTintColor: Colors.white,
  };

  return (
    <Stack.Navigator initialRouteName={APP_NAVIGATION.HOME}>
      <Stack.Screen
        name={APP_NAVIGATION.HOME}
        component={HomeScreen}
        options={{...configHeader, title: 'Danh s??ch ????n h??ng'}}
      />
      <Stack.Screen
        name={APP_NAVIGATION.SEARCH}
        component={SearchScreen}
        options={{...configHeader, title: 'T??m ki???m ????n h??ng'}}
      />
      <Stack.Screen
        name={APP_NAVIGATION.DETAIL_ORDER}
        component={DetailOrderScreen}
        options={{...configHeader, title: 'Chi ti???t ????n h??ng'}}
      />
    </Stack.Navigator>
  );
};

export default React.memo(GuestNavigationComponent);
