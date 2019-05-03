// Dimensions, mapview, screens, react navigation, facebook login
// redux, geo2zip, json to query string (qs), sending callbacks to action creators
// offline data persistence, redux persist (and redux persist migrate), push notifications
// redux dev tools with react native debugger

import React from 'react';
import { Notifications } from 'expo';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import registerForNotifications from './services/push_notifications';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {
  componentDidMount() {
    // first register the user for notifications
    registerForNotifications();
    // Add a listener for any notifications and alert user
    Notifications.addListener((notification) => {
      // same as const text = notification.data.text
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'Ok.' }]
        );
      }
    });
  }

  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: {
        screen: WelcomeScreen,
        navigationOptions: { tabBarVisible: false }
      },
      auth: {
        screen: AuthScreen,
        navigationOptions: { tabBarVisible: false }
      },
      main: {
        navigationOptions: { tabBarVisible: false },
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            navigationOptions: {
              title: 'Review Jobs',
              tabBarIcon: ({ tintColor }) => {
                return (<Icon name="favorite" size={30} color={tintColor} />);
              }
            },
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
          }
        }, {
            tabBarOptions: {
              labelStyle: { fontSize: 12 }
            }
          })
      }
    }, {
        tabBarOptions: {
          visible: false
        }
      });

    const MyAppNav = createAppContainer(MainNavigator);

    return (
      <Provider store={store}>
        <MyAppNav />
      </Provider>
    );
  }
}
