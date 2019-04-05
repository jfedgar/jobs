// Dimensions, mapview, screens, react navigation, facebook login

import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

export default class App extends React.Component {

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
            screen: createStackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen }
            })
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
