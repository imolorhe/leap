import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default Button = props => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <View>
      <Text style={styles.buttonText}>{props.title}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {},
  buttonText: {}
});
