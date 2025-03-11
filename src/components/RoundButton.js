import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {HP} from '../utils/Dimention';
import Colors from '../theme/Color';

export default function RoundButton({onp}) {
  return (
    <TouchableOpacity onPress={onp} style={styles.registerButton}>
      <Icon name="arrowright" size={HP(2.5)} color={Colors.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  registerButton: {
    height: HP(5),
    width: HP(5),
    borderRadius: HP(5),
    backgroundColor: Colors.Main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
