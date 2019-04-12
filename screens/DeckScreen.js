import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { MapView, Constants } from 'expo';
import { connect } from 'react-redux';
import { Card } from 'react-native-elements';
import Swipe from '../components/Swipe';
import * as actions from "../actions";
class DeckScreen extends Component {
  renderNoMoreCards() {
    return <Card title="No More Jobs" />;
  }

  renderCard(job) {
    const initialRegion = {
      latitude: job.latitude,
      longitude: job.longitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02
    };

    return (
      <Card title={job.jobtitle}>
        <View style={{ height: 225 }}>
          <MapView
            scrollEnabled={false}
            style={{ flex: 1 }}
            initialRegion={initialRegion}
          />
        </View>
        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>
        <Text style={{ height: 100 }}>{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}</Text>
      </Card>
    );
  }

  render() {
    return (
      <View
        style={{
          paddingTop: Constants.statusBarHeight,
          flex: 1
        }}
      >
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard.bind(this)}
          renderNoMoreCards={this.renderNoMoreCards.bind(this)}
          keyProp="jobkey"
          onSwipeRight={job => {
            this.props.likeJob(job)
          } }
        />
      </View>
    );
  }
}

const styles = {
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
};

const mapStateToProps = ({ jobs }) => {
  // get the actual array of jobs to work with inside the Deck component
  return { jobs: jobs.results };
};

export default connect(mapStateToProps, actions)(DeckScreen);
