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

export default function TripDetails({navigation, route}) {
  const group = route?.params?.item || {};
  console.log('TripDetails group =>', group);

  // Derived / safe fields from API object
  const groupName = group?.name || 'Group';
  const groupDescription = group?.description || 'No description';
  const expensesCount = group?._count?.expenses ?? 0;
  const creatorName = group?.creator?.name || 'Unknown';
  const membersCount = Array.isArray(group?.members) ? group.members.length : 0;
  const createdAt = group?.createdAt;

  const activity = [
    {
      id: 1,
      logo: 'home-filled',
      name: 'Party Club”',
      user: 'Varun Paid',
      Paid: 'you owe',
      RS: '₹999.00',
      Date: '20/08/2024 - 20:40',
    },
    {
      id: 2,
      logo: 'flight-takeoff',
      name: `Food”`,
      user: 'Varun Paid',
      Paid: 'you borrowed',
      RS: '₹59.00',
      Date: '20/08/2024 - 20:40',
    },
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient colors={['#FF754D', '#FF754a']}>
        <View style={{height: HP(3)}}></View>
      </LinearGradient>
      {/**Header */}
      <View
        style={{
          height: HP(27),
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                fontSize: FS(2.5),
                color: '#fff',
                fontFamily: Fonts.MontserratBold,
              }}>
              {groupName?.[0] || 'G'}
            </CustomText>
          </View>
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
              children={groupName}
            />
            <View style={{flexDirection: 'row'}}>
              <CustomText
                style={{
                  fontSize: FS(1.8),
                  marginVertical: HP(0.5),
                  color: expensesCount > 0 ? '#00BF4C' : '#ADADAD',
                  marginRight: HP(1),
                }}
                children={
                  expensesCount > 0
                    ? `Total expenses: ${expensesCount}`
                    : 'No expenses yet'
                }
              />
            </View>
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
            width: WP(90),
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(3),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{paddingVertical: HP(0.5), fontSize: FS(1.3)}}
              children={'Settle Up'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{paddingVertical: HP(0.5), fontSize: FS(1.3)}}
              children={'Reminder'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{paddingVertical: HP(0.5), fontSize: FS(1.3)}}
              children={'Balances'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: WP(3),
              paddingHorizontal: WP(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{paddingVertical: HP(0.5), fontSize: FS(1.3)}}
              children={'Totals'}
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
          bottom: HP(7),
        }}>
        <View style={{width: WP(87), alignSelf: 'center', marginTop: HP(3)}}>
          <CustomText
            style={{color: '#ADADAD'}}
            children={`Created by ${creatorName}${
              membersCount ? ` • ${membersCount} members` : ''
            }`}
          />
          {activity.map(item => (
            <TouchableOpacity
              onPress={() => navigation.navigate('ShowSplit')}
              style={{
                flexDirection: 'row',
                height: HP(8),
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
                      fontSize: FS(1.9),
                      // fontWeight: '700',
                      color: '#3E3E54',
                      fontFamily: Fonts.MontserratBold,
                    }}>
                    {item.name}
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: FS(1.3),
                      color: '#ADADAD',
                      marginVertical: HP(0.1),
                    }}>
                    {item.user} {item.RS}
                  </CustomText>
                  <CustomText style={{fontSize: FS(1.3), color: '#ADADAD'}}>
                    {item.Date}
                  </CustomText>
                </View>
              </View>
              <View style={{marginTop: HP(0.5), alignItems: 'flex-end'}}>
                <CustomText
                  style={{
                    fontSize: FS(1.3),
                    color: item.Paid.includes('you owe')
                      ? '#D70000'
                      : '#00BF4C',
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  {item.Paid}
                </CustomText>
                <CustomText
                  style={{
                    fontSize: FS(1.5),
                    color: item.Paid.includes('you owe')
                      ? '#D70000'
                      : '#00BF4C',
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
