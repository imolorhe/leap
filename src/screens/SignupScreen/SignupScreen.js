import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

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
        <View style={{ paddingHorizontal: 10 }}>
          <FormInput
            placeholder='Email address'
            keyboardType='email-address'
            autoCapitalize='none'
            value={this.state.email}
            onChangeText={text => this.setState({ email: text })}
          />
          <FormInput
            placeholder='Password'
            type='password'
            value={this.state.password}
            onChangeText={text => this.setState({ password: text })}
          />
          <View>
            <Button title='Create account' onPress={this.onSignup} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(null, { createAccount })(SignupScreen);