import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

import BackHeader from '../../components/BackHeader';

class PartnerWithUs extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <BackHeader
          navigation={this.props.navigation}
          pagename={'Partner with Us'}
        />
        <ScrollView>
          <View
            style={{
              backgroundColor: '#DEDEDE',
              width: '100%',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
            style={{width: '100%', height: 200}}
            source={require('../../assets/images/1.Banner_FreeRegistration.jpg')}
          /> */}
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Banner Partner with Us
            </Text>
          </View>

          <Text style={styles.paragraph}>
            Teamwork divides the task and multiplies the success, whereby we
            trust that we may not able to bring a change that we wanted to see
            in this world, alone. Therefore we need support from everyone to
            ensure the success of our CSR campaigns. We welcome any business,
            corporate companies or even agencies to work together with us in
            delivering best CSR campaign for our community either locally or
            globally. You may let us know on your concerns and aspiration in
            delivering a quality, impactful and transparent CSR campaign for our
            community. You can reach us by filling up the below template.
          </Text>

          <View style={{marginBottom: 20}} />
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  paragraph: {
    marginHorizontal: 10,
    letterSpacing: 1.2,
    fontFamily: 'Roboto',
    fontSize: 15,
    lineHeight: 25,
  },
});

PartnerWithUs.navigationOptions = ({navigation}) => ({
  header: null,
});

export default PartnerWithUs;
