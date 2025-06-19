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
      Money: '$99',
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
        marginTop: HP(1),
      }}>
      <Image
        style={{height: HP(17), width: HP(17), borderRadius: HP(10)}}
        source={item.Pic}
      />
      <CustomText
        children={item.Tag}
        style={{color: 'white', bottom: HP(4.5)}}
      />
    </TouchableOpacity>
  );

  const UniqueFun = ({item}) => (
    <TouchableOpacity
      style={{
        marginRight: WP(5),
      }}>
      <Image
        style={{
          height: HP(35),
          width: WP(48),
          borderRadius: HP(2),
        }}
        source={item.Pic}
      />
      <View style={{marginTop: HP(1)}}>
        <CustomText
          children={item.Tag}
          style={{
            fontSize: HP(1.8),
            fontFamily: Fonts.MontserratBold,
          }}
        />
        <CustomText children={item.place} style={{fontSize: HP(1.8)}} />
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
        height: HP(40),
        marginHorizontal: HP(2),
      }}>
      <Image
        source={Icons.Travel}
        style={{
          height: HP(23),
          width: WP(70),
          borderRadius: HP(1),
          // resizeMode: 'cover',
        }}
      />
      <View style={{paddingHorizontal: HP(1)}}>
        <CustomText
          style={{
            fontSize: FS(2.3),
            color: Colors.black,
            fontFamily: Fonts.MontserratMedium,
            marginTop: HP(1.5),
          }}>
          {item.Tag}
        </CustomText>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Icon name="location-dot" size={14} color={Colors.gray} /> */}
          <CustomText
            style={{
              fontSize: FS(1.7),
              color: Colors.gray,
              // marginLeft: WP(2),
            }}>
            {item.place}
          </CustomText>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: HP(2),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomText
              style={{
                fontSize: FS(2),
                //
                color: Colors.black,
                fontFamily: Fonts.MontserratBold,
              }}>
              {item.Money}
            </CustomText>
            <CustomText
              style={{
                fontSize: FS(1.6),
                color: Colors.gray,
                marginLeft: WP(1),
              }}>
              /Person
            </CustomText>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              borderRadius: HP(1.8),
              borderWidth: 1,
              // borderRightColor: HP(2),
            }}>
            <CustomText
              children={'Book Now'}
              style={{
                color: Colors.black,
                fontSize: FS(1.2),
                // fontWeight: '600',
                padding: HP(0.8),
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
        height: HP(11),
        width: HP(13.7),
        backgroundColor: Colors.white,
        borderRadius: HP(2),
        alignItems: 'center',
        justifyContent: 'center',
        margin: HP(0.7),
      }}>
      <Image
        source={item.Pic}
        style={{height: HP(8), width: WP(12), resizeMode: 'contain'}}
      />
      <CustomText
        style={{
          color: '#000',
          fontFamily: Fonts.MontserratSemiBold,
          marTginTop: HP(0.5),
        }}>
        {item.Tag}
      </CustomText>
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
          height: HP(25),
          width: WP(35),
          borderRadius: HP(1),
          marginRight: WP(3),
        }}
      />
      <CustomText
        style={{
          position: 'absolute',
          bottom: HP(1),
          color: Colors.white,
          left: WP(3),
          // fontWeight: '700',
        }}>
        {item.Tag} {'\n'}
        <CustomText style={{}}>{item.Country}</CustomText>
      </CustomText>
    </TouchableOpacity>
  );
  return (
    <View>
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
            style={{resizeMode: 'contain', height: HP(5), bottom: HP(2)}}
            source={Icons.Logo}
          />
          <View
            style={{
              height: HP(11),
              width: HP(11),
              borderRadius: HP(6),
              backgroundColor: '#fff',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                height: HP(10),
                width: HP(10),
                borderRadius: HP(5),
                backgroundColor: 'red',
                marTginTop: HP(1),
              }}
            />
          </View>
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
            <Icon name="location-dot" color={Colors.white} size={17} />
            <CustomText
              style={{
                color: Colors.white,
                marginLeft: WP(2),
                fontSize: FS(1.5),
              }}>
              You are in{' '}
              <CustomText
                children={'Goa'}
                style={{color: '#fff', textDecorationLine: 'underline'}}
              />
            </CustomText>
          </View>
          <CustomText
            style={{
              fontSize: FS(5),
              color: Colors.white,
              fontFamily: Fonts.MontserratBold,
            }}>
            Explore
          </CustomText>
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
          <CustomText style={styles.headerTamplete}>Book Now</CustomText>
          <View style={{marginTop: HP(1)}}>
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
            marginTop: HP(2),
          }}>
          <CustomText style={styles.headerTamplete}>Traking</CustomText>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                height: HP(6),
                width: WP(42),
                backgroundColor: '#FF647C',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: HP(1),
                marginTop: HP(1),
                marginRight: WP(5),
                // marginHorizontal: HP(1),
              }}>
              <CustomText
                children={'Flight Status'}
                style={{color: '#FFFFFF', fontFamily: Fonts.MontserratSemiBold}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: HP(6),
                width: WP(42),
                backgroundColor: '#3399FF',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: HP(1),
                marginTop: HP(1),
                marginRight: WP(2),
              }}>
              <CustomText
                children={'Train Status'}
                style={{color: '#FFFFFF'}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: WP(95),
            alignSelf: 'flex-end',
            marginTop: HP(2),
          }}>
          <CustomText style={styles.headerTamplete}>Trending</CustomText>
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
            marginTop: HP(3),
            borderRadius: HP(2),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={[styles.headerTamplete, {bottom: HP(1)}]}
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
            marginTop: HP(3),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              style={[
                styles.headerTamplete,
                {
                  marginVertical: HP(1),
                },
              ]}>
              Popular Experiences
            </CustomText>
            <TouchableOpacity style={{marginRight: WP(5)}}>
              <CustomText children={'See All'} />
            </TouchableOpacity>
          </View>
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
            marginTop: HP(4.5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <CustomText
              style={[
                styles.headerTamplete,
                {
                  marginVertical: HP(1),
                },
              ]}>
              Explore by interests
            </CustomText>
            <TouchableOpacity style={{marginRight: WP(5)}}>
              <CustomText children={'See All'} />
            </TouchableOpacity>
          </View>

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
          }}>
          <CustomText
            style={[
              styles.headerTamplete,
              {
                marginVertical: HP(2),
                marginTop: HP(3),
              },
            ]}>
            Unique Stays
          </CustomText>
          <FlatList
            data={Unique}
            renderItem={UniqueFun}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            height: HP(7),
            width: WP(90),
            alignSelf: 'center',
            // backgroundColor: 'white',
            marginTop: HP(2),
            // paddingBottom: HP(10),
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

const styles = StyleSheet.create({
  headerTamplete: {fontSize: FS(3), fontFamily: Fonts.MontserratBold},
});
