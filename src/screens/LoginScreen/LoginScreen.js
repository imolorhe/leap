import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';

import { loginUser } from '../../redux/actions';

export class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  };
  onLogin = () => this.props.loginUser({ email: this.state.email, password: this.state.password });
  onSignup = () => this.props.navigation.navigate('SignupScreen');
  render() {
    return (
      <SafeAreaView>
        <View><Text>Login with your email</Text></View>
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
          <Button title='Login' onPress={this.onLogin} />
          <Button title='Create account' onPress={this.onSignup} />
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(null, { loginUser })(LoginScreen);
