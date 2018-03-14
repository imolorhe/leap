import React from 'react';
import { Animated } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

import AddNewScreen from '../screens/AddNewScreen/AddNewScreen';
import DisplayScreen from '../screens/DisplayScreen/DisplayScreen';
import AnimationsScreen from '../screens/AnimationsScreen/AnimationsScreen';
import ListsScreen from '../screens/ListsScreen/ListsScreen';

export const MainNavigator = StackNavigator({
  MainList: {
    screen: ListsScreen,
    navigationOptions: {
      header: null
    }
  }
}, {
  initialRouteName: 'MainList',
  navigationOptions: {
    headerStyle: {
      backgroundColor: 'white'
    }
  }
});
export const oldMainNavigator = TabNavigator({
  ListsScreen: {
    screen: ListsScreen,
    navigationOptions: {
      tabBarLabel: 'Lists'
    }
  },
  AnimationsScreen: {
    screen: AnimationsScreen,
    navigationOptions: {
      tabBarLabel: 'Animations'
    }
  },
  AddNewScreen: {
    screen: AddNewScreen,
    navigationOptions: {
      tabBarLabel: 'Add',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicon
          name={focused ? 'ios-add' : 'ios-add-circle-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  },
  DisplayScreen: {
    screen: DisplayScreen,
    navigationOptions: {
      tabBarLabel: 'List',
      tabBarIcon: ({ tintColor, focused }) => (
        <Ionicon
          name={focused ? 'ios-list' : 'ios-list-box-outline'}
          size={26}
          style={{ color: tintColor }}
        />
      )
    }
  }
}, {
    initialRouteName: 'ListsScreen',
    tabBarPosition: 'bottom',
    animationEnabled: true,
    configureTransition: () => ({
      timing: Animated.spring,
      tension: 1,
      friction: 25
    }),
    swipeEnabled: true
});
