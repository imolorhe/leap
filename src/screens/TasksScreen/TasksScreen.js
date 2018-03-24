import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { addTask, changeListTitle, removeTask, completeTask, uncompleteTask } from '../../redux/actions';
import { getList } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './TasksScreenStyle';

const EmptyTasks = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
    <FeatherIcon name='list' size={100} />
    <Text>Add a task to see it here</Text>
  </View>
);

class TaskItem extends Component {
  state = {
    showDelete: false
  };
  toggleDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showDelete: !this.state.showDelete });
  }
  render() {
    const { data } = this.props;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', opacity: this.props.data.completed ? 0.4 : 1 }}>
        <TouchableOpacity style={{ paddingLeft: 20 }} onPress={this.props.onToggleComplete}>
          <FeatherIcon name={ data.completed ? 'check-circle' : 'circle' } size={20} />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
          <TouchableOpacity onPress={this.props.onPress} onLongPress={this.toggleDelete}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{this.props.data.title}</Text>
            </View>
          </TouchableOpacity>
          { this.state.showDelete && 
            <TouchableOpacity onPress={this.props.onDeleteTask}>
              <View style={styles.listItem}>
                <FeatherIcon name='trash-2' size={20} color='tomato' />
              </View>
            </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

class TasksScreen extends Component {
  state = {};

  constructor(props) {
    super(props);

    // Get the list matching the ID passed to the route
    this.listId = this.props.navigation.state.params.listId;
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

  onChangeListTitle = text => this.props.changeListTitle({ list_id: this.listId, text });
  deleteTask = taskId => () => this.props.removeTask({ list_id: this.listId, task_id: taskId });
  toggleCompleteTask = taskId => () => {
    const list = getList(this.props.state, this.listId);
    const task = list.tasks.find(task => task.id === taskId);
    if (task.completed) {
      this.props.uncompleteTask({ list_id: this.listId, task_id: taskId });
    } else {
      this.props.completeTask({ list_id: this.listId, task_id: taskId });
    }
  };
  goToTask = taskId => () => this.props.navigation.navigate('DisplayTaskScreen', { taskId, listId: this.listId });
  goBack = () => this.props.navigation.goBack();
  render() {

    const list = getList(this.props.state, this.listId);
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.goBack}>
                <FeatherIcon name='arrow-left' size={20} />
              </TouchableOpacity>
              <TextInput style={{ fontSize: 30 }}
                onChangeText={this.onChangeListTitle}
                value={list.title} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.toggleNewItemInput}>
                <FeatherIcon name='plus-square' size={30} />
              </TouchableOpacity>
            </View>
          </View>
          {this.state.showNewItemInput &&
            <NewItemInput
              placeholder='Write the name of your new task...'
              onSubmit={this.addNewTask} />}
        </View>
        <ScrollView>
          {
            list.tasks.length ? list.tasks.map((task, i) => <TaskItem key={i} data={task} onPress={this.goToTask(task.id)} onDeleteTask={this.deleteTask(task.id)} onToggleComplete={this.toggleCompleteTask(task.id)} />) : <EmptyTasks />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps, { addTask, changeListTitle, removeTask, completeTask, uncompleteTask })(TasksScreen);
