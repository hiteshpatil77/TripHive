import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Route from './src/navigation/Route';
import Toast from 'react-native-toast-message';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Route />
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
