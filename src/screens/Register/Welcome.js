import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MainView from '../../components/MainView';
import {FS, HP, WP} from '../../utils/Dimention';
import Colors from '../../theme/Color';
import IconBar from '../../components/IconBar';
import Icon from 'react-native-vector-icons/AntDesign';
import RoundButton from '../../components/RoundButton';
import Fonts from '../../theme/fonts';

export default function Welcome({navigation}) {
  return (
    <MainView>
      <View style={{padding: HP(2), flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 0.9, alignItems: 'center'}}>
          <View style={{alignItems: 'center'}}>
            <Text
              style={{
                fontSize: FS(4),
                fontWeight: 'bold',
                fontFamily: Fonts.Regular,
              }}>
              Let's Get Started
            </Text>
            <Text
              style={{
                fontSize: FS(2),
                textAlign: 'center',
                marginTop: HP(2),
                color: Colors.gray,
                fontFamily: Fonts.Regular,
              }}>
              Lorem ipsum dolor sit amet,consectetur adipiscing eit.
            </Text>
          </View>
          <View style={{marginTop: HP(4), flex: 1}}>
            <IconBar
              onp={() => navigation.navigate('CreatAcc')}
              Color={Colors.Main}
              icon={'mail'}
              name={'Email'}
            />
            <IconBar icon={'apple1'} name={'Email'} />
            <IconBar image={true} name={'Email'} />
            <IconBar
              Color={Colors.SkipButton}
              icon={'facebook-square'}
              name={'Email'}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: HP(2),
              alignItems: 'center',
              justifyContent: 'space-between',
              width: WP(90),
              flex: 0.1,
              top: HP(2),
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{fontFamily: Fonts.Regular}}>Sign In</Text>
            </TouchableOpacity>
            <RoundButton onp={() => navigation.navigate('CreatAcc')} />
          </View>
        </View>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({});
