import React, { Component } from 'react';
import { View, Text, Button, ScrollView, Linking, Platform } from 'react-native';
import { MapView } from 'expo'
import { Card } from 'react-native-elements'
import { connect } from 'react-redux';
import * as actions from '../actions';

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

  renderLikedJobs() {
    return this.props.likedJobs.map(job => {
      const {
        company,
        formattedRelativeTime,
        url,
        latitude,
        longitude,
        jobtitle,
        jobkey
      } = job;
      const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.02
      };

      return (
        <Card title={jobtitle} key={jobkey}>
          <View style={{ height: 200 }}>
            <MapView
              style={{ flex: 1 }}
              scrollEnabled={false}
              initialRegion={initialRegion}
            />
            <View style={styles.detailWrapper}>
              <Text style={styles.italics}>{company}</Text>
              <Text style={styles.italics}>{formattedRelativeTime}</Text>
            </View>
            <Button
              title='Apply Now'
              backgroundColor='#03A9F4'
              onPress={() => Linking.openURL(url)}
            />
          </View>
        </Card>
        
      );
    });
  };

  render() {
    return (
      <ScrollView>
        {this.renderLikedJobs()}
      </ScrollView>
    );
  }
}

const styles = {
  italics: {
    fontStyle: 'italic'
  },
  detailWrapper: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
};

const mapStateToProps = (state) => {
  return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps, actions)(ReviewScreen);
