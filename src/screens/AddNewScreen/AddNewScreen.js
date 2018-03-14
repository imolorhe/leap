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

import { addElement, getApiCall } from '../../redux/actions';
import styles from './AddNewScreenStyle';

export class AddNewScreen extends Component {

  state = {
    text: '',
    elements: [],
    fancy: [],
    fancyAsync: []
  };

  async componentDidMount() {
    this.props.getApiCall();
  }

  setText = (text) => this.setState({ text });
  addElement = () => {
    this.props.addElement(this.state.text);
    this.setState({ text: '' });
  }

  render() {
    return (
      <SafeAreaView style={{ width: '100%', flex: 1 }}>
        <TextInput
          placeholder='Write thy text here...'
          onChangeText={this.setText}
          value={this.state.text}
          style={{ padding: 10, fontSize: 20, color: 'tomato', borderBottomColor: 'tomato', borderBottomWidth: 1 }}
        />

        <Button title='Add' onPress={this.addElement} />
        {this.state.fancy.map((elem, i) => <View key={i}><Text>{elem}</Text></View>)}
        {this.state.fancyAsync.map((elem, i) => <View key={i}><Text>{elem}</Text></View>)}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
const mapDispatchToProps = {
  getApiCall,
  addElement
};
export default connect(mapStateToProps, mapDispatchToProps)(AddNewScreen);
