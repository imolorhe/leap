import React, { Component } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { checkAuth } from '../../redux/actions';

import styles from '../AppStyle';

export class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);

    this.props.checkAuth();
    // firebase.auth()
    //   .signInAndRetrieveDataWithEmailAndPassword('e', 'p')
    //   .then(credentials => {
    //     if (credentials) {
    //       console.tron.log(JSON.stringify(credentials.user.toJSON()));
    //     }
    //   }).catch(err => {
    //     console.tron.log('Signin error: ' + JSON.stringify(err.message));
    //     this.props.navigation.navigate('Auth');
    //   });
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Leap!</Text>
          <ActivityIndicator/>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null, { checkAuth })(AuthLoadingScreen);
