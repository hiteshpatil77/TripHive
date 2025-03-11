import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import MainView from '../../components/MainView';
import Icons from '../../theme/Icons';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/FontAwesome6';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Colors from '../../theme/Color';

export default function ExploreScreen() {
  const BookNow = [
    {
      Pic: Icons.flights,
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
  const renderBookFun = ({item}) => (
    <TouchableOpacity
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
      <Text>{item.Tag}</Text>
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
      <StatusBar hidden />
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
      <View
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
        <TextInput
          placeholder="hey ABC, Where do you want ro go?"
          style={{color: Colors.black, width: WP(73)}}
        />
      </View>
      <View
        style={{
          width: WP(95),
          alignSelf: 'flex-end',
        }}>
        <Text style={{fontSize: FS(2.5), fontWeight: 'bold'}}>Book Now</Text>
        <View style={{marginTop: HP(2)}}>
          <FlatList data={BookNow} renderItem={renderBookFun} numColumns={3} />
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
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
