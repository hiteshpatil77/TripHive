import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import MainView from '../../components/MainView';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Color';
import Input from '../../components/Input';
import {loginUser} from '../../api/apiService';
import {FS, HP, WP} from '../../utils/Dimention';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter email.');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(email);
      console.log('Login response:', response);

      // Check if response is successful
      if (response?.success) {
        // Store token if available
        if (response.token) {
          await AsyncStorage.setItem('token', response.token);
        }

        // Store user data if available
        if (response.user) {
          await AsyncStorage.setItem('userData', JSON.stringify(response.user));
          // console.log('response.data-=-=-=', response.user);
        }

        console.log('Login successful');
        navigation.navigate('BottomTab', {user: response.data});
      } else {
        Alert.alert(
          'Login Failed',
          response?.message || 'Something went wrong. Please try again.',
        );
      }
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert(
        'Login Failed',
        error.message || 'Unable to connect to server. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainView>
      <View style={{flex: 1, padding: HP(1), paddingHorizontal: HP(2)}}>
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
          <Input
            Place="Email"
            icon="user"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
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
          style={[styles.signInButton, loading && styles.disabledButton]}
          onPress={handleSignIn}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color={Colors.white} />
          ) : (
            <Text style={styles.signInText}>Sign In</Text>
          )}
        </TouchableOpacity>
      </View>
    </MainView>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    height: HP(6),
    width: WP(90),
    backgroundColor: Colors.Main,
    borderRadius: HP(1),
    marginVertical: HP(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  signInText: {
    fontSize: FS(2.5),
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default SignIn;
