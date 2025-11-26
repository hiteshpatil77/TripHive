import React, {useState} from 'react';
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
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FS, HP, WP} from '../../utils/Dimention';
import Fonts from '../../theme/Fonts';
import CustomText from '../../components/CustomText';
import Colors from '../../theme/Color';
import Icons from '../../theme/Icons';
import TrackHeader from '../../components/TrackHeader';
import PassengerPickerModal from '../../components/modal/PassengerPickerModal';
import SelectDatesModal from '../../components/modal/StaysCus';

const Stays = ({navigation}) => {
  const [visible, setVisible] = useState(false);

  const cityData = [
    {
      id: '1',
      name: 'Mumbai',
      state: 'Maharastra',
      image: Icons.city,
      tag: 'City',
    },
    {
      id: '2',
      name: 'Delhi',
      state: 'Delhi',
      image: Icons.city,
      tag: 'City',
    },
    {
      id: '3',
      name: 'Uttar Pradesh',
      state: 'Uttar Pradesh',
      image: Icons.city,
      tag: 'State',
    },
    {
      id: '4',
      name: 'Maldives',
      state: 'Island',
      image: Icons.island,
      tag: 'Island',
    },
  ];

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
    <ScrollView style={styles.container}>
      <TrackHeader navigation={navigation} tag={'Stays'} />
      <View style={{padding: HP(3), flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: HP(1),
            borderWidth: 0.5,
            borderRadius: HP(2),
            borderColor: '#C4C4C4',
            alignItems: 'center',
            // justifyContent: 'space-between',
            // height: HP(6),
          }}>
          <Ionicons name="search-outline" size={20} color={Colors.secondary} />
          <TextInput
            style={{
              paddingHorizontal: HP(2),
              color: '#AAAAAA',
              fontSize: FS(1.8),
              fontFamily: Fonts.MontserratRegular,
            }}
            placeholder="Where to?"
            placeholderTextColor={'#AAAAAA'}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-start',
            alignItems: 'center',
            marginTop: HP(3),
            // backgroundColor: 'red',
          }}>
          <Ionicons name="location-sharp" size={45} color={Colors.secondary} />
          <View>
            <CustomText
              style={{
                color: Colors.secondary,
                fontSize: FS(1.8),
                fontFamily: Fonts.MontserratBold,
              }}
              children={'Use Current Location'}
            />
            <CustomText
              style={{
                color: Colors.secondary,
                fontSize: FS(1.8),
              }}
              children={'You are in Goa'}
            />
          </View>
        </TouchableOpacity>
        <View style={{borderWidth: 0.5, marginTop: HP(4)}}></View>
        <CustomText
          style={{
            marginVertical: HP(4),
            fontSize: FS(2.5),
            fontFamily: Fonts.MontserratBold,
          }}
          children={'Trending Destinations'}
        />
        {cityData.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('BookTrip')}
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: HP(1),
            }}>
            <View style={{alignItems: 'center', marginRight: WP(10)}}>
              <Image
                source={item.image}
                style={{
                  height: HP(3),
                  width: WP(7),
                  // borderRadius: HP(2),
                  resizeMode: 'cover',
                }}
              />
              <CustomText children={item.tag} style={{fontSize: FS(1.2)}} />
            </View>
            <View>
              <CustomText
                style={{fontFamily: Fonts.MontserratBold}}
                children={item.name}
              />
              <CustomText children={item.state} />
            </View>
          </TouchableOpacity>
        ))}
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
      <SelectDatesModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={(duration, month) => {
          console.log('Selected:', duration, month);
          setVisible(false);
        }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
export default Stays;
