import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import MainView from '../../components/MainView';
import {FS, HP, WP} from '../../utils/Dimention';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Colors from '../../theme/Color';

export default function ExpensesScreen() {
  const [activeTab, setActiveTab] = useState('Friends');
  const friends = [
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'owen you',
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
      Tag: 'owen you',
      RS: '₹999.00',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'you owen',
      RS: '₹999.00',
    },
    {
      name: 'Rohit patil',
      Pic: Icons.Travel,
      Tag: 'owen you',
      RS: '₹999.00',
    },
  ];

  const groups = [];
  const activity = [];
  const renderData = () => {
    let data = [];
    if (activeTab === 'Friends') data = friends;
    if (activeTab === 'Groups') data = groups;
    if (activeTab === 'Activity') data = activity;

    if (data.length === 0) {
      return (
        <View style={{alignItems: 'center', marginVertical: HP(2)}}>
          <CustomText children={'No data available'} />
        </View>
      );
    }

    return data.map((item, index) => (
      <View
        key={index}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: HP(2),
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
          <CustomText children={item.name} />
        </View>
        <View>
          <CustomText
            style={{
              color:
                item.Tag === 'settled up'
                  ? 'gray'
                  : item.Tag === 'you owen'
                  ? 'red'
                  : '#2AD400',
            }}
            children={item.Tag}
          />
          {item.RS && (
            <CustomText
              style={{
                color: item.Tag === 'you owen' ? 'red' : '#2AD400',
              }}
              children={item.RS}
            />
          )}
        </View>
      </View>
    ));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'#FF754D'} />
      <ScrollView>
        <LinearGradient colors={['#FF754D', '#FF754D', '#FFA015']}>
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
                style={{resizeMode: 'contain', height: HP(6), width: WP(15)}}
                source={Icons.Logo}></Image>
              <CustomText style={{fontSize: FS(2.5)}} children={'Expenses'} />
              <Image
                style={{
                  height: HP(6),
                  width: HP(6),
                  borderRadius: HP(3),
                  borderWidth: 2,
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
            style={{color: '#000', fontWeight: '700', fontSize: FS(2)}}
            children={'Overall, You are Owed'}
          />
          <CustomText
            style={{fontSize: FS(2.3), fontWeight: 'bold', color: '#2AD400'}}
            children={'₹19999.00'}
          />
        </View>
        <View
          style={{
            backgroundColor: '#F3EFE6',
            bottom: HP(3),
            borderRadius: HP(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: HP(3),
              height: HP(4),
              top: HP(2),
              alignItems: 'center',
            }}>
            {['Friends', 'Groups', 'Activity'].map(tab => (
              <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
                <CustomText
                  style={{color: activeTab === tab ? 'orange' : 'black'}}
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
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: WP(27),
                  }}>
                  <CustomText children={'Sort by'} />
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
                  <CustomText children={'Filters'} />
                  <TouchableOpacity style={{}}>
                    <Ionicons
                      style={{position: 'absolute', left: WP(2)}}
                      name="chevron-down"
                      size={20}
                      color="orange"
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={{left: WP(35)}}>
                  <FontAwesome6 name="user-plus" />
                </TouchableOpacity>
              </View>
              <View>{renderData()}</View>
              <View style={{height: HP(20)}}></View>
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Fixed Button */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: '#FF754D',
          borderRadius: HP(5),
          bottom: HP(12),
          right: HP(3),
          zIndex: 1,
        }}>
        <Text
          style={{
            fontSize: FS(4),
            color: 'white',
            padding: HP(0.5),
            paddingHorizontal: HP(2),
          }}>
          +
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
