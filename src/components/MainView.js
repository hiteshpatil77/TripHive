import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../theme/Color';

export default function MainView({children}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
