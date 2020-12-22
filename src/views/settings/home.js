import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';

import Theme from '../../theme/style';
import BackButton from '../../theme/back';
import FormStyle from '../../theme/form';
const width = Dimensions.get('window').width;
import isIphoneX from '../../common/iphonex';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as CustomerAction from '../../redux/actions/customer';
import * as CurrentCustomer from '../../redux/actions/current-customer';
import fsManager from '../../common/fs-manager';
import * as types from '../../redux/types';
class SettingsProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: {
        nickname: null,
        first_name: null,
        last_name: null,
        billing_email: null,
        birthday: null,
        bio: null,
      },
    };
  }

  inputGroupChangeHandler = (e, name) => {
    this.setState({user: {...this.state.user, [name]: e}});
  };

  componentDidMount() {
    this.getUserMeta();
  }

  /**
   * Get user informations
   * Remote and local file.
   */
  async getUserMeta() {
    const cookie = await fsManager.getCookie();
    if (cookie === undefined) {
      return false;
    } else {
      const validateURL =
        'https://developer.enche.com/api/user/validate_auth_cookie/' +
        `?cookie=${cookie}`;
      fetch(validateURL)
        .then(res => res.json())
        .then(json => {
          if (json.status === 'ok' && json.valid === true) {
            const getUserMetaUrl =
              'https://developer.enche.com/api/user/get_user_meta' +
              `?cookie=${cookie}`;
            fetch(getUserMetaUrl, {method: 'POST'})
              .then(res => res.json())
              .then(json => {
                this.setState({loading: false});
                this.setState({
                  user: {...this.state.user, nickname: json.nickname},
                });
                this.setState({
                  user: {...this.state.user, first_name: json.first_name},
                });
                this.setState({
                  user: {...this.state.user, last_name: json.last_name},
                });
                this.setState({
                  user: {...this.state.user, billing_email: json.billing_email},
                });
                this.setState({
                  user: {...this.state.user, birthday: json.birthday},
                });
                this.setState({user: {...this.state.user, bio: json.bio}});
              })
              .catch(err => {
                this.setState({loading: false});
                console.log(err);
              });
          } else {
            this.setState({loading: false});
            console.log('cookie validation failed!');
          }
        })
        .catch(err => {
          this.setState({loading: false});
          console.log(err);
        });
    }
  }

  async save(key, value) {
    console.log(key);
    console.log(value);
    this.setState({loading: true});
    const cookievalue = await fsManager.getCookie();
    if (cookievalue === undefined) {
      return false;
    } else {
      const validateURL =
        'https://developer.enche.com/api/user/validate_auth_cookie/' +
        `?cookie=${cookievalue}`;
      fetch(validateURL)
        .then(res => res.json())
        .then(json => {
          if (json.status === 'ok' && json.valid === true) {
            const updateUserMetaUrl =
              'https://developer.enche.com/api/user/update_user_meta' +
              `?cookie=${cookievalue}` +
              `&meta_key=${key}&meta_value=${value}`;
            fetch(updateUserMetaUrl, {method: 'POST'})
              .then(res => res.json())
              .then(json => {
                console.log(json);
                const getUserMetaUrl =
                  'https://developer.enche.com/api/user/get_user_meta' +
                  `?cookie=${cookievalue}`;
                fetch(getUserMetaUrl, {method: 'POST'})
                  .then(res => res.json())
                  .then(json => {
                    this.setState({loading: false});
                    this.setState({
                      user: {...this.state.user, nickname: json.nickname},
                    });
                    this.setState({
                      user: {...this.state.user, first_name: json.first_name},
                    });
                    this.setState({
                      user: {...this.state.user, last_name: json.last_name},
                    });
                    this.setState({
                      user: {
                        ...this.state.user,
                        billing_email: json.billing_email,
                      },
                    });
                    this.setState({
                      user: {...this.state.user, birthday: json.birthday},
                    });
                    this.setState({user: {...this.state.user, bio: json.bio}});
                  })
                  .catch(err => {
                    this.setState({loading: false});
                    console.log(err);
                  });
              })
              .catch(err => {
                this.setState({loading: false});
                console.log(err);
              });
          } else {
            this.setState({loading: false});
            console.log('cookie validation failed!');
          }
        })
        .catch(err => {
          this.setState({loading: false});
          console.log(err);
        });
    }
  }

  changeAvatar() {}

  render() {
    const {customer} = this.props.currentCustomer;
    return (
      <>
        <View style={Styles.container}>
          {this.state.loading ? (
            <ActivityIndicator
              color="#000"
              size="small"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.2,
                backgroundColor: '#71AD42',
              }}
            />
          ) : null}
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={Styles.cameraButtonContainer}>
              <View
                style={[
                  FormStyle.formGroup,
                  FormStyle.formGroupLessPadd,
                  Styles.cameraButtonView,
                ]}>
                <Image
                  source={{uri: customer.avatar_url}}
                  style={Styles.profileImage}
                />
                <TouchableOpacity
                  onPress={() => {
                    this.changeAvatar();
                  }}
                  style={Styles.cameraButton}>
                  <Image
                    source={require('../../assets/images/ic_camera.png')}
                    style={Styles.cameraImage}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
              <TextInput
                placeholderTextColor={Theme.secondaryColor}
                placeholder={'Nickname'}
                value={this.state.user.nickname}
                autoCorrect={false}
                onChangeText={e => this.inputGroupChangeHandler(e, 'nickname')}
                onEndEditing={() => {
                  this.save('nickname', this.state.user.nickname);
                }}
                style={[FormStyle.input, FormStyle.inputWithoutIcon]}
              />
            </View>

            <View style={FormStyle.row}>
              <View style={FormStyle.col2}>
                <View
                  style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
                  <TextInput
                    placeholderTextColor={Theme.secondaryColor}
                    placeholder={'First Name'}
                    autoCorrect={false}
                    value={this.state.user.first_name}
                    onChangeText={e =>
                      this.inputGroupChangeHandler(e, 'first_name')
                    }
                    onEndEditing={() => {
                      this.save('first_name', this.state.user.first_name);
                    }}
                    style={[FormStyle.input, FormStyle.inputWithoutIcon]}
                  />
                </View>
              </View>
              <View style={FormStyle.col2}>
                <View
                  style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
                  <TextInput
                    placeholderTextColor={Theme.secondaryColor}
                    placeholder={'Last Name'}
                    value={this.state.user.last_name}
                    onChangeText={e =>
                      this.inputGroupChangeHandler(e, 'last_name')
                    }
                    onEndEditing={() => {
                      this.save('last_name', this.state.user.last_name);
                    }}
                    autoCorrect={false}
                    style={[FormStyle.input, FormStyle.inputWithoutIcon]}
                  />
                </View>
              </View>
            </View>

            <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
              <TextInput
                placeholderTextColor={Theme.secondaryColor}
                placeholder={'Email'}
                value={this.state.user.billing_email}
                onChangeText={e =>
                  this.inputGroupChangeHandler(e, 'billing_email')
                }
                onEndEditing={() => {
                  this.save('billing_email', this.state.user.billing_email);
                }}
                autoCorrect={false}
                style={[FormStyle.input, FormStyle.inputWithoutIcon]}
              />
            </View>

            <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
              <TextInput
                placeholderTextColor={Theme.secondaryColor}
                placeholder={'Birthday'}
                value={this.state.user.birthday}
                onChangeText={e => this.inputGroupChangeHandler(e, 'birthday')}
                onEndEditing={() => {
                  this.save('birthday', this.state.user.birthday);
                }}
                autoCorrect={false}
                style={[FormStyle.input, FormStyle.inputWithoutIcon]}
              />
            </View>

            <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
              <TextInput
                multiline
                placeholderTextColor={Theme.secondaryColor}
                placeholder={'Bio'}
                value={this.state.user.bio}
                onChangeText={e => this.inputGroupChangeHandler(e, 'bio')}
                onEndEditing={() => {
                  this.save('bio', this.state.user.bio);
                }}
                autoCorrect={false}
                style={[FormStyle.textarea, FormStyle.inputWithoutIcon]}
              />
            </View>

            {/* <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
            <TextInput
              placeholderTextColor={Theme.secondaryColor}
              placeholder={'Address Line 1'}
              value={customer.billing.address_1}
              autoCorrect={false}
              style={[FormStyle.input, FormStyle.inputWithoutIcon]}
            />
          </View>

          <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
            <TextInput
              placeholderTextColor={Theme.secondaryColor}
              placeholder={'Address Line 2'}
              value={customer.billing.address_2}
              autoCorrect={false}
              style={[FormStyle.input, FormStyle.inputWithoutIcon]}
            />
          </View>

          <View style={FormStyle.row}>
            <View style={FormStyle.col2}>
              <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
                <TextInput
                  placeholderTextColor={Theme.secondaryColor}
                  placeholder={'City'}
                  autoCorrect={false}
                  style={[FormStyle.input, FormStyle.inputWithoutIcon]}
                />
              </View>
            </View>
            <View style={FormStyle.col2}>
              <View style={[FormStyle.formGroup, FormStyle.formGroupLessPadd]}>
                <TextInput
                  placeholderTextColor={Theme.secondaryColor}
                  placeholder={'State'}
                  autoCorrect={false}
                  style={[FormStyle.input, FormStyle.inputWithoutIcon]}
                />
              </View>
            </View>
          </View> */}
          </ScrollView>

          {/* <View style={Styles.saveAndContinue}>
            <TouchableOpacity
              style={Styles.submitButton}
              onPress={() => {
                this.save(this.state.user);
              }}>
              <Text style={Styles.submitButtonText}>{'SUBMIT'}</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </>
    );
  }
}

SettingsProfile.navigationOptions = ({navigation}) => ({
  headerStyle: Theme.headerStyle,
  headerLeft: <BackButton navigation={navigation} />,
  headerTitleStyle: Theme.headerTitleStyle,
  title: 'PROFILE SETTINGS',
  headerRight: <View />,
});

function mapStateToProps(state) {
  return {
    currentCustomer: state.currentCustomer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    CurrentCustomer: bindActionCreators(CurrentCustomer, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsProfile);

const Styles = StyleSheet.create({
  saveAndContinue: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    width: width - 40,
  },
  submitButton: {
    borderRadius: 4,
    backgroundColor: Theme.primaryColor,
    height: isIphoneX() ? 80 : 50,
    justifyContent: isIphoneX() ? 'flex-start' : 'center',
    alignItems: 'center',
    paddingTop: isIphoneX() ? 20 : 0,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Theme.mediumFont,
    fontWeight: '600',
    lineHeight: 19,
    letterSpacing: 0.5,
    color: Theme.white,
  },
  container: {
    flex: 1,
    backgroundColor: Theme.backgroundColor,
    padding: 20,
  },
  cameraButtonView: {
    width: 100,
  },
  cameraImage: {
    width: 32,
    height: 32,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  cameraButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
});
