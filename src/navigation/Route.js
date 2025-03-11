import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/OnboarDing/Splash';
import FirstScreen from '../screens/OnboarDing/FirstScreen';
import Welcome from '../screens/Register/Welcome';
import SetupAccount from '../screens/Register/SetupAccount';
import CreatAcc from '../screens/Register/CreatAcc';
import ForgotPass from '../screens/Register/ForgotPass';
import OtpVer from '../screens/Register/OtpVer';
import otpVerify from '../screens/Register/CreatAcc';
import OtpVerify from '../screens/Register/OtpVer';
import SignIn from '../screens/Register/SignIn';
import BottomTabs from './BottomTab';

const Stack = createNativeStackNavigator();
export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SetupAccount" component={SetupAccount} />
        <Stack.Screen name="CreatAcc" component={CreatAcc} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="BottomTab" component={BottomTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
