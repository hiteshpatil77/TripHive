import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import ExploreScreen from '../screens/BottomScreen/ExploreScreen';
import ExpensesScreen from '../screens/BottomScreen/ExpensesScreen';
import {FS, HP, WP} from '../utils/Dimention';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlightScreen from '../screens/Explore/FlightScreen';
import AddExpense from '../screens/Expenses/AddExpense';
import ShowSplit from '../screens/Expenses/ShowSplit';
import SignleExpense from '../screens/Expenses/SignleExpense';
import TripDetails from '../screens/Expenses/TripDetails';
import TripScreen from '../screens/BottomScreen/TripScreen';
import AddFreind from '../screens/Expenses/AddFriends';
import {Image, Text, View} from 'react-native';
import Icons from '../theme/Icons';
import Friends from '../screens/Expenses/Friends';
import AddFriends from '../screens/Expenses/AddFriends';
import CreateGroup from '../screens/Expenses/CreateGroup';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Explore = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        presentation: 'card',
        cardStyle: {backgroundColor: 'white'},
        cardOverlayEnabled: false,
        animationDuration: 200,
      }}>
      <Stack.Screen name="ExploreScreen" component={ExploreScreen} />
      {/* <Stack.Screen name="Flight" component={FlightScreen} /> */}
    </Stack.Navigator>
  );
};
const Trip = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        presentation: 'card',
        cardStyle: {backgroundColor: 'white'},
        cardOverlayEnabled: false,
        animationDuration: 200,
      }}>
      <Stack.Screen name="TripScreen" component={TripScreen} />
    </Stack.Navigator>
  );
};

const Expenses = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        presentation: 'card',
        cardStyle: {backgroundColor: 'white'},
        cardOverlayEnabled: false,
        animationDuration: 200,
      }}>
      <Stack.Screen name="ExploreScreen" component={ExpensesScreen} />
      <Stack.Screen name="ShowSplit" component={ShowSplit} />
      <Stack.Screen name="SignleExpense" component={SignleExpense} />
      <Stack.Screen name="TripDetails" component={TripDetails} />
      <Stack.Screen
        name="AddFriends"
        component={AddFriends}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={CreateGroup}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen name="Friends" component={Friends} />
    </Stack.Navigator>
  );
};

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        animation: 'fade',
        animationDuration: 200,
        tabBarStyle: {
          borderRadius: HP(3),
          margin: HP(5),
          height: HP(8),
          position: 'absolute',
          marginBottom: HP(3),
          bottom: HP(-1),
          backgroundColor: '#fff',
          width: WP(80),
          // ✅ No shadow at all
          elevation: 0, // Android
          shadowOpacity: 0, // iOS
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 0,
        },
        tabBarBackground: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: HP(3),
              // elevation: 3, // Android
              shadowOpacity: 2, // iOS
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 0,
              // opacity: 100,
            }}
          />
        ),
        headerShown: false,
        tabBarHideOnKeyboard: true,
        lazy: false,
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Explore') {
            return (
              <Image
                source={Icons.Home}
                style={{
                  height: HP(4),
                  width: WP(4.5),
                  tintColor: focused ? '#3b49df' : '#b0b0b0',
                  resizeMode: 'contain',
                  marginTop: HP(0.5),
                }}
              />
            );
          } else if (route.name === 'Trips') {
            return (
              <Image
                source={Icons.Trip}
                style={{
                  height: HP(4),
                  width: WP(4.5),
                  tintColor: focused ? '#3b49df' : '#b0b0b0',
                  resizeMode: 'contain',
                  marginTop: HP(0.5),
                }}
              />
            );
          } else if (route.name === 'Expenses') {
            return (
              <Image
                source={Icons.Expenses}
                style={{
                  marginTop: HP(0.5),
                  height: HP(4),
                  width: WP(4.5),
                  tintColor: focused ? '#3b49df' : '#b0b0b0',
                  resizeMode: 'contain',
                }}
              />
            );
          } else if (route.name === 'Chat') {
            return (
              <Icon
                name="chat-processing"
                size={24}
                color={focused ? '#3b49df' : '#ADADAD'}
              />
            );
          }
        },
        tabBarLabel: ({focused}) => {
          return (
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: FS(1.4),
                  fontWeight: focused ? '600' : '400',
                  color: focused ? '#3b49df' : '#ADADAD',
                }}>
                {route.name}
              </Text>
              {focused && (
                <View
                  style={{
                    width: WP(3),
                    height: HP(0.5),
                    backgroundColor: '#FC7916', // Dot color
                    borderRadius: HP(1),
                    marginTop: HP(0.3),
                  }}
                />
              )}
            </View>
          );
        },
        tabBarLabelStyle: {
          fontSize: FS(1.4),
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#3b49df',
        tabBarInactiveTintColor: '#b0b0b0',
      })}
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}>
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          unmountOnBlur: false,
        }}
      />
      <Tab.Screen
        name="Trips"
        component={Trip}
        options={{
          unmountOnBlur: false,
        }}
      />
      <Tab.Screen
        name="Expenses"
        component={Expenses}
        options={{
          unmountOnBlur: false,
        }}
      />
    </Tab.Navigator>
  );
}
