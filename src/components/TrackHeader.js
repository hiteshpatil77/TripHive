import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {FS, HP, WP} from '../utils/Dimention';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import Colors from '../theme/Color';
import Fonts from '../theme/Fonts';

export default function TrackHeader({navigation, tag}) {
  return (
    <View
      style={{
        height: HP(8),
        flexDirection: 'row',
        alignItems: 'center',
        width: WP(60),
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        style={{
          borderRadius: HP(2),
          backgroundColor: Colors.secondary,
          height: HP(4),
          width: HP(4),
          alignItems: 'center',
          justifyContent: 'center',
          left: WP(5),
        }}
        onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={20} color="#fff" />
      </TouchableOpacity>
      <CustomText style={styles.title}>{tag}</CustomText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: FS(2.8),
    color: Colors.secondary,
    marginLeft: WP(3),
    fontFamily: Fonts.MontserratBold,
  },
  card: {
    height: HP(20),
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: HP(1),
    alignSelf: 'center',
    marginTop: HP(2),
  },
});
