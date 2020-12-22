import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Loading from '../common/loading';
import Theme from '../theme/style';

class ProductsView extends Component {
  renderProducts() {
    const {navigation, data, whislist, horizontal} = this.props;

    return data.map(product => {
      product = whislist ? product.product : product;
      return (
        <TouchableOpacity
          style={[Styles.item, !horizontal ? Styles.l2 : {}]}
          key={product.id}
          onPress={() => navigation.navigate('ProductScreen', {product})}
          underlayColor="white">
          {product.images &&
          product.images.length > 0 &&
          product.images[0].src ? (
            <Image
              style={Styles.image}
              source={{uri: product.images[0].src}}
              resizeMode={'cover'}
            />
          ) : null}

          <Text numberOfLines={1} style={Styles.name}>
            {product.name}
          </Text>

          {product.regular_price != '' &&
          product.price + '' !== product.regular_price + '' ? (
            <View style={Styles.prices}>
              <Text style={Styles.price_discounted}>
                ${product.regular_price}
              </Text>
              <Text style={Styles.price}>${product.price}</Text>
            </View>
          ) : (
            <Text style={Styles.price}>${product.price}</Text>
          )}
        </TouchableOpacity>
      );
    });
  }

  render() {
    const {data, loading, horizontal} = this.props;
    return (
      <View style={Styles.view}>
        {loading ? <Loading /> : null}
        <ScrollView
          horizontal={horizontal || false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScroxllIndicator={false}
          alwaysBounceVertical={false}>
          <View style={Styles.list}>{data && this.renderProducts()}</View>
        </ScrollView>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  view: {
    marginBottom: 15,
  },
  list: {
    flexDirection: 'row',
    paddingRight: 15,
  },
  image: {
    width: 150,
    height: 184,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  item: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 15,
    marginHorizontal: 5,
  },
  prices: {
    flexDirection: 'row',
  },
  price: {
    fontFamily: Theme.boldFont,
    fontSize: 14,
    color: '#000',
    letterSpacing: 0.5,
    fontWeight: '600',
  },
  price_discounted: {
    fontFamily: Theme.boldFont,
    fontSize: 13,
    color: Theme.primaryColor,
    paddingRight: 5,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 1,
    letterSpacing: 0.5,
    display: 'none',
  },
  name: {
    fontFamily: Theme.mediumFont,
    fontSize: 12,
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 5,
    color: '#000',
    width: 150,
    fontWeight: '500',
  },
});

export default ProductsView;
