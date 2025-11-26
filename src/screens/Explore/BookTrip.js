import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Fonts from '../../theme/Fonts';
import Icons from '../../theme/Icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackHeader from '../../components/TrackHeader';
import StaysCus from '../../components/modal/StaysCus';
import RoomGuestModal from '../../components/modal/StaytravelerModal';
export default function BookTrip({navigation}) {
  const [visible, setVisible] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestInfo, setGuestInfo] = useState({
    rooms: 1,
    adults: 2,
    children: 0,
    pets: false,
  });
  const PreviousSearch = [
    {
      id: '1',
      name: 'Mumbai',
      date: '24-26 Jan',
      passenger: '2 Adults',
      image: Icons.city,
    },
    {
      id: '2',
      name: 'Maldives',
      date: '24-26 Jan',
      passenger: '2 Adults',
      image: Icons.island,
    },
  ];
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TrackHeader navigation={navigation} tag={'Stays'} />
      <View
        style={{
          height: HP(37),
          backgroundColor: '#EBEBEB',
          borderRadius: HP(2),
          padding: HP(2),
          width: WP(90),
          alignSelf: 'center',
          marginTop: HP(2),
        }}>
        <View>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'Going to'}
          />
          <TextInput
            style={styles.inputnew}
            placeholder="City"
            placeholderTextColor={'#737373'}
          />
          {/* <TouchableOpacity
            style={{
              position: 'absolute',
              right: WP(2),
              top: HP(9.6),
              zIndex: 1,
            }}>
            <Image
              source={Icons.UpDown}
              style={{
                alignSelf: 'flex-end',
                height: HP(3.5),
                width: WP(8),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity> */}
        </View>

        <CustomText
          children={'Dates'}
          style={{
            marginTop: HP(2),
            fontFamily: Fonts.MontserratBold,
            fontSize: FS(2),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              height: HP(6),
              width: WP(35),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText children={'Check-In'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              height: HP(6),
              width: WP(35),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText children={'Check-Out'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(52),
          }}>
          <CustomText
            children={'Travellers'}
            style={{
              marginTop: HP(2),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => setShowGuestModal(true)}
            style={{
              height: HP(6),
              width: WP(82),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              justifyContent: 'center',
              paddingLeft: HP(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <CustomText children={`${guestInfo.rooms} Room - `} />
            <CustomText children={`${guestInfo.adults} Adults - `} />
            <CustomText children={`${guestInfo.children} Children`} />
            {guestInfo.pets && <CustomText children={' - Pets'} />}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tickets')}
        style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <View style={{paddingLeft: HP(3)}}>
        <CustomText
          children={'Previous Search'}
          style={{
            marginTop: HP(3),
            fontSize: FS(2.3),
            fontFamily: Fonts.MontserratBold,
          }}
        />
        <ScrollView horizontal style={{flexDirection: 'row', marginTop: HP(2)}}>
          {PreviousSearch.map((item, index) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: HP(2),
                backgroundColor: '#EBEBEB',
                borderRadius: HP(2),
                alignItems: 'center',
                width: WP(70),
                marginRight: WP(10),
              }}>
              <Image
                source={item.image}
                style={{
                  height: HP(5),
                  width: WP(8),
                  // borderRadius: HP(2),
                  resizeMode: 'contain',
                  marginRight: WP(4),
                }}
              />
              <View style={{}}>
                <CustomText
                  style={{fontFamily: Fonts.MontserratBold}}
                  children={item.name}
                />
                <View style={{flexDirection: 'row', gap: WP(2)}}>
                  <CustomText children={item.date} />
                  <CustomText children={item.passenger} />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <StaysCus
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={(duration, month) => {
          console.log('Selected:', duration, month);
          setVisible(false);
        }}
      />
      <RoomGuestModal
        visible={showGuestModal}
        onClose={() => setShowGuestModal(false)}
        onConfirm={data => {
          console.log('Selected:', data);
          setGuestInfo(data);
          setShowGuestModal(false);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputnew: {
    height: HP(6),
    width: WP(82),
    backgroundColor: '#fff',
    color: '#737373',
    paddingLeft: WP(4),
    borderRadius: HP(1),
    fontFamily: Fonts.MontserratRegular,
  },
  searchButtonText: {
    textAlign: 'center',
    color: 'white',
    fontFamily: Fonts.MontserratBold,
    fontSize: FS(2.5),
    // fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#4955E6',
    padding: HP(1.5),
    borderRadius: HP(2),
    marginTop: HP(2),
    width: WP(90),
    alignSelf: 'center',
  },
});
