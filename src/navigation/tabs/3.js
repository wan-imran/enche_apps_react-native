import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CartListScreen from '../../views/cart/list';
import {Image} from 'react-native';

const imageTint = require('../../assets/images/search.png');
const image = require('../../assets/images/search.png');
const imageStyle = {width: 20, height: 20};

import {Icon} from 'native-base';
import ComingSoon from '../../components/ComingSoon';
import I18n from '../../views/language/I18n';

const tabLabel = 'Notification';
const Stacks = createStackNavigator({
  CartListScreen,
});
export default {
  screen: ComingSoon,
  navigationOptions: {
    tabBarLabel: I18n.t('notification'),
    /* tabBarIcon: ({focused}) => (
      <Image
        resizeMode={'contain'}
        style={imageStyle}
        source={focused ? imageTint : image}
      />
    ),
    tabBarOnPress: ({navigation, defaultHandler}: any) => {
      navigation.navigate('CartListScreen');
      defaultHandler();
    }, */
    tabBarIcon: ({focused}) => (
      <>
        <Icon
          type="AntDesign"
          name="bells"
          style={{color: focused ? '#71AD42' : 'grey'}}
        />
      </>
    ),
  },
};
