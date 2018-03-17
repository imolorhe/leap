import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialTaskState } from '../../redux';
import { changeTaskTitle, setTaskContacts } from '../../redux/actions';
import { getTask } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './DisplayTaskScreenStyle';

const SectionHeader = props => (
  <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
    {props.children}
  </View>
);

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
  showContactModal = () => this.props.navigation.navigate('ContactModal', { onSelectContacts: this.onSelectContacts });
  onSelectContacts = contacts => this.props.setTaskContacts({ task_id: this.taskId, list_id: this.listId, contacts });
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
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>Description</Text>
          </SectionHeader>
          <View style={{ padding: 20 }}>
            <Text>Description goes here...</Text>
          </View>
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>Images</Text>
          </SectionHeader>
          <View style={{ padding: 20 }}>
            <Text>Description goes here...</Text>
          </View>
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>People</Text>
            <TouchableOpacity onPress={this.showContactModal}>
              <FeatherIcon name='more-horizontal' size={20} />
            </TouchableOpacity>
          </SectionHeader>
          <View style={{ padding: 20 }}>
            {task.people.map((contact, i) => (
              <View key={i} style={{ padding: 10 }}>
                <Text>{contact.givenName} {contact.familyName}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { changeTaskTitle, setTaskContacts })(DisplayTaskScreen);
