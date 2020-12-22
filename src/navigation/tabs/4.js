import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CartListScreen from '../../views/cart/list';
import CheckoutAddress from '../../views/checkout/address';
import CheckoutPayment from '../../views/checkout/payment';
import PaypalPayment from '../../views/checkout/payment/paypal';
import Paypal from '../../views/checkout/payment/paypalNew';
import CheckoutComplete from '../../views/checkout/complete';
import CheckoutAgreement from '../../views/checkout/agreement';
import CartButton from '../../common/CartButton';

import LoginScreen from '../../views/login/home';
import RegisterScreen from '../../views/register/home';
import I18n from '../../views/language/I18n';

const tabLabel = 'Cart';

import ProductScreenInCartScreen from '../../views/product/home';
import {Icon} from 'native-base';

const Cart = createStackNavigator({
  CartListScreen,
  CheckoutAddress,
  CheckoutPayment,
  Paypal,
  PaypalPayment,
  CheckoutAgreement,
  CheckoutComplete,
  LoginScreen,
  RegisterScreen,
});

const Stacks = createStackNavigator(
  {
    Cart,
    ProductScreenInCartScreen,
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
  screen: Stacks,
  navigationOptions: {
    tabBarLabel: I18n.t('cart'),
    tabBarIcon: ({tintColor, focused}) => (
      <>
        {/* <CartButton tintColor={tintColor} focused={focused} /> */}
        <Icon
          type="AntDesign"
          name="shoppingcart"
          style={{color: focused ? '#71AD42' : 'grey'}}
        />
      </>
    ),
    tabBarOnPress: ({navigation, defaultHandler}: any) => {
      navigation.navigate('CartListScreen');
      defaultHandler();
    },
  },
};
