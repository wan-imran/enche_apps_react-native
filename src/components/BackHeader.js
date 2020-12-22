import React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Button,
  Thumbnail,
  Text,
  Icon,
} from 'native-base';

import SearchButton from '../theme/searchButton';

const BackHeader = ({navigation, pagename, search, cart}) => {
  return (
    <Header
      style={[styles.headView, {backgroundColor: '#FFF'}]}
      androidStatusBarColor="#71AD42">
      <Left style={{flex: 1}}>
        <Button transparent onPress={() => navigation.goBack()}>
          <Thumbnail
            small
            source={require('../assets/images/back_icon_enche.png')}
            style={{height: 20, width: 20}}
          />
        </Button>
      </Left>
      <Body style={styles.headBody}>
        {/* <Thumbnail
          square
          small
          source={require('../assets/images/enche_logo.png')}
          style={{width: 80}}
        /> */}
        <Text
          style={{
            fontFamily: 'Roboto',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#71AD42',
          }}>
          {pagename}
        </Text>
      </Body>

      <Right style={{flex: 1}}>
        {search ? <SearchButton navigation={navigation} /> : null}
        {cart ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('CartListScreen')}>
            <Icon
              type="AntDesign"
              name="shoppingcart"
              style={{color: 'grey', fontSize: 18}}
            />
          </TouchableOpacity>
        ) : null}
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

export default BackHeader;
