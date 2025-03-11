import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import IconBar from './src/components/IconBar';
import Input from './src/components/Input';
import Splash from './src/screens/OnboarDing/Splash';
import FirstScreen from './src/screens/OnboarDing/FirstScreen';
import Route from './src/navigation/Route';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <Route />
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({});
