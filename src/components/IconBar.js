import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../utils/Dimention';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/Color';
import Icons from '../theme/Icons';
import Fonts from '../theme/Fonts';
export default function IconBar({icon, Color, name, onp, image}) {
  return (
    <TouchableOpacity
      onPress={onp}
      style={{
        justifyContent: 'center',
        borderWidth: 1,
        marginVertical: HP(1),
        width: WP(90),
        alignSelf: 'center',
        borderRadius: WP(2),
        borderColor: Colors.lightGray,
        height: HP(6),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: WP(3),
        }}>
        {image ? (
          <Image
            style={{resizeMode: 'contain', height: HP(5), width: WP(5)}}
            source={Icons.Google}></Image>
        ) : (
          <Icon name={icon} size={HP(2.6)} color={Color} />
        )}
        <Text
          style={{
            fontSize: FS(1.8),
            marginHorizontal: WP(3),
            fontFamily: Fonts.Regular,
            marginTop: HP(0.5),
          }}>
          Register Using {name}
        </Text>
        {/* <Feather name="eye" size={HP(2.6)} color="red" /> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
