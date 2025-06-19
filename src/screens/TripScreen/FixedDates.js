import {
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

export default function FixedDates({navigation}) {
  const [checked, setChecked] = useState(false);
  const [destinations, setDestinations] = useState([
    {place: '', date: 'Select date range'},
  ]);
  const removeDestination = index => {
    const updated = [...destinations];
    updated.splice(index, 1);
    setDestinations(updated);
  };
  const addDestination = () => {
    setDestinations([...destinations, {place: '', date: 'Select date range'}]);
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <TripHeader navigation={navigation} hearder={'Hive AI Planner'} />
      <View style={{width: WP(85), alignSelf: 'center'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: HP(29),
          }}>
          <Image
            source={Icons.PlaneRide}
            style={{resizeMode: 'center', height: HP(24)}}
          />
        </View>
        {/* <View>
          <CustomText
            children={'Where to'}
            style={{
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(1.7),
              color: Colors.textB,
            }}
          />
          {destinations.map((destination, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                paddingLeft: HP(2),
                height: HP(6),
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder={`Select a location ${index + 1}`}
                placeholderTextColor={'#737373'}
                style={{fontSize: FS(1.5)}}
              />
            </View>
          ))}
        </View> */}
        <CustomText
          children={`Where to`}
          style={{
            fontFamily: Fonts.MontserratBold,
            fontSize: FS(1.7),
            color: Colors.textB,
          }}
        />
        {/* {destinations.map((item, index) => (
          <View key={index}>
            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                paddingLeft: HP(2),
                height: HP(6),
                justifyContent: 'center',
                marginTop: HP(1),
              }}>
              <TextInput
                placeholder={`Enter location`}
                placeholderTextColor={'#737373'}
                value={item.place}
                onChangeText={text => {
                  const updated = [...destinations];
                  updated[index].place = text;
                  setDestinations(updated);
                }}
                style={{fontSize: FS(1.5)}}
              />
            </View>

            <CustomText
              children={`Date for Place ${index + 1}`}
              style={{
                fontFamily: Fonts.MontserratBold,
                fontSize: FS(1.7),
                color: Colors.textB,
                marginTop: HP(2),
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                paddingLeft: HP(2),
                height: HP(6),
                justifyContent: 'center',
                marginTop: HP(1),
              }}
              onPress={() => {
                // You can integrate a date picker modal here.
                alert('Open date picker for index ' + index);
              }}>
              <CustomText
                style={{fontSize: FS(1.4), color: Colors.textB}}
                children={item.date}
              />
            </TouchableOpacity>
          </View>
        ))} */}
        {destinations.map((item, index) => (
          <View key={index} style={{marginTop: HP(1)}}>
            {index !== 0 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HP(2),
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  style={{
                    marginRight: 8,
                    fontFamily: Fonts.MontserratBold,
                    fontSize: FS(1.7),
                    color: Colors.textB,
                  }}>
                  Next place to
                </CustomText>
                <TouchableOpacity onPress={() => removeDestination(index)}>
                  <Icon name="trash-2" size={15} color={Colors.textB} />
                </TouchableOpacity>
              </View>
            )}

            <TextInput
              placeholder="Select a location"
              value={item.place}
              onChangeText={text => {
                const updated = [...destinations];
                updated[index].place = text;
                setDestinations(updated);
              }}
              style={{
                borderRadius: HP(0.5),
                paddingHorizontal: HP(2),
                marginTop: 8,
                backgroundColor: '#F4F4F4',
                height: HP(6),
              }}
            />

            <TouchableOpacity
              onPress={() => {
                // Replace this alert with actual date picker logic
                alert(`Open date picker for index ${index}`);
              }}
              style={{
                borderRadius: 10,
                padding: HP(2),
                height: HP(6),
                justifyContent: 'center',
                marginTop: HP(2),
                backgroundColor: '#F4F4F4',
              }}>
              <CustomText style={{fontSize: FS(1.7), color: Colors.textB}}>
                {item.date}
              </CustomText>
            </TouchableOpacity>
          </View>
        ))}

        <View style={{}}>
          <TouchableOpacity style={{marginTop: HP(3)}} onPress={addDestination}>
            <CustomText
              children={'+ Add another destination'}
              style={{
                color: Colors.trip,
                fontFamily: Fonts.MontserratBold,
                fontSize: FS(1.7),
              }}
            />
          </TouchableOpacity>
          <CustomText
            children={'Auto generate an ltineray for you'}
            style={{
              color: Colors.textB,
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(1.7),
              marginTop: HP(3),
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: HP(1),
            }}>
            <TouchableOpacity
              onPress={() => setChecked(!checked)}
              style={{
                width: HP(2.5),
                height: HP(2.5),
                borderWidth: 1,
                borderColor: '#FFA015',
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: HP(1),
                backgroundColor: checked ? '#FFA015' : '#fff',
              }}>
              {checked && <Icon name="check" size={HP(1.8)} color="#fff" />}
            </TouchableOpacity>

            <CustomText
              style={{fontSize: FS(1.5), color: Colors.lightGT, width: WP(80)}}>
              {`Check this box and we'll create a tailor-made travel plan just for you!`}
            </CustomText>
          </View>
        </View>
        <CusButton
          SecTag={'Next'}
          navigation={navigation}
          NVT={() => navigation.navigate('AiPlanner')}
        />
        <View style={{marginTop: HP(3)}}>
          <CustomText
            style={{
              color: Colors.lightGT,
              fontSize: FS(1.6),
              textAlign: 'center',
            }}>
            By clicking Create Trip, you agree to our
            <CustomText
              style={{textDecorationLine: 'underline'}}
              children={' Terms and Conditions '}
            />
             and {' '}
            <CustomText
              style={{textDecorationLine: 'underline'}}
              children={'Privacy Policy.'}
            />
          </CustomText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
