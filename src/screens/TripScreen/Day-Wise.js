import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Entypo from 'react-native-vector-icons/Entypo';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Animated, {FadeInDown, FadeOutUp, Layout} from 'react-native-reanimated';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import Icons from '../../theme/Icons';

export default function DayWise() {
  const [modalDayId, setModalDayId] = useState(null);
  const [newType, setNewType] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [addingList, setAddingList] = useState('events');
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [activityType, setActivityType] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityCost, setActivityCost] = useState('');
  const [activityStartTime, setActivityStartTime] = useState('Select Time');
  const [activityDuration, setActivityDuration] = useState('OFF-DAY');
  const [activityEndTime, setActivityEndTime] = useState('Select Time');
  const [activityDate, setActivityDate] = useState('Select Day Date');
  const [activityContact, setActivityContact] = useState('');
  const [activityLocation, setActivityLocation] = useState('Select Location');
  const [activityNotes, setActivityNotes] = useState('');
  const [showDropdown, setShowDropdown] = useState('');
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const activityTypeColors = {
    Activity: '#A5F3FC',
    Food: '#FFC2C2',
    Accommodation: '#FFE585',
    Transportation: '#A7F3D0',
    Other: '#DDD6FE',
  };

  const handleSaveActivity = () => {
    if (!activityType || !activityTitle.trim() || !modalDayId) {
      Alert.alert('Error', 'Please select type and enter title');
      return;
    }
    setDays(prevDays =>
      prevDays.map(day => {
        if (day.id !== modalDayId) return day;
        // const newId = `event${day.id.replace('day', '')}-${Date.now()}`;
        const newItem = {
          id: generateUniqueKey(),
          type: activityType,
          title: activityTitle,
          color: activityTypeColors[activityType] || '#A5F3FC',
          cost: activityCost,
          startTime: activityStartTime,
          duration: activityDuration,
          endTime: activityEndTime,
          date: activityDate,
          contact: activityContact,
          location: activityLocation,
          notes: activityNotes,
        };
        return {
          ...day,
          events: [...day.events, newItem],
        };
      }),
    );
    setActivityModalVisible(false);
    setActivityType('');
    setActivityTitle('');
    setActivityCost('');
    setActivityStartTime('Select Time');
    setActivityDuration('OFF-DAY');
    setActivityEndTime('Select Time');
    setActivityDate('Select Day Date');
    setActivityContact('');
    setActivityLocation('Select Location');
    setActivityNotes('');
  };

  // ✅ Move this above useState
  const initialData = [
    {
      id: '1',
      title: 'Accommodation',
      description: 'Check-in at the Goa W Resort, Beach side resort',
      color: '#FFE680',
    },
    {
      id: '2',
      title: 'Food',
      description: 'Lunch at Baga Beach',
      color: '#FFD6DA',
    },
    {
      id: '3',
      title: 'Shopping',
      description: 'Shopping at Mogu Mogu Plaza',
      color: '#E6DAFF',
    },
    {
      id: '4',
      title: 'Activity',
      description: 'Cultural experience at Maga Maga',
      color: '#C6F3F8',
    },
    {
      id: '5',
      title: 'Food',
      description: 'Lunch at Baga Beach',
      color: '#FFD6DA',
    },
    {
      id: '6',
      title: 'Shopping',
      description: 'Shopping at Mogu Mogu Plaza',
      color: '#E6DAFF',
    },
    {
      id: '7',
      title: 'Activity',
      description: 'Cultural experience at Maga Maga',
      color: '#C6F3F8',
    },
  ];

  const [data, setData] = useState(initialData);

  const renderItem = ({item, drag, isActive}) => (
    <ScaleDecorator>
      <Animated.View
        entering={FadeInDown}
        exiting={FadeOutUp}
        layout={Layout.springify()}
        style={{}}>
        <TouchableOpacity
          style={{
            padding: HP(1),
            backgroundColor: '#fff',
            marginVertical: HP(2),
            borderRadius: HP(1),
            width: WP(80),
            alignSelf: 'center',
            elevation: 3,
          }}
          onLongPress={drag}
          delayLongPress={500}>
          <View
            style={[
              styles.card,
              {
                backgroundColor: item.color,
                transform: [{scale: isActive ? 1.05 : 1}],
              },
            ]}>
            <View>
              <CustomText style={styles.title}>{item.title}</CustomText>
              <CustomText style={styles.desc}>{item.description}</CustomText>
            </View>
          </View>
          <View
            style={{
              padding: HP(0.5),
              backgroundColor: '#f4f4f4',
              paddingHorizontal: HP(2),
            }}>
            <CustomText style={styles.address}>
              Road abc, town xyz, state abc
            </CustomText>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </ScaleDecorator>
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4F4F4',
          paddingTop: HP(3),
          opacity: 3,
          elevation: 1,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(90),
            marginLeft: WP(5),
            alignItems: 'center',
            marginBottom: HP(3),
          }}>
          <TouchableOpacity
            style={{
              height: HP(2.5),
              width: HP(2.5),
              backgroundColor: '#C3C3C3',
              borderRadius: HP(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo name={'chevron-left'} size={20} color={'#fff'} />
          </TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <CustomText style={{fontSize: FS(2)}} children={'Day 1'} />
            <CustomText
              style={{
                fontSize: FS(2),
                color: '#363636',
                fontFamily: Fonts.MontserratSemiBold,
              }}
              children={'Delhi'}
            />
            <View style={{flexDirection: 'row'}}>
              <CustomText
                style={{
                  fontSize: FS(1.8),
                  color: '#FFA015',
                  fontFamily: Fonts.MontserratSemiBold,
                  marginHorizontal: WP(2),
                }}
                children={'Saturday'}
              />
              <CustomText
                style={{
                  fontSize: FS(1.8),
                  color: '#363636',
                  fontFamily: Fonts.MontserratSemiBold,
                }}
                children={'28 Mar 2025'}
              />
            </View>
          </View>
          <TouchableOpacity
            style={{
              height: HP(2.5),
              width: HP(2.5),
              backgroundColor: '#4955E6',
              borderRadius: HP(3),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Entypo name={'chevron-right'} size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>

        {/* ✅ Draggable FlatList */}
        {/* <View style={{width: WP(90)}}> */}
        <DraggableFlatList
          data={data}
          onDragEnd={({data}) => setData(data)}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
      <Modal
        visible={activityModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setActivityModalVisible(false)}>
        <View style={styles.activityModalContainer}>
          <View style={styles.activityModalContent}>
            <View
              style={{
                height: HP(10),
                paddingHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#eee',
                backgroundColor: activityTypeColors[activityType] || '#A5F3FC',
                paddingTop: HP(3),
              }}>
              <View style={styles.dropdownContainer}>
                <TouchableOpacity
                  style={styles.dropdownHeader}
                  onPress={() => setShowDropdown(!showDropdown)}>
                  <CustomText style={styles.activityModalTitle}>
                    {activityType || 'Activity'}
                  </CustomText>
                  <Icon
                    name={showDropdown ? 'chevron-up' : 'chevron-down'}
                    size={16}
                    color="#9898B4"
                    style={{top: HP(1)}}
                  />
                </TouchableOpacity>

                {showDropdown && (
                  <View style={styles.dropdownOptions}>
                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        {backgroundColor: activityTypeColors.Activity},
                      ]}
                      onPress={() => {
                        setActivityType('Activity');
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownOptionText}>Activity</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        {backgroundColor: activityTypeColors.Food},
                      ]}
                      onPress={() => {
                        setActivityType('Food');
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownOptionText}>Food</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        {backgroundColor: activityTypeColors.Accommodation},
                      ]}
                      onPress={() => {
                        setActivityType('Accommodation');
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownOptionText}>
                        Accommodation
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        {
                          backgroundColor: activityTypeColors.Transportation,
                        },
                      ]}
                      onPress={() => {
                        setActivityType('Transportation');
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownOptionText}>
                        Transportation
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.dropdownOption,
                        {backgroundColor: activityTypeColors.Other},
                      ]}
                      onPress={() => {
                        setActivityType('Other');
                        setShowDropdown(false);
                      }}>
                      <Text style={styles.dropdownOptionText}>Other</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{position: 'absolute', right: WP(1), top: HP(0)}}
              onPress={() => setActivityModalVisible(false)}>
              <Image source={Icons.close} style={{resizeMode: 'center'}} />
            </TouchableOpacity>

            <ScrollView style={styles.activityModalScroll}>
              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Title</Text>
                <TextInput
                  placeholder="Clear a name to the telelocality"
                  value={activityTitle}
                  onChangeText={setActivityTitle}
                  style={styles.activityInput}
                  placeholderTextColor={'#AAAAAA'}
                />
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Cost</Text>
                <TextInput
                  placeholder="Enter activity Costing"
                  value={activityCost}
                  onChangeText={setActivityCost}
                  keyboardType="numeric"
                  style={styles.activityInput}
                  placeholderTextColor={'#AAAAAA'}
                />
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Start Time</Text>
                <TouchableOpacity style={styles.activityInput}>
                  <Text style={styles.activityTimeText}>{activityDate}</Text>
                </TouchableOpacity>
              </View>

              <View style={[styles.activityInputGroup, {alignSelf: 'center'}]}>
                <Text
                  style={[
                    styles.activityInputLabel,
                    {left: HP(7), top: HP(1)},
                  ]}>
                  Duration
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      let h = 0,
                        m = 0;
                      if (
                        typeof activityDuration === 'string' &&
                        activityDuration.includes(':')
                      ) {
                        [h, m] = activityDuration.split(':').map(Number);
                      }
                      let total = (h || 0) * 60 + (m || 0);
                      if (total > 30) total -= 30;
                      else total = 0;
                      const hours = Math.floor(total / 60);
                      const mins = total % 60;
                      setActivityDuration(
                        `${hours.toString().padStart(2, '0')}:${mins
                          .toString()
                          .padStart(2, '0')}`,
                      );
                    }}>
                    <Image source={Icons.Mine} style={{resizeMode: 'center'}} />
                  </TouchableOpacity>
                  <Text style={styles.activityDurationText}>
                    {(() => {
                      let h = 0,
                        m = 0;
                      if (
                        typeof activityDuration === 'string' &&
                        activityDuration.includes(':')
                      ) {
                        [h, m] = activityDuration.split(':').map(Number);
                      }
                      return `${h.toString().padStart(2, '0')}H:${m
                        .toString()
                        .padStart(2, '0')}M`;
                    })()}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      let h = 0,
                        m = 0;
                      if (
                        typeof activityDuration === 'string' &&
                        activityDuration.includes(':')
                      ) {
                        [h, m] = activityDuration.split(':').map(Number);
                      }
                      let total = (h || 0) * 60 + (m || 0) + 30;
                      const hours = Math.floor(total / 60);
                      const mins = total % 60;
                      setActivityDuration(
                        `${hours.toString().padStart(2, '0')}:${mins
                          .toString()
                          .padStart(2, '0')}`,
                      );
                    }}>
                    <Image source={Icons.Plus} style={{resizeMode: 'center'}} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Date/Day</Text>
                <TouchableOpacity style={styles.activityInput}>
                  <Text style={styles.activityTimeText}>{activityDate}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Point of Contact</Text>
                <TextInput
                  placeholder=""
                  value={activityContact}
                  onChangeText={setActivityContact}
                  style={styles.activityInput}
                  placeholderTextColor={'#AAAAAA'}
                />
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Location</Text>
                <TouchableOpacity style={styles.activityInput}>
                  <Text style={styles.activityTimeText}>
                    {activityLocation}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.activityInputGroup}>
                <Text style={styles.activityInputLabel}>Notes</Text>
                <TextInput
                  placeholder="Pooling URL instructions etc..."
                  value={activityNotes}
                  onChangeText={setActivityNotes}
                  multiline
                  style={[styles.activityInput, {height: 80}]}
                  placeholderTextColor={'#AAAAAA'}
                />
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.activitySaveButton}
              onPress={handleSaveActivity}>
              <Text style={styles.activitySaveButtonText}>Save a Action</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: FS(2),
    marginBottom: HP(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // elevation: 3,
    width: WP(75),
    // marginHorizontal: HP(3),
  },
  title: {
    // fontWeight: 'bold',
    fontSize: 16,
    color: '#3E3E54',
    fontFamily: Fonts.MontserratBold,
  },
  desc: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  address: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
  activityInput: {
    fontFamily: Fonts.MontserratRegular,
  },
});
