import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

  componentDidMount() {
    this.props.facebookLogin();
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Text>AuthScreen</Text>
      </View>
    );
  }
}

export default connect(null, actions)(AuthScreen);

