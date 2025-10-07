import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TripHeader from '../../components/TripHeader';
import {FS, HP, WP} from '../../utils/Dimention';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import Fonts from '../../theme/Fonts';
import Colors from '../../theme/Color';
import Icon from 'react-native-vector-icons/Feather';
import CusButton from '../../components/CusButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Flexible({navigation}) {
  const [checked, setChecked] = useState(false);
  const [destinations, setDestinations] = useState([
    {place: '', date: 'Select date'},
  ]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const showDatePicker = index => {
    setSelectedIndex(index);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    if (selectedIndex !== null) {
      const updated = [...destinations];
      updated[selectedIndex].date = date.toLocaleDateString(); // format date
      setDestinations(updated);
    }
    hideDatePicker();
  };

  const removeDestination = index => {
    const updated = [...destinations];
    updated.splice(index, 1);
    setDestinations(updated);
  };

  const addDestination = () => {
    setDestinations([...destinations, {place: '', date: 'Select date'}]);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
          <View>
            <CustomText
              children={'Travel month (optional)'}
              style={{
                fontFamily: Fonts.MontserratBold,
                fontSize: FS(1.7),
                color: Colors.textB,
              }}
            />
            <View
              style={{
                backgroundColor: '#F4F4F4',
                borderRadius: HP(0.5),
                paddingLeft: HP(2),
                height: HP(6),
                justifyContent: 'center',
              }}>
              <TextInput
                placeholder="Select month"
                placeholderTextColor={'#737373'}
                style={{
                  fontSize: FS(1.7),
                  fontFamily: Fonts.MontserratBold,
                  color: '#333',
                }}
              />
            </View>
          </View>

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
                  fontFamily: Fonts.MontserratRegular,
                  fontSize: FS(1.7),
                  color: '#333',
                }}
              />

              <TouchableOpacity
                onPress={() => showDatePicker(index)}
                style={{
                  borderRadius: 10,
                  padding: HP(2),
                  height: HP(6),
                  justifyContent: 'center',
                  marginTop: HP(2),
                  backgroundColor: '#F4F4F4',
                }}>
                <CustomText
                  style={{
                    fontSize: FS(1.7),
                    color: Colors.textB,
                    fontFamily: Fonts.MontserratRegular,
                  }}>
                  {item.date}
                </CustomText>
              </TouchableOpacity>
            </View>
          ))}

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
            children={'Auto generate an itinerary for you'}
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
              style={{
                fontSize: FS(1.5),
                color: Colors.lightGT,
                width: WP(80),
                marginVertical: HP(2),
              }}>
              {`Check this box and we'll create a tailor-made travel plan just for you!`}
            </CustomText>
          </View>

          <CusButton
            SecTag={'Next'}
            navigation={navigation}
            NVT={() => navigation.navigate('AiPlanner')}
          />

          <View style={{marginVertical: HP(2)}}>
            <CustomText
              style={{
                color: Colors.lightGT,
                fontSize: FS(1.6),
                textAlign: 'center',
              }}>
              By clicking Create Trip, you agree to our
              <CustomText
                style={{textDecorationLine: 'underline'}}
                children={' Terms and Conditions '}
              />
              and{' '}
              <CustomText
                style={{textDecorationLine: 'underline'}}
                children={'Privacy Policy.'}
              />
            </CustomText>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Date Picker outside ScrollView */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
