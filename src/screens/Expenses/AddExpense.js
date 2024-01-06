import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';

export default function AddExpense({navigation}) {
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
            <View
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1),
                marginRight: HP(1),
              }}>
              <CustomText
                children={'₹'}
                style={{
                  fontSize: FS(2.5),
                  padding: HP(0.5),
                  paddingHorizontal: HP(2),
                  color: '#4955E6',
                  fontFamily: Fonts.MontserratBold,
                }}
              />
            </View>
            <TextInput
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1.2),
                marginVertical: HP(1),
                width: WP(72.5),
              }}
            />
          </View>
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
