import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import I18n from '../../views/language/I18n';

const imageTint = require('../../assets/images/ic_category_active.png');
const image = require('../../assets/images/ic_category.png');
const imageStyle = {width: 24, height: 24};

import CategoryScreen from '../../views/category/home';
import CategoryProductsScreen from '../../views/category/category-products';
import ProductScreenInCategoryScreen from '../../views/product/home';
import SearchScreen from '../../views/search/home';
import {Icon} from 'native-base';
import ComingSoon from '../../components/ComingSoon';

const Category = createStackNavigator({
  CategoryScreen,
  CategoryProductsScreen,
});

const CategoryStack = createStackNavigator(
  {
    Category,
    ProductScreenInCategoryScreen,
    SearchScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 0.99,
    },
    tabBarOptions: {
      tabBarVisible: true,
    },
  },
);

export default {
  screen: ComingSoon,
  navigationOptions: {
    tabBarLabel: I18n.t('message'),
    tabBarIcon: ({focused}) => (
      <>
        {/* <Image resizeMode={'contain'} style={imageStyle} source={focused ? imageTint : image} /> */}
        <Icon
          type="AntDesign"
          name="message1"
          style={{color: focused ? '#71AD42' : 'grey'}}
        />
      </>
    ),
  },
};
