import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import RNRestart from 'react-native-restart';
import Theme from '../../theme/style';
import BackButton from '../../theme/back';
import styles from '../profile/style';
import I18n from './I18n';

class Language extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: [
        {key: 'en', label: 'English(default)'},
        {key: 'fr', label: 'French'},
        {key: 'hi', label: 'Hindi'},
        {key: 'Ar', label: 'Arabi'},
      ],
    };
  }

  set = async language => {
    await AsyncStorage.setItem('lang', language);
    I18n.locale = language;
    RNRestart.Restart();
    /* StringsOfLanguages.setLanguage(language);
    AsyncStorage.setItem('lang', language);
    this.setState({}); */
    //this.props.navigation.navigate('HomeScreen');
    //RNRestart.Restart();
  };

  render() {
    return (
      <View style={[styles.container, {paddingTop: 15}]}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('en')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/united-states-of-america.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'English'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('hi')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/india.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Hindi'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('fr')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/france.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'French'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('ar')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/united-states-of-america.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Arabic'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            {/*<TouchableOpacity
              style={styles.button}
              onPress={() => this.set('ch')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/china.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'中文'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('jp')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/japan.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'日本の'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('de')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/germany.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Deutsch'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('fr')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/france.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Français'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('in')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/india.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'हिन्दी'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('it')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/italy.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'İtaliano'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('sp')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/spain.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Spanish'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.set('tr')}>
              <View style={styles.buttonLf}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/turkey.png')}
                  style={[styles.bicon1, styles.bicon11]}
                />
                <Text style={[styles.btext, styles.btext22]}>{'Türkçe'}</Text>
              </View>
              <View style={styles.buttonRg}>
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/ic_arrow_right.png')}
                  style={styles.bicon}
                />
              </View>
            </TouchableOpacity>*/}
          </View>
        </ScrollView>
      </View>
    );
  }
}

Language.navigationOptions = ({navigation}) => ({
  headerStyle: Theme.headerStyle,
  headerLeft: <BackButton navigation={navigation} />,
  headerTitleStyle: Theme.headerTitleStyle,
  title: 'LANGUAGE',
  headerRight: <View />,
});

export default Language;
