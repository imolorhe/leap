import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { createAccount } from '../../redux/actions';

import styles from '../AppStyle';

class SignupScreen extends Component {
  state = {
    email: '',
    password: ''
  };
  onSignup = () => this.props.createAccount({ email: this.state.email, password: this.state.password });
  render() {
    return(
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text>Create an account!</Text>
        </View>
        <View>
          <TextInput
            placeholder='Email address'
            keyboardType='email-address'
            autoCapitalize='none'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })} />
        </View>
        <View>
          <TextInput
            placeholder='Password'
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })} />
        </View>
        <View>
          <Button title='Create account' onPress={this.onSignup} />
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null, { createAccount })(SignupScreen);