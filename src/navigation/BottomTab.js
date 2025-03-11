import React from 'react';
import {View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ExploreScreen from '../screens/BottomScreen/ExploreScreen';
import TripsScreen from '../screens/BottomScreen/TripsScreen';
import ExpensesScreen from '../screens/BottomScreen/ExpensesScreen';
import ChatScreen from '../screens/BottomScreen/ChatScreen';
import {HP} from '../utils/Dimention';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {
          borderRadius: 20,
          margin: 10,
          borderWidth: 1,
          borderColor: '#007bff',
          height: HP(7),
          position: 'absolute',
          marginBottom: HP(3),
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Explore') {
            iconName = 'home';
          } else if (route.name === 'Trips') {
            iconName = 'bag-suitcase';
          } else if (route.name === 'Expenses') {
            iconName = 'currency-usd';
          } else if (route.name === 'Chat') {
            iconName = 'chat-processing';
          }
          return (
            <Icon
              name={iconName}
              size={24}
              color={focused ? '#3b49df' : '#b0b0b0'}
            />
          );
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#3b49df',
        tabBarInactiveTintColor: '#b0b0b0',
        headerShown: false,
      })}>
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Trips" component={TripsScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
