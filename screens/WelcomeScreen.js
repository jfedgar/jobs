import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to JobApp', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location and swipe away!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  onSlidesComplete() {
    this.props.navigation.navigate('auth');
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
      </View>
    );
  }
}

export default WelcomeScreen;

