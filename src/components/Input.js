import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {FS, HP, WP} from '../utils/Dimention';
import Colors from '../theme/Color';
import Feather from 'react-native-vector-icons/Feather';
import Fonts from '../theme/Fonts';

// Dynamically import vector icons
const getIconComponent = iconType => {
  switch (iconType) {
    case 'AntDesign':
      return require('react-native-vector-icons/AntDesign').default;
    case 'MaterialIcons':
      return require('react-native-vector-icons/MaterialIcons').default;
    case 'FontAwesome':
      return require('react-native-vector-icons/FontAwesome').default;
    case 'Feather':
      return require('react-native-vector-icons/Feather').default;
    case 'Ionicons':
      return require('react-native-vector-icons/Ionicons').default;
    case 'SimpleLineIcons':
      return require('react-native-vector-icons/SimpleLineIcons').default;
    default:
      return require('react-native-vector-icons/AntDesign').default;
  }
};

export default function Input({
  icon,
  iconType = 'AntDesign',
  Place,
  onChangeText,
  value,
  eye,
}) {
  const [secureText, setSecureText] = useState(true);
  const IconComponent = getIconComponent(iconType);
  console.log('Email=-=-', value);

  return (
    <View
      style={{
        justifyContent: 'center',
        borderWidth: 1,
        marginVertical: HP(0.6),
        width: WP(90),
        alignSelf: 'center',
        borderRadius: WP(2),
        borderColor: Colors.Main,
        height: HP(6),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: WP(3),
        }}>
        <IconComponent name={icon} size={HP(2.6)} color={Colors.Main} />
        <TextInput
          placeholder={Place}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={eye && secureText}
          style={{
            width: WP(65),
            marginLeft: HP(0.7),
            color: Colors.black,
            fontFamily: Fonts.Regular,
            marginTop: HP(0.5),
          }}
        />
        {eye && (
          <TouchableOpacity onPress={() => setSecureText(!secureText)}>
            <Feather name={secureText ? 'eye-off' : 'eye'} size={HP(2.6)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
