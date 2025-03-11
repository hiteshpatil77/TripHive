import React, {useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import Icons from '../../theme/Icons';
import {FS, HP, WP} from '../../utils/Dimention';
import MainView from '../../components/MainView';
import Colors from '../../theme/Color';
import Fonts from '../../theme/fonts';

const FirstScreen = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null); // ✅ Properly define swiperRef using useRef

  return (
    <MainView>
      {activeIndex !== 4 && (
        <TouchableOpacity
          onPress={() => swiperRef.current?.scrollBy(4 - activeIndex)}
          style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      <Swiper
        ref={swiperRef} // ✅ Attach swiperRef to Swiper component
        loop={false}
        showsPagination={activeIndex !== 4}
        activeDotColor={Colors.SkipButton}
        paginationStyle={{top: HP(80)}}
        onIndexChanged={index => setActiveIndex(index)}>
        <View style={styles.container}>
          <Image
            source={Icons.lady2}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{width: WP(70)}}>
            <Text style={styles.title}>Plan your trip</Text>
            <Text style={styles.subtitle}>
              With just places on your mind start planing the trip
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Image
            source={Icons.lady4}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{width: WP(70)}}>
            <Text style={styles.title}>Discover</Text>
            <Text style={styles.subtitle}>
              Find inspiration, explore fascinating destinations with the Hive
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Image
            source={Icons.lady3}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{width: WP(70)}}>
            <Text style={styles.title}>Rates Scanner</Text>
            <Text style={styles.subtitle}>
              Compare transport and stay rates across many websites
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Image
            source={Icons.lady5}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{width: WP(70)}}>
            <Text style={styles.title}>Budget & Expenses</Text>
            <Text style={styles.subtitle}>
              Handle all finances with an ease be it a group or a solo thing
            </Text>
          </View>
        </View>

        <View style={[styles.container, {paddingTop: HP(24)}]}>
          <Image
            source={Icons.lady1}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={{width: WP(70)}}>
            <Text style={styles.title}>Start your adventure</Text>
            <Text style={styles.subtitle}>
              We hope TripHive will be a part of all your journeys ahead
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Welcome')}
            style={{top: HP(6)}}>
            <Image source={Icons.round} style={{resizeMode: 'center'}} />
          </TouchableOpacity>
        </View>
      </Swiper>
    </MainView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  skipButton: {
    position: 'absolute',
    top: HP(-2),
    right: 20,
    zIndex: 1,
  },
  skipText: {
    color: 'blue',
    fontSize: 16,
    top: HP(3),
    fontFamily: Fonts.Regular,
  },
  image: {
    width: HP(25),
    height: HP(25),
    marginBottom: 20,
  },
  title: {
    fontSize: FS(3),
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: Fonts.Regular,
  },
  subtitle: {
    fontSize: FS(1.8),
    color: 'gray',
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: Fonts.Regular,
  },
  startButton: {
    marginTop: 20,
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  startText: {
    color: 'white',
    fontSize: 16,
  },
});
export default FirstScreen;
