import React from 'react';
import {
  View,
  ScrollView,
  Animated,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  TextInput,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomText from '../../components/CustomText';
import Icon from 'react-native-vector-icons/FontAwesome6';
import StyleSheet from 'styled-components/dist/sheet';

const OverviewTabContent = ({
  styles,
  panResponder,
  scrollViewRef,
  scrollX,
  DropZone,
  days,
  DateColumn,
  dragging,
  currentDragItem,
  pan,
  activityModalVisible,
  setActivityModalVisible,
  activityTypeColors,
  activityType,
  showDropdown,
  setShowDropdown,
  HP,
  WP,
  openEditActivityModal,
  showTimePicker,
  setShowTimePicker,
  activityStartTime,
  formatTime,
  setActivityStartTime,
  showDatePicker,
  setShowDatePicker,
  activityDate,
  formatDate,
  setActivityDate,
  activityTitle,
  setActivityTitle,
  activityCost,
  setActivityCost,
  activityDuration,
  setActivityDuration,
  Icons,
  activityContact,
  setActivityContact,
  activityLocation,
  setActivityLocation,
  activityNotes,
  setActivityNotes,
  handleSaveActivity,
}) => (
  <View style={{flex: 1}}>
    <View style={styles.datesContainer} {...panResponder.panHandlers}>
      <ScrollView
        horizontal
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={e => {
          scrollX.current = e.nativeEvent.contentOffset.x;
        }}
        style={styles.scrollView}>
        <DropZone index={0} />
        {days.map((d, idx) => (
          <React.Fragment key={d.id}>
            <DateColumn day={d} />
            <DropZone index={idx + 1} />
          </React.Fragment>
        ))}
      </ScrollView>

      {dragging && currentDragItem && (
        <Animated.View
          style={[
            styles.dragPreview,
            {
              transform: [{translateX: pan.x}, {translateY: pan.y}],
              backgroundColor: currentDragItem.color,
              zIndex: 100,
            },
          ]}>
          <CustomText style={styles.cardType}>
            {currentDragItem.type}
          </CustomText>
          <CustomText style={styles.cardTitle}>
            {currentDragItem.title}
          </CustomText>
        </Animated.View>
      )}
    </View>
    {/* Add Event Modal */}
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
                  {[
                    {
                      label: 'Activity',
                      color: activityTypeColors.Activity,
                    },
                    {label: 'Food', color: activityTypeColors.Food},
                    {
                      label: 'Accommodation',
                      color: activityTypeColors.Accommodation,
                    },
                    {
                      label: 'Transportation',
                      color: activityTypeColors.Transportation,
                    },
                    {label: 'Other', color: activityTypeColors.Other},
                  ].map(opt => (
                    <TouchableOpacity
                      key={opt.label}
                      style={[
                        styles.dropdownOption,
                        {
                          backgroundColor:
                            activityType === opt.label ? opt.color : '#fff',
                        },
                      ]}
                      onPress={() => {
                        openEditActivityModal(null, {type: opt.label});
                        setShowDropdown(false);
                      }}>
                      <Text
                        style={[
                          styles.dropdownOptionText,
                          activityType === opt.label && {color: '#222'},
                        ]}>
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
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
              <TouchableOpacity
                style={styles.activityInput}
                onPress={() => setShowTimePicker(true)}>
                <Text style={styles.activityTimeText}>
                  {formatTime(activityStartTime)}
                </Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={
                    activityStartTime && typeof activityStartTime === 'object'
                      ? activityStartTime
                      : new Date()
                  }
                  mode="time"
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowTimePicker(false);
                    if (event.type === 'set' && selectedDate) {
                      setActivityStartTime(selectedDate);
                    }
                  }}
                />
              )}
            </View>

            <View style={[styles.activityInputGroup, {alignSelf: 'center'}]}>
              <Text
                style={[styles.activityInputLabel, {left: HP(7), top: HP(1)}]}>
                Duration
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={{}}
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
                  style={{}}
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
              <TouchableOpacity
                style={styles.activityInput}
                onPress={() => setShowDatePicker(true)}>
                <Text style={styles.activityTimeText}>
                  {formatDate(activityDate)}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={
                    activityDate && typeof activityDate === 'object'
                      ? activityDate
                      : new Date()
                  }
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (event.type === 'set' && selectedDate) {
                      setActivityDate(selectedDate);
                    }
                  }}
                />
              )}
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
                <Text style={styles.activityTimeText}>{activityLocation}</Text>
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
  </View>
);

const styles = StyleSheet.create({
  activityInput: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 8,
    padding: 12,
    fontSize: FS(1.8),
    color: '#3E3E54',
    fontFamily: Fonts.MontserratBold,
  },
});

export default OverviewTabContent;
