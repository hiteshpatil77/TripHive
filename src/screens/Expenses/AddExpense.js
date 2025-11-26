import {
  ActivityIndicator,
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
import React, {useEffect, useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';
import Icons from '../../theme/Icons';
import {FlatList} from 'react-native-gesture-handler';
import PaidByModal from '../../components/modal/PaidByModal';
import AiPlanner from '../TripScreen/AiPlanner';
import {
  CreateExpense,
  CreateGroup,
  getAllFriend,
  getAllGroup,
} from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddExpense({navigation}) {
  const [selectedCurrency, setSelectedCurrency] = useState({
    symbol: '₹',
    code: 'INR',
  });
  const total = parseFloat(amount) || 0;
  const [amount, setAmount] = useState('');
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [splitNum, setSplitNum] = useState('');
  const [amt, setAmt] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [splitBy, setSplitBy] = useState('');
  const [splitResult, setSplitResult] = useState(0);
  const [percentageValues, setPercentageValues] = useState({});
  const [showPaidByModal, setShowPaidByModal] = useState(false);
  const [paidByMode, setPaidByMode] = useState('single');
  const [selectedPayer, setSelectedPayer] = useState(null);
  const [multiplePayers, setMultiplePayers] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [groupId, setGroupId] = useState('');
  const [selectedPayersList, setSelectedPayersList] = useState([]);
  const [friends, setFriends] = useState([]);
  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [showPeopleModal, setShowPeopleModal] = useState(false);
  const [peopleTab, setPeopleTab] = useState('groups');
  const [isFetchingPeople, setIsFetchingPeople] = useState(false);
  const [isGroupSubmitting, setIsGroupSubmitting] = useState(false);
  const [selectedPayerName, setSelectedPayerName] = useState('');
  const [showSplitByModal, setShowSplitByModal] = useState(false);
  const [splitByMode, setSplitByMode] = useState('equally');
  const [splitValues, setSplitValues] = useState({});
  const [selectedSplitters, setSelectedSplitters] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsFetchingPeople(true);
        const [token, storedUserData] = await Promise.all([
          AsyncStorage.getItem('token'),
          AsyncStorage.getItem('userData'),
        ]);

        console.log('storedUserData-=-=-=', storedUserData);
        const parsedUser = storedUserData ? JSON.parse(storedUserData) : null;
        console.log('parsedUser-=-=-=', parsedUser);

        setCurrentUser(parsedUser);

        const [groupResponse, friendResponse] = await Promise.all([
          getAllGroup(token),
          getAllFriend(token),
        ]);
        console.log('friendResponse-=-=-=', friendResponse);

        const fetchedFriends = friendResponse?.data || [];

        setGroupOptions(groupResponse?.data || []);
        setFriends(appendSelfToFriends(fetchedFriends, parsedUser));
      } catch (error) {
        console.error('Error fetching groups or friends:', error);
      } finally {
        setIsFetchingPeople(false);
      }
    };

    fetchPeople();
  }, []);

  const handleSelectGroup = group => {
    setSelectedGroup(group);
    setGroupId(group?.id || '');
  };

  const toggleFriendSelection = friendId => {
    setSelectedPeople(prev => {
      const alreadySelected = prev.includes(friendId);
      const updated = alreadySelected
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId];
      setSelectedSplitters(updated);
      return updated;
    });
  };

  const resolveUserId = user => {
    if (!user) {
      return null;
    }
    return (
      user?.id ||
      user?._id ||
      user?.userId ||
      user?.user_id ||
      user?.userID ||
      user?.uid ||
      user?.profileId ||
      null
    );
  };

  const appendSelfToFriends = (friendList, user) => {
    const safeList = Array.isArray(friendList) ? [...friendList] : [];
    if (!user) {
      return safeList;
    }

    const userId = resolveUserId(user) || 'self';
    const normalizedUserId = String(userId);
    const displayName =
      user?.name || user?.fullName || user?.username || user?.email || 'You';

    const alreadyExists = safeList.some(
      friend => String(friend?.id) === normalizedUserId,
    );

    const selfEntry = {
      id: normalizedUserId,
      name: displayName,
      email: user?.email || '',
      isSelf: true,
    };

    return alreadyExists ? safeList : [selfEntry, ...safeList];
  };

  const getCurrentUserId = () => {
    const id = resolveUserId(currentUser);
    return id ? String(id) : null;
  };

  const getFriendName = friend => {
    if (!friend) {
      return 'Friend';
    }
    if (friend.isSelf) {
      return 'You';
    }
    return friend?.name || friend?.fullName || friend?.email || 'Friend';
  };

  const getFriendInitial = friend => {
    const name = getFriendName(friend);
    return name?.charAt(0)?.toUpperCase() || 'F';
  };

  const selectedFriendsLabel =
    selectedPeople.length > 0
      ? (() => {
          const names = friends
            .filter(friend => selectedPeople.includes(friend.id))
            .map(getFriendName);
          if (names.length === 0) {
            return `${selectedPeople.length} friend${
              selectedPeople.length > 1 ? 's' : ''
            } selected`;
          }
          const [first, second, ...rest] = names;
          if (!second) {
            return first;
          }
          const base = `${first}, ${second}`;
          return rest.length > 0 ? `${base} +${rest.length} more` : base;
        })()
      : '';

  const handleCreateGroupFromSelection = async () => {
    if (!title.trim()) {
      alert('Please enter a Title to use as the group name.');
      return;
    }

    if (selectedPeople.length === 0) {
      alert('Select at least one friend to include in the group.');
      return;
    }

    const memberIds = Array.from(
      new Set(
        [...selectedPeople, getCurrentUserId()].filter(id => id && id.length),
      ),
    );

    if (memberIds.length === 0) {
      alert('Unable to determine members for the group.');
      return;
    }

    try {
      setIsGroupSubmitting(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        throw new Error('Missing authentication token. Please sign in again.');
      }

      const response = await CreateGroup(
        title.trim(),
        description?.trim() || 'Created from Add Expense',
        '',
        memberIds,
        token,
      );

      const createdGroup = response?.data || response;

      if (createdGroup) {
        setGroupOptions(prev => {
          const exists = prev.some(group => group.id === createdGroup.id);
          if (exists) {
            return prev.map(group =>
              group.id === createdGroup.id ? createdGroup : group,
            );
          }
          return [createdGroup, ...prev];
        });
        handleSelectGroup(createdGroup);
        setShowPeopleModal(false);
        alert('Group created successfully.');
      } else {
        alert('Group created but no data was returned.');
      }
    } catch (error) {
      console.error('Error creating group:', error);
      alert(error?.message || 'Failed to create group. Please try again.');
    } finally {
      setIsGroupSubmitting(false);
    }
  };

  const currencies = [
    {symbol: '₹', code: 'INR'},
    {symbol: '$', code: 'USD'},
    {symbol: '€', code: 'EUR'},
    {symbol: '£', code: 'GBP'},
    {symbol: '¥', code: 'JPY'},
    {symbol: 'S$', code: 'SGD'},
  ];
  const handleOpenPaidByModal = () => {
    setShowModal(true);
    setPaidByMode('single');
    // Don't reset paidByMode here, use the current state
  };

  // Add a function to handle modal close and reset if needed
  const handleClosePaidByModal = () => {
    setShowModal(false);
  };
  const handleSplit = () => {
    setShowSplitByModal(true);
    const perPerson =
      splitNum > 0 && amt ? parseFloat(amt) / parseFloat(splitNum) : 0;
    setSplitResult(perPerson);
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

  const handleAddExpense = async () => {
    try {
      const expenseTitle = title;
      const expenseDescription = description;
      const expenseAmount = parseFloat(amount);
      const expenseCurrency = 'INR';
      const expenseSplitType = splitByMode;
      const expenseGroupId = groupId;
      const token = await AsyncStorage.getItem('token');

      if (!token) {
        alert('Missing authentication token. Please sign in again.');
        return;
      }

      // ✅ Handle who paid
      let expensePaidBy = null;
      let expensePayers = [];

      if (paidByMode === 'single') {
        expensePaidBy = selectedPayer; // single payer ID
        expensePayers = [{userId: selectedPayer, amount: expenseAmount}];
      } else {
        // multiple payers mode
        expensePaidBy = Object.keys(multiplePayers).filter(
          id => parseFloat(multiplePayers[id]) > 0,
        );
        expensePayers = Object.entries(multiplePayers).map(
          ([userId, amount]) => ({
            userId,
            amount: parseFloat(amount) || 0,
          }),
        );
      }

      let expenseSplits = [];
      switch (splitByMode) {
        case 'equally':
          const equalShares = equallyShares();
          expenseSplits = Object.entries(equalShares).map(
            ([userId, amount]) => ({
              userId,
              amount: parseFloat(amount),
            }),
          );
          break;

        case 'unequally':
          expenseSplits = Object.entries(splitValues).map(
            ([userId, amount]) => ({
              userId,
              amount: parseFloat(amount) || 0,
            }),
          );
          break;

        case 'percentage':
          expenseSplits = Object.entries(splitValues).map(
            ([userId, amount]) => ({
              userId,
              amount: parseFloat(amount) || 0,
            }),
          );
          break;

        case 'ratio':
          expenseSplits = Object.entries(ratioShares).map(
            ([userId, amount]) => ({
              userId,
              amount: parseFloat(amount) || 0,
            }),
          );
          break;

        default:
          expenseSplits = [];
      }

      // ✅ API call with selected payers
      const response = await CreateExpense(
        expenseTitle,
        expenseDescription,
        expenseAmount,
        expenseCurrency,
        expensePaidBy,
        expenseSplitType,
        expenseSplits,
        expenseGroupId,
        expensePayers, // 👈 include for reference if API supports it
        token,
      );

      console.log('response-=-= createExpense', response);
      alert('Expense added successfully!');
    } catch (error) {
      console.error('Error creating expense:', error);
      alert('Something went wrong while adding the expense.');
    }
  };

  const handleSelectPayers = payers => {
    setSelectedPayersList(payers); // array of { id, name, amount }
    console.log('Selected payers:', payers);
  };
  console.log('selectelist-=-=-=', selectedPayersList);

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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowPeopleModal(true)}
            style={{
              backgroundColor: '#ECECEC',
              borderRadius: HP(1.2),
              marginBottom: HP(2),
              paddingHorizontal: HP(2),
              paddingVertical: HP(1.5),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flex: 1, marginRight: WP(2)}}>
              <CustomText
                style={{
                  color: selectedGroup ? '#3E3E54' : '#9B9B9B',
                  fontFamily: Fonts.MontserratMedium,
                }}>
                {selectedGroup?.name ||
                  selectedFriendsLabel ||
                  'Select group or friends'}
              </CustomText>
            </View>
            <Ionicons
              name="chevron-down"
              color={'#4955E6'}
              size={18}
              style={{marginLeft: WP(2)}}
            />
          </TouchableOpacity>
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
            value={title}
            onChangeText={setTitle}
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
                fontFamily: Fonts.MontserratRegular,
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
            onPress={handleOpenPaidByModal}>
            <View
              style={{
                paddingHorizontal: HP(2),
                width: WP(80),
                height: HP(5),
                justifyContent: 'center',
              }}>
              <CustomText
                style={{color: '#3E3E54', fontFamily: Fonts.MontserratMedium}}>
                <CustomText>
                  {paidByMode === 'multiple'
                    ? `Multiple (${
                        Object.keys(multiplePayers).filter(
                          id => parseFloat(multiplePayers[id]) > 0,
                        ).length
                      } payers)`
                    : selectedPayerName || 'Select payer'}
                </CustomText>
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
            onPress={handleSplit}>
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
              numberOfLines={4}
              style={{
                width: WP(80),
                fontFamily: Fonts.MontserratMedium,
                paddingLeft: HP(1.5),
              }}
              value={description}
              onChangeText={setDescription}
            />
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
              position: 'absolute',
              bottom: HP(-5),
            }}
            onPress={handleAddExpense}>
            <CustomText
              style={{fontSize: FS(2.5), color: 'white', fontWeight: '700'}}
              children={'Add Expense'}
            />
          </TouchableOpacity>
          {/* {!isNaN(splitResult) && (
            <CustomText
              style={{marginTop: HP(2), color: '#4955E6', fontSize: FS(2)}}>
              Each person pays: {selectedCurrency.symbol}
              {Number(splitResult).toFixed(2)}
            </CustomText>
          )} */}
        </View>
      </View>
      <Modal
        visible={showPeopleModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowPeopleModal(false)}>
        <View style={styles.peopleModalOverlay}>
          <Pressable
            style={{flex: 1}}
            onPress={() => setShowPeopleModal(false)}
          />
          <View style={styles.peopleModalContainer}>
            <View style={styles.modalHandle} />
            <CustomText style={styles.peopleModalTitle}>
              Select Participants
            </CustomText>
            <View style={styles.peopleTabRow}>
              {[
                {key: 'groups', label: 'Groups'},
                {key: 'friends', label: 'Friends'},
              ].map(tab => (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.peopleTabButton,
                    peopleTab === tab.key && styles.peopleTabButtonActive,
                  ]}
                  onPress={() => setPeopleTab(tab.key)}>
                  <CustomText
                    style={{
                      color: peopleTab === tab.key ? '#fff' : '#888',
                      fontFamily:
                        peopleTab === tab.key
                          ? Fonts.MontserratBold
                          : Fonts.MontserratRegular,
                    }}>
                    {tab.label}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
            {peopleTab === 'groups' ? (
              <ScrollView style={{maxHeight: HP(40)}}>
                {isFetchingPeople ? (
                  <CustomText style={styles.placeholderText}>
                    Loading groups...
                  </CustomText>
                ) : groupOptions.length === 0 ? (
                  <CustomText style={styles.placeholderText}>
                    No groups found
                  </CustomText>
                ) : (
                  groupOptions.map(group => {
                    const isSelected = selectedGroup?.id === group.id;
                    return (
                      <TouchableOpacity
                        key={group.id}
                        style={[
                          styles.peopleRow,
                          isSelected && styles.peopleRowSelected,
                        ]}
                        onPress={() => handleSelectGroup(group)}>
                        <View>
                          <CustomText style={styles.peopleRowTitle}>
                            {group?.name || 'Group'}
                          </CustomText>
                          <CustomText style={styles.peopleRowSubtitle}>
                            {group?.description || 'No description'}
                          </CustomText>
                        </View>
                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#4955E6"
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })
                )}
              </ScrollView>
            ) : (
              <ScrollView style={{maxHeight: HP(40)}}>
                {isFetchingPeople ? (
                  <CustomText style={styles.placeholderText}>
                    Loading friends...
                  </CustomText>
                ) : friends.filter(friend => !friend?.isSelf).length === 0 ? (
                  <CustomText style={styles.placeholderText}>
                    No friends found
                  </CustomText>
                ) : (
                  friends
                    .filter(friend => !friend?.isSelf)
                    .map(friend => {
                      const friendName = getFriendName(friend);
                      const friendInitial = getFriendInitial(friend);
                      const isSelected = selectedPeople.includes(friend.id);
                      return (
                        <TouchableOpacity
                          key={friend.id}
                          style={[
                            styles.peopleRow,
                            isSelected && styles.peopleRowSelected,
                          ]}
                          onPress={() => toggleFriendSelection(friend.id)}>
                          <View style={styles.peopleRowAvatar}>
                            <CustomText style={styles.peopleRowAvatarText}>
                              {friendInitial}
                            </CustomText>
                          </View>
                          <View style={{flex: 1}}>
                            <CustomText style={styles.peopleRowTitle}>
                              {friendName}
                            </CustomText>
                            {friend?.email && (
                              <CustomText style={styles.peopleRowSubtitle}>
                                {friend.email}
                              </CustomText>
                            )}
                          </View>
                          <Ionicons
                            name={isSelected ? 'checkbox' : 'square-outline'}
                            size={20}
                            color={isSelected ? '#4955E6' : '#C4C4C4'}
                          />
                        </TouchableOpacity>
                      );
                    })
                )}
              </ScrollView>
            )}
            <View style={styles.peopleModalButtonRow}>
              <TouchableOpacity
                onPress={() => setShowPeopleModal(false)}
                style={[
                  styles.peopleModalButton,
                  styles.peopleModalButtonSecondary,
                  {marginRight: WP(2)},
                ]}>
                <CustomText style={{color: '#4955E6'}}>Cancel</CustomText>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={isGroupSubmitting}
                onPress={handleCreateGroupFromSelection}
                style={[
                  styles.peopleModalButton,
                  {marginLeft: WP(2)},
                  isGroupSubmitting && {opacity: 0.6},
                ]}>
                {isGroupSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <CustomText style={{color: '#fff'}}>Submit</CustomText>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <PaidByModal
        visible={showModal}
        onClose={handleClosePaidByModal}
        friends={friends}
        paidByMode={paidByMode}
        setPaidByMode={setPaidByMode}
        selectedPayer={selectedPayer}
        setSelectedPayer={setSelectedPayer}
        setSelectedPayerName={setSelectedPayerName}
        multiplePayers={multiplePayers}
        setMultiplePayers={setMultiplePayers}
        totalPaidAmount={totalPaidAmount}
        totalExpenseAmount={totalExpenseAmount}
        amountLeft={amountLeft}
        isPaymentComplete={isPaymentComplete}
        onConfirm={handleClosePaidByModal}
        onSelectPayers={handleSelectPayers}
      />

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
                <View style={{height: HP(65)}}>
                  <FlatList
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: friend}) => {
                      const friendName = getFriendName(friend);
                      const friendInitial = getFriendInitial(friend);
                      const isSelected = selectedSplitters.includes(friend.id);
                      return (
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
                              {friendInitial}
                            </CustomText>
                          </View>
                          {/* Name */}
                          <CustomText
                            style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                            {friendName}
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
                              backgroundColor: isSelected ? '#FF9800' : '#fff',
                            }}>
                            {isSelected && (
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
                      );
                    }}
                  />
                </View>
              )}

              {splitByMode === 'unequally' && (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={HP(15)} // adjust if header present
                  style={{height: HP(65)}}
                  enabled>
                  {/* // <View style={{height: HP(66)}}> */}
                  <FlatList
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: friend}) => {
                      const friendName = getFriendName(friend);
                      const friendInitial = getFriendInitial(friend);
                      return (
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
                              {friendInitial}
                            </CustomText>
                          </View>
                          {/* Name */}
                          <CustomText
                            style={{flex: 1, fontSize: 16, color: '#3E3E54'}}>
                            {friendName}
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
                      );
                    }}></FlatList>

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
                  {/* </View> */}
                </KeyboardAvoidingView>
              )}

              {splitByMode === 'percentage' && (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={HP(14)} // adjust if header present
                  style={{height: HP(65)}}
                  enabled>
                  <FlatList
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: friend}) => {
                      const friendName = getFriendName(friend);
                      const friendInitial = getFriendInitial(friend);
                      return (
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
                            <CustomText style={{color: '#fff', fontSize: 16}}>
                              {friendInitial}
                            </CustomText>
                          </View>

                          {/* Name + Inputs */}
                          <View style={{flex: 1}}>
                            <CustomText
                              style={{fontSize: 16, color: '#3E3E54'}}>
                              {friendName}
                            </CustomText>

                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 6,
                              }}>
                              {/* % Input */}
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
                                  const total = parseFloat(amount) || 0;
                                  let percentValue = parseFloat(clean) || 0;
                                  if (percentValue > 100) percentValue = 100;
                                  if (percentValue < 0) percentValue = 0;

                                  // update %
                                  setPercentageValues(prev => ({
                                    ...prev,
                                    [friend.id]: clean,
                                  }));

                                  // auto calculate ₹
                                  const splitResult =
                                    (total * percentValue) / 100;
                                  const formatted =
                                    !isNaN(splitResult) &&
                                    splitResult !== undefined
                                      ? splitResult.toFixed(2)
                                      : '0';

                                  setSplitValues(prev => ({
                                    ...prev,
                                    [friend.id]: formatted,
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

                          {/* ₹ Input */}
                          <CustomText
                            style={{color: '#3E3E54', marginRight: 4}}>
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
                              fontFamily: Fonts.MontserratRegular,
                            }}
                            keyboardType="numeric"
                            value={
                              splitValues?.[friend.id]
                                ? String(splitValues[friend.id])
                                : ''
                            }
                            onChangeText={text => {
                              const clean = text.replace(/[^0-9.]/g, '');
                              const amtValue = parseFloat(clean) || 0;
                              const total = parseFloat(amount) || 0;

                              // update ₹
                              setSplitValues(prev => ({
                                ...prev,
                                [friend.id]: clean,
                              }));

                              // auto calculate %
                              const percentResult = total
                                ? (amtValue / total) * 100
                                : 0;
                              const formatted =
                                !isNaN(percentResult) &&
                                percentResult !== undefined
                                  ? percentResult.toFixed(2)
                                  : '0.00';

                              setPercentageValues(prev => ({
                                ...prev,
                                [friend.id]: formatted,
                              }));
                            }}
                            placeholder="0.00"
                          />
                        </View>
                      );
                    }}
                  />

                  {/* Bottom Summary */}
                  <KeyboardAvoidingView style={{backgroundColor: '#fff'}}>
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
                  </KeyboardAvoidingView>
                </KeyboardAvoidingView>
              )}

              {splitByMode === 'ratio' && (
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                  keyboardVerticalOffset={HP(14)} // adjust if header present
                  style={{height: HP(65)}}
                  enabled>
                  <FlatList
                    data={friends}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item: friend}) => {
                      const friendName = getFriendName(friend);
                      const friendInitial = getFriendInitial(friend);
                      return (
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
                              {friendInitial}
                            </CustomText>
                          </View>
                          {/* Name and Shares */}
                          <View style={{flex: 1}}>
                            <CustomText
                              style={{fontSize: 16, color: '#3E3E54'}}>
                              {friendName}
                            </CustomText>
                            <CustomText
                              style={{fontSize: 12, color: '#AAAAAA'}}
                              children={`[${
                                splitValues[friend.id] || '_'
                              } share${
                                parseInt(splitValues[friend.id], 10) === 1
                                  ? ''
                                  : 's'
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
                          <CustomText
                            style={{color: '#3E3E54', marginRight: 4}}>
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
                      );
                    }}
                  />

                  {/* Summary at bottom */}

                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      // left: HP(15),
                      // right: HP(15),
                      height: HP(7),
                      backgroundColor: '#fff',
                      width: WP(100),
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
                </KeyboardAvoidingView>
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

const styles = StyleSheet.create({
  peopleModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  peopleModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: HP(3),
    borderTopRightRadius: HP(3),
    padding: HP(2),
    minHeight: HP(40),
  },
  modalHandle: {
    width: WP(15),
    height: HP(0.5),
    backgroundColor: '#E0E0E0',
    alignSelf: 'center',
    borderRadius: HP(0.5),
    marginBottom: HP(1.5),
  },
  peopleModalTitle: {
    fontSize: FS(2),
    color: '#3E3E54',
    fontFamily: Fonts.MontserratBold,
    textAlign: 'center',
    marginBottom: HP(1.5),
  },
  peopleTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    borderRadius: HP(2),
    padding: HP(0.5),
    marginBottom: HP(2),
  },
  peopleTabButton: {
    flex: 1,
    paddingVertical: HP(1),
    borderRadius: HP(1.5),
    alignItems: 'center',
  },
  peopleTabButtonActive: {
    backgroundColor: '#4955E6',
  },
  placeholderText: {
    textAlign: 'center',
    color: '#AAAAAA',
    paddingVertical: HP(4),
    fontFamily: Fonts.MontserratMedium,
  },
  peopleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HP(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  peopleRowSelected: {
    backgroundColor: '#F7F7FF',
  },
  peopleRowTitle: {
    fontSize: FS(1.6),
    color: '#3E3E54',
    fontFamily: Fonts.MontserratMedium,
  },
  peopleRowSubtitle: {
    fontSize: FS(1.2),
    color: '#A0A0A0',
  },
  peopleRowAvatar: {
    width: HP(4.5),
    height: HP(4.5),
    borderRadius: HP(2.25),
    backgroundColor: '#B3B3C6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: HP(1.5),
  },
  peopleRowAvatarText: {
    color: '#fff',
    fontSize: FS(1.8),
    fontFamily: Fonts.MontserratBold,
  },
  peopleModalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: HP(2),
  },
  peopleModalButton: {
    flex: 1,
    backgroundColor: '#4955E6',
    borderRadius: HP(2),
    paddingVertical: HP(1.5),
    alignItems: 'center',
  },
  peopleModalButtonSecondary: {
    backgroundColor: '#ECECEC',
  },
});
