import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../utils/Dimention';
import Icons from '../theme/Icons';
import CustomText from './CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../theme/Fonts';

export default function TripHeader({hearder, isVisible, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: WP(90),
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: HP(3.5),
          width: HP(3.5),
          backgroundColor: '#4955E6',
          borderRadius: HP(3),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Entypo name={'chevron-left'} size={25} color={'#fff'} />
      </TouchableOpacity>
      <CustomText
        style={{
          fontFamily: Fonts.MontserratExtraBold,
          fontSize: FS(2),
          color: '#4955E6',
        }}>
        {hearder}
      </CustomText>

      {isVisible ? (
        <TouchableOpacity>
          <Image
            style={{height: HP(3.2), width: HP(3.2), resizeMode: 'contain'}}
            source={Icons.Setting}></Image>
        </TouchableOpacity>
      ) : (
        <View style={{height: HP(5), width: WP(5)}}></View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
