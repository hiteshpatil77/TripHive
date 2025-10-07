import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';

export default function DayWise() {
  return (
    <View
      style={{
        flex: 1,
        width: WP(90),
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: WP(90),
          marginLeft: WP(10),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          style={{
            height: HP(2.5),
            width: HP(2.5),
            backgroundColor: '#C3C3C3',
            borderRadius: HP(3),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name={'chevron-left'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <CustomText style={{fontSize: FS(2)}} children={'Day 1'} />
          <CustomText
            style={{
              fontSize: FS(2),
              color: '#363636',
              fontFamily: Fonts.MontserratSemiBold,
            }}
            children={'Delhi'}
          />
          <View style={{flexDirection: 'row'}}>
            <CustomText
              style={{
                fontSize: FS(1.8),
                color: '#FFA015',
                fontFamily: Fonts.MontserratSemiBold,
                marginHorizontal: WP(2),
              }}
              children={'Saturday'}
            />
            <CustomText
              style={{
                fontSize: FS(1.8),
                color: '#363636',
                fontFamily: Fonts.MontserratSemiBold,
              }}
              children={'28 Mar 2025'}
            />
          </View>
        </View>
        <TouchableOpacity
          // onPress={() => navigation.goBack()}
          style={{
            height: HP(2.5),
            width: HP(2.5),
            backgroundColor: '#4955E6',
            borderRadius: HP(3),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Entypo name={'chevron-right'} size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
