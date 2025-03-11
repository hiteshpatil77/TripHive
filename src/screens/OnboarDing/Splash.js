import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import Icons from '../../theme/Icons';
import Colors from '../../theme/Color';
import {HP, WP} from '../../utils/Dimention';

const Splash = ({navigation}) => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;

  const checkTokenAndNavigate = async () => {
    // const token = await AsyncStorage.getItem('fcmToken');
    // console.log('FCM-=-1=', token);
    // // const profileData = await AsyncStorage.getItem('profileData');
    // // console.log('Token:', token);
    // // console.log('Profile Data:', profileData);

    navigation.navigate('FirstScreen');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkTokenAndNavigate();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container]}>
      <Image
        style={{
          height: HP(89),
          width: WP(100),
          resizeMode: 'contain',
          top: HP(1),
        }}
        source={Icons.Splash1}></Image>
      <Image
        style={{
          position: 'absolute',
          resizeMode: 'contain',
          height: HP(20),
          bottom: HP(38),
        }}
        source={Icons.Splash}></Image>
      <View style={{flex: 0.9, justifyContent: 'center', alignItems: 'center'}}>
        <Animated.Image
          style={[
            {height: HP(20), width: HP(20), top: 120, resizeMode: 'contain'},
            {
              transform: [
                {
                  translateY: translateYAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              ],
            },
          ]}
          source={Icons.MainLogo}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
});

export default Splash;
