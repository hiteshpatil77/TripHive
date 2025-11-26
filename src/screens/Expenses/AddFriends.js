import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {FS, HP, WP} from '../../utils/Dimention';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';
import {
  acceptFriend,
  friendEveryone,
  getAllFriend,
  getAllUser,
  getPendingRequest,
  rejectFriend,
  sendFriend,
} from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFriends = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Friends');
  const [friendsData, setFriendsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [discoverUsers, setDiscoverUsers] = useState([]);
  const [RequestUsers, setRequestUsers] = useState([]);
  const [FriendUsers, setFriendUsers] = useState([]);
  const [loadingDiscover, setLoadingDiscover] = useState(true);
  const [loadingFriend, setLoadingFriend] = useState(true);
  const [loadingRequest, setLoadingRequest] = useState(true);
  const [errorDiscover, setErrorDiscover] = useState(null);
  const [errorFriend, setErrorFriend] = useState(null);
  const [errorRequest, setErrorRequest] = useState(null);
  console.log('discoverUsers-=', discoverUsers);
  console.log('RequestUsers-=', RequestUsers);
  console.log('FriendUsers-=', FriendUsers);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );
    return () => backHandler.remove();
  }, [navigation]);
  useEffect(() => {
    fetchFriend();
  }, []);

  const handleConnect = async friendId => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await sendFriend(friendId, token);

      console.log('Friend Request Sent:', response);

      fetchDiscover();
    } catch (error) {
      console.log('Error sending request:', error);
    }
  };
  const handleAccept = async requestId => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await acceptFriend(requestId, token);

      console.log('Friend Request Accept:', response);

      fetchRequests();
    } catch (error) {
      console.log('Error sending request:', error);
    }
  };
  const handleIgnore = async requestId => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await rejectFriend(requestId, token);

      console.log('Friend Request Accept:', response);

      fetchRequests();
    } catch (error) {
      console.log('Error sending request:', error);
    }
  };

  const tabs = useMemo(() => ['Friends', 'Requests', 'Discover'], []);

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  }, [navigation]);

  const handleTabPress = useCallback(tab => {
    setActiveTab(tab);
    if (tab === 'Discover') {
      fetchDiscover();
    } else if (tab === 'Requests') {
      fetchRequests();
    } else if (tab === 'Friends') {
      fetchFriend();
    }
  }, []);

  // ✅ Fetch Friends Data
  const fetchDiscover = async () => {
    try {
      setLoadingDiscover(true);

      const token = await AsyncStorage.getItem('token');
      const data = await getAllUser(token);

      console.log('Discover users:', data?.data);

      const users = data?.data;

      setDiscoverUsers(users);
    } catch (err) {
      console.log('error fetching discover users:', err);
      setErrorDiscover(err.message || 'Failed to fetch discover users');
    } finally {
      setLoadingDiscover(false);
    }
  };

  const fetchRequests = async () => {
    try {
      setLoadingRequest(true);

      const token = await AsyncStorage.getItem('token');
      const data = await getPendingRequest(token);

      console.log('Requests users:', data?.data);

      const users = data?.data;

      setRequestUsers(users);
    } catch (err) {
      console.log('error fetching discover users:', err);
      setErrorRequest(err.message || 'Failed to fetch discover users');
    } finally {
      setLoadingRequest(false);
    }
  };
  const fetchFriend = async () => {
    try {
      setLoadingFriend(true);

      const token = await AsyncStorage.getItem('token');
      const data = await getAllFriend(token);

      console.log('Friend users:', data?.data);

      const users = data?.data;

      setFriendUsers(users);
    } catch (err) {
      console.log('error fetching discover users:', err);
      setErrorFriend(err.message || 'Failed to fetch discover users');
    } finally {
      setLoadingFriend(false);
    }
  };
  // ✅ Friends Tab Content
  const renderFriends = () => {
    if (loadingFriend) {
      return (
        <ActivityIndicator
          size="large"
          color="#4000FF"
          style={{marginTop: HP(3)}}
        />
      );
    }

    if (errorFriend) {
      return (
        <CustomText
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          {errorDiscover}
        </CustomText>
      );
    }

    if (!Array.isArray(FriendUsers) || FriendUsers.length === 0) {
      return (
        <CustomText
          style={{
            color: 'gray',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          No users found.
        </CustomText>
      );
    }

    return FriendUsers.map((item, index) => (
      <View key={index} style={{width: WP(87), alignSelf: 'center'}}>
        <View style={{justifyContent: 'center', padding: 10}}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                height: HP(5),
                width: HP(5),
                borderRadius: HP(5),
                marginRight: WP(3),
              }}
              source={Icons.Travel}
            />
            <CustomText style={{fontSize: FS(1.8)}}>
              {item?.name || 'Unknown'}
            </CustomText>
          </TouchableOpacity>
          <View
            style={{
              borderWidth: 0.2,
              width: WP(70),
              alignSelf: 'center',
              marginLeft: WP(10),
              borderColor: '#00000021',
              marginTop: HP(1),
            }}
          />
        </View>
      </View>
    ));
  };

  // 📨 Requests Tab
  const renderRequests = () => {
    if (loadingRequest) {
      return (
        <ActivityIndicator
          size="large"
          color="#4000FF"
          style={{marginTop: HP(3)}}
        />
      );
    }

    if (errorRequest) {
      return (
        <CustomText
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          {errorDiscover}
        </CustomText>
      );
    }

    if (!Array.isArray(RequestUsers) || RequestUsers.length === 0) {
      return (
        <CustomText
          style={{
            color: 'gray',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          No users found.
        </CustomText>
      );
    }
    return RequestUsers.map((item, index) => (
      <View key={index}>
        <View
          style={{
            borderTopWidth: 0.5,
            marginVertical: HP(0.5),
            borderColor: '#00000021',
            width: WP(90),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(90),
            alignSelf: 'center',
            marginVertical: HP(1),
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: HP(1),
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: HP(6),
                width: HP(6),
                borderRadius: HP(3),
                marginRight: WP(3),
              }}
              source={Icons.Travel}
            />
            <View>
              <CustomText
                style={{
                  fontSize: FS(2.3),
                  letterSpacing: 0.5,
                  color: '#3E3E54',
                  fontFamily: Fonts.MontserratBold,
                }}>
                {item?.sender?.name}
              </CustomText>
              {/* <CustomText
                style={{fontSize: FS(1.3), color: '#3E3E3D'}}
                children={item.location}
              /> */}
            </View>
          </View>
          <View
            style={{
              marginTop: HP(1),
              alignItems: 'center',
              top: HP(0.5),
            }}>
            <LinearGradient
              style={{borderRadius: HP(5)}}
              colors={['#FFA015', '#FC7916']}>
              <TouchableOpacity
                style={{
                  height: HP(2.8),
                  width: WP(20),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: HP(4),
                }}
                onPress={() => handleAccept(item?.id)}>
                <CustomText
                  style={{
                    color: 'white',
                    fontSize: FS(1.5),
                    fontFamily: Fonts.MontserratBold,
                  }}>
                  Accept
                </CustomText>
              </TouchableOpacity>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => handleIgnore(item?.id)}
              style={{
                height: HP(3),
                width: WP(17),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: HP(4),
                marginTop: HP(0.5),
              }}>
              <CustomText
                style={{
                  color: '#B4B4B4',
                  fontSize: FS(1.3),
                  fontFamily: Fonts.MontserratMedium,
                }}>
                Ignore
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  // 🌐 Discover Tab
  const renderDiscover = () => {
    if (loadingDiscover) {
      return (
        <ActivityIndicator
          size="large"
          color="#4000FF"
          style={{marginTop: HP(3)}}
        />
      );
    }

    if (errorDiscover) {
      return (
        <CustomText
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          {errorDiscover}
        </CustomText>
      );
    }

    if (!Array.isArray(discoverUsers) || discoverUsers.length === 0) {
      return (
        <CustomText
          style={{
            color: 'gray',
            textAlign: 'center',
            marginTop: HP(3),
            fontSize: FS(1.8),
          }}>
          No users found.
        </CustomText>
      );
    }

    return discoverUsers.map((item, index) => (
      <View key={index}>
        <View
          style={{
            borderTopWidth: 0.5,
            marginVertical: HP(0.5),
            borderColor: '#00000021',
            width: WP(90),
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(90),
            alignSelf: 'center',
            marginVertical: HP(1),
          }}>
          {/* LEFT SIDE */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: HP(1),
              alignItems: 'center',
            }}>
            {/* Profile Image */}
            <Image
              style={{
                height: HP(6),
                width: HP(6),
                borderRadius: HP(3),
                marginRight: WP(3),
              }}
              source={item?.avatarUrl ? {uri: item.avatarUrl} : Icons.Travel}
            />

            {/* Text */}
            <View>
              <CustomText
                style={{
                  fontSize: FS(2.3),
                  fontFamily: Fonts.MontserratBold,
                  letterSpacing: 0.5,
                  color: '#3E3E54',
                }}>
                {item?.name || 'Unknown'}
              </CustomText>

              <CustomText style={{fontSize: FS(1.3), color: '#3E3E3D'}}>
                {item?.location || 'N/A'}
              </CustomText>
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={{marginTop: HP(1), alignItems: 'center', top: HP(0.5)}}>
            <LinearGradient
              style={{borderRadius: HP(5)}}
              colors={['#2f78ed', '#4000FF']}>
              <TouchableOpacity
                onPress={() => handleConnect(item?.id)}
                style={{
                  height: HP(2.8),
                  width: WP(23),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: HP(4),
                }}>
                <CustomText
                  style={{
                    color: 'white',
                    fontSize: FS(1.4),
                    fontFamily: Fonts.MontserratMedium,
                  }}>
                  Connect +
                </CustomText>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={{
                height: HP(3),
                width: WP(17),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: HP(4),
                marginTop: HP(0.5),
              }}>
              <CustomText style={{color: '#B4B4B4', fontSize: FS(1.2)}}>
                {item?.mutuals || 0} Mutuals
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Friends':
        return renderFriends();
      case 'Requests':
        return renderRequests();
      case 'Discover':
        return renderDiscover();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      {/* Header */}
      <LinearGradient colors={['#FF8530', '#FF8415', '#FFA015']}>
        <View style={{height: HP(8), width: WP(100), marginTop: HP(2)}}>
          <View
            style={{
              flexDirection: 'row',
              width: WP(60),
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={handleGoBack}
              style={{
                height: HP(4),
                width: HP(4),
                backgroundColor: '#fff',
                borderRadius: HP(4),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: HP(2),
              }}>
              <Entypo name="chevron-left" size={25} color={'#FF754D'} />
            </TouchableOpacity>
            <CustomText
              style={{
                fontSize: FS(2.2),
                marginBottom: 3,
                color: '#fff',
                fontFamily: Fonts.MontserratBold,
              }}>
              My Hive
            </CustomText>
          </View>
        </View>
      </LinearGradient>

      {/* Search */}
      <View
        style={{
          height: HP(8),
          backgroundColor: '#fff',
          justifyContent: 'flex-end',
          bottom: HP(3),
          borderRadius: HP(3),
        }}>
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 0.5,
            width: WP(87),
            alignSelf: 'center',
            borderRadius: HP(2),
            alignItems: 'center',
            height: HP(6),
          }}>
          <Ionicons
            style={{marginHorizontal: HP(1)}}
            size={20}
            name="search"
            color={'#4955E6'}
          />
          <TextInput
            style={{marginLeft: WP(3), fontFamily: Fonts.MontserratRegular}}
            placeholder="Search"
          />
        </View>
      </View>

      {/* Tabs */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 10,
          width: WP(90),
          alignSelf: 'center',
        }}>
        {tabs.map(tab => (
          <TouchableOpacity key={tab} onPress={() => handleTabPress(tab)}>
            <CustomText
              style={{
                fontSize: FS(2.2),
                color: activeTab === tab ? 'black' : 'gray',
                letterSpacing: 0.5,
                fontFamily: Fonts.MontserratBold,
              }}>
              {tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>

      {/* Favorites Label */}
      {activeTab === 'Friends' && (
        <View style={{width: WP(87), alignSelf: 'center', marginBottom: HP(1)}}>
          <View
            style={{
              borderBottomWidth: 0.5,
              width: WP(90),
              alignSelf: 'center',
              top: HP(0.3),
              borderColor: '#B4B4B4',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: HP(2),
              right: WP(2),
              width: WP(85),
            }}>
            <Image
              source={Icons.Star}
              style={{resizeMode: 'contain', height: HP(2), width: WP(4)}}
            />
            <CustomText
              style={{fontSize: FS(1.3), color: 'gray', marginLeft: WP(3)}}
              children={'Favourites'}
            />
          </View>
        </View>
      )}

      {/* Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFriends;
