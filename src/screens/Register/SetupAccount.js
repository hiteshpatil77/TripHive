import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import MainView from '../../components/MainView';
import {FS, HP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/Color';
import {launchImageLibrary} from 'react-native-image-picker';
import Input from '../../components/Input';
import RoundButton from '../../components/RoundButton';
import Fonts from '../../theme/Fonts';

export default function SetupAccount({navigation}) {
  const [image, setImage] = useState(null);

  const selectImage = () => {
    let options = { 
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0].uri);
      }
    });
  };

  return (
    <MainView>
      <View style={{paddingHorizontal: HP(1.5), padding: HP(1)}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" size={HP(3)} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
            <Text
              style={{
                fontSize: FS(2),
                marginRight: HP(1),
                fontFamily: Fonts.Regular,
              }}>
              Skip
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginTop: HP(4)}}>
          <Text
            style={{
              fontSize: FS(4),
              fontWeight: 'bold',
              fontFamily: Fonts.Regular,
            }}>
            Setup Your Account
          </Text>
          <Text
            style={{
              fontSize: FS(2),
              textAlign: 'center',
              marginTop: HP(2),
              color: Colors.gray,
              fontFamily: Fonts.Regular,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginVertical: HP(3),
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity onPress={selectImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{uri: image}} style={styles.image} />
            ) : (
              <Text style={styles.imageText}>Pick an Image</Text>
            )}
          </TouchableOpacity>
        </View>
        <Input Place="Enter Name" icon="user" />
      </View>
      <View
        style={{
          flex: 0.85,
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          marginRight: HP(2),
        }}>
        <RoundButton onp={() => navigation.navigate('Welcome')} />
      </View>
    </MainView>
  );
}

const styles = StyleSheet.create({
  imagePicker: {
    width: HP(14),
    height: HP(14),
    borderRadius: HP(3),
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: HP(14),
    height: HP(14),
    borderRadius: HP(3),
  },
  imageText: {
    fontSize: FS(2),
    color: Colors.gray,
    fontFamily: Fonts.Regular,
  },
});
