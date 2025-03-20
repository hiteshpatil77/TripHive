import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Colors from '../../theme/Color';
import CustomText from '../CustomText';

export default function SearchModal({modalVisible, closeModal}) {
  const suggestions = [
    {
      Tag: 'Discover Santorini',
      icon: 'world',
    },
    {
      Tag: 'Homes nearby beautiful beach',
      icon: 'home',
    },
  ];

  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icon size={30} name={'close'} />
          </TouchableOpacity>

          <View style={styles.searchInputContainer}>
            <TextInput
              placeholder="Search destinations, hotels..."
              style={styles.searchInput}
            />
          </View>
          {/* suggestions */}
          <View>
            <CustomText
              children={'Things you could search for...'}
              style={styles.suggestionText}
            />

            {suggestions.map((item, index) => (
              <TouchableOpacity key={index} style={styles.suggestionTouchable}>
                <View style={styles.suggestionItem}>
                  <Fontisto color={'#0330fc'} size={17} name={item.icon} />
                  <CustomText
                    style={styles.suggestionLabel}
                    children={item.Tag}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {/* suggestions end*/}
          <View></View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    width: WP(90),
    alignSelf: 'center',
  },
  closeButton: {
    marginLeft: WP(0),
  },
  searchInputContainer: {
    borderWidth: 1,
    justifyContent: 'center',
    width: WP(90),
    alignSelf: 'center',
    borderRadius: HP(1),
    marginVertical: HP(2),
    borderColor: '#0330fc',
  },
  searchInput: {
    marginRight: HP(2),
    padding: HP(1.5),
    color: '#000',
  },
  suggestionText: {
    fontWeight: 'bold',
    marginVertical: HP(1),
  },
  suggestionTouchable: {
    marginVertical: HP(0.5),
    elevation: 10,
    backgroundColor: '#fff', // Add a background color to show elevation
    borderRadius: HP(0.5),
    alignSelf: 'flex-start',
  },
  suggestionItem: {
    padding: HP(1),
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'center',
  },
  suggestionLabel: {
    marginHorizontal: WP(2),
  },
});
