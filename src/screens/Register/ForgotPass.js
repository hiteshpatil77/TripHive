import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import MainView from '../../components/MainView';
import {FS, HP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../theme/Color';
import RoundButton from '../../components/RoundButton';

export default function ForgotPass({navigation}) {
  const [selected, setSelected] = useState('phone');
  return (
    <MainView>
      <View style={{padding: HP(1), flex: 1}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={HP(3)} color="black" />
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: HP(4)}}>
          <Text style={{fontSize: FS(4), fontWeight: 'bold'}}>
            Forgot Password
          </Text>
          <Text
            style={{
              fontSize: FS(2),
              textAlign: 'center',
              marginTop: HP(2),
              color: Colors.gray,
            }}>
            Please enter your phone number. So we'll send you link to get back
            into your account
          </Text>
        </View>
        <View style={styles.container}>
          {/* Email Option */}
          <TouchableOpacity
            style={[
              styles.option,
              selected === 'email' && styles.selectedOption,
            ]}
            onPress={() => setSelected('email')}>
            <View style={styles.row}>
              <Icon
                name="mail"
                size={25}
                color={selected === 'email' ? Colors.Main : Colors.black}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>MikeHarley@gmail.com</Text>
              </View>
            </View>
            {selected === 'email' ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={30}
                color={Colors.Main}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={30}
                color={Colors.gray}
              />
            )}
          </TouchableOpacity>

          {/* Phone Option */}
          <TouchableOpacity
            style={[
              styles.option,
              // styles.phoneOption,
              selected === 'phone' && styles.selectedOption,
            ]}
            onPress={() => setSelected('phone')}>
            <View style={styles.row}>
              <Feather
                name="phone-call"
                size={23}
                color={selected === 'email' ? Colors.black : Colors.Main}
              />
              <View style={styles.textContainer}>
                <Text style={styles.label}>Phone Number</Text>
                <Text style={styles.value}>+689 548 89565</Text>
              </View>
            </View>
            {selected === 'phone' ? (
              <MaterialCommunityIcons
                name="check-circle"
                size={30}
                color={Colors.Main}
              />
            ) : (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={30}
                color={Colors.gray}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          marginBottom: HP(3),
          marginRight: HP(2),
        }}>
        <RoundButton />
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  option: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  phoneOption: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF8F2',
  },
  selectedOption: {
    borderColor: Colors.primary,
    backgroundColor: '#FFF8F2',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: HP(2),
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
});
