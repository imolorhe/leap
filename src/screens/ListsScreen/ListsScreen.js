import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialListState } from '../../redux';
import { addList, removeList } from '../../redux/actions';

import NewItemInput from '../../components/NewItemInput';

import styles from './ListsScreenStyle';

const EmptyList = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
    <FeatherIcon name='list' size={100} />
    <Text>Add a list to see it here</Text>
  </View>
);

class ListItem extends Component {
  state = {
    showDelete: false
  };
  toggleDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showDelete: !this.state.showDelete });
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={this.props.onPress} onLongPress={this.toggleDelete} style={{ flex: 1 }}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>{this.props.data.title}</Text>
            <Text>{this.props.data.tasks.length} {this.props.data.tasks.length === 1 ? 'item': 'items'}</Text>
          </View>
        </TouchableOpacity>
        {this.state.showDelete &&
          <TouchableOpacity onPress={this.props.onDeleteList}>
            <View style={styles.listItem}>
              <FeatherIcon name='trash-2' size={20} color='tomato' />
            </View>
          </TouchableOpacity>
        }
      </View>
    );
  }
}

class ListsScreen extends Component {
  state = {
    showNewItemInput: false,
    searchTerm: ''
  };

  addNewList = text => {
    const list = { ...getInitialListState(), title: text };
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.props.addList({ list });
  };

  toggleNewItemInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showNewItemInput: !this.state.showNewItemInput });
  };

  onSetSearchTerm = text => this.setState({ searchTerm: text });

  deleteList = listId => () => this.props.removeList({ list_id: listId });
  goToTasks = listId => () => this.props.navigation.navigate('TasksScreen', { listId });

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={{ fontSize: 30 }}>Lists</Text>
            <TouchableOpacity onPress={this.toggleNewItemInput}>
              <FeatherIcon name='plus-square' size={30} />
            </TouchableOpacity>
          </View>
          {this.state.showNewItemInput &&
            <NewItemInput
            placeholder='Write the name of your new list...'
            onSubmit={this.addNewList} />}
          <TextInput style={{
            paddingHorizontal: 20,
            fontSize: 20,
            paddingVertical: 10}}
            value={this.state.searchTerm}
            onChangeText={this.onSetSearchTerm}
            placeholder='Search lists...' />
        </View>
        <ScrollView>
          {
            this.props.lists.length ?
              this.props.lists
                .filter(list => !this.state.searchTerm || new RegExp(this.state.searchTerm, 'i').test(list.title))
                .map(list => <ListItem key={list.id} data={list} onPress={this.goToTasks(list.id)} onDeleteList={this.deleteList(list.id)} />) : <EmptyList />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { addList, removeList })(ListsScreen);
