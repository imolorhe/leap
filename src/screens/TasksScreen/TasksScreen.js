import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { addTask } from '../../redux/actions';
import { getList } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './TasksScreenStyle';

const EmptyTasks = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
    <FeatherIcon name='list' size={100} />
    <Text>Add a task to see it here</Text>
  </View>
);

const TaskItem = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{props.data.title}</Text>
    </View>
  </TouchableOpacity>
);

class TasksScreen extends Component {
  state = {};

  constructor(props) {
    super(props);

    // Get the list matching the ID passed to the route
    this.listId = this.props.navigation.state.params.listId;
    this.list = getList(this.props, this.listId);
  }

  addNewTask = text => {
    const task = { ...getInitialTaskState(), title: text };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.addTask({ task, list_id: this.listId });
  };

  toggleNewItemInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showNewItemInput: !this.state.showNewItemInput });
  };

  goToTask = taskId => () => this.props.navigation.navigate('DisplayTaskScreen', { taskId, listId: this.listId });
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
              <Text style={{ fontSize: 30 }}>{this.list.title}</Text>
            </View>
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
            this.list.tasks.length ? this.list.tasks.map((task, i) => <TaskItem key={i} data={task} onPress={this.goToTask(task.id)} />) : <EmptyTasks />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { addTask })(TasksScreen);
