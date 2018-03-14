import React, { Component } from 'react';
import {
  Platform,
  Text,
  View,
  SafeAreaView,
  Button,
  TextInput,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeElement } from '../../redux/actions';

import styles from './DisplayScreenStyle';

export class DisplayScreen extends Component {

  removeElement = key => () => this.props.removeElement(key);
  navigateTo = elem => () => this.props.navigation.navigate('ElementInfo', { name: elem });

  render() {
    return (
      <SafeAreaView>
        {this.props.elements.map((v, k) => (
          <View key={k} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <TouchableOpacity onPress={this.navigateTo(v)}>
              <Text>{k}: {v}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.removeElement(k)}>
              <Text>x</Text>
            </TouchableOpacity>
          </View>
        ))}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
const mapDispatchToProps = {
  removeElement
};
export default connect(mapStateToProps, mapDispatchToProps)(DisplayScreen);
