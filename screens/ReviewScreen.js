import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class ReviewScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { routeName } = navigation.state;
    console.log({ navOptions: navigationOptions });
    return {
        headerTitle: 'Review Jobs',
        headerRight: (
          <Button
            title="Settings"
            onPress={() => navigation.navigate('settings') }
          />
        )
    };
  };

  render() {
    return (
      <View>
        <Text>ReviewScreen</Text>
      </View>
    );
  }
}

export default ReviewScreen;

