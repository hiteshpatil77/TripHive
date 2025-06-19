import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  BackHandler,
} from 'react-native';
import {FS, HP, WP} from '../../utils/Dimention';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../../theme/Fonts';

const AddFreind = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Friends');

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.goBack();
        return true;
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  const tabs = useMemo(() => ['Friends', 'Requests', 'Discover'], []);

  const friends = useMemo(() => ['Varun B.', 'Aryan', 'Bhat'], []);

  const requests = useMemo(
    () => [
      {name: 'Virat K.', location: 'Maharashtra'},
      {name: 'Varun B.', location: 'Maharashtra'},
    ],
    [],
  );

  const discover = useMemo(
    () => [
      {name: 'Varun B.', location: 'Maharashtra', mutuals: 10},
      {name: 'ROhit S.', location: 'Maharashtra', mutuals: 10},
    ],
    [],
  );

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return true;
    }
    return false;
  }, [navigation]);

  const handleTabPress = useCallback(tab => {
    setActiveTab(tab);
  }, []);

  const renderFriends = () => {
    return friends.map((item, index) => (
      <View key={index} style={{width: WP(87), alignSelf: 'center'}}>
        <View
          style={{
            justifyContent: 'center',
            padding: 10,
          }}>
          <TouchableOpacity
            // onPress={() => navigation.navigate('Friends')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: HP(5),
                width: HP(5),
                borderRadius: HP(5),
                marginRight: WP(3),
              }}
              source={Icons.Travel}
            />
            <CustomText style={{fontSize: FS(1.8)}}>{item}</CustomText>
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

  const renderRequests = () => {
    return requests.map((item, index) => (
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
                {item.name}
              </CustomText>
              <CustomText
                style={{fontSize: FS(1.3), color: '#3E3E3D'}}
                children={item.location}
              />
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
                }}>
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

  const renderDiscover = () => {
    return discover.map((item, index) => (
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
                  fontFamily: Fonts.MontserratBold,
                  letterSpacing: 0.5,
                  color: '#3E3E54',
                }}>
                {item.name}
              </CustomText>
              <CustomText
                style={{fontSize: FS(1.3), color: '#3E3E3D'}}
                children={item.location}
              />
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
              colors={['#2f78ed', '#4000FF']}>
              <TouchableOpacity
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
                10 Mutuals
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
      <LinearGradient colors={['#FF7530', '#FF7415', '#FFA015']}>
        <View style={{height: HP(8), width: WP(100)}}>
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
                bottom: HP,
              }}>
              <Entypo name={'chevron-left'} size={25} color={'#FF754D'} />
            </TouchableOpacity>
            <CustomText
              style={{
                fontSize: FS(2.2),
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 3,
                color: '#fff',
              }}>
              My Hive
            </CustomText>
          </View>
        </View>
      </LinearGradient>
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
          <TextInput style={{marginLeft: WP(3)}} placeholder="Search" />
        </View>
      </View>
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddFreind;
