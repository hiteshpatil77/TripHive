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
import MainView from '../../components/MainView';
import Icons from '../../theme/Icons';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/FontAwesome6';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from '../../theme/Color';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';
import SearchModal from '../../components/modal/SearchModal';

export default function ExploreScreen({navigation}) {
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
      Tag: 'Kashmir Great Lakes',
      place: 'Machu Picchu, Peru',
      Money: '15,999',
    },
  ];
  const Unique = [
    {
      Pic: Icons.Unique,
      Tag: 'Villa casa basa',
      place: 'Naples, Peru',
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
      style={{
        // alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: WP(5),
      }}>
      <Image
        style={{
          height: HP(15),
          width: WP(30),
          resizeMode: 'contain',
          marginVertical: HP(1),
          // backgroundColor: 'red',
        }}
        source={item.Pic}
      />
      <View style={{left: HP(0)}}>
        <CustomText
          children={item.Tag}
          style={{
            fontWeight: 'bold',
            // alignSelf: 'flex-start',
            fontSize: HP(1.5),
          }}
        />
        <CustomText children={item.place} style={{fontSize: HP(1.5)}} />
      </View>
    </TouchableOpacity>
  );

  const renderExperiences = ({item}) => (
    <View
      style={{
        // flexDirection: 'row',
        padding: HP(1),
        backgroundColor: Colors.white,
        alignSelf: 'flex-start',
        borderRadius: HP(2),
        height: HP(27),
        marginHorizontal: HP(2),
      }}>
      <Image
        source={Icons.Travel}
        style={{
          height: HP(15),
          width: WP(50),
          borderRadius: HP(1),
          resizeMode: 'center',
        }}
      />
      <View style={{paddingHorizontal: HP(1)}}>
        <CustomText
          style={{
            fontSize: FS(2),
            fontWeight: 'bold',
            color: Colors.black,
          }}>
          {item.Tag}
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // marginTop: HP(1),
          }}>
          <Icon name="location-dot" size={14} color={Colors.gray} />
          <CustomText
            style={{
              fontSize: FS(1.4),
              color: Colors.gray,
              marginLeft: WP(2),
            }}>
            {item.place}
          </CustomText>
        </View>
        <FlatList />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: HP(1),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              style={{
                fontSize: FS(1.8),
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              {item.Money}
            </CustomText>
            <CustomText
              style={{
                fontSize: FS(1.6),
                color: Colors.gray,
                marginLeft: WP(1),
              }}>
              /person
            </CustomText>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              borderRadius: HP(1.2),
              borderWidth: 1,
              // borderRightColor: HP(2),
            }}>
            <CustomText
              children={'Book Now'}
              style={{
                color: Colors.black,
                fontSize: FS(1.2),
                fontWeight: '600',
                padding: HP(0.5),
                // color: Colors.black,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
      Tag: 'Lake Abc',
      Country: 'India',
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
    <TouchableOpacity style={{position: 'relative', marginRight: WP(3)}}>
      <Image
        source={item.Pic}
        style={{
          height: HP(18),
          width: WP(30),
          borderRadius: HP(1),
        }}
      />
      <Text
        style={{
          position: 'absolute',
          bottom: HP(1),
          color: Colors.white,
          left: WP(3),
          fontWeight: '700',
        }}>
        {item.Tag} {'\n'}
        <Text style={{fontWeight: '400'}}>{item.Country}</Text>
      </Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
      <View>
        <Image
          source={Icons.image}
          style={{height: HP(28), width: WP(100), bottom: HP(1)}}
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
          }}
        />
      </View>
      <View
        style={{
          // flexDirection: 'row',
          position: 'absolute',
          top: HP(13),
          left: WP(5),
          alignItems: 'center',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Icon name="location-dot" color={Colors.white} size={20} />
          <Text
            style={{color: Colors.white, marginLeft: WP(5), fontSize: FS(1.8)}}>
            You are in Goa
          </Text>
        </View>
        <Text
          style={{fontSize: FS(5), color: Colors.white, fontWeight: 'bold'}}>
          Explore
        </Text>
      </View>
      <SearchModal closeModal={closeModal} modalVisible={modalVisible} />
      <Pressable
        onPress={openModal}
        style={{
          backgroundColor: Colors.white,
          width: WP(85),
          alignSelf: 'center',
          borderRadius: HP(1),
          height: HP(6),
          // justifyContent: 'center',
          bottom: HP(3),
          elevation: 7,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <EvilIcons
          name="search"
          size={30}
          color={Colors.SkipButton}
          style={{marginLeft: HP(1), bottom: HP(0.2)}}
        />

        <CustomText children={'hey ABC, Where do you want ro go?'} />
      </Pressable>
      <View
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
      </View>
      <View
        style={{
          width: WP(95),
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: FS(2.5), fontWeight: 'bold'}}>Trending</Text>
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
          height: HP(17),
          width: WP(90),
          alignSelf: 'center',
          backgroundColor: Colors.lightGray,
          marginTop: HP(2),
          borderRadius: HP(2),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <CustomText
          style={{fontSize: FS(3), fontWeight: 'bold', bottom: HP(1)}}
          children={'Plan with our Hive AI'}
        />
        <CustomText
          style={{fontSize: FS(1.3), color: Colors.gray}}
          children={'Advance Tailored Plans for you within seconds'}
        />
        <TouchableOpacity>
          <LinearGradient
            colors={['#FF9F15', '#FD7A16', '#FD7A16', '#FD7A16']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              borderRadius: HP(2),
              padding: HP(1),
              paddingHorizontal: HP(2.5),
              alignItems: 'center',
              justifyContent: 'center',
              width: WP(35),
              top: HP(1),
              height: HP(6),
            }}>
            <CustomText
              style={{
                color: Colors.white,
                fontSize: FS(2.5),
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
        <Text
          style={{
            fontSize: FS(2.5),
            fontWeight: 'bold',
            marginVertical: HP(2),
            fontFamily: Fonts.Regular,
          }}>
          Popular Experiences
        </Text>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={Experiences}
        renderItem={renderExperiences}
        horizontal
      />
      <View
        style={{
          width: WP(95),
          alignSelf: 'flex-end',
          marginTop: HP(1),
          // position: 'relative',
        }}>
        <Text
          style={{
            fontSize: FS(2.5),
            fontWeight: 'bold',
            marginVertical: HP(2),
            fontFamily: Fonts.Regular,
          }}>
          Explore by interests
        </Text>
        <FlatList
          data={Explore}
          renderItem={ExploreFun}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          width: WP(95),
          alignSelf: 'flex-end',
          // marginTop: HP(1),
          // position: 'relative',
        }}>
        <Text
          style={{
            fontSize: FS(2.5),
            fontWeight: 'bold',
            marginVertical: HP(2),
            fontFamily: Fonts.Regular,
          }}>
          Unique Stays
        </Text>
        <FlatList
          data={Unique}
          renderItem={UniqueFun}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          height: HP(6),
          width: WP(90),
          alignSelf: 'center',
          backgroundColor: 'white',
          marginTop: HP(2),
          // paddingBottom: HP(10),
        }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
