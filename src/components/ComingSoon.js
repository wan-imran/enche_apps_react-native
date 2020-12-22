import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HeaderHome from './HeaderHome';

const ComingSoon = ({navigation}) => {
  return (
    <View>
      <HeaderHome navigation={navigation} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: '#71AD42',
            fontSize: 30,
            fontFamily: 'roboto',
            marginTop: 50,
          }}>
          Coming Soon!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ComingSoon;
