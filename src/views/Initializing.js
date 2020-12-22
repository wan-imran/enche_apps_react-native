import React, {Component} from 'react';
import {Spinner} from 'native-base';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import I18n from '../views/language/I18n';

class Initializing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this._setLanguage();
  }

  async _setLanguage() {
    const lang = await AsyncStorage.getItem('lang');
    I18n.locale = lang;
    console.log(lang);
    this.props.navigation.navigate('Authorized');
  }

  render() {
    return (
      <View style={styles.loading}>
        <Spinner color={'#FE9B02'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Initializing;
