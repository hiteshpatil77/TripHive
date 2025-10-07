import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {HP, WP, FS} from '../../utils/Dimention';
import Fonts from '../../theme/Fonts';
import CustomText from '../CustomText';

const CustomSplitModal = ({
  visible,
  onClose,
  amount,
  friends,
  splitByMode,
  setSplitByMode,
  selectedSplitters,
  setSelectedSplitters,
  splitValues,
  setSplitValues,
  unequallyTotal,
  unequallyValid,
  percentageTotal,
  percentageValid,
  totalShares,
  ratioShares,
  canConfirm,
  equallyShares,
  unequallyShares,
  percentageShares,
  setSplitResult,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.2)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: HP(2),
            }}>
            {/* Header */}
            <View
              style={{
                borderWidth: 1.7,
                borderColor: '#FC7916',
                width: WP(15),
                alignSelf: 'center',
                marginBottom: HP(2),
              }}
            />
            <CustomText
              children={'Split by'}
              style={{
                alignSelf: 'center',
                fontSize: FS(1.8),
                fontFamily: Fonts.MontserratBold,
              }}
            />
            <ScrollView
              horizontal
              keyboardShouldPersistTaps="handled"
              showsHorizontalScrollIndicator={false}
              style={{
                flexDirection: 'row',
                marginBottom: 16,
                marginHorizontal: HP(2),
                marginTop: HP(2),
                width: WP(87),
              }}>
              {['equally', 'unequally', 'percentage', 'ratio'].map(mode => (
                <TouchableOpacity
                  key={mode}
                  style={{
                    alignItems: 'center',
                    backgroundColor:
                      splitByMode === mode ? '#FF9800' : '#F4F4F4',
                    borderRadius: 8,
                    justifyContent: 'center',
                    height: HP(5),
                    marginRight: HP(1),
                  }}
                  onPress={() => setSplitByMode(mode)}>
                  <CustomText
                    style={{
                      fontFamily:
                        splitByMode === mode
                          ? Fonts.MontserratBold
                          : Fonts.MontserratRegular,
                      color: splitByMode === mode ? '#fff' : '#888',
                      paddingHorizontal: HP(2),
                    }}>
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Mode Content */}
            {splitByMode === 'equally' && (
              <EquallySplit
                friends={friends}
                selectedSplitters={selectedSplitters}
                setSelectedSplitters={setSelectedSplitters}
              />
            )}

            {splitByMode === 'unequally' && (
              <UnequallySplit
                friends={friends}
                amount={amount}
                splitValues={splitValues}
                setSplitValues={setSplitValues}
                unequallyTotal={unequallyTotal}
                unequallyValid={unequallyValid}
              />
            )}

            {splitByMode === 'percentage' && (
              <PercentageSplit
                friends={friends}
                amount={amount}
                splitValues={splitValues}
                setSplitValues={setSplitValues}
                percentageTotal={percentageTotal}
                percentageValid={percentageValid}
              />
            )}

            {splitByMode === 'ratio' && (
              <RatioSplit
                friends={friends}
                amount={amount}
                splitValues={splitValues}
                setSplitValues={setSplitValues}
                totalShares={totalShares}
                ratioShares={ratioShares}
              />
            )}

            {/* Footer */}
            <View style={{flexDirection: 'row', marginTop: 22, bottom: HP(2)}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#ECECEC',
                  borderRadius: 8,
                  padding: 14,
                  alignItems: 'center',
                  marginRight: 8,
                }}
                onPress={onClose}>
                <CustomText style={{color: '#888'}}>Cancel</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#4955E6',
                  borderRadius: 8,
                  padding: 14,
                  alignItems: 'center',
                  marginLeft: 8,
                }}
                onPress={() => {
                  if (canConfirm) {
                    setSplitResult(
                      splitByMode === 'equally'
                        ? equallyShares()
                        : splitByMode === 'unequally'
                        ? unequallyShares
                        : splitByMode === 'percentage'
                        ? percentageShares
                        : ratioShares,
                    );
                    onClose();
                  } else {
                    alert('Please select valid split options.');
                  }
                }}>
                <CustomText style={{color: '#fff'}}>Confirm</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// You can later break out these into smaller components (EquallySplit, UnequallySplit, etc.)

export default CustomSplitModal;
