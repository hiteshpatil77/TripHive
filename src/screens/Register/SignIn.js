import React, {useState, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import MainView from '../../components/MainView';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Color';
import Input from '../../components/Input';
import {loginUser} from '../../api/apiService'; // Make sure this path is correct
import {FS, HP, WP} from '../../utils/Dimention';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    try {
      const [user] = await loginUser(email, password);
      console.log('Login successful:', user);
      navigation.navigate('BottomTab', {user});
    } catch (error) {
      console.error('Login failed:', error.message);
      Alert.alert('Login Failed', error.message);
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
            Place="Email or Phone"
            icon="user"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            iconType="SimpleLineIcons"
            Place="Password"
            icon="lock"
            eye={true}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
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

        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={{color: Colors.white}}>Sign In</Text>
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
  signInText: {
    fontSize: FS(2.5),
    fontWeight: 'bold',
    color: Colors.white,
  },
});

export default SignIn;
