import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { changeTaskTitle } from '../../redux/actions';
import { getTask } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './DisplayTaskScreenStyle';

class DisplayTaskScreen extends Component {
  state = {
    showNewItemInput: false,
    task: null
  };

  constructor(props) {
    super(props);

    // Get the task matching the ID passed to the route
    this.listId = this.props.navigation.state.params.listId;
    this.taskId = this.props.navigation.state.params.taskId;
  }

  goBack = () => this.props.navigation.goBack();
  onTaskTitleChange = text => this.props.changeTaskTitle({ task_id: this.taskId, list_id: this.listId, text });
  render() {

    const task = getTask(this.props, this.listId, this.taskId);
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity onPress={this.goBack}>
                <FeatherIcon name='arrow-left' size={20} />
              </TouchableOpacity>
              <TextInput style={{ fontSize: 30 }}
                onChangeText={this.onTaskTitleChange}
                value={task.title}/>
            </View>
          </View>
        </View>
        <ScrollView stickyHeaderIndices={[0, 2, 4]}>
          <View>
            <Text style={{ fontSize: 20 }}>Description</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text>Description goes here...</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>Images</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text>Description goes here...</Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>People</Text>
          </View>
          <View style={{ padding: 20 }}>
            <Text>Description goes here...</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { changeTaskTitle })(DisplayTaskScreen);
