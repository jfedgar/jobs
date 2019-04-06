import React, { Component } from 'react';
import { View } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {

  componentDidMount() {
    this.props.facebookLogin();
    this.onAuthComplete();
    //AsyncStorage.removeItem('fb_token');
  }

  componentDidUpdate() {
    this.onAuthComplete();
  }

  onAuthComplete() {
    if (this.props.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, actions)(AuthScreen);

