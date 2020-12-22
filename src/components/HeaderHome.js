import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Header, Left, Right, Body, Button, Thumbnail} from 'native-base';
const HeaderHome = ({navigation}) => {
  return (
    <Header
      style={[styles.headView, {backgroundColor: '#FFF'}]}
      androidStatusBarColor="#71AD42">
      <Left style={{flex: 1}}>
        <Button
          transparent
          onPress={() => {
            navigation.navigate('LanguageScreen');
          }}>
          <Thumbnail
            small
            source={require('../assets/images/multi_language.png')}
          />
        </Button>
      </Left>
      <Body style={styles.headBody}>
        <Thumbnail
          square
          small
          source={require('../assets/images/enche_logo.png')}
          style={{width: 80}}
        />
      </Body>
      <Right style={{flex: 1}}>
        <Button transparent>
          <Thumbnail
            small
            source={require('../assets/images/currency_icon.png')}
          />
        </Button>
      </Right>
    </Header>
  );
};

const styles = StyleSheet.create({
  headView: {
    height: 60,
    width: Dimensions.get('window').width,
  },
  headBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderHome;
