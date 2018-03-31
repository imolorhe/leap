import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

import { loginUser } from '../../redux/actions';

import styles from '../AppStyle';

export class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  };
  onLogin = () => this.props.loginUser({ email: this.state.email, password: this.state.password });
  onSignup = () => this.props.navigation.navigate('SignupScreen');
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}><Text>Login with your email</Text></View>
        <View style={{ paddingHorizontal: 10 }}>
          <FormInput
            placeholder='Email address'
            keyboardType='email-address'
            autoCapitalize='none'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })} />
          <FormInput
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title='Login' onPress={this.onLogin} />
            <Button title='Create account' onPress={this.onSignup} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(null, { loginUser })(LoginScreen);
