import Spinner from '@src/containers/components/Spinner';
import NavigationComponent from '@src/navigations';
import React, { useEffect } from 'react';
import { checkInternetConnection, offlineActionCreators } from 'react-native-offline';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';

const RootComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const { connectionChange } = offlineActionCreators;
    checkInternetConnection().then((isConnected) => {
      if (isConnected) SplashScreen.hide();
      dispatch(connectionChange(isConnected));
    });
  }, []);
  
  return (
    <>
      <NavigationComponent />
      {/* <InternetError /> */}
      <Spinner />
    </>
  );
};

export default React.memo(RootComponent);
