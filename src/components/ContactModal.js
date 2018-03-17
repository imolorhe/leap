import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { getAll } from 'react-native-contacts';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default class ContactModal extends Component {
  state = {
    contacts: [],
    selectedContactRecordIds: []
  };
  componentDidMount() {
    getAll((err, contacts) => {
      if (err === 'denied') {
        // Smoething went wrong
      } else {
        this.setState({ contacts });
      }
    });
  }

  toggleSelected = recordId => () => {
    if (this.state.selectedContactRecordIds.find(v => v === recordId)) {
      this.setState({ selectedContactRecordIds: this.state.selectedContactRecordIds.filter(v => v !== recordId) });
    }
    else {
      this.setState({ selectedContactRecordIds: [...this.state.selectedContactRecordIds, recordId] });
    }
  }
  onDone = () => {
    this.props.navigation.state.params.onSelectContacts(this.state.selectedContactRecordIds.map(id => this.state.contacts.find(contact => contact.recordID === id)));
    this.props.navigation.goBack();
  };
  render() {
    return (
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={this.onDone}>
            <FeatherIcon name='check-square' size={20} />
            <Text style={{ fontSize: 20 }}>Done</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {this.state.contacts.map((contact, i) => (
            <TouchableOpacity key={i} onPress={this.toggleSelected(contact.recordID)}>
              <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, color: (this.state.selectedContactRecordIds.find(v => v === contact.recordID)) ? '#600473' : 'black' }}>{contact.givenName} {contact.familyName}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
}
