import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  Pressable,
} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import React, {useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';
import Icons from '../../theme/Icons';
import {FlatList} from 'react-native-gesture-handler';

export default function AddExpense({navigation}) {
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: '₹',
    code: 'INR',
  });
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [splitBy, setSplitBy] = useState('');
  const [splitResult, setSplitResult] = useState(null);
  const [percentageValues, setPercentageValues] = useState({});
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [paidByMode, setPaidByMode] = useState('single'); // 'single' or 'multiple'
  const [selectedPayer, setSelectedPayer] = useState(null); // for single
  const [multiplePayers, setMultiplePayers] = useState({}); // for multiple, e.g. {userId: amount}
  const [friends, setFriends] = useState([
    {id: '1', name: 'You'},
    {id: '2', name: 'Vansh'},
    {id: '3', name: 'rahul'},
    {id: '4', name: 'Shivam'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'shq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
    {id: '5', name: 'tanishq'},
  ]);
  const [selectedPayerName, setSelectedPayerName] = useState('');
  const [showSplitByModal, setShowSplitByModal] = useState(false);
  const [splitByMode, setSplitByMode] = useState('equally'); // 'equally', 'unequally', 'percentage', 'ratio'
  const [splitValues, setSplitValues] = useState({}); // {userId: value}
  const [selectedSplitters, setSelectedSplitters] = useState([]); // for equally

  const currencies = [
    {symbol: '₹', code: 'INR'},
    {symbol: '$', code: 'USD'},
    {symbol: '€', code: 'EUR'},
    {symbol: '£', code: 'GBP'},
    {symbol: '¥', code: 'JPY'},
    {symbol: 'S$', code: 'SGD'},
    // {symbol: 'HK$', code: 'HKD'},
  ];

  const handleAddExpense = () => {
    const amt = parseFloat(amount);
    const splitNum = parseInt(splitBy, 10);

    if (!amt || !splitNum || splitNum <= 0) {
      alert('Please enter valid amount and split number');
      return;
    }

    const perPerson = amt / splitNum;
    setSplitResult(perPerson);
    // You can also navigate or save the expense here
    // navigation.goBack();
  };

  const equallyShares = () => {
    const total = parseFloat(amount) || 0;
    const count = selectedSplitters.length;
    if (count === 0) return {};
    const perPerson = (total / count).toFixed(2);
    let result = {};
    selectedSplitters.forEach(id => {
      result[id] = perPerson;
    });
    return result;
  };

  const unequallyTotal = Object.values(splitValues).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0,
  );
  const unequallyValid =
    Math.abs(unequallyTotal - (parseFloat(amount) || 0)) < 0.01;

  const percentageTotal = Object.values(splitValues).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0,
  );
  const percentageValid =
    Math.abs(percentageTotal - (parseFloat(amount) || 0)) < 0.01;
  const percentageShares = {};
  Object.entries(splitValues).forEach(([id, amountValue]) => {
    percentageShares[id] = (parseFloat(amountValue) || 0).toFixed(2);
  });

  // Calculate percentage based on amount input
  const calculatePercentage = amountValue => {
    const totalAmount = parseFloat(amount) || 0;
    const individualAmount = parseFloat(amountValue) || 0;
    if (totalAmount === 0) return 0;
    return ((individualAmount / totalAmount) * 100).toFixed(1);
  };

  const totalShares = Object.values(splitValues).reduce(
    (sum, v) => sum + (parseFloat(v) || 0),
    0,
  );
  const ratioShares = {};
  Object.entries(splitValues).forEach(([id, shares]) => {
    ratioShares[id] =
      totalShares > 0
        ? (
            ((parseFloat(shares) || 0) * (parseFloat(amount) || 0)) /
            totalShares
          ).toFixed(2)
        : '0.00';
  });

  const canConfirm =
    (splitByMode === 'equally' && selectedSplitters.length > 0) ||
    (splitByMode === 'unequally' && unequallyValid) ||
    (splitByMode === 'percentage' && percentageValid) ||
    (splitByMode === 'ratio' &&
      totalShares > 0 &&
      Object.values(splitValues).some(v => parseFloat(v) > 0));

  // Calculate payment summary for multiple payers
  const totalPaidAmount = Object.values(multiplePayers).reduce(
    (sum, amount) => sum + (parseFloat(amount) || 0),
    0,
  );
  const totalExpenseAmount = parseFloat(amount) || 0;
  const amountLeft = totalExpenseAmount - totalPaidAmount;
  const isPaymentComplete = Math.abs(amountLeft) < 0.01;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{backgroundColor: '#FF754D', height: HP(8), paddingTop: HP(1)}}>
        <View
          style={{
            marginTop: HP(3),
            backgroundColor: '#F3EFE6',
            height: HP(20),
            borderRadius: HP(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              margin: HP(1),
              marginLeft: HP(2),
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                children={'<'}
                style={{fontSize: FS(2.2), marginHorizontal: HP(0.5)}}
              />
              <CustomText children={'Go Back'} />
            </TouchableOpacity>
          </View>
          <CustomText
            children={'Add a new expense'}
            style={{
              alignSelf: 'center',
              fontSize: FS(2.2),
              bottom: HP(1.5),
              // fontWeight: '800',
              marginBottom: HP(1),
              color: '#3E3E54',
              fontFamily: Fonts.MontserratExtraBold,
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          borderRadius: HP(4),
          backgroundColor: 'white',
          marginTop: HP(5),
        }}>
        <View style={{padding: HP(3)}}>
          <View style={{flexDirection: 'row', marginBottom: HP(1)}}>
            <CustomText
              children={'Add People: '}
              style={{
                color: '#3E3E54',
                fontSize: FS(1.6),
                fontFamily: Fonts.MontserratBold,
              }}
            />
            <CustomText
              children={' Group, Friends, Email, Phone'}
              style={{color: '#9B9B9B'}}
            />
          </View>
          <CustomText
            children={'Title'}
            style={{fontFamily: Fonts.MontserratBold, color: '#3E3E54'}}
          />
          <TextInput
            style={{
              backgroundColor: '#ECECEC',
              borderRadius: HP(1.2),
              marginVertical: HP(1),
              paddingHorizontal: HP(2),
              fontFamily: Fonts.MontserratMedium,
            }}
            placeholder="Add new expense"
            placeholderTextColor={'#3E3E54'}
          />
          <CustomText
            children={'Amount'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(1),
              color: '#3E3E54',
            }}
            placeholder="0.00"
            placeholderTextColor={'#3E3E54'}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              keyboardType="number-pad"
              value={amount}
              onChangeText={setAmount}
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1.2),
                marginVertical: HP(1),
                width: WP(60),
                paddingHorizontal: HP(2),
              }}
            />
            <TouchableOpacity
              onPress={() => setShowCurrencyModal(true)}
              style={{
                backgroundColor: '#ECECEC',
                borderRadius: HP(1),
                marginRight: HP(1),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: HP(1),
                marginHorizontal: HP(2),
                height: HP(5),
              }}>
              <CustomText
                children={`${selectedCurrency.code} ${selectedCurrency.symbol}`}
                style={{
                  fontSize: FS(2),
                  padding: HP(0.5),
                  color: '#4955E6',
                  fontFamily: Fonts.MontserratBold,
                }}
              />
              <Ionicons
                name={'chevron-down'}
                color={'#4955E6'}
                size={16}
                style={{marginLeft: 5}}
              />
            </TouchableOpacity>
          </View>
          <Modal
            visible={showCurrencyModal}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setShowCurrencyModal(false)}>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  borderTopLeftRadius: HP(2),
                  borderTopRightRadius: HP(2),
                  padding: HP(2),
                  shadowColor: '#3E3E54',
                  shadowOffset: {
                    width: 0,
                    height: -2,
                  },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 5,
                }}>
                <View
                  style={{
                    width: WP(15),
                    height: HP(0.5),
                    backgroundColor: '#E0E0E0',
                    alignSelf: 'center',
                    marginBottom: HP(2),
                    borderRadius: HP(0.25),
                  }}
                />
                {currencies.map((currency, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: HP(1.5),
                      borderBottomWidth:
                        index === currencies.length - 1 ? 0 : 1,
                      borderBottomColor: '#ECECEC',
                    }}
                    onPress={() => {
                      setSelectedCurrency(currency);
                      setShowCurrencyModal(false);
                    }}>
                    <CustomText
                      style={{
                        fontFamily: Fonts.MontserratBold,
                        fontSize: FS(1.8),
                        color: '#3E3E54',
                      }}>
                      {currency.code} {currency.symbol}
                    </CustomText>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
          <CustomText
            children={'Paid by'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(1),
              color: '#3E3E54',
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setPaidByMode('single');
              setShowPaidByModal(true);
            }}>
            <View
              style={{
                paddingHorizontal: HP(2),
                width: WP(80),
                height: HP(5),
                justifyContent: 'center',
              }}>
              <CustomText
                style={{color: '#3E3E54', fontFamily: Fonts.MontserratMedium}}>
                {paidByMode === 'multiple' ? 'Multiple' : selectedPayerName}
              </CustomText>
            </View>
            <Ionicons name={'chevron-down'} color={'#4955E6'} size={20} />
          </TouchableOpacity>
          <CustomText
            children={'Split by'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(2),
              color: '#3E3E54',
            }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => setShowSplitByModal(true)}>
            <View
              style={{
                paddingHorizontal: HP(2),
                width: WP(80),
                height: HP(5),
                justifyContent: 'center',
              }}>
              <CustomText
                style={{color: '#3E3E54', fontFamily: Fonts.MontserratMedium}}>
                {splitByMode.charAt(0).toUpperCase() + splitByMode.slice(1)}
              </CustomText>
            </View>
            <Ionicons name={'chevron-down'} color={'#4955E6'} size={20} />
          </TouchableOpacity>
          <CustomText
            children={'Description'}
            style={{
              fontFamily: Fonts.MontserratBold,
              marginTop: HP(2),
              color: '#3E3E54',
            }}
          />
          <View
            style={{
              backgroundColor: '#ECECEC',
              marginTop: HP(1),
              borderRadius: HP(1.5),
              width: WP(87),
              flexDirection: 'row',
              height: HP(10),
            }}>
            <TextInput
              multiline
              numberOfLines={6}
              // placeholder={'Add a description...'}
              style={{
                width: WP(80),
                fontFamily: Fonts.MontserratMedium,
                paddingRight: HP(1),
              }}
            />
            {/* <Entypo
              style={{marginTop: HP(1)}}
              name={'attachment'}
              color={'#4955E6'}
              size={20}
            /> */}
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              height: HP(6),
              width: WP(85),
              backgroundColor: '#4955E6',
              borderRadius: HP(5),
              marginTop: HP(10),
            }}
            onPress={handleAddExpense}>
            <CustomText
              style={{fontSize: FS(2.5), color: 'white', fontWeight: '700'}}
              children={'Add Expense'}
            />
          </TouchableOpacity>
          {splitResult !== null && (
            <CustomText
              style={{marginTop: HP(2), color: '#4955E6', fontSize: FS(2)}}
              children={`Each person pays: ${
                selectedCurrency.symbol
              }${splitResult.toFixed(2)}`}
            />
          )}
        </View>
      </View>
      <Modal
        visible={showPaidByModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPaidByModal(false)}>
        <View
          style={{
            // flex: 0.6,
            // justifyContent: 'flex-start',
            backgroundColor: 'rgba(0,0,0,0.2)',
            top: HP(4),
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              borderTopLeftRadius: HP(3),
              borderTopRightRadius: HP(3),
              padding: HP(3),
              minHeight: 700,
            }}>
            <Pressable
              onPress={() => setShowPaidByModal(false)}
              style={{
                borderWidth: 1,
                borderColor: '#FC7916',
                width: WP(15),
                alignSelf: 'center',
                marginBottom: HP(2),
              }}></Pressable>
            <CustomText
              children={'Paid By'}
              style={{
                alignSelf: 'center',
                fontSize: FS(1.7),
                fontFamily: Fonts.MontserratBold,
                marginBottom: HP(2),
              }}
            />
            {/* Tab/Slider */}
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderBottomWidth: paidByMode === 'single' ? 3 : 1,
                  borderBottomColor:
                    paidByMode === 'single' ? '#FF9800' : '#eee',
                  paddingBottom: 8,
                }}
                onPress={() => setPaidByMode('single')}>
                <CustomText
                  style={{
                    // fontWeight: paidByMode === 'single' ? 'bold' : 'normal',
                    fontFamily:
                      paidByMode === 'single'
                        ? Fonts.MontserratBold
                        : Fonts.MontserratRegular,
                    color: paidByMode === 'single' ? '#3E3E54' : '#888',
                  }}>
                  Single
                </CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderBottomWidth: paidByMode === 'multiple' ? 3 : 1,

                  borderBottomColor:
                    paidByMode === 'multiple' ? '#FF9800' : '#eee',
                  paddingBottom: 8,
                }}
                onPress={() => setPaidByMode('multiple')}>
                <Text
                  style={{
                    fontFamily:
                      paidByMode === 'multiple'
                        ? Fonts.MontserratBold
                        : Fonts.MontserratRegular,
                    color: paidByMode === 'multiple' ? '#3E3E54' : '#888',
                  }}>
                  Multiple
                </Text>
              </TouchableOpacity>
            </View>

            {/* List */}
            {paidByMode === 'single' ? (
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
                      setShowPaidByModal(false);
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
                      <CustomText
                        style={{
                          color: '#fff',
                          //
                          fontSize: 16,
                        }}>
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
                        borderColor:
                          selectedPayer === friend.id ? '#FF9800' : '#FF9800',
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
            ) : (
              <View style={{flex: 1}}>
                {friends.map(friend => (
                  <View
                    key={friend.id}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 12,
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
                      <CustomText
                        style={{
                          color: '#fff',
                          //
                          fontSize: 16,
                        }}>
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
                        setMultiplePayers(prev => ({
                          ...prev,
                          [friend.id]: text.replace(/[^0-9.]/g, ''),
                        }));
                      }}
                      placeholder="0.00"
                    />
                  </View>
                ))}

                {/* Payment Summary */}
                <View
                  style={{
                    marginTop: 70,
                    paddingTop: 20,
                    alignSelf: 'center',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 8,
                    }}>
                    <CustomText
                      style={{
                        fontSize: 16,
                        color: '#3E3E54',
                        fontFamily: Fonts.MontserratBold,
                      }}>
                      ₹{totalPaidAmount.toFixed(0)} {'  '} of {'   '}₹
                      {totalExpenseAmount.toFixed(0)}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      position: 'absolute',
                      top: HP(5),
                      left: HP(2),
                    }}>
                    <CustomText
                      style={{
                        fontSize: 14,
                        color: isPaymentComplete ? 'green' : '#EEB600',
                        fontFamily: Fonts.MontserratBold,
                        left: HP(2),
                      }}>
                      ₹{Math.abs(amountLeft).toFixed(0)}{' '}
                      {isPaymentComplete
                        ? '✓'
                        : amountLeft > 0
                        ? 'left'
                        : 'over'}
                    </CustomText>
                  </View>
                </View>
              </View>
            )}

            {/* Footer Buttons */}
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 20,
                left: 24,
                right: 24,
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
                onPress={() => setShowPaidByModal(false)}>
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
                onPress={() => {
                  if (paidByMode === 'multiple' && !isPaymentComplete) {
                    return;
                  }
                  setShowPaidByModal(false);
                }}>
                <CustomText style={{color: '#fff'}}>Confirm</CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        visible={showSplitByModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSplitByModal(false)}>
        <TouchableWithoutFeedback style={{flex: 1}} onPress={Keyboard.dismiss}>
          <View style={{marginTop: HP(4)}}>
            <View
              style={{
                backgroundColor: '#fff',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: HP(2),
              }}>
              {/* Tab/Slider */}
              <Pressable
                onPress={() => setShowSplitByModal(false)}
                style={{
                  borderWidth: 1.7,
                  borderColor: '#FC7916',
                  width: WP(15),
                  alignSelf: 'center',
                  marginBottom: HP(2),
                }}></Pressable>
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

              {/* Split By Content */}
              {splitByMode === 'equally' && (
                <View style={{height: HP(66)}}>
                  <FlatList
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
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
                          <CustomText
                            style={{
                              color: '#fff',

                              fontSize: 16,
                            }}>
                            {friend.name[0]}
                          </CustomText>
                        </View>
                        {/* Name */}
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
                            backgroundColor: selectedSplitters.includes(
                              friend.id,
                            )
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
                  {/* {splitByMode === 'equally' && (
                  <CustomText style={{textAlign: 'center', marginTop: 8}}>
                    {selectedSplitters.length > 0
                      ? `₹${equallyShares()[selectedSplitters[0]]} per person`
                      : 'Select at least one person'}
                  </CustomText>
                )} */}
                </View>
              )}

              {splitByMode === 'unequally' && (
                <View style={{height: HP(66)}}>
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
                          <CustomText
                            style={{
                              color: '#fff',
                              fontSize: 16,
                            }}>
                            {friend.name[0]}
                          </CustomText>
                        </View>
                        {/* Name */}
                        <CustomText
                          style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                          {friend.name}
                        </CustomText>
                        {/* Input */}
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
                          value={
                            splitValues[friend.id]
                              ? String(splitValues[friend.id])
                              : ''
                          }
                          onChangeText={text => {
                            setSplitValues(prev => ({
                              ...prev,
                              [friend.id]: text.replace(/[^0-9.]/g, ''),
                            }));
                          }}
                          placeholder="0.00"
                        />
                      </View>
                    )}></FlatList>

                  <KeyboardAvoidingView
                    style={{
                      backgroundColor: '#fff',
                    }}>
                    {splitByMode === 'unequally' && (
                      <CustomText
                        style={{
                          textAlign: 'center',
                          marginTop: 8,
                          color: '#AAAAAA',
                          fontFamily: Fonts.MontserratBold,
                        }}>
                        ₹{unequallyTotal} of ₹{amount}
                        {unequallyValid
                          ? '✓'
                          : unequallyTotal > amount
                          ? 'over'
                          : 'left'}
                      </CustomText>
                    )}

                    {splitByMode === 'unequally' && !unequallyValid && (
                      <CustomText
                        style={{
                          textAlign: 'center',
                          marginTop: 4,
                          color:
                            unequallyTotal > (parseFloat(amount) || 0)
                              ? 'red'
                              : '#EEB600',
                          fontSize: 12,
                          fontFamily: Fonts.MontserratBold,
                        }}>
                        ₹
                        {Math.abs(
                          unequallyTotal - (parseFloat(amount) || 0),
                        ).toFixed(0)}{' '}
                        {unequallyTotal > (parseFloat(amount) || 0)
                          ? 'over'
                          : 'left'}
                      </CustomText>
                    )}
                  </KeyboardAvoidingView>
                </View>
              )}

              {splitByMode === 'percentage' && (
                <View style={{height: HP(66)}}>
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
                          <CustomText
                            style={{
                              color: '#fff',

                              fontSize: 16,
                            }}>
                            {friend.name[0]}
                          </CustomText>
                        </View>
                        {/* Name */}
                        <View style={{flex: 1}}>
                          <CustomText
                            style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                            {friend.name}
                          </CustomText>
                          {/* <CustomText
                            style={{fontSize: 12, color: '#AAAAAA'}}
                            children={`[${calculatePercentage(
                              splitValues[friend.id] || 0,
                            )}%]`}
                          /> */}
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <TextInput
                              style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#eee',
                                width: 60,
                                fontSize: 14,
                                color: '#3E3E54',
                                textAlign: 'right',
                                paddingVertical: 2,
                                marginRight: 4,
                              }}
                              keyboardType="numeric"
                              value={
                                percentageValues?.[friend.id]
                                  ? String(percentageValues[friend.id])
                                  : ''
                              }
                              onChangeText={text => {
                                const clean = text.replace(/[^0-9.]/g, '');
                                setPercentageValues(prev => ({
                                  ...prev,
                                  [friend.id]: clean,
                                }));
                              }}
                              placeholder="0"
                            />
                            <CustomText
                              style={{fontSize: 12, color: '#AAAAAA'}}>
                              %
                            </CustomText>
                          </View>
                        </View>
                        {/* Input */}
                        <CustomText style={{color: '#3E3E54', marginRight: 4}}>
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
                            splitValues[friend.id]
                              ? String(splitValues[friend.id])
                              : ''
                          }
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
                  <KeyboardAvoidingView
                    style={{
                      backgroundColor: '#fff',
                    }}>
                    {splitByMode === 'percentage' && (
                      <CustomText
                        style={{
                          textAlign: 'center',
                          marginTop: 8,
                          color: '#AAAAAA',
                          fontFamily: Fonts.MontserratBold,
                        }}>
                        ₹{unequallyTotal} of ₹{amount}
                        {unequallyValid
                          ? '✓'
                          : unequallyTotal > amount
                          ? 'over'
                          : 'left'}
                      </CustomText>
                    )}

                    {splitByMode === 'percentage' && !unequallyValid && (
                      <CustomText
                        style={{
                          textAlign: 'center',
                          marginTop: 4,
                          color:
                            unequallyTotal > (parseFloat(amount) || 0)
                              ? 'red'
                              : '#EEB600',
                          fontSize: 12,
                          fontFamily: Fonts.MontserratBold,
                        }}>
                        ₹
                        {Math.abs(
                          unequallyTotal - (parseFloat(amount) || 0),
                        ).toFixed(0)}{' '}
                        {unequallyTotal > (parseFloat(amount) || 0)
                          ? 'over'
                          : 'left'}
                      </CustomText>
                    )}
                  </KeyboardAvoidingView>
                </View>
              )}
              {splitByMode === 'ratio' && (
                <View style={{height: HP(66)}}>
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
                          <CustomText
                            style={{
                              color: '#fff',
                              fontSize: 16,
                            }}>
                            {friend.name[0]}
                          </CustomText>
                        </View>
                        {/* Name and Shares */}
                        <View style={{flex: 1}}>
                          <CustomText style={{fontSize: 16, color: '#3E3E54'}}>
                            {friend.name}
                          </CustomText>
                          <CustomText
                            style={{fontSize: 12, color: '#AAAAAA'}}
                            children={`[${splitValues[friend.id] || '_'} share${
                              parseInt(splitValues[friend.id]) === 1 ? '' : 's'
                            }]`}
                          />
                        </View>
                        {/* Shares Input */}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginRight: 8,
                          }}></View>
                        {/* Calculated Amount */}
                        <CustomText style={{color: '#3E3E54', marginRight: 4}}>
                          ₹
                        </CustomText>
                        <TextInput
                          style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#eee',
                            width: 60,
                            fontSize: 14,
                            color: '#3E3E54',
                            textAlign: 'right',
                            paddingVertical: 2,
                            marginRight: 4,
                          }}
                          keyboardType="numeric"
                          value={
                            percentageValues?.[friend.id]
                              ? String(percentageValues[friend.id])
                              : ''
                          }
                          onChangeText={text => {
                            const clean = text.replace(/[^0-9.]/g, '');
                            const percent = parseFloat(clean) || 0;
                            const amt = parseFloat(amount) || 0;

                            // update percentage state
                            setPercentageValues(prev => ({
                              ...prev,
                              [friend.id]: clean,
                            }));

                            // update rupee (₹) value automatically
                            const calculatedValue = (
                              (percent / 100) *
                              amt
                            ).toFixed(2);
                            setSplitValues(prev => ({
                              ...prev,
                              [friend.id]: calculatedValue,
                            }));
                          }}
                          placeholder="0"
                        />
                        <CustomText style={{fontSize: 12, color: '#AAAAAA'}}>
                          %
                        </CustomText>
                      </View>
                    )}
                  />

                  {/* Summary at bottom */}

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: HP(15),
                      right: HP(15),
                    }}>
                    <CustomText
                      style={{
                        textAlign: 'center',
                        marginTop: 8,
                        color: '#AAAAAA',
                        fontFamily: Fonts.MontserratBold,
                      }}>
                      {totalShares} of {totalShares}
                    </CustomText>

                    {/* Show over/under amount */}
                    {(() => {
                      const totalRatioAmount = Object.values(
                        ratioShares,
                      ).reduce(
                        (sum, amount) => sum + (parseFloat(amount) || 0),
                        0,
                      );
                      const difference =
                        totalRatioAmount - (parseFloat(amount) || 0);

                      if (Math.abs(difference) > 0.01) {
                        return (
                          <CustomText
                            style={{
                              textAlign: 'center',
                              marginTop: 4,
                              color: 'red',
                              fontSize: 12,
                              fontFamily: Fonts.MontserratBold,
                            }}>
                            ₹{Math.abs(difference).toFixed(0)}{' '}
                            {difference > 0 ? 'over' : 'under'}
                          </CustomText>
                        );
                      }
                      return null;
                    })()}
                  </View>
                </View>
              )}
              {/* Footer Buttons */}
              <View
                style={{flexDirection: 'row', marginTop: 22, bottom: HP(2)}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#ECECEC',
                    borderRadius: 8,
                    padding: 14,
                    alignItems: 'center',
                    marginRight: 8,
                  }}
                  onPress={() => setShowSplitByModal(false)}>
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
                          ? unequallyTotal
                          : splitByMode === 'percentage'
                          ? percentageShares
                          : ratioShares,
                      );
                      setShowSplitByModal(false);
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
