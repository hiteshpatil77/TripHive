import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icons from '../../theme/Icons';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../theme/Color';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';

export default function TripScreen({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const BookNow = [
    {
      Pic: Icons.flights,
      Tag: 'Flights',
      ScreenName: 'Flight',
    },
    {
      Pic: Icons.train,
      Tag: 'Trains',
    },
    {
      Pic: Icons.Bus,
      Tag: 'Buses',
    },
    {
      Pic: Icons.hotls,
      Tag: 'Stays',
    },
    {
      Pic: Icons.Exp,
      Tag: 'Experiences',
    },
    {
      Pic: Icons.packages,
      Tag: 'Packages',
    },
  ];
  const Explore = [
    {
      Pic: Icons.Explore,
      Tag: 'Flights',
    },
    {
      Pic: Icons.train,
      Tag: 'Trains',
    },
    {
      Pic: Icons.Bus,
      Tag: 'Buses',
    },
    {
      Pic: Icons.hotls,
      Tag: 'Stays',
    },
    {
      Pic: Icons.Exp,
      Tag: 'Experiences',
    },
    {
      Pic: Icons.packages,
      Tag: 'Packages',
    },
  ];
  const Experiences = [
    {
      Pic: Icons.Travel,
      Tag: 'Desert Camping',
      place: 'Machu Picchu, Peru',
      Money: '99',
    },
    {
      Pic: Icons.Travel,
      Tag: 'Kashmir Great',
      place: 'Machu Picchu, Peru',
      Money: '15,999',
    },
  ];
  const Unique = [
    {
      Pic: Icons.Unique,
      Tag: 'Villa casa basa',
      place: 'Naples, Peru',
      Date: '10 Mar - 15 Mar,2024',
      created: 'by@travelwithabc',
    },
    {
      Pic: Icons.Travel,
      Tag: 'Kashmir Great Lakes',
      place: 'Machu Picchu, Peru',
    },
    {
      Pic: Icons.Unique,
      Tag: 'Desert Camping',
      place: 'Naples, Peru',
    },
    {
      Pic: Icons.Travel,
      Tag: 'Kashmir Great Lakes',
      place: 'Machu Picchu, Peru',
    },
  ];
  const UpcomingData = [
    {
      Pic: Icons.Unique,
      Tag: 'Villa casa basa',
      place: 'Naples, Peru',
      Date: '10 Mar - 15 Mar,2024',
    },
    {
      Pic: Icons.Travel,
      Tag: 'Kashmir Great Lakes',
      place: 'Machu Picchu, Peru',
    },
    {
      Pic: Icons.Unique,
      Tag: 'Desert Camping',
      place: 'Naples, Peru',
    },
    {
      Pic: Icons.Travel,
      Tag: 'Kashmir Great Lakes',
      place: 'Machu Picchu, Peru',
    },
  ];

  const ExploreFun = ({item}) => (
    <TouchableOpacity
      style={{
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: WP(4),
      }}>
      <Image
        style={{height: HP(15), width: WP(30), resizeMode: 'contain'}}
        source={item.Pic}
      />
      <CustomText
        children={item.Tag}
        style={{color: 'white', bottom: HP(4.5), fontWeight: 'bold'}}
      />
    </TouchableOpacity>
  );

  const UniqueFun = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Overview')}
      style={{
        // alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: WP(6),
        marginTop: HP(1),
      }}>
      <Image
        style={{
          height: HP(24),
          width: WP(40),
          // resizeMode: 'contain',
          marginVertical: HP(1),
          borderRadius: HP(1.5),
          // backgroundColor: 'red',
        }}
        source={item.Pic}
      />
      <View
        style={{
          left: HP(0),
          backgroundColor: '#2D2D2D',
          position: 'absolute',
          bottom: 1,
          height: HP(9),
          width: WP(40),
          padding: HP(0.8),
          borderBottomEndRadius: HP(1),
          borderBottomLeftRadius: HP(1),
        }}>
        <CustomText
          children={item.Tag}
          style={{
            fontSize: HP(1.2),
            color: '#FFF',
            fontFamily: Fonts.MontserratBold,
          }}
        />
        <CustomText
          children={item.Date}
          style={{fontSize: HP(1.1), color: '#FFF'}}
        />
        <CustomText
          children={item.place}
          style={{fontSize: HP(1.1), color: '#FFF'}}
        />
        <CustomText
          children={item.created}
          style={{
            fontSize: HP(1.1),
            color: '#FFF',
            left: WP(13),
            marginTop: HP(1),
          }}
        />
      </View>
    </TouchableOpacity>
  );
  const Upcoming = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Overview')}
      style={{
        // alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: WP(6),
      }}>
      <Image
        style={{
          height: HP(21),
          width: WP(40),
          // resizeMode: 'contain',
          marginVertical: HP(1),
          borderRadius: HP(1.5),
          // backgroundColor: 'red',
        }}
        source={item.Pic}
      />
      <View
        style={{
          left: HP(0),
          backgroundColor: '#2D2D2D',
          position: 'absolute',
          bottom: 1,
          height: HP(7),
          width: WP(40),
          padding: HP(0.8),
          borderBottomEndRadius: HP(1),
          borderBottomLeftRadius: HP(1),
        }}>
        <CustomText
          children={item.Tag}
          style={{
            fontSize: HP(1.2),
            color: '#FFF',
            fontFamily: Fonts.MontserratBold,
          }}
        />
        <CustomText
          children={item.Date}
          style={{fontSize: HP(1.1), color: '#FFF'}}
        />
        <CustomText
          children={item.place}
          style={{fontSize: HP(1.1), color: '#FFF'}}
        />
      </View>
    </TouchableOpacity>
  );

  const renderExperiences = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Overview')}
      style={{
        // alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: WP(3),
        elevation: 10,
        // backgroundColor: 'red',
        borderRadius: HP(1.4),
      }}>
      <Image
        style={{
          height: HP(20),
          width: WP(32),
          // resizeMode: 'contain',
          // marginVertical: HP(1),
          borderRadius: HP(1.5),
          // marginRight: HP(1),
          // backgroundColor: 'red',
        }}
        source={item.Pic}
      />
      <View
        style={{
          left: HP(0),
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: -1,
          height: HP(6),
          width: WP(32),
          padding: HP(0.8),
          borderBottomEndRadius: HP(1),
          borderBottomLeftRadius: HP(1),
        }}>
        <CustomText
          children={item.Tag}
          style={{
            fontSize: HP(1.4),
            color: '#525252',
            fontFamily: Fonts.MontserratBold,
          }}
        />
        <CustomText
          children={item.place}
          style={{fontSize: HP(1.1), color: '#525252'}}
        />
      </View>
    </TouchableOpacity>
  );
  const renderBookFun = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(item.ScreenName)}
      style={{
        height: HP(10),
        width: HP(12),
        backgroundColor: Colors.white,
        borderRadius: HP(2),
        alignItems: 'center',
        justifyContent: 'center',
        margin: HP(0.7),
      }}>
      <Image
        source={item.Pic}
        style={{height: HP(5), width: WP(12), resizeMode: 'contain'}}
      />
      <Text style={{color: '#000'}}>{item.Tag}</Text>
    </TouchableOpacity>
  );
  const TrendingData = [
    {
      Pic: Icons.dummy,
      Tag: 'Homi Ka Bachelors',
      Country: 'Bali,Singapore,macau',
      Date: '20 March - 25 March 2024',
    },
    {
      Pic: Icons.dummy,
      Tag: 'Lake bbc',
      Country: 'USA',
    },
    {
      Pic: Icons.dummy,
      Tag: 'Lake fghjn',
      Country: 'Pakistan',
    },
  ];
  const renderTrending = ({item}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Overview')}
      style={{
        position: 'relative',
        marginRight: WP(3),
        width: WP(90),
        backgroundColor: '#fff',
        alignItems: 'center',
        height: HP(28),
        borderRadius: HP(2),
      }}>
      <Image
        source={item.Pic}
        style={{
          height: HP(17),
          width: WP(85),
          marginTop: HP(1),
          borderRadius: HP(2),
        }}
      />
      <CustomText
        style={{
          position: 'absolute',
          bottom: HP(6),
          color: '#2D3134',
          left: WP(3),
          fontFamily: Fonts.MontserratBold,
        }}>
        {item.Tag}
      </CustomText>
      <CustomText
        style={{
          position: 'absolute',
          bottom: HP(3.5),
          color: '#2D3134',
          left: WP(3),
          fontSize: FS(1.2),
        }}>
        {item.Date}
      </CustomText>
      <CustomText
        style={{
          position: 'absolute',
          bottom: HP(1),
          color: '#4955E6',
          left: WP(3),
          fontSize: FS(1.2),
        }}>
        {item.Country}
      </CustomText>
    </TouchableOpacity>
  );
  return (
    <View style={{backgroundColor: '#fff'}}>
      <ScrollView style={{}}>
        <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
        <View>
          <Image
            source={Icons.image}
            style={{height: HP(20), width: WP(100), bottom: HP(1)}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'space-between',
            width: WP(95),
            alignSelf: 'center',
            alignItems: 'center',
            top: HP(3),
          }}>
          <Image
            style={{resizeMode: 'contain', height: HP(4)}}
            source={Icons.Logo}
          />
          <Image
            style={{
              height: HP(8),
              width: HP(8),
              borderRadius: HP(5),
              backgroundColor: 'red',
              marginRight: WP(2),
              top: HP(5),
              borderWidth: 3,
              borderColor: '#fff',
            }}
          />
        </View>
        <View
          style={{
            // flexDirection: 'row',
            position: 'absolute',
            top: HP(13),
            left: WP(5),
            // alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: HP(1.2),
            width: WP(40),
            height: HP(8),
            elevation: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: HP(1.7),
              marginTop: HP(1),
            }}>
            <Icon name="location-dot" color="#494949" size={14} />
            <CustomText
              style={{color: '#494949', marginLeft: WP(2), fontSize: FS(1)}}>
              You are in Goa
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: FS(3),
              color: '#494949',
              fontFamily: Fonts.MontserratBold,
              marginLeft: WP(4),
            }}>
            My Trips
          </CustomText>
        </View>
        {/* <SearchModal closeModal={closeModal} modalVisible={modalVisible} /> */}
        <View
          onPress={openModal}
          style={{
            // backgroundColor: Colors.white,
            width: WP(85),
            alignSelf: 'center',
            borderRadius: HP(1),
            height: HP(4),
            // justifyContent: 'center',
            // bottom: HP(3),
          }}>
          {/* <CustomText children={'hey ABC, Where do you want ro go?'} /> */}
        </View>
        {/* <View
        style={{
          width: WP(95),
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: FS(2.5), fontWeight: 'bold'}}>Book Now</Text>
        <View style={{marginTop: HP(2)}}>
          <FlatList
            data={BookNow}
            renderItem={renderBookFun}
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View> */}
        <View
          style={{
            width: WP(95),
            alignSelf: 'flex-end',
          }}>
          <CustomText
            style={{
              fontSize: FS(2),
              fontFamily: Fonts.MontserratBold,
              top: HP(1),
            }}>
            Ongoing trip
          </CustomText>
          <View style={{marginTop: HP(2)}}>
            <FlatList
              data={TrendingData}
              renderItem={renderTrending}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
        <View
          style={{
            width: WP(95),
            alignSelf: 'flex-end',
            marginTop: HP(2),
            // position: 'relative',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: WP(90),
              marginTop: HP(2),
            }}>
            <CustomText
              children={'Upcoming Planned'}
              style={{
                fontSize: FS(2),
                fontFamily: Fonts.MontserratBold,
                // marginTop: HP(3),
              }}
            />
            <TouchableOpacity>
              <CustomText children={'See All'} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={UpcomingData}
            renderItem={Upcoming}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#4955E6',
            alignItems: 'center',
            justifyContent: 'center',
            width: WP(85),
            alignSelf: 'center',
            marginTop: HP(4),
            height: HP(5),
            borderRadius: HP(5),
          }}>
          <CustomText
            style={{
              color: '#fff',
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
            children={'Plan a new trip'}
          />
        </TouchableOpacity>
        <View
          style={{
            height: HP(13),
            width: WP(90),
            alignSelf: 'center',
            backgroundColor: '#e6e3e3',
            marginTop: HP(4),
            borderRadius: HP(1.5),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              fontSize: FS(2.3),
              fontFamily: Fonts.MontserratBold,
              color: Colors.textB,
            }}
            children={'Plan with our Hive AI'}
          />
          <CustomText
            style={{fontSize: FS(1.2), color: Colors.gray}}
            children={'Advance Tailored Plans for you within seconds'}
          />
          <TouchableOpacity onPress={() => navigation.navigate('CreatTrip')}>
            <LinearGradient
              colors={['#FF9F15', '#FD7A16', '#FD7A16', '#FD7A16']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                borderRadius: HP(1),
                // padding: HP(1),
                paddingHorizontal: HP(2.5),
                alignItems: 'center',
                justifyContent: 'center',
                width: WP(30),
                height: HP(3.5),
                marginTop: HP(1),
              }}>
              <CustomText
                style={{
                  color: Colors.white,
                  fontSize: FS(2),
                  fontWeight: 'bold',
                }}>
                Let's Go
              </CustomText>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View
          style={{
            // marginTop: HP(2),
            width: WP(95),
            // backgroundColor: 'red',
            alignSelf: 'flex-end',
            marginTop: HP(1),
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: WP(90),
              marginTop: HP(3),
              marginVertical: HP(1),
            }}>
            <CustomText
              children={'Past Trips'}
              style={{
                fontSize: FS(2),
                fontFamily: Fonts.MontserratBold,
              }}
            />
            <TouchableOpacity>
              <CustomText children={'See All'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{width: WP(90), alignSelf: 'center'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={Experiences}
            renderItem={renderExperiences}
            horizontal
          />
        </View>
        <View
          style={{
            width: WP(95),
            alignSelf: 'flex-end',
            // marginTop: HP(1),
            // position: 'relative',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              width: WP(90),
              marginTop: HP(3),
            }}>
            <CustomText
              children={'Curated Trips for you'}
              style={{
                fontSize: FS(2),
                fontFamily: Fonts.MontserratBold,
                // marginTop: HP(3),
              }}
            />
            <TouchableOpacity>
              <CustomText children={'See All'} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={Unique}
            renderItem={UniqueFun}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#4955E6',
            alignItems: 'center',
            justifyContent: 'center',
            width: WP(85),
            alignSelf: 'center',
            marginTop: HP(3),
            height: HP(5),
            borderRadius: HP(5),
            // zIndex: 1,
          }}>
          <CustomText
            style={{
              color: '#fff',
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
            children={'Plan a new trip'}
          />
        </TouchableOpacity>
        <View
          style={{
            height: HP(8),
            width: WP(90),
            alignSelf: 'center',
            marginTop: HP(2),
          }}></View>
      </ScrollView>
      <Image
        source={Icons.WhiteBG}
        style={{
          position: 'absolute',
          bottom: HP(0),
          resizeMode: 'cover',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
