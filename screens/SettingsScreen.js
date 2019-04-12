import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SettingsScreen extends Component {

  render() {
    return (
      <View>
      </View>
    );
  }
}

export default connect(null, actions)(SettingsScreen);
