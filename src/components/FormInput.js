import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class FormInput extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={this.props.type === 'password'}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    paddingVertical: 5,
    marginBottom: 20
  },
  input: {
    fontSize: 20
  }
});
