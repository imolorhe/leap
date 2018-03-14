import React from 'react';
import { Animated } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

import AddNewScreen from '../screens/AddNewScreen/AddNewScreen';
import AnimationsScreen from '../screens/AnimationsScreen/AnimationsScreen';
import ListsScreen from '../screens/ListsScreen/ListsScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';
import DisplayTaskScreen from '../screens/DisplayTaskScreen/DisplayTaskScreen';

export const MainNavigator = StackNavigator({
  ListsScreen: {
    screen: ListsScreen
  },
  TasksScreen: {
    screen: TasksScreen
  },
  DisplayTaskScreen: {
    screen: DisplayTaskScreen
  }
}, {
  initialRouteName: 'ListsScreen',
  navigationOptions: {
    header: null
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
