import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../theme/Icons';
import Fonts from '../../theme/Fonts';

export default function ShowSplit({navigation}) {
  const Paid = [
    {
      Paid: 'You Paid',
      RS: '4500',
    },
    {
      Paid: 'Varun Paid',
      RS: '4500',
    },
    {
      Paid: 'Hitesh Owes',
      RS: '4500',
    },
    {
      Paid: 'Rahul owen',
      RS: '4500',
    },
  ];
  const Added = [
    {
      Paid: 'Added by Varun on ',
      Date: '20/08/2024',
    },
    {
      Paid: 'Added by Varun on',
      Date: '20/08/2024',
    },
    {
      Paid: 'Added by Varun on',
      Date: '20/08/2024',
    },
    {
      Paid: 'Added by Varun on',
      Date: '20/08/2024',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{height: HP(3), backgroundColor: '#FF754D'}}></View>
      <View
        style={{
          height: HP(9),
          backgroundColor: '#F3EFE6',
          borderRadius: HP(3),
          bottom: HP(3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            margin: HP(1.5),
            marginLeft: HP(2),
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              children={'<'}
              style={{fontSize: FS(2), marginHorizontal: HP(0.5)}}
            />
            <CustomText children={'Go Back'} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: HP(3),
          bottom: HP(6),
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: WP(95),
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{padding: HP(2)}}>
            <View
              style={{
                flexDirection: 'row',
                width: WP(32),
                // backgroundColor: 'red',
              }}>
              <CustomText
                style={{fontSize: FS(1.8), color: '#ADADAD'}}
                children={'20/08/2024 - '}
              />
              <CustomText
                style={{fontSize: FS(1.8), color: '#ADADAD'}}
                children={'20:40'}
              />
            </View>
          </View>
          <View style={{padding: HP(2)}}>
            <View
              style={{
                flexDirection: 'row',
                width: WP(40),
                // backgroundColor: 'red',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity style={{marginHorizontal: HP(3)}}>
                <Image
                  source={Icons.Trash}
                  style={{resizeMode: 'contain', height: HP(5), width: WP(5)}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={Icons.Pen}
                  style={{resizeMode: 'contain', height: HP(5), width: WP(9)}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: WP(85),
            alignSelf: 'center',
            justifyContent: 'space-between',
            bottom: HP(1),
          }}>
          <View
            style={{
              width: WP(43),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                height: HP(7),
                width: HP(7),
                backgroundColor: '#ADADAD',
                borderRadius: HP(1),
              }}></View>
            <CustomText
              style={{
                fontSize: FS(2),
                fontFamily: Fonts.MontserratBold,
                color: '#3E3E54',
              }}
              children={'Party Club'}
            />
          </View>
          <View
            style={{
              alignSelf: 'center',
              alignItems: 'flex-end',
              marginRight: WP(2),
            }}>
            <CustomText
              style={{fontSize: FS(1.5), color: 'red'}}
              children={'you owe'}
            />
            <CustomText
              style={{fontSize: FS(1.8), fontWeight: '600', color: 'red'}}
              children={'₹999.00'}
            />
          </View>
        </View>
        <View style={{width: WP(85), alignSelf: 'center'}}>
          <CustomText
            style={{
              fontSize: FS(2),
              fontFamily: Fonts.MontserratSemiBold,
              marginVertical: HP(1),
            }}
            children={'Multiple people paid 9000'}
          />
          {Paid.map(e => (
            <View style={{flexDirection: 'row', marginVertical: HP(0.5)}}>
              <CustomText
                style={{
                  marginRight: HP(1),
                  color: '#949494',
                  fontSize: FS(1.6),
                  alignItems: 'center',
                }}
                children={e.Paid}
              />
              <CustomText
                style={{color: '#949494', fontSize: FS(1.6)}}
                children={e.RS}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            borderWidth: 0.2,
            width: WP(85),
            alignSelf: 'center',
            marginVertical: HP(2),
            borderColor: '#949494',
          }}></View>
        <View style={{width: WP(85), alignSelf: 'center'}}>
          <CustomText
            style={{
              fontSize: FS(2),
              // fontWeight: '600',
              marginVertical: HP(2),
              marginTop: HP(1),
              fontFamily: Fonts.MontserratSemiBold,
            }}
            children={'Acitvity'}
          />
          {Added.map(e => (
            <View style={{flexDirection: 'row'}}>
              <CustomText
                style={{
                  marginRight: HP(1),
                  color: '#949494',
                  fontSize: FS(1.7),
                  alignItems: 'center',
                }}
                children={e.Paid}
              />
              <CustomText
                style={{color: '#949494', fontSize: FS(1.6)}}
                children={e.Date}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            borderWidth: 0.2,
            width: WP(90),
            alignSelf: 'center',
            marginVertical: HP(3),
            borderColor: '#949494',
          }}></View>
        <View
          style={{marginVertical: HP(1), width: WP(85), alignSelf: 'center'}}>
          <CustomText
            style={{fontSize: FS(2), fontFamily: Fonts.MontserratSemiBold}}
            children={'Comments'}
          />
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: HP(3),
              backgroundColor: '#EFEFEF',
              marginTop: HP(1),
            }}>
            <Text style={{paddingVertical: HP(1), color: '#868686'}}>
              Add a comment
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
