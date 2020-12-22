import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import I18n from '../../views/language/I18n';

const imageTint = require('../../assets/images/ic_home_active.png');
const image = require('../../assets/images/ic_home.png');
const imageStyle = {width: 22, height: 20};

import HomeScreen from '../../views/home/home';
import CategoryScreen from '../../views/category/home';
import ProductScreen from '../../views/product/home';
import ProductReviewsScreen from '../../views/product/reviews';
import AddReviewScreen from '../../views/product/add-review';
import SearchScreen from '../../views/search/home';

import LoginScreen from '../../views/login/home';
import RegisterScreen from '../../views/register/home';
import {Icon} from 'native-base';

import CategoryProductsScreen from '../../views/category/category-products';
import ProductScreenInCategoryScreen from '../../views/product/home';
import StaticHome from '../../views/staticPages/home';
import About from '../../views/staticPages/About';
import AboutEnchepreneur from '../../views/staticPages/AboutEnchepreneur';
import CSRPolicy from '../../views/staticPages/CSRPolicy';
import TermOfUse from '../../views/staticPages/TermOfUse';
import TermsAndConditions from '../../views/staticPages/TermsAndConditions';
import LanguageScreen from '../../views/language/home';
import IPR from '../../views/staticPages/IPR';
import HelpAndSupport from '../../views/staticPages/HelpAndSupport';
import HowToBuy from '../../views/staticPages/HowToBuy';
import ShippingAndDelivery from '../../views/staticPages/ShippingAndDelivery';
import RefundPolicy from '../../views/staticPages/RefundPolicy';
import FAQMerchant from '../../views/staticPages/FAQMerchant';
import FAQBuyer from '../../views/staticPages/FAQBuyer';

const Shop = createStackNavigator({
  HomeScreen,
  CategoryScreen,
  LoginScreen,
  RegisterScreen,
  //category stack
  CategoryProductsScreen,
  ProductScreenInCategoryScreen,
  SearchScreen,
  StaticHome,
  About,
  AboutEnchepreneur,
  CSRPolicy,
  TermOfUse,
  TermsAndConditions,
  IPR,
  HelpAndSupport,
  HowToBuy,
  ShippingAndDelivery,
  RefundPolicy,
  FAQMerchant,
  FAQBuyer,
  LanguageScreen: {
    screen: LanguageScreen,
    navigationOptions: {header: null},
  },
});

const Stacks = createStackNavigator(
  {
    Shop,
    ProductScreen,
    ProductReviewsScreen,
    AddReviewScreen,
    SearchScreen,
  },
  {
    headerMode: 'none',
    mode: 'modal',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 0.99,
    },
    // tabBarOptions: {
    //     tabBarVisible: false
    // },
    tabBar: {
      visible: false,
    },
  },
);

export default {
  screen: Stacks,
  navigationOptions: () => {
    return {
      tabBarLabel: I18n.t('discover'),
      tabBarIcon: ({focused}) => (
        <>
          {/* <Image
          resizeMode={'contain'}
          style={imageStyle}
          source={focused ? imageTint : image}
        /> */}
          <Icon
            type="AntDesign"
            name="home"
            style={{color: focused ? '#71AD42' : 'grey'}}
          />
        </>
      ),
    };
  },
};
