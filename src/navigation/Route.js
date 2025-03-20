import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/OnBoarding/Splash';
import FirstScreen from '../screens/OnBoarding/FirstScreen';
import Welcome from '../screens/Register/Welcome';
import SetupAccount from '../screens/Register/SetupAccount';
import CreatAcc from '../screens/Register/CreatAcc';
import ForgotPass from '../screens/Register/ForgotPass';
import OtpVer from '../screens/Register/OtpVer';
import otpVerify from '../screens/Register/CreatAcc';
import OtpVerify from '../screens/Register/OtpVer';
import SignIn from '../screens/Register/SignIn';
import BottomTabs from './BottomTab';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator();
export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='BottomTab' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SetupAccount" component={SetupAccount} />
        <Stack.Screen name="CreatAcc" component={CreatAcc} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
