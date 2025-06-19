import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {FS, HP, WP} from '../utils/Dimention';
import Fonts from '../theme/Fonts';
import Colors from '../theme/Color';

export default function CusButton({SecTag, navigation, NVT}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: HP(5),
          width: WP(42),
          backgroundColor: '#EBEBEB',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: HP(1),
          marginRight: HP(1),
          // marginHorizontal: WP(1),
        }}>
        <CustomText
          style={{
            fontSize: FS(1.6),
            // fontFamily: Fonts.,
            color: '#737373',
          }}
          children={'previous step'}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={NVT}
        style={{
          height: HP(5),
          width: WP(42),
          backgroundColor: Colors.trip,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: HP(1),
          marginLeft: WP(2),
        }}>
        <CustomText
          style={{
            fontSize: FS(1.6),
            color: '#fff',
            fontFamily: Fonts.MontserratBold,
          }}
          children={SecTag}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
