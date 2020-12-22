import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Item, Input, Icon, Switch} from 'native-base';

const SearchHome = ({navigation}) => {
  return (
    <View>
      <Item
        style={styles.searchBar}
        onPress={() => navigation.navigate('SearchScreen')}>
        <Input
          editable={false}
          placeholder="Search for product, brand or shop"
          placeholderTextColor={'#fff'}
          style={{
            marginLeft: 10,
            fontWeight: '100',
            color: 'black',
            fontSize: 13,
          }}
          onChangeText={e => this.props.searchAction({query_s: e})}
        />
        <Icon
          onPress={() => navigation.navigate('SearchScreen')}
          type="EvilIcons"
          name="search"
          style={{fontSize: 30, color: '#FFF'}}
        />
      </Item>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: '#71AD42',
    marginLeft: '3%',
    marginRight: '3%',
    marginTop: 10,
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 0,
    borderWidth: 2,
  },
});

export default SearchHome;
