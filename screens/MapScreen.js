import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView, Constants, Permissions } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
  
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { routeName } = navigation.state;
    return {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
          return <Icon name='my-location' size={30} color={tintColor} />;
        },
    };
  };

  state = {
    mapLoaded: false,
    region: {
      longitude: -122,
      latitude: 37,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount = async () => {
    await Permissions.askAsync(Permissions.LOCATION);

    this.setState({ mapLoaded: true });
  }

  onRegionChangeComplete = (region) => {
    this.setState({ region });
  }

  onButtonPress = () => {
    this.props.fetchJobs(this.state.region, () => {
      this.props.navigation.navigate('deck');
    });
  }

  render() {
    // note: you can option click in IOS simulator to 'pinch' zoom
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      );
    }

    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title='Search This Area'
            backgroundColor='#009688'
            icon={{ name: 'search' }}
            onPress={this.onButtonPress.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
};

export default connect(null, actions)(MapScreen);
