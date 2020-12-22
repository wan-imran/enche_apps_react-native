import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from 'react-native';

import {TabView, SceneMap} from 'react-native-tab-view';
import {TabViewVertical, TabBarVertical} from 'react-native-vertical-tab-view';
import Animated from 'react-native-reanimated';
import Theme from '../../theme/style';
import SearchButton from '../../theme/searchButton';
import styles from './style';
import MenuButton from '../../theme/menuButton';
import * as ProductAction from '../../redux/actions/products';
import * as WhislistAction from '../../redux/actions/whislist';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BackHeader from '../../components/BackHeader';

const width = Dimensions.get('window').width - 200;
const padd = 10;
const columns = 2;

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [],
      scenes: [],
      cat_id : 0
    };
  }

  componentWillMount() {
    const {categories} = this.props;
    let routes = [];
    categories &&
      categories.parents.map(item =>
        routes.push({
          key: 'tab_' + item.id,
          title: item.name.toUpperCase(),
          cat_id: item.id,
        }),
      );
      console.log('asd',categories);
      console.log(categories.parents);
    this.setState({routes: routes, cat_id: categories.parents[0].cat_id});
  }

  _handleIndexChange = index =>{ 
    var routes = this.state.routes;
    this.setState({index: index, cat_id: routes[index].cat_id});
  }  

  _renderTabBar = props => {
    //console.log('routes', this.state.routes);
    const inputRange = this.state.routes.map((x, i) => i);

    return (
      <View style={[styles.tabBar, {backgroundColor: '#F5F5F5'}]}>
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {this.state.routes.map((route, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={
                  this.state.index == i ? styles.tabItemActive : styles.tabItem
                }
                onPress={() => this.setState({index: i})}>
                <Animated.Text
                  style={
                    this.state.index == i
                      ? styles.tabHeaderButtonTextActive
                      : styles.tabHeaderButtonText
                  }>
                  {route.title}
                </Animated.Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  getSceneMap = () => {
    const {categories} = this.props;
    let sceneMap = {};
    categories &&
      categories.parents.map(item => {
        sceneMap['tab_' + item.id] = () => {
          return this._renderTabContent(item);
        };
      });
    console.log(sceneMap);
    return sceneMap;
  };

  _renderScene = SceneMap(this.getSceneMap());

  _renderTabContent(category) {
    const {categories, navigation} = this.props;
    const data = categories.data
      .filter(x => x.parent == category)
      .sort(x => x.count);
    console.log(data);
    const imageWidth = (width - padd * columns) / columns - padd / columns;
    return (
      <FlatList
        style={{backgroundColor: '#fff'}}
        data={data}
        numColumns={columns}
        keyExtractor={(item, index) => {
          return `${item.name}-${index}`;
        }}
        renderItem={({item, index}) => {
          return !item ? null : (
            <>
              <TouchableOpacity
                key={index}
                style={styles.tabContentButton}
                onPress={() => {
                  navigation.navigate('CategoryProductsScreen', {item});
                }}>
                {item.image ? (
                  <ImageBackground
                    source={{uri: item.image.src}}
                    resizeMode={'cover'}
                    style={{
                      width: imageWidth,
                      height: 100,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.tabContentText}>
                      {item.name.toUpperCase()}
                    </Text>
                    <Text style={styles.tabContentTextCount}>
                      {item.count} items
                    </Text>
                  </ImageBackground>
                ) : (
                  <View
                    style={{
                      backgroundColor: '#E6E8EC',
                      width: imageWidth,
                      height: 100,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.tabContentText2}>
                      {item.name.toUpperCase()}
                    </Text>
                    {/* <Text style={styles.tabContentTextCount2}>
                      {item.count} items
                    </Text> */}
                  </View>
                )}
              </TouchableOpacity>
            </>
          );
        }}
        /* ListFooterComponent={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate('CategoryProductsScreen', {item});
            }}
            style={styles.accordionItem}>
            <Text style={styles.accordionItemContentText}>{'Show All'}</Text>
          </TouchableOpacity>
        } */
      />
    );
  }

  _renderTabs = () => {
    const SelectedTabBar = TabBarVertical;
    return (
      <SelectedTabBar
        style={styles.tabbar}
        tabStyle={styles.tab}
        indicatorStyle={styles.indicator}
        scrollEnabled
      />
    );
  };

  render() {
    var cat_id = this.state.routes[this.state.index].cat_id;
    return (
      <>
        <BackHeader
          navigation={this.props.navigation}
          pagename={'Categories'}
          search={true}
          cart={true}
        />
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.4, flexDirection: 'column'}}>
            {this._renderTabBar()}
          </View>
          <View style={{flex: 0.6}}>{this._renderTabContent(cat_id)}</View>
        </View>
        {/*<TabView
          navigationState={this.state}
          renderScene={this._renderScene}
          renderTabBar={this._renderTabBar}
          onIndexChange={this._handleIndexChange}
        />
         <TabViewVertical
          initialLayout={initialLayout}
          renderTabBar={this._renderTabs}
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
        /> */}
      </>
    );
  }
}

CategoryScreen.navigationOptions = ({navigation}) => ({
  /* title: 'CATEGORY',
  headerStyle: Theme.headerStyle,
  headerTitleStyle: Theme.headerTitleStyle,
  headerLeft: <MenuButton navigation={navigation} />,
  headerRight: <SearchButton navigation={navigation} />, */
  header: null,
});

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ProductAction: bindActionCreators(ProductAction, dispatch),
    WhislistAction: bindActionCreators(WhislistAction, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryScreen);
