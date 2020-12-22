import React, {Component} from 'react';
import {View, StyleSheet, Dimensions, FlatList} from 'react-native';
import {
  Header,
  Left,
  Right,
  Body,
  Button,
  Text,
  Icon,
  ListItem,
} from 'native-base';

const listData = [
  {
    name: 'About Us',
    navigation: 'About',
  },
  {
    name: 'About Enchepreneur',
    navigation: 'AboutEnchepreneur',
  },

  {
    name: 'Enche CSR Policy',
    navigation: 'CSRPolicy',
  },
  {
    name: 'Term of Use',
    navigation: 'TermOfUse',
  },
  {
    name: 'Terms & Conditions',
    navigation: 'TermsAndConditions',
  },
  {
    name: 'IPR',
    navigation: 'IPR',
  },
  {
    name: 'Help & Support',
    navigation: 'HelpAndSupport',
  },
  {
    name: 'How to Buy',
    navigation: 'HowToBuy',
  },
  {
    name: 'Shipping & Delivery',
    navigation: 'ShippingAndDelivery',
  },
  {
    name: 'Refund Policy',
    navigation: 'RefundPolicy',
  },
  {
    name: 'FAQ for Merchant',
    navigation: 'FAQMerchant',
  },
  {
    name: 'FAQ for Buyer',
    navigation: 'FAQBuyer',
  },
];

class StaticHome extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFF'}}>
        <Header
          style={[styles.headView, {backgroundColor: '#71A942'}]}
          androidStatusBarColor="#71A942">
          <Left style={{flex: 1, alignSelf: 'flex-start'}}>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon
                type="Entypo"
                name="chevron-left"
                style={{fontSize: 35, marginTop: 10, color: '#DFDFDF'}}
              />
            </Button>
          </Left>
          <Body style={styles.headBody}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 28,
                fontWeight: 'bold',
                color: '#DFDFDF',
              }}>
              About Us
            </Text>
          </Body>

          <Right style={{flex: 1}} />
        </Header>

        <FlatList
          style={styles.container}
          showsVerticalScrollIndicator={false}
          data={listData}
          key={item => item.id.toString()}
          renderItem={({item}) => (
            <ListItem
              style={{padding: 10}}
              button={true}
              onPress={() => {
                this.props.navigation.navigate(item.navigation);
              }}>
              <Left>
                <Text style={{color: '#71A942', fontSize: 20}}>
                  {item.name}
                </Text>
              </Left>
              <Right>
                <Icon
                  type="Entypo"
                  name="chevron-right"
                  style={{fontSize: 30, color: '#D3D3D3'}}
                />
              </Right>
            </ListItem>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headView: {
    height: 150,
    width: Dimensions.get('window').width,
  },
  headBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -30,
    backgroundColor: '#FFF',
  },
});

StaticHome.navigationOptions = ({navigation}) => ({
  header: null,
});

export default StaticHome;
