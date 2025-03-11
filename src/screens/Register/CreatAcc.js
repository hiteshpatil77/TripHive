import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainView from '../../components/MainView';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/Color';
import Input from '../../components/Input';
import Icons from '../../theme/Icons';
import Toast from 'react-native-toast-message';
import RoundButton from '../../components/RoundButton';
import Fonts from '../../theme/fonts';

export default function CreatAcc({navigation}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  console.log('name-=-=', name);

  const handleRegister = () => {
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid email address.',
      });
      return;
    }

    // Phone Number Validation (Exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter a valid 10-digit phone number.',
      });
      return;
    }

    if (!name || !phone || !email || !password || !confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'All fields are required.',
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match.',
      });
      return;
    }

    if (!isChecked) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'You must agree to the Terms & Conditions.',
      });
      return;
    }

    // Proceed with registration logic
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Account created successfully!',
    });

    navigation.navigate('OtpVerify'); // Navigate to Home or desired screen
  };

  return (
    <MainView>
      <View style={{padding: HP(1), flex: 1}}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={HP(3)} color="black" />
          </TouchableOpacity>
          <View style={{alignItems: 'center', marginTop: HP(4)}}>
            <Text
              style={{
                fontSize: FS(4),
                fontWeight: 'bold',
                fontFamily: Fonts.Regular,
              }}>
              Create an Account
            </Text>
            <Text
              style={{
                fontSize: FS(2),
                textAlign: 'center',
                marginTop: HP(2),
                color: Colors.gray,
                fontFamily: Fonts.Regular,
              }}>
              Enter your details below to create an account.
            </Text>
          </View>
          <View style={{marginTop: HP(2)}}>
            <Input
              Place="Enter Name"
              icon="user"
              value={name}
              onChangeText={setName}
            />
            <Input
              Place="Enter Phone Number"
              icon="phone-call"
              iconType="Feather"
              value={phone}
              onChangeText={setPhone}
            />
            <Input
              Place="Enter Email"
              icon="mail-outline"
              iconType="Ionicons"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              Place="Enter Password"
              icon="lock"
              iconType="SimpleLineIcons"
              eye={true}
              value={password}
              onChangeText={setPassword}
            />
            <Input
              Place="Confirm Password"
              icon="lock"
              iconType="SimpleLineIcons"
              eye={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: HP(2),
              marginLeft: HP(1),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setIsChecked(!isChecked)}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons
                name={isChecked ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <Text style={{marginLeft: HP(1), fontFamily: Fonts.Regular}}>
              I agree with the{' '}
              <Text style={{color: Colors.Main, fontFamily: Fonts.Regular}}>
                {' '}
                Terms & Conditions
              </Text>
            </Text>
          </View>
          <View
            style={{
              marginVertical: HP(1),
              borderWidth: 0.5,
              width: WP(70),
              alignSelf: 'center',
              marginTop: HP(2),
            }}></View>
          <Text
            style={{
              width: WP(35),
              backgroundColor: Colors.white,
              alignSelf: 'center',
              textAlign: 'center',
              bottom: HP(2.3),
              color: Colors.gray,
              fontFamily: Fonts.Regular,
            }}>
            Or Register With
          </Text>
          <View style={{flexDirection: 'row', alignSelf: 'center', flex: 0.7}}>
            <TouchableOpacity style={styles.socialButton}>
              <EvilIcons
                style={{bottom: HP(0.5)}}
                size={HP(4.5)}
                name="sc-facebook"
                color={Colors.SkipButton}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon size={HP(3)} name="apple1" color={Colors.black} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={Icons.Google}
                style={{height: HP(5), width: WP(7), resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: HP(2),
              alignItems: 'center',
              justifyContent: 'space-between',
              width: WP(90),
              alignSelf: 'center',
            }}>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
              <Text style={{fontFamily: Fonts.Regular}}>Sign In</Text>
            </TouchableOpacity>
            <RoundButton onp={() => navigation.navigate('OtpVerify')} />
          </View>
        </View>
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  socialButton: {
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HP(1),
    marginHorizontal: HP(1),
    height: HP(6),
    width: HP(6),
  },
});
