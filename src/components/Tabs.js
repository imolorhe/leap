import React from 'react';
import { View, Button } from 'react-native';

export default Tabs = props => (
  <View style={{ backgroundColor: '#eaeaea', width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
    <Button onPress={props.setScreen(1)} title='Tab 1' />
    <Button onPress={props.setScreen(2)} title='Tab 2' />
  </View>
);
