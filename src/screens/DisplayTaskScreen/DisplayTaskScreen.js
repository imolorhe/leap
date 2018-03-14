import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { addTask } from '../../redux/actions';
import { getTask } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './DisplayTaskScreenStyle';

class DisplayTaskScreen extends Component {
  state = {
    showNewItemInput: false
  };

  constructor(props) {
    super(props);

    // Get the task matching the ID passed to the route
    this.listId = this.props.navigation.state.params.listId;
    this.taskId = this.props.navigation.state.params.taskId;
    this.task = getTask(this.props, this.listId, this.taskId);
  }

  goBack = () => this.props.navigation.goBack();
  render() {

    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.goBack}>
                <FeatherIcon name='arrow-left' size={20} />
              </TouchableOpacity>
              <Text style={{ fontSize: 30 }}>{this.task.title}</Text>
            </View>
            <TouchableOpacity onPress={this.toggleNewItemInput}>
              <FeatherIcon name='plus-square' size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView><Text>Task details</Text></ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { addTask })(DisplayTaskScreen);
