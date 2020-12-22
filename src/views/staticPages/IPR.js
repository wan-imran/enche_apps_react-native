import React, {Component} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';

import BackHeader from '../../components/BackHeader';
import {WebView} from 'react-native-webview';

class IPR extends Component {
  constructor(props) {
    super(props);
  }

  ActivityIndicatorElement = () => {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="#71AD42"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  render() {
    return (
      <>
        <BackHeader navigation={this.props.navigation} pagename={'IPR'} />
        <WebView
          source={{
            uri:
              'https://developer.enche.com/intellectual-property-protection-mobile/',
          }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={this.ActivityIndicatorLoadingView}
          //Want to show the view or not
          startInLoadingState={true}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});

IPR.navigationOptions = ({navigation}) => ({
  header: null,
});

export default IPR;
