import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';

import {Dropdown} from 'react-native-material-dropdown';
import HTMLView from 'react-native-htmlview';
import Share, {ShareSheet, Button} from 'react-native-share';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProductAction from '../../redux/actions/products';
import * as CartAction from '../../redux/actions/cart';
import Theme from '../../theme/style';
import FormStyle from '../../theme/form';
import Styles from './style';
import StarRating from '../../components/StarRating';
import Heart from '../../common/heart';
import {DropDownHolder} from '../../common/dropalert';
import {
  WHATSAPP_ICON,
  FACEBOOK_ICON,
  TWITTER_ICON,
  GOOGLE_PLUS_ICON,
  EMAIL_ICON,
  PINTEREST_ICON,
  MORE_ICON,
} from './icons';
import {SliderBox} from 'react-native-image-slider-box';

import {getProductsURL} from '../../redux/types';
import ProductList from '../../components/ProductList';

class Product extends Component {
  constructor(props) {
    super(props);
    this.attributes = [];
    this.state = {
      tab_index: 0,
      shareSheetVisible: false,
      productsRelated: {
        data: [],
        loading: true,
      },
    };
  }

  render() {
    const {navigation} = this.props;
    const product = navigation.getParam('product');
    if (product) {
      return this.renderProduct();
    }
    return <View />;
  }

  componentWillUnmount() {
    StatusBar.setHidden(false, 'slide');
  }

  componentDidMount() {
    StatusBar.setHidden(true, 'slide');

    const {navigation} = this.props;
    const product = navigation.getParam('product');
    product ? this.getRelatedProducts(product.related_ids) : null;
    const product_id = product.id;
    product_id ? this.setViewedProduct(product_id) : null;
  }

  /**
   * Set Viewed product
   */
  setViewedProduct(product_id) {
    this.props.ProductAction.setViewedProducts(product_id);
  }

  /**
   * Get Related Products
   */
  getRelatedProducts(data) {
    let url = getProductsURL();
    url += `&include=${data}`;
    fetch(url)
      .then(res => res.json())
      .then(json => {
        this.setState({
          productsRelated: {
            ...this.state.productsRelated,
            data: json,
            loading: false,
          },
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          productsRelated: {
            ...this.state.productsRelated,
            loading: false,
          },
        });
      });
  }

  renderAttributes(attributes) {
    if (attributes.length < 1) {
      return <View />;
    }

    // Only visible attributes...
    attributes = attributes.filter(x => x.visible === true);

    //attributes[0].selected = attributes[0].options[0];

    return attributes.map((a, i) => {
      var data = [];

      a.options.map(value => {
        data.push({value});
      });

      return (
        <View
          style={[
            {flex: 0.5},
            attributes.length <= 1
              ? {}
              : attributes.length - 1 === i
              ? {marginLeft: 15}
              : {},
          ]}
          key={i}>
          <Dropdown
            renderAccessory={() => (
              <Image
                style={{opacity: 0.6}}
                source={require('../../assets/images/ic_down.png')}
              />
            )}
            fontSize={14}
            itemPadding={9}
            baseColor={'#cdcdcd'}
            onChangeText={value => {
              a.selected = value;
            }}
            itemTextStyle={{fontFamily: Theme.regularFont}}
            label={a.name}
            data={data}
            value={data[0].value}
          />
        </View>
      );
    });
  }

  renderReviewerButton(attr_length) {
    const {navigation} = this.props;
    const product = navigation.getParam('product');
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ProductReviewsScreen', {product_id: product.id});
        }}
        style={[
          Styles.otherDetailButton,
          attr_length == 1 ? {} : Styles.reviewsFullRow,
        ]}>
        <Text
          style={[
            Styles.otherDetailButtonText,
            attr_length > 1 || attr_length == 0 ? {paddingLeft: 0} : {},
          ]}>
          {'Reviews'}
        </Text>
        <Image
          resizeMode={'contain'}
          style={Styles.otherDetailButtonImage}
          source={require('../../assets/images/ic_arrow_right.png')}
        />
      </TouchableOpacity>
    );
  }

  shrareButtonPress(network) {
    const {navigation} = this.props;
    const product = navigation.getParam('product');
    this.onCancel();
    setTimeout(() => {
      Share.shareSingle({
        social: network,
        title: product.name,
        message: product.name,
        url: product.permalink,
        subject: 'Share Link',
      });
    }, 300);
  }

  shareOnPress() {
    this.onOpen();
  }

  onCancel() {
    this.setState({shareSheetVisible: false});
  }

  onOpen() {
    this.setState({shareSheetVisible: true});
  }

  addToCartPress(product, goCart) {
    var attrs = [];
    var unselectedAttributes = [];
    if (product.attributes.length > 0) {
      product.attributes
        .filter(x => x.visible === true)
        .forEach(item => {
          if (item.selected === undefined || item.selected === '') {
            unselectedAttributes.push(item.name);
          }
        });
    }
    if (unselectedAttributes.length > 0) {
      DropDownHolder.alert(
        'warn',
        '',
        'Please select ' + unselectedAttributes.join(', '),
      );
    } else {
      if (product.attributes) {
        product.attributes.map(a => {
          if (a.selected) {
            attrs.push(a.name + ': ' + a.selected);
          }
        });
      }
      this.props.CartAction.addToCart(product, attrs, 1);
      if (goCart) this.props.navigation.navigate('CartListScreen');
    }
  }

  renderProduct() {
    const {navigation, cart} = this.props;
    const product = navigation.getParam('product');
    const {productsRelated} = this.state;

    let images = [];
    for (var i = 0; i < product.images.length; i++) {
      images.push(product.images[i].src);
    }

    return (
      <View style={Styles.container}>
        <View style={Styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={true}>
            <View
              style={[
                Styles.productImageContainer,
                {height: product.rating_count > 0 ? 430 : 460},
              ]}>
              {images.length > 0 && (
                <SliderBox
                  resizeMode={'contain'}
                  images={images}
                  sliderBoxHeight={product.rating_count > 0 ? 430 : 460}
                />
              )}
            </View>
            <View style={Styles.productDetails}>
              <View style={Styles.productActions}>
                <Heart
                  product={product}
                  width={18}
                  height={16}
                  buttonStyles={Styles.productActionButton}
                />
                {/* <TouchableOpacity
                  style={Styles.productActionButton}
                  onPress={() => {
                    this.addToCartPress(product);
                  }}>
                  <Image
                    source={require('../../assets/images/cart_icon.png')}
                    resizeMode={'contain'}
                    style={Styles.cartImage}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={Styles.productActionButton}
                  onPress={() => {
                    this.shareOnPress();
                  }}>
                  <Image
                    source={require('../../assets/images/ic_share.png')}
                    resizeMode={'contain'}
                    style={Styles.shareImage}
                  />
                </TouchableOpacity>
              </View>

              <View style={Styles.productName}>
                <View style={Styles.productNameTextWrap}>
                  <Text style={Styles.productNameText}>{product.name}</Text>
                  {product.regular_price != '' &&
                  product.price + '' !== product.regular_price + '' ? (
                    <View style={Styles.prices}>
                      <Text style={Styles.productPrice}>${product.price}</Text>
                      <Text style={Styles.price_discounted}>
                        ${product.regular_price}
                      </Text>
                    </View>
                  ) : (
                    <View style={Styles.prices}>
                      <Text style={Styles.productPrice}>${product.price}</Text>
                    </View>
                  )}
                  {product.rating_count > 0 && (
                    <View style={Styles.reviewStars}>
                      <StarRating
                        ratingObj={{
                          ratings: parseInt(product.average_rating || 0),
                          views: product.rating_count,
                        }}
                      />
                    </View>
                  )}
                </View>

                {product.stock_quantity ? (
                  <Text style={{color: 'grey', fontSize: 30}}>
                    {product.stock_quantity}

                    <Text
                      style={{
                        color: '#71AD42',
                        fontSize: 20,
                      }}>
                      {product.stock_status}
                    </Text>
                  </Text>
                ) : null}

                <Text style={{color: 'grey'}}>
                  Merchant:{' '}
                  <Text style={{color: '#71AD42'}}>
                    {product.store.formatted_display_name}
                  </Text>
                </Text>
              </View>
              <View style={Styles.productContent}>
                {product.attributes.length > 0 &&
                product.attributes.filter(x => x.visible === true).length >
                  1 ? (
                  <View>
                    <View style={[Styles.productAtributesAndReviewsButton]}>
                      {this.renderAttributes(
                        product.attributes.filter(x => x.visible === true),
                      )}
                    </View>
                    {this.renderReviewerButton(
                      product.attributes.filter(x => x.visible === true).length,
                    )}
                  </View>
                ) : (
                  <View style={[Styles.productAtributesAndReviewsButton]}>
                    {this.renderAttributes(
                      product.attributes.filter(x => x.visible === true),
                    )}
                    {this.renderReviewerButton(
                      product.attributes.filter(x => x.visible === true).length,
                    )}
                  </View>
                )}
                <View style={Styles.productDescWrap}>
                  <HTMLView
                    addLineBreaks={false}
                    value={product.description}
                    stylesheet={HtmlStyles}
                  />
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.sectionHead}>
                <Text style={styles.sectionTitle}>{'RELATED PRODUCTS'}</Text>
                {/* <TouchableOpacity style={styles.seeMoreButton}>
                  <Text style={styles.seeMoreButtonText}>{'see more'}</Text>
                  <Image
                    style={styles.seeMoreImage}
                    resizeMode={'contain'}
                    source={require('../../assets/images/ic_arrow_right.png')}
                  />
                </TouchableOpacity> */}
              </View>
              <ProductList
                horizontal
                navigation={navigation}
                data={productsRelated.data}
                loading={productsRelated.loading}
              />
            </View>
          </ScrollView>
        </View>

        <View style={Styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={Styles.close}>
            <Image
              resizeMode={'contain'}
              style={Styles.closeImage}
              source={require('../../assets/images/back_button_enche.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              StatusBar.setHidden(false, 'slide');
              navigation.navigate('CartListScreen');
            }}
            style={Styles.cartButton}>
            <View style={Styles.cartIconBadged}>
              <Image
                resizeMode={'contain'}
                style={Styles.cartIcon}
                source={require('../../assets/images/cart_icon.png')}
              />
              {cart && cart.length > 0 && (
                <View style={Styles.badgeWrap}>
                  <Text style={Styles.badgeText}>
                    {cart
                      .map(item => item.quantity)
                      .reduce((prev, next) => prev + next)}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        <View style={Styles.footer}>
          <TouchableOpacity
            style={[FormStyle.primaryButton, {flex: 0.5}]}
            onPress={() => {
              this.addToCartPress(product);
            }}>
            <Text style={FormStyle.primaryButtonText}>{'Add to Cart'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[FormStyle.primaryButton, {flex: 0.5}]}
            onPress={() => {
              StatusBar.setHidden(false, 'slide');
              this.addToCartPress(product, true);
            }}>
            <Text style={FormStyle.primaryButtonText}>{'BUY NOW'}</Text>
          </TouchableOpacity>
        </View>

        <ShareSheet
          visible={this.state.shareSheetVisible}
          onCancel={this.onCancel.bind(this)}>
          <Button
            iconSrc={{uri: FACEBOOK_ICON}}
            onPress={() => {
              this.shrareButtonPress('facebook');
            }}>
            Facebook
          </Button>
          <Button
            iconSrc={{uri: TWITTER_ICON}}
            onPress={() => {
              this.shrareButtonPress('twitter');
            }}>
            Twitter
          </Button>
          <Button
            iconSrc={{uri: WHATSAPP_ICON}}
            onPress={() => {
              this.shrareButtonPress('whatsapp');
            }}>
            Whatsapp
          </Button>
          <Button
            iconSrc={{uri: GOOGLE_PLUS_ICON}}
            onPress={() => {
              this.shrareButtonPress('googleplus');
            }}>
            Google +
          </Button>
          <Button
            iconSrc={{uri: EMAIL_ICON}}
            onPress={() => {
              this.shrareButtonPress('email');
            }}>
            Email
          </Button>
          <Button
            iconSrc={{uri: PINTEREST_ICON}}
            onPress={() => {
              this.shrareButtonPress('pinterest');
            }}>
            Pinterest
          </Button>
          <Button
            iconSrc={{uri: MORE_ICON}}
            onPress={() => {
              this.onCancel();
              setTimeout(() => {
                Share.open(this.shareOptions);
              }, 300);
            }}>
            More
          </Button>
        </ShareSheet>
      </View>
    );
  }
}

Product.navigationOptions = ({navigation}) => ({
  header: null,
});

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch),
    CartAction: bindActionCreators(CartAction, dispatch),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Product);

const HtmlStyles = StyleSheet.create({
  p: {
    fontFamily: Theme.lightFont,
    fontSize: 14,
    lineHeight: 24,
    color: 'grey',
    letterSpacing: 0.5,
    textAlign: 'justify',
  },
});

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 0,
  },
  sectionHead: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  seeMoreButton: {
    flex: 0.5,
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  seeMoreButtonText: {
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Theme.regularFont,
    letterSpacing: 0,
    color: '#9B9B9B',
    paddingRight: 2,
    top: 0,
  },
  seeMoreImage: {
    width: 16,
    height: 14,
    top: 1,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 16,
    fontFamily: Theme.mediumFont,
    paddingLeft: 15,
    paddingBottom: 5,
    letterSpacing: 1,
    flex: 0.5,
    color: Theme.primaryColor,
  },
});

let SHARE_OPTIONS = {
  title: 'React Native',
  message: 'Hola mundo',
  url: 'http://facebook.github.io/react-native/',
  subject: 'Share Link', //  for email
};
