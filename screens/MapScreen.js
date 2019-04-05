import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Constants } from 'expo';

class MapScreen extends Component {

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Text>MapScreen</Text>
      </View>
    );
  }
}

export default MapScreen;

