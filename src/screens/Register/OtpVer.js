import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import Toast from 'react-native-toast-message';
import {useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import Colors from '../../theme/Color';
import MainView from '../../components/MainView';
import Icon from 'react-native-vector-icons/AntDesign';
import RoundButton from '../../components/RoundButton';
import Fonts from '../../theme/fonts';

const OtpVerify = ({navigation, route}) => {
  // const {email} = route.params;
  // const [verificationCode, setOtp] = useState(new Array(5).fill('').join(''));

  // const handleVerifyOtp = async () => {
  //   try {
  //     const response = await apiCalls.emailVerification(
  //       email,
  //       verificationCode,
  //     );
  //     console.log('resposns otp -=>', response);

  //     if (response.status === 'success') {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Verification Successful',
  //         text2: 'Your account is now verified!',
  //       });
  //       navigation.navigate('BottomTab'); // Navigate to Home screen
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Invalid OTP',
  //         text2: 'Please enter the correct code.',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('OTP verification error:', error);
  //   }
  // };

  const handelOtp = () => {
    navigation.navigate('SetupAccount');
  };

  return (
    <MainView>
      <TouchableOpacity
        style={{margin: HP(1)}}
        onPress={() => navigation.goBack()}>
        <Icon name="left" size={HP(3)} color="black" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Code</Text>
        <Text style={styles.subtitle}>
          We have sent the code verification to your mobile number
        </Text>
        {/* <Text style={{fontSize: FS(2), marginVertical: HP(1)}}>{email}</Text> */}
        <OtpInputs
          // handleChange={setOtp}
          numberOfInputs={5}
          style={styles.otpContainer}
          inputStyles={styles.otpInput}
        />
      </View>
      <View style={{padding: WP(5), alignItems: 'flex-end'}}>
        <RoundButton onp={handelOtp} />
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    alignItems: 'center',
    padding: HP(5),
    justifyContent: 'center',
  },
  title: {
    fontSize: FS(4),
    color: Colors.black,
    fontWeight: 'bold',
    letterSpacing: 1,
    fontFamily: Fonts.Regular,
  },
  subtitle: {
    fontSize: FS(2),
    color: '#555',
    textAlign: 'center',
    marginVertical: HP(1),
    fontFamily: Fonts.Regular,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WP(80),
    marginVertical: HP(2),
  },
  otpInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: Colors.Main,
    width: WP(12),
    height: HP(7),
    textAlign: 'center',
    borderRadius: WP(1),
    keyboardType: 'numeric',
  },
  resendText: {
    fontWeight: '800',
    color: Colors.main,
    marginTop: HP(0.5),
  },
  button: {
    backgroundColor: Colors.Main,
    paddingVertical: HP(1.5),
    paddingHorizontal: WP(20),
    borderRadius: WP(2),
    marginTop: HP(2),
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: FS(2),
  },
  registerButton: {
    height: HP(6),
    width: HP(6),
    borderRadius: HP(5),
    backgroundColor: Colors.Main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OtpVerify;
