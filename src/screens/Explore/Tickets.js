import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Colors from '../../theme/Color';
import Fonts from '../../theme/Fonts';
import TrackHeader from '../../components/TrackHeader';
import Icons from '../../theme/Icons';

export default function Tickets({navigation}) {
  return (
    <View style={styles.container}>
      {/* Header section */}
      <TrackHeader navigation={navigation} tag={'Flights'} />
      <View
        style={{
          alignSelf: 'center',
          borderWidth: 1,
          height: HP(8),
          width: WP(60),
          borderRadius: HP(5),
          borderColor: '#E0E0E0',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
          children={'Delhi-Goa'}
        />
        <CustomText style={{fontSize: FS(2)}} children={'9Aug - 18Aug '} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: WP(3),
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: HP(2),
          width: WP(60),
        }}>
        <View style={styles.sort}>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'Sort'}
          />
          <TouchableOpacity>
            <Ionicons
              style={{left: WP(2)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.sort}>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'Filters'}
          />
          <TouchableOpacity>
            <Ionicons
              style={{left: WP(2)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          paddingHorizontal: HP(3.5),
          fontSize: FS(2.2),
          paddingTop: HP(2),
          fontFamily: Fonts.MontserratMedium,
        }}>
        Showing<Text style={{fontFamily: Fonts.MontserratBold}}> 4 of</Text>
        <Text style={{fontFamily: Fonts.MontserratBold, color: Colors.Main}}>
          {' '}
          257 flights
        </Text>
      </Text>
      {/* Main content */}
      <View style={styles.card}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={Icons.emirates}
            style={{resizeMode: 'contain', height: HP(4)}}
          />
          <Text
            style={{
              textAlign: 'right',
              marginHorizontal: HP(1),
              fontFamily: Fonts.MontserratMedium,
            }}>
            11:00{'\n'}DEL
          </Text>

          <View style={{alignItems: 'center', paddingHorizontal: WP(2)}}>
            <CustomText children={'0h 55'} />
            <View style={{borderWidth: 1, width: WP(30)}}></View>
            <CustomText children={'Direction'} />
          </View>
          <MaterialIcons
            name="flight"
            style={{
              right: WP(5),
              transform: [{rotate: '90deg'}],
              color: '#737373',
            }}
          />
          <Text
            style={{
              textAlign: 'left',
              marginHorizontal: HP(1),
              fontFamily: Fonts.MontserratMedium,
            }}>
            11:00{'\n'}JAI
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: FS(2.8),
    color: Colors.secondary,
    marginLeft: WP(3),
    fontFamily: Fonts.MontserratBold,
  },
  card: {
    height: HP(20),
    width: WP(90),
    // backgroundColor: 'red',
    borderRadius: HP(1),
    alignSelf: 'center',
    marginTop: HP(2),
    borderWidth: 2,
    borderColor: '#E0E0E0',
    opacity: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sort: {
    flexDirection: 'row',
    paddingLeft: WP(5),
    alignItems: 'center',
  },
});
