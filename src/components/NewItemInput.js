import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default class NewItemInput extends Component {
  state = {
    text: ''
  };
  onSubmit = (e) => {
    const text = e.nativeEvent.text;
    this.props.onSubmit(text);
    this.setState({ text: '' });
  };
  render() {
    return (
      <View>
        <TextInput
          style={styles.newItemInput}
          placeholder={this.props.placeholder}
          onSubmitEditing={this.onSubmit}
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  newItemInput: {
    paddingHorizontal: 20,
    fontSize: 20,
    paddingVertical: 10
  }
});
