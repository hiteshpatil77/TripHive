import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import TripHeader from '../../components/TripHeader';
import {FS, HP, WP} from '../../utils/Dimention';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/Feather';
import CusButton from '../../components/CusButton';

export default function InviteFriend({navigation}) {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const UserData = [
    {id: 0, UserPic: Icons.Travel, name: 'Varun B.'},
    {id: 1, UserPic: Icons.Travel, name: 'Varun B.'},
    {id: 2, UserPic: Icons.Travel, name: 'Varun B.'},
    {id: 3, UserPic: Icons.Travel, name: 'Varun B.'},
    {id: 4, UserPic: Icons.Travel, name: 'Varun B.'},
    {id: 5, UserPic: Icons.Travel, name: 'Varun B.'},
  ];

  const UserFun = ({item}) => {
    const isSelected = selectedUsers.includes(item.id);

    const toggleSelection = () => {
      if (isSelected) {
        setSelectedUsers(prev => prev.filter(id => id !== item.id));
      } else {
        setSelectedUsers(prev => [...prev, item.id]);
      }
    };

    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: WP(85),
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              marginTop: HP(2),
              alignItems: 'center',
            }}>
            <Image
              source={item.UserPic}
              style={{height: HP(5.5), width: HP(5.5), borderRadius: HP(3)}}
            />
            <CustomText
              children={item.name}
              style={{
                fontFamily: Fonts.MontserratBold,
                fontSize: FS(2.3),
                marginHorizontal: HP(2),
                color: Colors.textB,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleSelection}
            style={{
              width: HP(2.5),
              height: HP(2.5),
              borderWidth: 1,
              borderColor: '#FFA015',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: HP(1),
              backgroundColor: isSelected ? '#FFA015' : '#fff',
            }}>
            {isSelected && <Icon name="check" size={HP(1.8)} color="#fff" />}
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.2,
            width: WP(72),
            alignSelf: 'flex-end',
            marginTop: HP(1.5),
            borderColor: Colors.textB,
            right: WP(5),
          }}
        />
      </View>
    );
  };

  const HeaderComponent = () => {
    return (
      <View>
        <Image
          source={Icons.Sharing}
          style={{
            resizeMode: 'center',
            height: HP(35),
            marginTop: HP(3),
            alignSelf: 'center',
          }}
        />
        <View style={{width: WP(90), alignSelf: 'center'}}>
          <CustomText
            children={'Invite Friends to trip (option)'}
            style={{marginTop: HP(3), fontFamily: Fonts.MontserratBold}}
          />
          <TextInput
            placeholder={`Search friend's name`}
            style={{
              backgroundColor: '#F4F4F4',
              paddingLeft: HP(2.5),
              borderRadius: HP(1),
              height: HP(7),
              marginTop: HP(2),
            }}
          />
          <View style={{flexDirection: 'row', marginTop: HP(2)}}>
            <Image source={Icons.Star} style={{height: HP(2), width: HP(2)}} />
            <CustomText
              children={'Favourites'}
              style={{
                marginLeft: HP(1.5),
                color: '#D9D9D9',
                fontFamily: Fonts.MontserratBold,
              }}
            />
          </View>
          {/* Flatlist User */}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <TripHeader navigation={navigation} hearder={'Hive Al Planner'} />
      <FlatList
        keyExtractor={item => item.id}
        data={UserData}
        renderItem={UserFun}
        ListHeaderComponent={HeaderComponent}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
      />
      <Image
        source={Icons.WhiteBG}
        style={{
          position: 'absolute',
          bottom: HP(0),
          resizeMode: 'cover',
        }}
      />
      <View style={{alignItems: 'center', marginBottom: HP(2)}}>
        <CusButton
          SecTag={'Next'}
          navigation={navigation}
          NVT={() => navigation.navigate('BachersTrip')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
