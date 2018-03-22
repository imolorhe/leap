import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from 'react-native-firebase';

import configureStore from './redux';

import { MainNavigator } from './navigators';

firebase.auth()
  .signInAnonymouslyAndRetrieveData()
  .then(credentials => {
    if (credentials) {
      console.tron.log(JSON.stringify(credentials.user.toJSON()));
    }
  });

export class App extends Component {
  render() {
    return (
      <Provider store={configureStore.store} >
        <PersistGate persistor={configureStore.persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
