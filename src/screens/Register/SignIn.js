import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainView from '../../components/MainView';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Color';
import Input from '../../components/Input';
import Fonts from '../../theme/fonts';

export default function SignIn({navigation}) {
  const handelSignIn = () => {
    // navigation.navigate('BottomTab');
  };

  return (
    <MainView>
      <View style={{flex: 1, padding: HP(1), paddingHorizontal: HP(2)}}>
        {/* <Image
          style={{
            height: HP(130),
            width: WP(100),
            position: 'absolute',
            resizeMode: 'contain',
            tintColor: Colors.lightGray,
          }}
          source={Icons.plane}></Image> */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={HP(3)} color="black" />
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginVertical: HP(4)}}>
          <Text
            style={{
              fontSize: FS(4),
              fontWeight: 'bold',
              fontFamily: 'Montserrat-Black',
            }}>
            Sign In
          </Text>
        </View>
        <View>
          <Input Place={'Email or Phone'} icon={'user'} />
          <Input
            iconType="SimpleLineIcons"
            Place={'Password'}
            icon={'lock'}
            eye={true}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPass')}
            style={{}}>
            <Text
              style={{
                alignSelf: 'flex-end',
                fontWeight: '800',
                color: Colors.Main,
                marginVertical: HP(1),
              }}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handelSignIn}
          style={{
            height: HP(6),
            width: WP(90),
            backgroundColor: Colors.Main,
            borderRadius: HP(1),
            marginVertical: HP(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: FS(2.5),
              fontWeight: 'bold',
              color: Colors.white,
            }}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({});
