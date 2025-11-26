import React, {useEffect} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  Image,
} from 'react-native';
import {HP, WP, FS} from '../../utils/Dimention';
import Fonts from '../../theme/Fonts';
import CustomText from '../CustomText';

const PaidByModal = ({
  visible,
  onClose,
  friends,
  paidByMode,
  setPaidByMode,
  selectedPayer,
  setSelectedPayer,
  setSelectedPayerName,
  multiplePayers,
  setMultiplePayers,
  totalPaidAmount,
  totalExpenseAmount,
  amountLeft,
  isPaymentComplete,
  onConfirm,
  onSelectPayers,
}) => {
  // Add this useEffect to debug the modal state
  useEffect(() => {
    console.log('PaidByModal props updated:', {
      visible,
      paidByMode,
      selectedPayer,
      multiplePayers,
    });
  }, [visible, paidByMode, selectedPayer, multiplePayers]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{
          backgroundColor: 'rgba(0,0,0,0.2)',
          justifyContent: 'flex-end',
          height: HP(95),
        }}>
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: HP(3),
            borderTopRightRadius: HP(3),
            padding: HP(3),
            minHeight: HP(92),
          }}>
          {/* Handle bar */}
          <Pressable
            onPress={onClose}
            style={{
              borderWidth: 1,
              borderColor: '#FC7916',
              width: WP(15),
              alignSelf: 'center',
              marginBottom: HP(2),
            }}
          />

          {/* Title */}
          <CustomText
            style={{
              alignSelf: 'center',
              fontSize: FS(1.7),
              fontFamily: Fonts.MontserratBold,
              marginBottom: HP(2),
            }}>
            Paid By
          </CustomText>

          {/* Tabs */}
          <View style={{flexDirection: 'row'}}>
            {['single', 'multiple'].map(mode => (
              <TouchableOpacity
                key={mode}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderBottomWidth: paidByMode === mode ? 3 : 1,
                  borderBottomColor: paidByMode === mode ? '#FF9800' : '#eee',
                  paddingBottom: 8,
                }}
                onPress={() => setPaidByMode(mode)}>
                <CustomText
                  style={{
                    fontFamily:
                      paidByMode === mode
                        ? Fonts.MontserratBold
                        : Fonts.MontserratRegular,
                    color: paidByMode === mode ? '#3E3E54' : '#888',
                  }}>
                  {mode === 'single' ? 'Single' : 'Multiple'}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content */}
          <View style={{flex: 1}}>
            {paidByMode === 'single' ? (
              <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                  data={friends}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item: friend}) => (
                    <TouchableOpacity
                      key={friend.id}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 12,
                      }}
                      onPress={() => {
                        setSelectedPayer(friend.id);
                        setSelectedPayerName(friend.name);
                        onSelectPayers([
                          {
                            id: friend.id,
                            name: friend.name,
                            amount: totalExpenseAmount,
                          },
                        ]); // ✅ pass selected
                        onClose();
                      }}>
                      {/* Avatar */}
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
                      {/* Name */}
                      <Text style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                        {friend.name}
                      </Text>
                      {/* Radio */}
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 2,
                          borderColor: '#FF9800',
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            selectedPayer === friend.id ? '#FF9800' : '#fff',
                        }}>
                        {selectedPayer === friend.id && (
                          <Image
                            source={Icons.check}
                            style={{
                              width: HP(1.6),
                              height: HP(1.6),
                              tintColor: '#fff',
                            }}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </ScrollView>
            ) : (
              <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={HP(15)}
                style={{flex: 1}}>
                <FlatList
                  data={friends}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item: friend}) => (
                    <View
                      key={friend.id}
                      style={{
                        flexDirection: 'row',
                        paddingVertical: 12,
                        alignItems: 'center',
                      }}>
                      {/* Avatar */}
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
                      {/* Name */}
                      <CustomText
                        style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                        {friend.name}
                      </CustomText>
                      {/* Amount Input */}
                      <CustomText style={{color: '#AAAAAA', marginRight: 4}}>
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
                        value={
                          multiplePayers[friend.id]
                            ? String(multiplePayers[friend.id])
                            : ''
                        }
                        onChangeText={text => {
                          const cleanAmount = text.replace(/[^0-9.]/g, '');
                          setMultiplePayers(prev => {
                            const updated = {...prev, [friend.id]: cleanAmount};
                            const selectedList = Object.entries(updated)
                              .filter(([_, amt]) => parseFloat(amt) > 0)
                              .map(([id, amt]) => {
                                const f = friends.find(fr => fr.id === id);
                                return {
                                  id,
                                  name: f?.name || '',
                                  amount: parseFloat(amt),
                                };
                              });
                            onSelectPayers(selectedList); // ✅ Send selected payers with names
                            return updated;
                          });
                        }}
                        placeholder="0.00"
                      />
                    </View>
                  )}
                />
              </KeyboardAvoidingView>
            )}
          </View>

          {/* Bottom Summary (for multiple mode) */}
          {paidByMode === 'multiple' && (
            <View
              style={{
                marginTop: HP(2),
                alignItems: 'center',
                paddingVertical: HP(1),
              }}>
              <CustomText
                style={{
                  fontSize: FS(1.6),
                  color: '#3E3E54',
                  fontFamily: Fonts.MontserratBold,
                }}>
                ₹{totalPaidAmount.toFixed(0)} of ₹
                {totalExpenseAmount.toFixed(0)}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 14,
                  color: isPaymentComplete ? 'green' : '#EEB600',
                  fontFamily: Fonts.MontserratBold,
                }}>
                ₹{Math.abs(amountLeft).toFixed(0)}{' '}
                {isPaymentComplete ? '✓' : amountLeft > 0 ? 'left' : 'over'}
              </CustomText>
            </View>
          )}

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: HP(2),
            }}>
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
                backgroundColor:
                  paidByMode === 'multiple' && !isPaymentComplete
                    ? '#CCCCCC'
                    : '#4955E6',
                borderRadius: 8,
                padding: 14,
                alignItems: 'center',
                marginLeft: 8,
              }}
              disabled={paidByMode === 'multiple' && !isPaymentComplete}
              onPress={onConfirm}>
              <CustomText style={{color: '#fff'}}>Confirm</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default PaidByModal;
