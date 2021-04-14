import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootState } from '@src/boot/rootReducers';
import { ROUTES } from '@src/navigations/routes';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import AppNavigationScreen from './AppNavigation';
import GuestNavigationScreen from './GuestNavigation/guestNavigation';
import { stateConditionString } from './helpers';
import { navigationRef } from './RootNavigation';

export type RootStackParamList = {
  GUEST_NAVIGATION: undefined;
  APP_NAVIGATION: undefined;
  LOADING_SCREEN: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const NavigationComponent = () => {
  const { authState } = useSelector((state: RootState) => ({
    authState: state.authState
  }));

  const chooseScreen = useMemo(() => {
    let arr = [];
    let navigateTo = stateConditionString(authState);
    switch (navigateTo) {
      case 'GOTO_GUEST_SCREEN':
        arr.push(<RootStack.Screen name={ROUTES.GUEST_NAVIGATION} component={GuestNavigationScreen} />);
        break;
      case 'GOTO_APP_SCREEN':
        arr.push(<RootStack.Screen name={ROUTES.APP_NAVIGATION} component={AppNavigationScreen} />);
        break;
      default:
        arr.push(<RootStack.Screen name={ROUTES.GUEST_NAVIGATION} component={GuestNavigationScreen} />);
        break;
    }
    return arr[0];
  }, [authState]);

  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator headerMode="none">{chooseScreen}</RootStack.Navigator>
    </NavigationContainer>
  );
};

export default React.memo(NavigationComponent);
