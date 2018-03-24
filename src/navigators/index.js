import React, { Component } from 'react';
import { Animated, BackHandler, Linking } from 'react-native';
import { TabNavigator, StackNavigator, NavigationActions, SwitchNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

import configureStore from '../redux';
import { checkAuth } from '../redux/actions';

import LinkRoutes from './linkroute';

import AddNewScreen from '../screens/AddNewScreen/AddNewScreen';
import AnimationsScreen from '../screens/AnimationsScreen/AnimationsScreen';
import ListsScreen from '../screens/ListsScreen/ListsScreen';
import TasksScreen from '../screens/TasksScreen/TasksScreen';
import DisplayTaskScreen from '../screens/DisplayTaskScreen/DisplayTaskScreen';
import ContactModal from '../components/ContactModal';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';

export const ContentNavigator = StackNavigator({
  ListsScreen: {
    screen: ListsScreen
  },
  TasksScreen: {
    screen: TasksScreen
  },
  DisplayTaskScreen: {
    screen: DisplayTaskScreen
  },
  LoginScreen: {
    screen: LoginScreen
  },
  ContactModal: {
    screen: ContactModal,
    navigationOptions: {
      headerMode: 'none',
      mode: 'modal'
    }
  }
}, {
  initialRouteName: 'ListsScreen',
  navigationOptions: {
    header: null
  }
});
export const AuthNavigator = StackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  SignupScreen: {
    screen: SignupScreen
  }
}, {
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    header: null
  }
});

export const MainNavigator = SwitchNavigator({
  Content: ContentNavigator,
  Auth: AuthNavigator,
  AuthLoading: AuthLoadingScreen
}, {
  initialRouteName: 'AuthLoading'
});

export class AppNavigator extends Component {
  constructor(props) {
    super(props);

    this.props.actions.checkAuth();
  }
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);

    Linking.addEventListener('url', event => this.handleOpenURL(event.url));
    Linking.getInitialURL().then(url => url && this.handleOpenURL(url));
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);

    Linking.removeEventListener('url', this.handleOpenURL);
  }
  onBackPress = () => {
    const { dispatch, navState } = this.props;
    if (navState.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  handleOpenURL = (url) => {
    const path = url.split(':/')[1];
    LinkRoutes(path, this.props.store);
  };

  render() {
    return (
      <MainNavigator navigation={this.props.getNavigationProp(this.props.dispatch, this.props.navState)} />
    );
  }
}

// export const oldMainNavigator = TabNavigator({
//   ListsScreen: {
//     screen: ListsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Lists'
//     }
//   },
//   AnimationsScreen: {
//     screen: AnimationsScreen,
//     navigationOptions: {
//       tabBarLabel: 'Animations'
//     }
//   },
//   AddNewScreen: {
//     screen: AddNewScreen,
//     navigationOptions: {
//       tabBarLabel: 'Add',
//       tabBarIcon: ({ tintColor, focused }) => (
//         <Ionicon
//           name={focused ? 'ios-add' : 'ios-add-circle-outline'}
//           size={26}
//           style={{ color: tintColor }}
//         />
//       )
//     }
//   }
// }, {
//     initialRouteName: 'ListsScreen',
//     tabBarPosition: 'bottom',
//     animationEnabled: true,
//     configureTransition: () => ({
//       timing: Animated.spring,
//       tension: 1,
//       friction: 25
//     }),
//     swipeEnabled: true
// });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ checkAuth }, dispatch),
  dispatch
});
export default connect(state => ({ navState: state.nav }), mapDispatchToProps)(AppNavigator);
