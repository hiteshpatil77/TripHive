import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import TripHeader from '../../components/TripHeader';
import {FS, HP, WP} from '../../utils/Dimention';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CreatTrip({navigation}) {
  const [selected, setselected] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null); // 'fixed' or 'flexible'

  const [selectedCurrency, setSelectedCurrency] = React.useState({
    symbol: '₹',
    code: 'INR',
  });
  const [showCurrencyModal, setShowCurrencyModal] = React.useState(false);
  const currencies = [
    {symbol: '₹', code: 'INR'},
    {symbol: '$', code: 'USD'},
    {symbol: '€', code: 'EUR'},
    {symbol: '£', code: 'GBP'},
    {symbol: '¥', code: 'JPY'},
    {symbol: 'S$', code: 'SGD'},
  ];
  const handleNext = () => {
    if (selectedDateType === 'fixed') {
      navigation.navigate('FixedDates');
    } else if (selectedDateType === 'flexible') {
      navigation.navigate('Flexible');
    } else {
    }
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <TripHeader navigation={navigation} hearder={'Create trip'} />
      <View style={{width: WP(90), alignSelf: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: HP(50),
            // backgroundColor: 'red',
          }}>
          <Image
            source={Icons.Booking}
            style={{resizeMode: 'center', height: HP(35)}}
          />
          <View style={{height: HP(2)}}></View>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'Design your perfect trip with'}
          />
          <CustomText
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
              color: '#FFA015',
            }}
            children={'Hive AI Planner'}
          />
        </View>
        <View>
          <CustomText
            children={'Trip Name'}
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(1.5),
              color: '#3E3E54',
            }}
          />
          <View
            style={{
              backgroundColor: '#F4F4F4',
              borderRadius: HP(0.5),
              paddingLeft: HP(2),
            }}>
            <TextInput
              placeholder="Give your trip a name"
              placeholderTextColor={'#737373'}
              style={{
                fontSize: FS(1.5),
                color: '#333',
                fontFamily: Fonts.MontserratRegular,
              }}
            />
          </View>
        </View>

        <View style={{marginTop: HP(3)}}>
          <CustomText
            children={'Budget Per Person (optional)'}
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(1.5),
              color: '#3E3E54',
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                paddingLeft: HP(2),
                width: WP(67),
              }}>
              <TextInput
                placeholder="0"
                placeholderTextColor={'#737373'}
                style={{
                  fontSize: FS(1.5),
                  fontFamily: Fonts.MontserratBold,
                  color: '#333',
                }}
              />
            </View>
            <TouchableOpacity
              onPress={() => setShowCurrencyModal(true)}
              style={{
                width: WP(19),
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                marginLeft: HP(2),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: HP(5),
              }}>
              <CustomText
                children={`${selectedCurrency.code} ${selectedCurrency.symbol}`}
                style={{
                  fontSize: FS(1.4),
                  color: '#4955E6',
                  fontFamily: Fonts.MontserratBold,
                }}
              />
              <Ionicons
                name={'chevron-down'}
                color={'#4955E6'}
                size={16}
                style={{marginLeft: 3}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginTop: HP(3)}}>
          <CustomText
            children={'Select your travel dates preference'}
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(1.5),
              color: '#3E3E54',
            }}
          />
          <TouchableOpacity
            onPress={() => setSelectedDateType('fixed')}
            style={{
              backgroundColor:
                selectedDateType === 'fixed' ? '#FFA015' : '#F4F4F4',
              borderRadius: HP(0.5),
              paddingLeft: HP(2),
              height: HP(5),
              justifyContent: 'center',
              marginBottom: HP(1),
            }}>
            <CustomText
              style={{fontSize: FS(1.5), color: Colors.lightGT}}
              children={'Fixed Dates - "I know when I want to travel"'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedDateType('flexible')}
            style={{
              backgroundColor:
                selectedDateType === 'flexible' ? '#FFA015' : '#F4F4F4',
              borderRadius: HP(0.5),
              paddingLeft: HP(2),
              height: HP(5),
              justifyContent: 'center',
            }}>
            <CustomText
              style={{fontSize: FS(1.5), color: Colors.lightGT}}
              children={'Flexible - "I can adjust my dates"'}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            height: HP(5),
            backgroundColor: Colors.trip,
            marginTop: HP(3),
            borderRadius: HP(1),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleNext}>
          <CustomText
            children={'Next'}
            style={{color: '#fff', fontFamily: Fonts.MontserratExtraBold}}
          />
        </TouchableOpacity>
      </View>
      <View style={{padding: HP(1)}}></View>
      {/* Currency Modal */}
      <Modal
        visible={showCurrencyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCurrencyModal(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: HP(2),
              borderTopRightRadius: HP(2),
              padding: HP(2),
              // No shadow for consistency with your design
              shadowColor: 'transparent',
              shadowOffset: {width: 0, height: 0},
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            }}>
            <View
              style={{
                width: WP(15),
                height: HP(0.5),
                backgroundColor: '#E0E0E0',
                alignSelf: 'center',
                marginBottom: HP(2),
                borderRadius: HP(0.25),
              }}
            />
            {currencies.map((currency, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  paddingVertical: HP(1.5),
                  borderBottomWidth: index === currencies.length - 1 ? 0 : 1,
                  borderBottomColor: '#ECECEC',
                }}
                onPress={() => {
                  setSelectedCurrency(currency);
                  setShowCurrencyModal(false);
                }}>
                <CustomText
                  style={{
                    fontFamily: Fonts.MontserratBold,
                    fontSize: FS(1.8),
                    color: '#3E3E54',
                  }}>
                  {currency.code} {currency.symbol}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
