import React, {useRef, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
} from 'react-native';
import CustomText from '../CustomText';
import {HP, WP} from '../../utils/Dimention';

const PassengerPickerModal = ({visible, onClose, onConfirm}) => {
  const [adult, setAdult] = useState(2);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(1);

  const numbers = Array.from({length: 100}, (_, i) => i); // 0–9
  const itemHeight = 40;

  // refs for each scroll
  const adultScrollRef = useRef(null);
  const childScrollRef = useRef(null);
  const infantScrollRef = useRef(null);

  const handleScroll = (event, setValue) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / itemHeight);
    if (index >= 0 && index < numbers.length) {
      setValue(numbers[index]);
    }
  };

  const renderPicker = (label, subLabel, value, setValue, scrollRef) => (
    <View style={styles.column}>
      <View
        style={{
          backgroundColor: '#FFEED6',
          padding: HP(1),
          borderRadius: HP(1),
          paddingHorizontal: HP(1.5),
        }}>
        <CustomText style={styles.label}>{label}</CustomText>
        <CustomText style={styles.subLabel}>{subLabel}</CustomText>
      </View>
      <View style={styles.pickerContainer}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          snapToInterval={itemHeight}
          decelerationRate="fast"
          onScroll={event => handleScroll(event, setValue)}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContainer}>
          {numbers.map((num, index) => (
            <View key={index} style={styles.numberItem}>
              <CustomText
                style={[
                  styles.numberText,
                  num === value ? styles.selectedNumber : styles.fadedNumber,
                ]}>
                {num.toString()}
              </CustomText>
            </View>
          ))}
        </ScrollView>
        <View style={styles.highlightOverlay} pointerEvents="none" />
      </View>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.handle} />
          <CustomText style={styles.title}>No. of Passengers</CustomText>

          <View style={styles.row}>
            {renderPicker('Adult', 'Age 17+', adult, setAdult, adultScrollRef)}
            {renderPicker(
              'Child',
              'Ages 2–17',
              child,
              setChild,
              childScrollRef,
            )}
            {renderPicker(
              'Infant',
              'Below 2',
              infant,
              setInfant,
              infantScrollRef,
            )}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <CustomText style={styles.cancelText}>Cancel</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                onConfirm({adult, child, infant});
                onClose(); // ✅ Close modal after confirming
              }}>
              <CustomText style={styles.confirmText}>Confirm</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  handle: {
    width: WP(15),
    height: 5,
    borderRadius: 3,
    backgroundColor: '#FC7916',
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  column: {
    alignItems: 'center',
    // backgroundColor: '#FFF6EE',
    borderRadius: 12,
    paddingVertical: 12,
    width: 95,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#3C3C3C',
  },
  subLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  pickerContainer: {
    height: 120,
    width: 60,
    overflow: 'hidden',
    position: 'relative',
  },
  scrollContainer: {
    paddingVertical: 40,
  },
  numberItem: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  numberText: {
    fontSize: 20,
  },
  selectedNumber: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  fadedNumber: {
    color: '#aaa',
  },
  highlightOverlay: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    height: 40,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    padding: 14,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#3D5AFE',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#555',
    fontWeight: '600',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '700',
  },
});

export default PassengerPickerModal;
