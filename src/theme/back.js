import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  backButton = () => {
    const backTo = this.props.backTo;
    if (!backTo) this.props.navigation.goBack();
    else this.props.navigation.navigate(backTo);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          this.backButton();
        }}>
        <Image
          style={styles.image}
          source={require('../assets/images/back_icon_enche.png')}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    );
  }
}
export default BackButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15,
  },
  image: {
    width: 22,
    height: 18,
  },
});
