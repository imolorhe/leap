import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default Button = props => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 2
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  }
});
