import {
  FlatList,
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
import Colors from '../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icons from '../../theme/Icons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';

export default function SignleExpense({navigation}) {
  const activity = [
    {
      id: 1,
      // logo: 'home-filled',
      name: 'Party Club”',
      Paid: 'you owes',
      user: 'Varun',
      RS: '₹999.00',
      Date: '20/08/2024 - 20:40',
    },
    {
      id: 2,
      // logo: 'flight-takeoff',
      name: `Food”`,
      Paid: 'owes you',
      RS: '59.00',
      user: 'Rohit',
      Date: '20/08/2024 - 20:40',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient colors={['#FF754D', '#FF7521']}>
        <View style={{height: HP(3)}}></View>
      </LinearGradient>
      {/**Header */}
      <View
        style={{
          height: HP(25),
          backgroundColor: '#F3EFE6',
          bottom: HP(2),
          borderRadius: HP(3),
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
        <View
          style={{
            flexDirection: 'row',
            width: WP(90),
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: HP(9),
              width: HP(9),
              borderRadius: HP(5),
              backgroundColor: Colors.gray,
            }}></View>
          <View
            style={{
              justifyContent: 'center',
              marginLeft: HP(2),
              width: WP(60),
            }}>
            <CustomText
              style={{
                fontSize: FS(2),
                color: '#3E3E54',
                fontFamily: Fonts.MontserratBold,
              }}
              children={'Varun Bhutoria'}
            />
            <CustomText
              style={{
                fontSize: FS(1.8),
                marginVertical: HP(0.5),
                color: '#00BF4C',
                fontFamily: Fonts.MontserratRegular,
              }}
              children={'owes you ₹999.00 '}
            />
            {/* <Text style={{fontWeight}}></Text> */}
          </View>
          <TouchableOpacity style={{marginBottom: HP(3)}}>
            <Image
              source={Icons.Setting}
              style={{height: HP(3), width: WP(5), resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: HP(2),
            width: WP(70),
            alignSelf: 'center',
            bottom: HP(1),
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                paddingHorizontal: WP(2),
                padding: HP(0.5),
                fontSize: FS(1.3),
              }}
              children={'Settele Up'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(4),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                paddingHorizontal: WP(2),
                padding: HP(0.5),
                fontSize: FS(1.3),
              }}
              children={'Reminder'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          borderTopRightRadius: HP(3),
          borderTopLeftRadius: HP(3),
          bottom: HP(6),
        }}>
        <View style={{width: WP(87), alignSelf: 'center', marginTop: HP(3)}}>
          <CustomText style={{color: '#ADADAD'}} children={'Aug 2024'} />
          {/* <FlatList
            data={activity}
            renderItem={renderActivity}
            keyExtractor={item => item.id.toString()}
          /> */}
          {activity.map(item => (
            <TouchableOpacity
              onPress={() => navigation.navigate('TripDetails', {item})}
              style={{
                flexDirection: 'row',
                height: HP(8.5),
                // alignItems: 'center',
                marginTop: HP(1),
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: WP(65),
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#D9D9D9',
                    borderRadius: HP(2),
                    marginRight: HP(2),
                    padding: HP(1),
                    height: HP(8),
                    width: HP(8),
                  }}></View>
                <View>
                  {/* Use CustomText instead of Text for consistency */}
                  <CustomText
                    style={{
                      // fontWeight: '700',
                      fontSize: FS(1.8),
                      color: '#3E3E54',
                      fontFamily: Fonts.MontserratBold,
                    }}>
                    {item.name}
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: FS(1.3),
                      color: '#A2A2A2',
                      marginVertical: HP(0.4),
                    }}>
                    {item.user} Paid {item.RS}
                  </CustomText>
                  <CustomText style={{fontSize: FS(1.3), color: '#A2A2A2'}}>
                    {item.Date}
                  </CustomText>
                </View>
              </View>
              <View style={{marginTop: HP(0.5), alignItems: 'flex-end'}}>
                <CustomText
                  style={{
                    fontSize: FS(1.3),
                    color: item.Paid.includes('you owe') ? '#D70000' : 'green',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  {item.Paid}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: FS(1.5),
                    color: item.Paid.includes('you owe') ? '#D70000' : 'green',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  {item.RS}
                </CustomText>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('AddExpense')}>
        <Image
          source={Icons.Button}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: HP(12),
            width: WP(12),
            resizeMode: 'contain',
            bottom: HP(7),
            right: WP(7),
            position: 'absolute',
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
