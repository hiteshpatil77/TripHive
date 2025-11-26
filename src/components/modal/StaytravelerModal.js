import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native';
import {FS, WP} from '../../utils/Dimention';
import CustomText from '../CustomText';
import Fonts from '../../theme/Fonts';

const RoomGuestModal = ({visible, onClose, onConfirm}) => {
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [pets, setPets] = useState(false);

  const increment = setter => setter(prev => prev + 1);
  const decrement = setter => setter(prev => (prev > 0 ? prev - 1 : 0));

  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <CustomText style={styles.title}>
                Select rooms and guests
              </CustomText>

              {/* Rooms */}
              <View style={styles.row}>
                <CustomText style={styles.label}>Rooms</CustomText>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => decrement(setRooms)}>
                    <CustomText style={styles.counterSymbol}>−</CustomText>
                  </TouchableOpacity>
                  <CustomText style={styles.counterValue}>{rooms}</CustomText>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => increment(setRooms)}>
                    <CustomText style={styles.counterSymbol}>+</CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Adults */}
              <View style={styles.row}>
                <CustomText style={styles.label}>Adults</CustomText>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => decrement(setAdults)}>
                    <CustomText style={styles.counterSymbol}>−</CustomText>
                  </TouchableOpacity>
                  <CustomText style={styles.counterValue}>{adults}</CustomText>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => increment(setAdults)}>
                    <CustomText style={styles.counterSymbol}>+</CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children */}
              <View style={styles.row}>
                <View>
                  <CustomText style={styles.label}>Children</CustomText>
                  <CustomText style={styles.subLabel}>Ages 0–17</CustomText>
                </View>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => decrement(setChildren)}>
                    <CustomText style={styles.counterSymbol}>−</CustomText>
                  </TouchableOpacity>
                  <CustomText style={styles.counterValue}>
                    {children}
                  </CustomText>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => increment(setChildren)}>
                    <CustomText style={styles.counterSymbol}>+</CustomText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Pets */}
              <View style={styles.row}>
                <View>
                  <CustomText style={styles.label}>
                    Traveling with pets?
                  </CustomText>
                  <CustomText style={styles.subLabel}>
                    More info about pets/assistance pets
                  </CustomText>
                </View>
                <Switch
                  value={pets}
                  onValueChange={setPets}
                  trackColor={{false: '#ccc', true: '#FFA500'}}
                  thumbColor={pets ? '#fff' : '#fff'}
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                  <CustomText style={styles.cancelText}>Cancel</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => onConfirm({rooms, adults, children, pets})}>
                  <CustomText style={styles.confirmText}>Confirm</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default RoomGuestModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    // width: WP(100),
    // alignItems: 'center',
  },
  modalContainer: {
    width: WP(100),
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: FS(2),
    color: '#3E3E54',
    fontFamily: Fonts.MontserratBold,
  },
  subLabel: {
    fontSize: FS(1.4),
    color: '#B9B9B9',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEED6',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  counterButton: {
    padding: 8,
  },
  counterSymbol: {
    fontSize: 20,
    color: '#3E3E54',
    fontFamily: Fonts.MontserratBold,
  },
  counterValue: {
    fontSize: 16,
    // fontWeight: '600',
    marginHorizontal: 10,
    fontFamily: Fonts.MontserratBold,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#EAEAEA',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4A5FFF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelText: {
    color: '#737373',
    fontSize: FS(2),
    // fontWeight: '600',
  },
  confirmText: {
    color: '#fff',
    fontSize: FS(2),
    // fontWeight: '600',
  },
});
