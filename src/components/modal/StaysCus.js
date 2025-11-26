import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../CustomText';
import Fonts from '../../theme/Fonts';

const StaysCus = ({visible, onClose, onConfirm}) => {
  const [tab, setTab] = useState('Flexible');
  const [stayDuration, setStayDuration] = useState('A Weekend');
  const [selectedMonth, setSelectedMonth] = useState('This Month');

  const durations = ['A Weekend', 'A week', 'A month', 'More'];
  const months = ['This Month', 'Next', 'March', 'May', 'April', 'June'];

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, tab === 'Calendar' && styles.activeTab]}
                onPress={() => setTab('Calendar')}>
                <CustomText
                  style={[
                    styles.tabText,
                    tab === 'Calendar' && styles.activeTabText,
                  ]}>
                  Calendar
                </CustomText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.tab, tab === 'Flexible' && styles.activeTab]}
                onPress={() => setTab('Flexible')}>
                <CustomText
                  style={[
                    styles.tabText,
                    tab === 'Flexible' && styles.activeTabText,
                  ]}>
                  Flexible
                </CustomText>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Stay Duration */}
            <CustomText style={styles.sectionTitle}>
              How long do you want to stay?
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.optionRow}>
              {durations.map(item => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.optionButton,
                    stayDuration === item && styles.selectedOption,
                    stayDuration === item
                      ? styles.selectedOption // when selected
                      : {borderWidth: 1, borderColor: '#FFA500'},
                  ]}
                  onPress={() => setStayDuration(item)}>
                  <CustomText
                    style={[
                      styles.optionText,
                      stayDuration === item && styles.selectedText,
                    ]}>
                    {item}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Month Selection */}
            <CustomText style={[styles.sectionTitle, {marginTop: 15}]}>
              When do you want to go?
            </CustomText>
            <CustomText style={styles.subText}>
              Select a month or more
            </CustomText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{width: WP(100)}}>
              {months.map(month => (
                <TouchableOpacity
                  key={month}
                  style={[
                    styles.optionButton,
                    selectedMonth === month
                      ? styles.selectedOption // when selected
                      : {borderWidth: 1, borderColor: '#FFA500'},
                  ]}
                  onPress={() => setSelectedMonth(month)}>
                  <CustomText
                    style={[
                      styles.optionText,
                      selectedMonth === month && styles.selectedText,
                    ]}>
                    {month}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <CustomText style={styles.cancelText}>Cancel</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => onConfirm(stayDuration, selectedMonth)}>
                <CustomText style={styles.confirmText}>Confirm</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default StaysCus;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    width: WP(100),
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
  },
  tabText: {
    fontSize: 16,
    color: '#777',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: FS(2),
    // fontWeight: '600',
    color: '#333',
    fontFamily: Fonts.MontserratBold,
  },
  subText: {
    fontSize: FS(2),
    color: '#3E3E54',
    marginBottom: 5,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: WP(100),
  },
  optionButton: {
    // borderWidth: 1,
    borderColor: '#FFA500',
    padding: HP(1.5),
    borderRadius: HP(1),
    marginHorizontal: HP(1),
  },
  selectedOption: {
    backgroundColor: '#FFEED6',
    // borderWidth: 1,
  },
  optionText: {
    color: '#333',
    fontSize: 14,
  },
  selectedText: {
    color: '#737373',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#EAEAEA',
    flex: 1,
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4A5FFF',
    flex: 1,
    marginLeft: 10,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#333',
    fontWeight: '500',
  },
  confirmText: {
    color: '#fff',
    fontWeight: '600',
  },
});
