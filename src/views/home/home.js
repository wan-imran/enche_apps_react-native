import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  FlatList,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import {Thumbnail} from 'native-base';
import Theme from '../../theme/style';
import TitleLogo from '../../theme/titleLogo';
import MenuButton from '../../theme/menuButton';
import SearchButton from '../../theme/searchButton';
import styles from './style';
import ProductList from '../../components/ProductList';
import fsManager from '../../common/fs-manager';
import CategoryBlock from './category-block';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ProductAction from '../../redux/actions/products';
import * as WhislistAction from '../../redux/actions/whislist';
import * as CurrentCustomer from '../../redux/actions/current-customer';
import HeaderHome from '../../components/HeaderHome';
import SearchHome from '../../components/SearchHome';
import I18n from '../language/I18n';
import {getProductsURL} from '../../redux/types';
const WIDTH = Dimensions.get('window').width;

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.attributes = [];
    this.state = {
      recently_viewed_products: [],
      loading: false,
      tabsData: [
        {
          name: I18n.t('categories'),
          icon: require('../../assets/images/landing_page/categories_icon.png'),
          navigation: 'CategoryScreen',
        },
        {
          name: I18n.t('kudos'),
          icon: require('../../assets/images/landing_page/kudos_icon.png'),
          navigation: 'ComingSoon',
        },
        {
          name: I18n.t('partner_with_us'),
          icon: require('../../assets/images/landing_page/partner_with_us_icon.png'),
          navigation: 'ComingSoon',
        },
        {
          name: I18n.t('csr_gallery'),
          icon: require('../../assets/images/landing_page/csr_gallery_icon.png'),
          navigation: 'ComingSoon',
        },
        {
          name: I18n.t('e_services'),
          icon: require('../../assets/images/landing_page/e-government_icon.png'),
          navigation: 'ComingSoon',
        },
        {
          name: I18n.t('about_us'),
          icon: require('../../assets/images/landing_page/about_us_icon.png'),
          navigation: 'StaticHome',
        },
      ],
    };
  }
  componentDidMount() {
    this.props.ProductAction.getProductCategories();
    this.props.ProductAction.getFeaturedProducts();
    this.props.ProductAction.getPopularProducts();
    this.props.ProductAction.getRatingProducts();
    this.props.CurrentCustomer.setCurrentCustomer();
    StatusBar.setHidden(false, 'slide');
    this.refreshWhislist();
  }

  UNSAFE_componentWillReceiveProps(props) {
    if (this.props.products != props.products) {
      /**
       * Get Recently Viewed Products
       */
      this.setState({loading: true});
      let url = getProductsURL();
      url += `&include=${props.products.recently_viewed}`;
      fetch(url)
        .then(res => res.json())
        .then(json => {
          this.setState({
            recently_viewed_products: json,
            loading: false,
          });
        })
        .catch(err => {
          this.setState({loading: false});
        });
    }
  }

  async refreshWhislist() {
    let data = await fsManager.getWhislist();
    data = data || '[]';
    const wl = JSON.parse(data);
    for (var i = 0; i < wl.length; i++) this.props.WhislistAction.add(wl[i]);
  }

  render() {
    const {
      navigation,
      productsFeatured,
      productsPopular,
      productsRating,
      categories,
    } = this.props;
    const {recently_viewed_products, loading} = this.state;
    return (
      <>
        <HeaderHome navigation={this.props.navigation} />

        <View style={styles.container}>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior={'never'}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior={'never'}>
              <SearchHome navigation={this.props.navigation} />
              <Image
                resizeMode={'contain'}
                style={{alignSelf: 'center', width: '100%', height: 200}}
                source={require('../../assets/images/1.Banner_FreeRegistration.jpg')}
              />
              {categories.loading ? null : (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={this.state.tabsData}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate(item.navigation);
                        }}
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          padding: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <>
                          <Thumbnail medium source={item.icon} />
                          <Text style={{color: 'grey', fontSize: 10}}>
                            {item.name}
                          </Text>
                        </>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={item => item.name}
                  style={{width: WIDTH + 5}}
                />
              )}

              <View style={styles.section}>
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>{'FEATURED'}</Text>
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
                  data={productsFeatured.data}
                  loading={productsFeatured.loading}
                />
              </View>
              <View style={styles.section}>
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>{'POPULAR'}</Text>
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
                  data={productsPopular.data}
                  loading={productsPopular.loading}
                />
              </View>

              <View style={styles.section}>
                <View style={styles.sectionHead}>
                  <Text style={styles.sectionTitle}>{'BEST SELLER'}</Text>
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
                  data={productsRating.data}
                  loading={productsRating.loading}
                />
              </View>

              {recently_viewed_products.length > 0 ? (
                <View style={styles.section}>
                  <View style={styles.sectionHead}>
                    <Text style={styles.sectionTitle}>
                      {'Recently Viewed Products'}
                    </Text>
                  </View>
                  <ProductList
                    horizontal
                    navigation={navigation}
                    data={recently_viewed_products}
                    loading={loading}
                  />
                </View>
              ) : null}
            </ScrollView>

            {/* {categories.loading ? (
              <Text>Loading...</Text>
            ) : (
              <View style={styles.cartegoryBlocks}>
                {categories.parents.map((item, index) => (
                  <CategoryBlock
                    key={index}
                    item={item}
                    navigation={navigation}
                    index={index}
                  />
                ))}
              </View>
            )} */}
          </ScrollView>
        </View>
      </>
    );
  }
}

HomeScreen.navigationOptions = ({navigation}) => ({
  /* headerStyle: Theme.headerStyle,
  headerTitle: <TitleLogo />,
  headerTitleStyle: Theme.headerTitleStyle,
  headerLeft: <MenuButton navigation={navigation} />,
  headerRight: <SearchButton navigation={navigation} />, */
  //To hide the ActionBar/NavigationBar
  header: null,
});

function mapStateToProps(state) {
  return {
    productsFeatured: state.productsFeatured,
    productsGrouped: state.productsGrouped,
    productsRating: state.productsRating,
    productsPopular: state.productsPopular,
    categories: state.categories,
    currentCustomer: state.currentCustomer,
    products: state.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch),
    WhislistAction: bindActionCreators(WhislistAction, dispatch),
    CurrentCustomer: bindActionCreators(CurrentCustomer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

{
  /*    <Text style={styles.sectionTitle}>Grouped Products</Text><ProductsView horizontal navigation={navigation} data={productsGrouped.data} loading={productsGrouped.loading} />*/
}
