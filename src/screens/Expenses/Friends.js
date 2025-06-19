import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Colors from '../../theme/Color';
import Icons from '../../theme/Icons';
import LinearGradient from 'react-native-linear-gradient';
import Fonts from '../../theme/Fonts';

export default function Friends({navigation}) {
  const activity = [
    {id: 1, name: 'Expenses', color: '#C09FF8'},
    {id: 2, name: 'Shared Trips', color: '#F89F9F'},
    {id: 3, name: 'Groups', color: '#F8DA9F'},
    {id: 4, name: 'Curated Trips', color: '#9FF8A8'},
  ];

  const renderActivityCards = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          paddingHorizontal: WP(2),
        }}>
        {activity.map(item => (
          <TouchableOpacity
            key={item.id}
            style={{
              height: HP(18),
              width: WP(40),
              backgroundColor: item.color,
              borderRadius: HP(3),
              margin: WP(2),
            }}>
            <Image
              source={Icons.errowe}
              style={{
                position: 'absolute',
                right: HP(2),
                height: HP(4),
                width: WP(4),
                resizeMode: 'contain',
                top: HP(1.5),
              }}
            />
            <CustomText
              children={item.name}
              style={{
                position: 'absolute',
                bottom: HP(1),
                left: HP(2),
                fontSize: FS(2),
                fontFamily: Fonts.MontserratMedium,
              }}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <LinearGradient colors={['#FF754D', '#FF7521']}>
        <View style={{height: HP(3)}} />
      </LinearGradient>
      {/**Header */}
      <View
        style={{
          height: HP(33),
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
              height: HP(11),
              width: HP(11),
              borderRadius: HP(6),
              backgroundColor: Colors.gray,
            }}
          />
          <View
            style={{
              justifyContent: 'center',
              marginLeft: HP(2),
              width: WP(60),
            }}>
            <CustomText
              style={{
                fontSize: FS(2.5),
                color: '#3E3E54',
                fontFamily: Fonts.MontserratExtraBold,
              }}
              children={'Varun B.'}
            />
            <CustomText
              style={{
                fontSize: FS(1.7),
                color: '#A2A2A2',
                fontFamily: Fonts.MontserratRegular,
              }}
              children={'Maharastra '}
            />
            <CustomText
              style={{
                fontSize: FS(1.7),
                color: '#A2A2A2',
                fontFamily: Fonts.MontserratRegular,
              }}
              children={'Friends Since 1 Year '}
            />
            <CustomText
              style={{
                fontSize: FS(1.7),
                color: '#A2A2A2',
                fontFamily: Fonts.MontserratRegular,
                marginTop: HP(1),
              }}
              children={'Friends Since 1 Year '}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: HP(3),
            width: WP(80),
            alignSelf: 'center',
            bottom: HP(1),
          }}>
          <TouchableOpacity
            style={{
              borderRadius: WP(3),
              paddingHorizontal: WP(4),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#00BF4C',
            }}>
            <CustomText
              style={{
                paddingHorizontal: WP(2),
                padding: HP(0.7),
                fontSize: FS(1.7),
                color: '#00BF4C',
              }}
              children={'Add to Favourites'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: WP(3),
              paddingHorizontal: WP(4),
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#A2A2A2',
            }}>
            <CustomText
              style={{
                paddingHorizontal: WP(2),
                padding: HP(0.7),
                fontSize: FS(1.7),
                color: '#A2A2A2',
              }}
              children={'Remove'}
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
          bottom: HP(6),
        }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: HP(7),
            paddingBottom: HP(2),
          }}>
          {renderActivityCards()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
