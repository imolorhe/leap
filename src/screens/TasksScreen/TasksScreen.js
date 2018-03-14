import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { addTask } from '../../redux/actions';

import NewItemInput from '../../components/NewItemInput';

import styles from './TasksScreenStyle';

const EmptyTasks = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
    <FeatherIcon name='list' size={100} />
    <Text>Add a task to see it here</Text>
  </View>
);

const TaskItem = props => (
  <View style={styles.listItem}>
    <TouchableOpacity>
      <Text style={styles.listItemText}>{props.data.title}</Text>
    </TouchableOpacity>
  </View>
);

class TasksScreen extends Component {
  state = {
    showNewItemInput: false
  };

  addNewTask = text => {
    const task = { ...getInitialTaskState(), title: text };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.addTask({ task });
  };

  toggleNewItemInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showNewItemInput: !this.state.showNewItemInput });
  };
  render() {
    const { newItemInput } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={{ fontSize: 30 }}>Tasks</Text>
            <TouchableOpacity onPress={this.toggleNewItemInput}>
              <FeatherIcon name='plus-square' size={30} />
            </TouchableOpacity>
          </View>
          {this.state.showNewItemInput &&
            <NewItemInput
              placeholder='Write the name of your new task...'
              onSubmit={this.addNewTask} />}
        </View>
        <ScrollView>
          {
            this.props.lists.length ? this.props.lists.map((list, i) => <TaskItem key={i} data={list} />) : <EmptyTasks />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { addTask })(TasksScreen);
