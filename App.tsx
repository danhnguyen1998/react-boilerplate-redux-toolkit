import RootComponent from '@src/boot';
import store from '@src/boot/configureStore';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
};

export default App;