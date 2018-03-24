import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation, Image } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { showImagePicker } from 'react-native-image-picker';

import { getInitialTaskImageState } from '../../redux';
import { changeTaskTitle, setTaskContacts, addTaskImage, removeTaskImage, setTaskDescription } from '../../redux/actions';
import { getTask, selectRemoteTask } from '../../redux/selectors';

import NewItemInput from '../../components/NewItemInput';

import styles from './DisplayTaskScreenStyle';

const SectionHeader = props => (
  <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'white' }}>
    {props.children}
  </View>
);

class DisplayTaskScreen extends Component {
  state = {
    isManagingImages: false,
    isEditingDescription: false,
    editedDescription: ''
  };

  constructor(props) {
    super(props);

    // Get the task matching the ID passed to the route
    this.listId = this.props.navigation.state.params.listId;
    this.taskId = this.props.navigation.state.params.taskId;

    this.isRemote = this.props.navigation.state.params.remote;
  }
  componentDidMount() {
    const task = getTask(this.props.state, this.listId, this.taskId);
    this.setState({ editedDescription: task && task.description });
  }

  goBack = () => this.props.navigation.goBack();
  showImagePicker = () => showImagePicker({
    title: 'Select Avatar',
    storageOptions: {
      skipBackup: true,
      path: 'images'
    }
  }, res => {
    console.tron.log('Response = ', res);

    if (res.didCancel) {
      console.tron.log('User cancelled image picker');
    }
    else if (res.error) {
      console.tron.log('ImagePicker Error: ', res.error);
    }
    else if (res.customButton) {
      console.tron.log('User tapped custom button: ', res.customButton);
    }
    else {
      let source = { uri: res.uri };

      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.props.addTaskImage({ task_id: this.taskId, list_id: this.listId, image: { ...getInitialTaskImageState(), source }});
    }
  });
  removeImage = imageId => () => this.props.removeTaskImage({ task_id: this.taskId, list_id: this.listId, image_id: imageId });
  toggleManageImages = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ isManagingImages: !this.state.isManagingImages });
  }
  editDescription = () => this.setState({ isEditingDescription: true });
  onSetEditedDescription = text => this.setState({ editedDescription: text });
  saveDescription = () => {
    this.props.setTaskDescription({ task_id: this.taskId, list_id: this.listId, description: this.state.editedDescription });
    this.setState({ isEditingDescription: false });
  }
  showContactModal = () => this.props.navigation.navigate('ContactModal', { onSelectContacts: this.onSelectContacts });
  onSelectContacts = contacts => this.props.setTaskContacts({ task_id: this.taskId, list_id: this.listId, contacts });
  onTaskTitleChange = text => this.props.changeTaskTitle({ task_id: this.taskId, list_id: this.listId, text });
  render() {

    const task = this.isRemote ? selectRemoteTask(this.props.state, this.listId, this.taskId) : getTask(this.props.state, this.listId, this.taskId);

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
                value={task && task.title}/>
            </View>
          </View>
        </View>
        <ScrollView stickyHeaderIndices={[0, 2, 4]}>
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>Description</Text>
            {this.state.isEditingDescription ?
              <TouchableOpacity onPress={this.saveDescription}>
                <Text>Save</Text>
              </TouchableOpacity> : this.isRemote ? null :
              <TouchableOpacity onPress={this.editDescription}>
                <FeatherIcon name='edit' size={20} />
              </TouchableOpacity>
            }
          </SectionHeader>
          <View style={{ padding: 20 }}>
            {this.state.isEditingDescription ?
              <TextInput
                value={this.state.editedDescription}
                onChangeText={this.onSetEditedDescription}
                multiline={true}
                placeholder='Write the task description...' />
            : <Text>{task && task.description}</Text>
            }
          </View>
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>Images</Text>
            { this.isRemote ? null :
              <TouchableOpacity onPress={this.toggleManageImages}>
                <FeatherIcon name='more-horizontal' size={20} />
              </TouchableOpacity>
            }
          </SectionHeader>
          <View style={{ padding: 20, flexDirection: 'row' }}>
            {task && task.images && task.images.map((image, i) => (
              <View key={i} style={styles.taskImageContainer}>
                {this.state.isManagingImages &&
                  <TouchableOpacity style={{ position: 'absolute', right: 5, top: 5, zIndex: 1 }} onPress={this.removeImage(image.id)}>
                    <FeatherIcon name='x' size={20} color='white' />
                  </TouchableOpacity>
                }
                <Image source={image.source} style={styles.taskImage} />
              </View>
            ))}
            {this.state.isManagingImages &&
              <TouchableOpacity style={[styles.taskImageContainer, { backgroundColor: '#f0f0f0', borderRadius: 50 }]} onPress={this.showImagePicker}>
                <FeatherIcon name='plus' size={50} color='white' />
              </TouchableOpacity>
            }
          </View>
          <SectionHeader>
            <Text style={{ fontSize: 20 }}>People</Text>
            {this.isRemote ? null :
              <TouchableOpacity onPress={this.showContactModal}>
                <FeatherIcon name='more-horizontal' size={20} />
              </TouchableOpacity>
            }
          </SectionHeader>
          <View style={{ padding: 20 }}>
            {task && task.people && task.people.map((contact, i) => (
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

const mapStateToProps = state => ({ state });
export default connect(mapStateToProps, {
  changeTaskTitle,
  setTaskContacts,
  addTaskImage,
  removeTaskImage,
  setTaskDescription
})(DisplayTaskScreen);
