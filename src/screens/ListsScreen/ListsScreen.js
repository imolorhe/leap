import React, { Component } from 'react';
import { View, SafeAreaView, Text, ScrollView, TextInput, TouchableOpacity, LayoutAnimation } from 'react-native';
import { connect } from 'react-redux';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { getInitialListState } from '../../redux';
import { addList } from '../../redux/actions';

import NewItemInput from '../../components/NewItemInput';

import styles from './ListsScreenStyle';

const EmptyList = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
    <FeatherIcon name='list' size={100} />
    <Text>Add a list to see it here</Text>
  </View>
);

const ListItem = props => (
  <View style={styles.listItem}>
    <TouchableOpacity>
      <Text style={styles.listItemText}>{props.data.title}</Text>
    </TouchableOpacity>
  </View>
);

class ListsScreen extends Component {
  state = {
    showNewItemInput: false
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
  render() {
    const { newItemInput } = this.state;
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
        </View>
        <ScrollView>
          {
            this.props.lists.length ? this.props.lists.map((list, i) => <ListItem key={i} data={list} />) : <EmptyList />
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => state.leap;
export default connect(mapStateToProps, { addList })(ListsScreen);
