import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react'

import AppReducer from './src/reducers';
import { AppNavigator, middleware } from './src/navigators/AppNavigator';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const persistedReducer = persistReducer(persistConfig, AppReducer);

const store = createStore(persistedReducer, composeWithDevTools(
  applyMiddleware(middleware),
  ));

let persistor = persistStore(store);
// persistor.purge();

class ReduxExampleApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
	      <PersistGate loading={null} persistor={persistor}>
	        <AppNavigator />
	      </PersistGate>
      </Provider>
    );
  }
}


export default ReduxExampleApp;
