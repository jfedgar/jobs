import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Constants } from 'expo';

class DeckScreen extends Component {

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Text>DeckScreen</Text>
      </View>
    );
  }
}

export default DeckScreen;

