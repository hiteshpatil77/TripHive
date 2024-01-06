import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../theme/Fonts';

export default function ExpensesScreen({navigation}) {
  const [activeTab, setActiveTab] = useState('Friends');

  const friends = [
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'owes you',
      RS: '₹999.00',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'settled up',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'owes you',
      RS: '₹999.00',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'you owes',
      RS: '₹999.00',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'owes you',
      RS: '₹999.00',
    },
  ];

  const groups = [
    {
      logo: 'home-filled',
      name: 'ABC Randon Group',
      RS: 'you owe ₹999.00',
      Tag: 'you owes Varun 999',
    },
    {
      logo: 'flight-takeoff',
      name: 'ABC Randon Group',
      RS: 'you are owed 59.00',
      Tag: 'you owes Varun 999',
    },
  ];

  const activity = [
    {
      logo: 'home-filled',
      name: 'Pritish',
      Paid: 'Varun',
      Trip: '"Trip Goa"',
      RS: 'you owe ₹999.00',
      Date: '20/08/2024 - 20:40',
    },
    {
      logo: 'flight-takeoff',
      name: `You`,
      Paid: '"Party Bill"',
      Trip: '"Trip Goa"',
      RS: 'you are owed 59.00',
      Date: '20/08/2024 - 20:40',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Friends':
        return renderFriends();
      case 'Groups':
        return renderGroups();
      case 'Activity':
        return renderActivity();
      default:
        return null;
    }
  };

  const renderFriends = (item, index) =>
    friends.map((item, index) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('SignleExpense')}
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: HP(1),
            alignItems: 'center',
          }}>
          <Image
            source={item.Pic}
            style={{
              height: HP(5),
              width: HP(5),
              resizeMode: 'cover',
              borderRadius: HP(3),
              marginRight: HP(2),
            }}
          />
          <CustomText
            style={{
              fontSize: FS(1.9),
              color: '#3E3E54',
              // fontFamily: Fonts.MontserratRegular,
            }}
            children={item.name}
          />
        </View>
        <View>
          <CustomText
            style={{
              color:
                item.Tag === 'settled up'
                  ? 'gray'
                  : item.Tag === 'you owes'
                  ? 'red'
                  : '#00BF4C',
              top: HP(0.5),
            }}
            children={item.Tag}
          />
          {item.RS && (
            <CustomText
              style={{
                color: item.Tag === 'you owes' ? 'red' : '#00BF4C',
              }}
              children={item.RS}
            />
          )}
        </View>
      </TouchableOpacity>
    ));

  const renderGroups = () =>
    groups.map((item, index) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowSplit')}
        style={{
          flexDirection: 'row',
          height: HP(8),
          // backgroundColor: 'red',
          alignItems: 'center',
          marginTop: HP(2),
        }}>
        <View
          style={{
            backgroundColor: '#D9D9D9',
            borderRadius: HP(2),
            marginRight: HP(2),
            padding: HP(1),
          }}>
          <MaterialIcons name={item.logo} size={55} style={{color: 'white'}} />
        </View>
        <View>
          <CustomText style={{fontSize: FS(1.8)}} children={item.name} />
          <CustomText
            style={{
              fontSize: FS(1.4),
              color: item.RS.includes('you owe') ? 'red' : 'green',
            }}
            children={item.RS}
          />
          <CustomText
            style={{fontSize: FS(1.4), color: '#ADADAD'}}
            children={item.Tag}
          />
        </View>
      </TouchableOpacity>
    ));
  const renderActivity = () =>
    activity.map((item, index) => (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          height: HP(8),
          // backgroundColor: 'red',
          alignItems: 'center',
          marginTop: HP(1),
          marginVertical: HP(1),
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
          <View
            style={{
              flexDirection: 'row',
              width: WP(65),
            }}>
            <CustomText
              style={{
                fontSize: FS(1.8),
                color: '#3E3E54',
                fontFamily: Fonts.MontserratBold,
              }}>
              {item.name}{' '}
              <CustomText style={{fontSize: FS(1.8)}}>
                {item.name === 'You' ? 'updated' : 'paid'}
              </CustomText>{' '}
              {item.Paid}{' '}
              <CustomText style={{fontSize: FS(1.9)}}>in</CustomText>{' '}
              {item.Trip}
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: FS(1.3),
              color: item.RS.includes('you owe') ? 'red' : 'green',
            }}
            children={item.RS}
          />
          <CustomText
            style={{fontSize: FS(1.3), color: '#ADADAD'}}
            children={item.Date}
          />
        </View>
      </TouchableOpacity>
    ));

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#FF754D'} />

      {/* Translucent Status Bar */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FF754D', '#FF8A5A', '#FFA515']}>
          <View
            style={{
              height: HP(15),
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: WP(90),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{resizeMode: 'contain', height: HP(6), width: WP(13)}}
                source={Icons.Logo}></Image>
              <Text
                style={{
                  fontSize: FS(2.4),
                  color: '#fff',
                  bottom: HP(0.8),
                  // letterSpacing: 0.5,
                  fontFamily: Fonts.MontserratBold,
                  // fontWeight: 'bold',
                }}>
                Expenses
              </Text>
              <Image
                style={{
                  height: HP(7),
                  width: HP(7),
                  borderRadius: HP(4),
                  borderWidth: 3,
                  borderColor: 'white',
                  resizeMode: 'cover',
                }}
                source={Icons.Travel}
              />
            </View>
          </View>
        </LinearGradient>
        <View
          style={{
            alignSelf: 'center',
            backgroundColor: 'white',
            height: HP(8),
            position: 'absolute',
            width: WP(75),
            top: HP(8),
            zIndex: 1,
            borderRadius: HP(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              color: '#3E3E54',
              fontSize: FS(1.75),
              fontFamily: Fonts.MontserratBold,
            }}
            children={'Overall, You are Owed'}
          />
          <CustomText
            style={{
              fontSize: FS(2.3),
              color: '#2AD400',
              fontFamily: Fonts.MontserratBold,
            }}
            children={'₹19999.00'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F3EFE6',
            bottom: HP(3),
            borderRadius: HP(3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: HP(3),
              height: HP(4),
              top: HP(2),
              alignItems: 'center',
              width: WP(80),
              alignSelf: 'center',
            }}>
            {['Friends', 'Groups', 'Activity'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <CustomText
                  style={{
                    fontSize: FS(2),
                    color: activeTab === tab ? '#000' : '#3E3E54',
                    // fontWeight: activeTab === tab ? '900' : '100',
                    marginBottom: activeTab === tab && HP(0.5),
                    fontFamily:
                      activeTab === tab
                        ? Fonts.MontserratBold
                        : Fonts.MontserratRegular,
                  }}
                  children={tab}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: HP(3),
            }}>
            <View
              style={{
                borderRadius: HP(2),
                width: WP(93),
                alignSelf: 'center',
                padding: HP(2),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {activeTab === 'Activity' ? (
                  <View
                    style={{
                      borderRadius: HP(2),
                      backgroundColor: '#EFEFEF',
                      width: WP(60),
                      alignItems: 'center',
                      marginLeft: HP(5),
                      marginBottom: HP(0.5),
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <Ionicons
                      name="search"
                      size={15}
                      style={{marginRight: WP(2), color: '#8E8E8E'}}
                    />
                    <TextInput placeholder="Search Activity" />
                  </View>
                ) : (
                  <View style={{flexDirection: 'row', marginVertical: HP(1)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WP(27),
                      }}>
                      <CustomText
                        style={{
                          color: '#9E9E9E',
                          fontSize: FS(1.5),
                        }}
                        children={'Sort by'}
                      />
                      <TouchableOpacity style={{}}>
                        <Ionicons
                          style={{position: 'absolute', left: WP(2)}}
                          name="chevron-down"
                          size={20}
                          color="orange"
                        />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WP(20),
                      }}>
                      <CustomText
                        style={{
                          color: '#9E9E9E',
                          // fontFamily: Fonts.MontserratThin,
                          fontSize: FS(1.5),
                        }}
                        children={'Filters'}
                      />
                      <TouchableOpacity style={{}}>
                        <Ionicons
                          style={{position: 'absolute', left: WP(2)}}
                          name="chevron-down"
                          size={20}
                          color="orange"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
              {activeTab === 'Activity' ? (
                <CustomText
                  children={'Aug 2024'}
                  style={{color: '#ADADAD', marginTop: HP(1)}}
                />
              ) : activeTab === 'Friends' ? null : (
                <CustomText
                  children={'Showing groups with outstanding balances'}
                  style={{color: '#ADADAD', marginTop: HP(1)}}
                />
              )}
              {renderContent()}
              {activeTab === 'Activity' ? null : (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddFreind')}
                  style={{
                    alignSelf: 'center',
                    marginVertical: HP(3),
                    borderRadius: HP(3),
                    borderWidth: 1,
                    borderColor: '#D4D4D4',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: HP(1),
                      paddingHorizontal: HP(2),
                      alignItems: 'center',
                    }}>
                    <FontAwesome5
                      color={'#D4D4D4'}
                      size={18}
                      name={activeTab === 'Friends' ? 'user-plus' : 'users'}
                      style={{marginRight: HP(1)}}
                    />
                    <CustomText
                      children={'Add a new Friends'}
                      style={{fontSize: FS(1.3), color: '#A6A6A6'}}
                    />
                  </View>
                </TouchableOpacity>
              )}
              <View style={{height: HP(5)}}></View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Fixed Button */}
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
    </View>
  );
}

const styles = StyleSheet.create({});
