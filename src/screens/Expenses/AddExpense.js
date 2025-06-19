import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';

export default function AddExpense({navigation}) {
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: '₹',
    code: 'INR',
  });
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const currencies = [
    {symbol: '₹', code: 'INR'},
    {symbol: '$', code: 'USD'},
    {symbol: '€', code: 'EUR'},
    {symbol: '£', code: 'GBP'},
    {symbol: '¥', code: 'JPY'},
    {symbol: 'S$', code: 'SGD'},
    // {symbol: 'HK$', code: 'HKD'},
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: '#FF754D', height: HP(8)}}>
        <View
          style={{
            // marginTop: HP(1),
            backgroundColor: '#F3EFE6',
            height: HP(20),
            borderRadius: HP(4),
          }}>
          <View
            style={{
              flexDirection: 'row',
              margin: HP(1),
              marginLeft: HP(2),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                children={'<'}
                style={{fontSize: FS(2.2), marginHorizontal: HP(0.5)}}
              />
              <CustomText children={'Go Back'} />
            </TouchableOpacity>
          </View>
          <CustomText
            children={'Add a new expense'}
            style={{
              alignSelf: 'center',
              fontSize: FS(2.2),
              bottom: HP(1.5),
              // fontWeight: '800',
              marginBottom: HP(1),
              color: '#3E3E54',
              fontFamily: Fonts.MontserratExtraBold,
            }}
          />
        </View>
      </View>
      <View style={{flex: 1, borderRadius: HP(4), backgroundColor: 'white'}}>
        <View style={{padding: HP(3)}}>
          <View style={{flexDirection: 'row', marginBottom: HP(1)}}>
            <CustomText
              children={'Add People: '}
              style={{
                color: '#3E3E54',
                fontSize: FS(1.6),
                fontFamily: Fonts.MontserratBold,
              }}
            />
            <CustomText
              children={' Group, Friends, Email, Phone'}
              style={{color: '#9B9B9B'}}
            />
          </View>
          <CustomText
            children={'Title'}
            style={{fontFamily: Fonts.MontserratBold, color: '#3E3E54'}}
          />
          <TextInput
            style={{
              backgroundColor: '#ECECEC',
              borderRadius: HP(1.2),
              marginVertical: HP(1),
            }}
          />
          <CustomText
            children={'Amount'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(1),
              color: '#3E3E54',
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              keyboardType="number-pad"
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1.2),
                marginVertical: HP(1),
                width: WP(60),
                paddingHorizontal: HP(2),
              }}
            />
            <TouchableOpacity
              onPress={() => setShowCurrencyModal(true)}
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1),
                marginRight: HP(1),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: HP(1),
                marginHorizontal: HP(2),
                height: HP(5),
              }}>
              <CustomText
                children={`${selectedCurrency.code} ${selectedCurrency.symbol}`}
                style={{
                  fontSize: FS(2),
                  padding: HP(0.5),
                  color: '#4955E6',
                  fontFamily: Fonts.MontserratBold,
                }}
              />
              <Ionicons
                name={'chevron-down'}
                color={'#4955E6'}
                size={16}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
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
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 5,
                }}>
                <View style={{
                  width: WP(15),
                  height: HP(0.5),
                  backgroundColor: '#E0E0E0',
                  alignSelf: 'center',
                  marginBottom: HP(2),
                  borderRadius: HP(0.25),
                }} />
                {currencies.map((currency, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: HP(1.5),
                      borderBottomWidth:
                        index === currencies.length - 1 ? 0 : 1,
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
          <CustomText
            children={'Paid by'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(1),
              color: '#3E3E54',
            }}
          />
          <View
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                // backgroundColor: 'red',
                paddingHorizontal: HP(2),
                width: WP(80),
              }}
            />
            <Ionicons name={'chevron-down'} color={'#4955E6'} size={20} />
          </View>
          <CustomText
            children={'Split by'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(2),
              color: '#3E3E54',
            }}
          />
          <View
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                // backgroundColor: 'red',
                paddingHorizontal: HP(2),
                width: WP(80),
              }}
            />
            <Ionicons name={'chevron-down'} color={'#4955E6'} size={20} />
          </View>
          <CustomText
            children={'Description'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(2),
              color: '#3E3E54',
            }}
          />
          <View
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              style={{
                // backgroundColor: 'red',
                paddingHorizontal: HP(2),
                width: WP(80),
              }}
            />
            <Entypo name={'attachment'} color={'#4955E6'} size={20} />
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: HP(6),
              width: WP(85),
              backgroundColor: '#4955E6',
              borderRadius: HP(5),
              marginTop: HP(10),
            }}>
            <CustomText
              style={{fontSize: FS(2.5), color: 'white', fontWeight: '700'}}
              children={'Add Expense'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
