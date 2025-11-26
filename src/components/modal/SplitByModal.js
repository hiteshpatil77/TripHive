import React from 'react';
import {
  Modal,
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import {CustomText} from '../CustomText';
import {HP, WP, FS} from '../../utils/Dimention';
import Fonts from '../../theme/Fonts';

const SplitByModal = ({
  visible,
  onClose,
  friends,
  amount,
  splitByMode,
  setSplitByMode,
  selectedSplitters,
  setSelectedSplitters,
  splitValues,
  setSplitValues,
  percentageValues,
  setPercentageValues,
  ratioShares,
  totalShares,
  equallyShares,
  unequallyTotal,
  unequallyValid,
  canConfirm,
  setSplitResult,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
        <View style={{marginTop: HP(4)}}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: HP(2),
            }}>
            {/* Drag Handle */}
            <Pressable
              onPress={onClose}
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

            {/* Tabs */}
            <ScrollView
              horizontal
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

            {/* --- Inline Subcomponents --- */}
            {splitByMode === 'equally' && (
              <FlatList
                data={friends}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={{height: HP(65)}}
                renderItem={({item: friend}) => (
                  <TouchableOpacity
                    key={friend.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}
                    onPress={() => {
                      setSelectedSplitters(prev =>
                        prev.includes(friend.id)
                          ? prev.filter(id => id !== friend.id)
                          : [...prev, friend.id],
                      );
                    }}>
                    <View
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 18,
                        backgroundColor: '#B3B3C6',
                        marginRight: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <CustomText style={{color: '#fff', fontSize: 16}}>
                        {friend.name[0]}
                      </CustomText>
                    </View>
                    <CustomText
                      style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                      {friend.name}
                    </CustomText>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 8,
                        borderWidth: 2,
                        borderColor: '#FF9800',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: selectedSplitters.includes(friend.id)
                          ? '#FF9800'
                          : '#fff',
                      }}>
                      {selectedSplitters.includes(friend.id) && (
                        <Image
                          source={Icons.check}
                          style={{
                            width: HP(1.6),
                            height: HP(1.6),
                            tintColor: '#fff',
                            resizeMode: 'contain',
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}

            {splitByMode === 'unequally' && (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={HP(15)}
                style={{height: HP(65)}}>
                <FlatList
                  data={friends}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item: friend}) => (
                    <View
                      key={friend.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                      }}>
                      <View
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 18,
                          backgroundColor: '#B3B3C6',
                          marginRight: 16,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <CustomText style={{color: '#fff', fontSize: 16}}>
                          {friend.name[0]}
                        </CustomText>
                      </View>
                      <CustomText
                        style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                        {friend.name}
                      </CustomText>
                      <CustomText style={{color: '#aaa', marginRight: 4}}>
                        ₹
                      </CustomText>
                      <TextInput
                        style={{
                          borderBottomWidth: 1,
                          borderBottomColor: '#eee',
                          width: 80,
                          fontSize: 16,
                          color: '#3E3E54',
                          textAlign: 'right',
                        }}
                        keyboardType="numeric"
                        value={splitValues[friend.id] || ''}
                        onChangeText={text => {
                          setSplitValues(prev => ({
                            ...prev,
                            [friend.id]: text.replace(/[^0-9.]/g, ''),
                          }));
                        }}
                        placeholder="0.00"
                      />
                    </View>
                  )}
                />

                <CustomText
                  style={{
                    textAlign: 'center',
                    marginTop: 8,
                    color: unequallyValid ? '#AAAAAA' : 'red',
                    fontFamily: Fonts.MontserratBold,
                  }}>
                  ₹{unequallyTotal} of ₹{amount}{' '}
                  {unequallyValid
                    ? '✓'
                    : unequallyTotal > amount
                    ? 'over'
                    : 'left'}
                </CustomText>
              </KeyboardAvoidingView>
            )}

            {/* --- Footer --- */}
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
                    const result =
                      splitByMode === 'equally'
                        ? equallyShares()
                        : splitByMode === 'unequally'
                        ? splitValues
                        : splitByMode === 'percentage'
                        ? percentageValues
                        : ratioShares;
                    setSplitResult(result);
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

export default SplitByModal;
