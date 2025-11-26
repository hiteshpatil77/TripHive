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
  Modal,
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
import {
  friends,
  getactivity,
  getAllFriend,
  getAllGroup,
  getFriend,
  myFreind,
} from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ExpensesScreen({navigation}) {
  const [activeTab, setActiveTab] = useState('Friends');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Everyone');
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [getActivityData, setActivityData] = useState(null);
  const [groups, setGroupsData] = useState([]);
  console.log('group=-=-=-=', groups);

  const filterOptions = [
    'Everyone',
    'They owe me',
    'I owe them',
    'Pending Balances',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = await AsyncStorage.getItem('token');

        let response;

        switch (activeTab) {
          case 'Friends':
            response = await getAllFriend(token);
            console.log('Friends data =>', response);
            setFriendsData(response?.friends || []);
            break;

          case 'Groups':
            response = await getAllGroup(token);
            console.log('Groups data =>', response.data);
            setGroupsData(response?.data || []);
            break;

          case 'Activity':
            response = await getactivity(token);
            console.log('Activity data =>', response);
            setActivityData(response?.activity || []);
            break;

          default:
            console.warn('Unknown tab:', activeTab);
        }
      } catch (err) {
        console.error('Error fetching data =>', err);
        setError(err.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

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

  const handelNavigate = () => {
    if (activeTab === 'Friends') {
      navigation.navigate('AddFriends');
    } else if (activeTab === 'Groups') {
      navigation.navigate('CreateGroup');
    }
  };

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
    friendsData.map((item, index) => (
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
        key={item.id || index}
        onPress={() => navigation.navigate('TripDetails', {item})}
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
          {item?._count?.expenses !== undefined && (
            <CustomText
              style={{
                fontSize: FS(1.4),
                color: item._count.expenses > 0 ? 'green' : 'red',
              }}>
              {item._count.expenses > 0
                ? `Total expenses: ${item._count.expenses}`
                : 'No expenses yet'}
            </CustomText>
          )}

          <CustomText
            style={{fontSize: FS(1.4), color: '#ADADAD'}}
            children={item.description}
          />
        </View>
      </TouchableOpacity>
    ));
  const renderActivity = () =>
    activity.map((item, index) => (
      <TouchableOpacity
        onPress={() => navigation.navigate('ShowSplit', {item})}
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
          {/* <CustomText
            style={{
              fontSize: FS(1.3),
              color: item.RS.includes('you owe') ? 'red' : 'green',
            }}
            children={item.RS}
          /> */}
          <CustomText
            style={{fontSize: FS(1.3), color: '#ADADAD'}}
            children={item.Date}
          />
        </View>
      </TouchableOpacity>
    ));

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2ff'}}>
      <StatusBar backgroundColor={'#f2f2f2ff'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FF754D', '#FF8A5A', '#FFA515']}>
          <View
            style={{
              height: HP(15),
              marginTop: HP(2),
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
              1
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
            top: HP(10),
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
                    color: '#3E3E54',
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
              backgroundColor: '#f7f7f7ff',
              borderRadius: HP(3),
              height: HP(100),
            }}>
            <View
              style={{
                borderRadius: HP(2),
                width: WP(93),
                alignSelf: 'center',
                // padding: HP(2),
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
                    <TextInput
                      placeholder="Search Activity"
                      placeholderTextColor="#868686"
                      style={{fontFamily: Fonts.MontserratRegular}}
                    />
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
                        children={'Filters'}
                      />
                      <TouchableOpacity
                        onPress={() => setFilterModalVisible(true)}>
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
                  children={
                    activeTab === 'Groups'
                      ? selectedFilter === 'Everyone'
                        ? 'All Groups'
                        : selectedFilter === 'They owe me'
                        ? 'Groups who owe you'
                        : selectedFilter === 'I owe them'
                        ? 'Groups you owe'
                        : 'Pending Balances'
                      : 'Showing groups with outstanding balances'
                  }
                  style={{color: '#ADADAD', marginTop: HP(1)}}
                />
              )}
              {renderContent()}
              {activeTab === 'Activity' ? null : (
                <TouchableOpacity
                  onPress={handelNavigate}
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
                      children={
                        activeTab === 'Friends'
                          ? 'Add a new friend'
                          : 'Start a new group'
                      }
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
      <TouchableOpacity
        onPress={() => navigation.navigate('AddExpense')}
        style={{
          position: 'absolute',
          bottom: HP(2),
          right: WP(2),
          width: HP(12),
          height: HP(12),
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
        <Image
          source={Icons.Button}
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

      <Modal
        animationType="none"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setFilterModalVisible(false)}>
          <View
            style={styles.modalContainer}
            onStartShouldSetResponder={() => true}>
            <CustomText style={styles.modalTitle} children="Filter" />

            {filterOptions.map(option => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => {
                  setSelectedFilter(option);
                  setFilterModalVisible(false);
                }}>
                <CustomText
                  style={{
                    fontSize: FS(1.8),
                    color: '#3E3E54',
                  }}
                  children={option}
                />
                <View
                  style={[
                    styles.radioButton,
                    selectedFilter === option && styles.radioButtonSelected,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    top: HP(25),
    left: WP(8),
    width: WP(60),
    backgroundColor: '#F0F0F0',
    borderRadius: HP(1.5),
    padding: HP(2),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: FS(2.2),
    color: '#343a40',
    fontFamily: Fonts.MontserratBold,
    marginBottom: HP(2),
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: HP(1.5),
  },
  radioButton: {
    width: WP(5),
    height: WP(5),
    borderRadius: WP(2.5),
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: '#fff',
  },
  radioButtonSelected: {
    backgroundColor: '#FC7916',
    borderColor: '#FC7916',
  },
});
