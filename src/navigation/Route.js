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
import OtpVerify from '../screens/Register/OtpVer';
import SignIn from '../screens/Register/SignIn';
import BottomTab from './BottomTab';
import CreatTrip from '../screens/TripScreen/CreatTrip';
import Flexible from '../screens/TripScreen/Flexible';
import FixedDates from '../screens/TripScreen/FixedDates';
import AiPlanner from '../screens/TripScreen/AiPlanner';
import InviteFriend from '../screens/TripScreen/InviteFriend';
import Overview from '../screens/TripScreen/Overview';
import BachelorsTrip from '../screens/TripScreen/BacheresTrip';
import AddExpense from '../screens/Expenses/AddExpense';
import Tickets from '../screens/Explore/Tickets';
import FlightBookingScreen from '../screens/Explore/FlightScreen';
import Stays from '../screens/Explore/Stays';
import BookTrip from '../screens/Explore/BookTrip';

const Stack = createNativeStackNavigator();
export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SetupAccount" component={SetupAccount} />
        <Stack.Screen name="CreatAcc" component={CreatAcc} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="OtpVerify" component={OtpVerify} />
        <Stack.Screen name="BottomTab" component={BottomTab} />
        <Stack.Screen name="CreatTrip" component={CreatTrip} />
        <Stack.Screen name="Flexible" component={Flexible} />
        <Stack.Screen name="FixedDates" component={FixedDates} />
        <Stack.Screen name="AiPlanner" component={AiPlanner} />
        <Stack.Screen name="InviteFriend" component={InviteFriend} />
        <Stack.Screen name="BachelorsTrip" component={BachelorsTrip} />
        <Stack.Screen name="Overview" component={Overview} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="Tickets" component={Tickets} />
        <Stack.Screen name="Flight" component={FlightBookingScreen} />
        <Stack.Screen name="Stays" component={Stays} />
        <Stack.Screen name="BookTrip" component={BookTrip} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
