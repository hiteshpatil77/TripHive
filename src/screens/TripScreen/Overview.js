import React, {useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  PanResponder,
  Animated,
  Text,
  Modal,
  TextInput,
  Alert,
} from 'react-native';

import TripHeader from '../../components/TripHeader';
import Icons from '../../theme/Icons';
import CustomText from '../../components/CustomText';
import {FS, HP, WP} from '../../utils/Dimention';
import Colors from '../../theme/Color';
import Fonts from '../../theme/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import MapboxGL from '@rnmapbox/maps';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const COLUMN_WIDTH = SCREEN_WIDTH * 0.8;
const ITEM_HEIGHT = 150;
const EDGE_THRESHOLD = 50;

// Mapbox configuration
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmh1dG9yaWEiLCJhIjoiY2x1am5nbzRvMDM4MTJpbzJic28zZnoyNCJ9.x86CCCHxwknUx-SJS1I5kQ',
);
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer('Mapbox');

const daysData = [
  {
    id: 'day0',
    day: 'Saturday',
    date: '26 Mar 2025',
    location: 'Delhi',
    events: [
      {
        id: 'event0-0',
        type: 'Accommodation',
        title: 'Check-in at the Goa W Resortsfvsvfsvsvsw sddf sefg sefg',
        color: '#ffe585',
      },
      {
        id: 'event0-1',
        type: 'Food',
        title: 'Lunch at Baga Baga',
        color: '#ffc2c2',
      },
    ],
    services: [],
  },
  {
    id: 'day1',
    day: 'Saturday',
    date: '27 Mar 2025',
    location: 'Delhi',
    events: [],
    services: [],
  },
  {
    id: 'day2',
    day: 'Saturday',
    date: '28 Mar 2025',
    location: 'Delhi',
    events: [
      {
        id: 'event0-0',
        type: 'Accommodation',
        title: 'Check-in at the Goa W Resortsfvsvfsvsvsw sddf sefg sefg',
        color: '#ffe585',
      },
      {
        id: 'event0-1',
        type: 'Food',
        title: 'Lunch at Baga Baga',
        color: '#ffc2c2',
      },
    ],
    services: [],
  },
  {
    id: 'day3',
    day: 'Sunday',
    date: '29 Mar 2025',
    location: 'Mumbai',
    events: [],
    services: [],
  },
];

const tabs = [
  {tab: 'Trip', Pic: Icons.Bag, ID: '0'},
  {tab: 'Overview', Pic: Icons.OverView, ID: '1'},
  {tab: 'Day-wise', Pic: Icons.daywise, ID: '2'},
  {tab: 'Budget', Pic: Icons.daywise, ID: '3'},
  {tab: 'Explore', Pic: Icons.Explore1, ID: '4'},
];

// Add a mapping for activity type to color

const Overview = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [days, setDays] = useState(daysData);

  // Drag state
  const [dragging, setDragging] = useState(false);
  const [currentDragItem, setDragItem] = useState(null);
  const pan = useRef(new Animated.ValueXY()).current;

  // Horizontal scroll refs
  const scrollViewRef = useRef(null);
  const scrollX = useRef(0); // live horizontal scroll offset

  // New state to track hover index and hovered day
  const [hovered, setHovered] = useState({
    dayId: null,
    list: null,
    index: null,
  });

  // New: Track hovered drop zone index (between columns)
  const [hoveredDropZone, setHoveredDropZone] = useState(null);

  // Modal state for adding event
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

  // Settings modal state
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  // Trip tab state (merged from BacheresTrip)
  const [itinerary, setItinerary] = useState([
    {
      id: 0,
      date: '10/9',
      city: 'Delhi',
      color: '#656565',
      days: '1',
      flight: 'Bus',
      duration: 3,
      coords: [77.1025, 28.7041],
    },
    {
      id: 1,
      date: '10/9',
      city: 'Jaipur',
      color: '#0373F3',
      days: '1',
      flight: 'Bus',
      duration: 3,
      coords: [75.7873, 26.9124],
    },
    {
      id: 2,
      date: '10/9',
      city: 'Jaisalmer',
      color: '#E6495E',
      days: '1',
      flight: 'Bus',
      duration: 3,
      coords: [70.9167, 26.9157],
    },
    {
      id: 3,
      date: '10/9',
      city: 'Goa',
      color: '#F3BB03',
      days: '1',
      flight: 'Bus',
      duration: 3,
      coords: [74.124, 15.2993],
    },
  ]);
  const [dayModalVisible, setDayModalVisible] = useState(false);
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null);

  const dayOptions = [1, 2, 3, 4];
  const transportOptions = ['Bus', 'Bike', 'Train', 'Flight'];

  const incrementDuration = cityId => {
    setItinerary(prevItinerary =>
      prevItinerary.map(item =>
        item.id === cityId ? {...item, duration: item.duration + 1} : item,
      ),
    );
  };

  const decrementDuration = cityId => {
    setItinerary(prevItinerary =>
      prevItinerary.map(item =>
        item.id === cityId
          ? {...item, duration: Math.max(1, item.duration - 1)}
          : item,
      ),
    );
  };

  const handleDaySelect = day => {
    if (selectedCityId !== null) {
      setItinerary(prevItinerary =>
        prevItinerary.map(item =>
          item.id === selectedCityId ? {...item, days: day.toString()} : item,
        ),
      );
    }
    setDayModalVisible(false);
  };

  const handleTransportSelect = transport => {
    if (selectedCityId !== null) {
      setItinerary(prevItinerary =>
        prevItinerary.map(item =>
          item.id === selectedCityId ? {...item, flight: transport} : item,
        ),
      );
    }
    setTransportModalVisible(false);
  };

  const handleAddItem = () => {
    if (!newType.trim() || !newTitle.trim()) {
      Alert.alert('Error', 'Please enter both type and title');
      return;
    }

    const newDays = [...days];
    const dayIndex = newDays.findIndex(d => d.id === modalDayId);

    if (dayIndex >= 0) {
      const newItem = {
        id: `event${dayIndex}-${Date.now()}`,
        type: newType.trim(),
        title: newTitle.trim(),
        // color: randomColor(),
      };

      if (addingList === 'events') {
        newDays[dayIndex].events.push(newItem);
      } else {
        newDays[dayIndex].services.push(newItem);
      }

      setDays(newDays);
      closeModal();
    }
  };

  const closeModal = () => {
    setActivityModalVisible(false);
    setNewType('');
    setNewTitle('');
  };

  const handleSettingsPress = () => {
    setSettingsModalVisible(true);
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const activityTypeColors = {
    Activity: '#A5F3FC',
    Food: '#FFC2C2',
    Accommodation: '#FFE585',
    Transportation: '#A7F3D0',
    Other: '#DDD6FE',
  };

  // Track the index of the floating (dragged) tile in the stacked list
  const [floatingInfo, setFloatingInfo] = useState({dayId: null, index: null});

  const handleDragStart = (item, g) => {
    // Find the stacked index for the floating tile
    const colIdx = Math.floor((g.x0 + scrollX.current) / COLUMN_WIDTH);
    if (colIdx < 0 || colIdx >= days.length) return;
    const day = days[colIdx];
    const stacked = getStacked(day);
    const relY = g.y0 - HP(26);
    const itemIdx = Math.floor(relY / ITEM_HEIGHT);

    setFloatingInfo({dayId: day.id, index: itemIdx});
    setDragItem(item);
    setDragging(true);
    pan.setValue({
      x: g.x0 - COLUMN_WIDTH / 2,
      y: g.y0 - 100,
    });
  };

  const getStacked = day => [
    ...day.events.map(ev => ({...ev, list: 'events'})),
    ...day.services.map(sv => ({...sv, list: 'services'})),
  ];

  const DropZone = ({index}) => (
    <View
      style={[
        styles.dropZone,
        hoveredDropZone === index && styles.dropZoneActive,
      ]}
      onLayout={() => {}}>
      {/* Visual indicator */}
      {hoveredDropZone === index && <View style={styles.dropZoneIndicator} />}
    </View>
  );

  const handleDragMove = (item, g) => {
    // Update preview position
    pan.setValue({
      x: g.moveX - COLUMN_WIDTH / 2,
      y: g.moveY - 100,
    });

    if (g.moveX < EDGE_THRESHOLD) {
      scrollViewRef.current?.scrollTo({
        x: Math.max(0, scrollX.current - 50),
        animated: false,
      });
    } else if (g.moveX > SCREEN_WIDTH - EDGE_THRESHOLD) {
      scrollViewRef.current?.scrollTo({
        x: Math.min(scrollX.current + 50, (days.length - 1) * COLUMN_WIDTH),
        animated: false,
      });
    }

    const dropX = g.moveX + scrollX.current;
    let dropZoneIdx = Math.floor(dropX / COLUMN_WIDTH + 0.5); // +0.5 to snap to between columns
    dropZoneIdx = clamp(dropZoneIdx, 0, days.length);

    setHoveredDropZone(dropZoneIdx);

    const targetDayIdx = clamp(
      Math.floor(dropX / COLUMN_WIDTH),
      0,
      days.length - 1,
    );
    if (targetDayIdx >= 0 && targetDayIdx < days.length) {
      const day = days[targetDayIdx];
      const stacked = getStacked(day);
      const columnTopY = HP(26);
      const dropYInColumn = g.moveY - columnTopY;
      const hoverIdx = clamp(
        Math.floor(dropYInColumn / ITEM_HEIGHT),
        0,
        stacked.length - 1,
      );
      setHovered({
        dayId: day.id,
        list: stacked[hoverIdx]?.list,
        index: hoverIdx,
      });
    } else {
      setHovered({dayId: null, list: null, index: null});
    }
  };

  const animatedYMap = useRef({}).current;

  const getAnimatedY = id => {
    if (!animatedYMap[id]) {
      animatedYMap[id] = new Animated.Value(0);
    }
    return animatedYMap[id];
  };

  const animateCardY = (id, toValue) => {
    Animated.timing(getAnimatedY(id), {
      toValue,
      duration: 180,
      useNativeDriver: true,
    }).start();
  };

  const handleDragEnd = (item, g) => {
    const dropX = g.moveX + scrollX.current;
    let dropZoneIdx = Math.floor(dropX / COLUMN_WIDTH + 0.5);
    dropZoneIdx = clamp(dropZoneIdx, 0, days.length);

    const sourceDayIdx = days.findIndex(d => d.id === item.dayId);

    // Copy state so we can mutate safely
    const newDays = [...days];
    const sourceDay = newDays[sourceDayIdx];

    const sourceList =
      item.list === 'services' ? sourceDay.services : sourceDay.events;
    const movedIndex = sourceList.findIndex(e => e.id === item.id);
    const [moved] = sourceList.splice(movedIndex, 1);

    if (
      dropZoneIdx !== sourceDayIdx &&
      dropZoneIdx >= 0 &&
      dropZoneIdx <= days.length
    ) {
      // If dropping after last column, append to last day
      let targetDayIdx =
        dropZoneIdx === days.length ? days.length - 1 : dropZoneIdx;
      const targetDay = newDays[targetDayIdx];
      const targetList =
        item.list === 'services' ? targetDay.services : targetDay.events;

      // Insert at end of list (or at hovered index if inside a column)
      let insertIdx = targetList.length;
      if (
        hovered.dayId === targetDay.id &&
        hovered.list === item.list &&
        hovered.index !== null
      ) {
        // Only count items of the same list type up to hovered.index
        const stacked = getStacked(targetDay);
        let count = 0;
        for (let i = 0; i < stacked.length; i++) {
          if (i === hovered.index) break;
          if (stacked[i].list === item.list) count++;
        }
        insertIdx = count;
      }
      moved.dayId = targetDay.id;
      targetList.splice(insertIdx, 0, moved);
    } else {
      /**
       * 2️⃣  DRAG INSIDE SAME DAY  – reorder vertically
       */
      const columnTopY = HP(26);
      const dropYInColumn = g.moveY - columnTopY;
      const baseShift = item.list === 'services' ? sourceDay.events.length : 0;
      let dropSlotIndex = clamp(
        Math.floor(dropYInColumn / ITEM_HEIGHT) - baseShift,
        0,
        sourceList.length,
      );

      // Use hovered index if available and in same day/list
      if (
        hovered.dayId === item.dayId &&
        hovered.list === item.list &&
        hovered.index !== null
      ) {
        // Only count items of the same list type up to hovered.index
        const stacked = getStacked(sourceDay);
        let count = 0;
        for (let i = 0; i < stacked.length; i++) {
          if (i === hovered.index) break;
          if (stacked[i].list === item.list) count++;
        }
        dropSlotIndex = count;
      }

      sourceList.splice(dropSlotIndex, 0, moved);
    }

    setDays(newDays);
    setHovered({dayId: null, list: null, index: null});
    setHoveredDropZone(null);
    setDragging(false);
    setDragItem(null);
    pan.setValue({x: 0, y: 0});
    setFloatingInfo({dayId: null, index: null});

    // Reset all animated values to 0 for smoothness
    Object.keys(animatedYMap).forEach(id => {
      Animated.timing(animatedYMap[id], {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (e, g) => {
      const colIdx = Math.floor((g.x0 + scrollX.current) / COLUMN_WIDTH);
      if (colIdx < 0 || colIdx >= days.length) return;

      const day = days[colIdx];

      const stacked = [
        ...day.events.map(ev => ({...ev, list: 'events'})),
        ...day.services.map(sv => ({...sv, list: 'services'})),
      ];

      const relY = g.y0 - HP(26); // 26 ≈ TripHeader + Tabs height
      const itemIdx = Math.floor(relY / ITEM_HEIGHT);

      if (itemIdx >= 0 && itemIdx < stacked.length) {
        handleDragStart({...stacked[itemIdx], dayId: day.id}, g);
      }
    },
    onPanResponderMove: (e, g) => {
      if (dragging && currentDragItem) handleDragMove(currentDragItem, g);
    },
    onPanResponderRelease: (e, g) => {
      if (dragging && currentDragItem) handleDragEnd(currentDragItem, g);
    },
    onPanResponderTerminate: () => {
      setDragging(false);
      setDragItem(null);
      pan.setValue({x: 0, y: 0});
    },
  });

  const moveItemUp = index => {
    if (index === 0) return; // already top
    const updated = [...itinerary];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setItinerary(updated);
  };

  const moveItemDown = index => {
    if (index === itinerary.length - 1) return; // already bottom
    const updated = [...itinerary];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setItinerary(updated);
  };

  const Card = ({item}) => (
    <View>
      <View style={[styles.card, {backgroundColor: '#fff'}]}>
        <View
          style={{
            backgroundColor: item.color,
            padding: HP(1),
            borderRadius: HP(0.5),
          }}>
          <CustomText style={styles.cardType}>{item.type}</CustomText>
          <CustomText style={styles.cardTitle}>
            {item.title.length > 25
              ? `${item.title.substring(0, 25)}...`
              : item.title}
          </CustomText>
        </View>
        <View style={styles.locationRow}>
          <Icon name="location-dot" color="#B4B4B4" size={14} />
          <CustomText style={styles.locationText}>{item.title}</CustomText>
        </View>
      </View>
    </View>
  );

  // AnimatedCard with smooth animation (only slide up/down, no vibration, no duplicate floating card)
  const AnimatedCard = ({item, index, stacked, dayId}) => {
    // Hooks must be called unconditionally
    const animatedY = useRef(new Animated.Value(0)).current;

    // Determine if this card is currently the floating one
    const isFloating =
      dragging &&
      floatingInfo &&
      floatingInfo.dayId === dayId &&
      floatingInfo.index === index &&
      currentDragItem &&
      currentDragItem.id === item.id;

    // Only animate cards in the hovered (target) column and only slide up/down
    let translateY = 0;
    if (
      dragging &&
      currentDragItem &&
      hovered.dayId === dayId &&
      hovered.index !== null
    ) {
      const fromDay = currentDragItem.dayId;
      const fromIdx = stacked.findIndex(
        i => i.id === currentDragItem.id && dayId === fromDay,
      );
      const isSameDay = fromDay === dayId;

      if (isSameDay) {
        const from = fromIdx;
        const to = hovered.index;
        if (from < to && index > from && index <= to) {
          translateY = -ITEM_HEIGHT;
        } else if (from > to && index >= to && index < from) {
          translateY = ITEM_HEIGHT;
        }
      } else if (hovered.dayId === dayId) {
        if (index >= hovered.index) {
          translateY = ITEM_HEIGHT;
        }
      }
    }

    React.useEffect(() => {
      if (dragging) {
        Animated.timing(animatedY, {
          toValue: translateY,
          duration: 180,
          useNativeDriver: true,
        }).start();
      } else {
        animatedY.setValue(0);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [translateY, dragging]);

    if (isFloating) return null;

    const animatedStyle = {
      transform: [{translateY: animatedY}],
    };
    return (
      <Animated.View style={animatedStyle}>
        <Card item={item} />
      </Animated.View>
    );
  };

  const generateUniqueKey = () => {
    return `event_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;
  };
  const HIGHLIGHT_BG = '#FBF1E2';
  // eslint-disable-next-line react/no-unstable-nested-components
  const DateColumn = ({day}) => {
    const stacked = getStacked(day);
    const hasEvents = day.events.length > 0 || day.services.length > 0;
    const isDragHighlight = dragging && hovered && hovered.dayId === day.id;

    return (
      <View
        style={[
          styles.dateColumn,
          isDragHighlight && {
            backgroundColor: HIGHLIGHT_BG,
            borderRadius: 16,
          },
        ]}>
        <View style={styles.dateHeader}>
          <CustomText style={styles.location}>{day.location}</CustomText>
          <CustomText style={styles.dateNumber}>{day.day}</CustomText>
          <CustomText style={styles.dateMonth}>{day.date}</CustomText>
        </View>

        {!hasEvents && (
          <View style={styles.emptyState}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                setActivityModalVisible(true);
                setModalDayId(day.id);
                setAddingList('events');
              }}>
              <Text style={styles.addButtonText}>+ Add Event</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* STACKED ITEMS (events + services) */}
        {stacked.map((item, idx) => {
          // Hide the original tile if it's being dragged (floating)
          const isFloating =
            dragging &&
            floatingInfo &&
            floatingInfo.dayId === day.id &&
            floatingInfo.index === idx;
          if (isFloating) return null;
          return (
            <View key={item.id} style={styles.itemWrapper}>
              <AnimatedCard
                item={item}
                index={idx}
                stacked={stacked}
                dayId={day.id}
              />

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#D9D9D9cc',
                  borderRadius: HP(0.5),
                  marginTop: HP(1),
                  alignSelf: 'flex-start',
                  marginLeft: HP(2),
                }}
                onPress={() => {
                  setActivityModalVisible(true);
                  setModalDayId(day.id);
                  setAddingList('events');
                }}>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    padding: HP(0.5),
                    paddingHorizontal: HP(1),
                    color: '#D9D9D9',
                  }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
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

  return (
    <View style={styles.screen}>
      <TripHeader
        hearder="Bachelor Trip"
        navigation={navigation}
        isVisible={true}
        onSettingsPress={handleSettingsPress}
      />

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map(t => (
          <TouchableOpacity
            key={t.ID}
            style={[styles.tab, activeTab.ID === t.ID && styles.activeTab]}
            onPress={() => setActiveTab(t)}>
            <Image
              source={t.Pic}
              style={[
                styles.tabIcon,
                {
                  tintColor: activeTab.ID === t.ID ? Colors.white : '#5B5B5B',
                  marginRight: HP(1),
                },
              ]}
            />
            <CustomText
              style={[
                styles.tabText,
                activeTab.ID === t.ID && styles.activeTabText,
              ]}>
              {t.tab}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab.tab === 'Trip' ? (
        <View
          style={{
            flex: 1,
            width: WP(90),
            alignSelf: 'center',
            marginTop: HP(2),
          }}>
          <FlatList
            data={itinerary}
            extraData={itinerary}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={drag}
                style={[
                  styles.item,
                  isActive && {backgroundColor: Colors.lightGray},
                ]}>
                <CustomText style={styles.date}>{item.date}</CustomText>

                <View style={styles.timeline}>
                  {item.id !== 0 ? (
                    <View
                      style={[
                        styles.dot,
                        {
                          backgroundColor: item.color,
                          alignItems: 'center',
                          justifyContent: 'center',
                        },
                      ]}>
                      <MaterialIcons
                        name="location-on"
                        size={10}
                        style={{color: Colors.white}}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: HP(1.4),
                        width: HP(1.4),
                        borderRadius: HP(5),
                        backgroundColor: item.color,
                        right: HP(0.7),
                        marginRight: HP(2),
                      }}
                    />
                  )}
                  {index !== itinerary.length - 1 && (
                    <View style={styles.dottedLine} />
                  )}
                </View>

                <View style={styles.details}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <CustomText style={styles.city}>{item.city}</CustomText>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: '#ccc',
                        flex: 1,
                        marginHorizontal: 8,
                      }}
                    />
                  </View>

                  {item.days ? (
                    <View style={[styles.row, {marginRight: HP(2)}]}>
                      <IoniconsIcon
                        name="calendar-outline"
                        size={16}
                        color="#999"
                      />
                      <CustomText style={styles.subText}>
                        {item.days} days
                      </CustomText>
                      <TouchableOpacity
                        onPress={() => {
                          setSelectedCityId(item.id);
                          setDayModalVisible(true);
                        }}
                        style={{position: 'absolute', left: HP(9)}}>
                        <Entypo name="triangle-down" size={16} color="#999" />
                      </TouchableOpacity>
                    </View>
                  ) : null}

                  <Modal
                    transparent
                    visible={dayModalVisible}
                    animationType="fade"
                    onRequestClose={() => setDayModalVisible(false)}>
                    <TouchableOpacity
                      style={styles.modalBackground}
                      onPressOut={() => setDayModalVisible(false)}>
                      <View style={styles.modalContainer}>
                        {dayOptions.map(day => (
                          <TouchableOpacity
                            onPress={() => handleDaySelect(day)}
                            key={day}
                            style={styles.modalItem}>
                            <Text style={styles.modalText}>{`Day ${day}`}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </Modal>

                  <Modal
                    transparent
                    visible={transportModalVisible}
                    animationType="fade"
                    onRequestClose={() => setTransportModalVisible(false)}>
                    <TouchableOpacity
                      style={styles.modalBackground}
                      onPressOut={() => setTransportModalVisible(false)}>
                      <View style={styles.modalContainer}>
                        {transportOptions.map(option => (
                          <TouchableOpacity
                            key={option}
                            onPress={() => handleTransportSelect(option)}
                            style={styles.modalItem}>
                            <Text style={styles.modalText}>{option}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    </TouchableOpacity>
                  </Modal>

                  <View style={{flexDirection: 'row'}}>
                    {item.flight ? (
                      <View style={styles.row}>
                        <IoniconsIcon
                          name="airplane-outline"
                          size={16}
                          color="#999"
                        />
                        <CustomText style={styles.subText}>
                          {item.flight}
                        </CustomText>
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedCityId(item.id);
                            setTransportModalVisible(true);
                          }}
                          style={{position: 'absolute', left: HP(9)}}>
                          <Entypo name="triangle-down" size={16} color="#999" />
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    {index !== itinerary.length - 1 && (
                      <View style={{marginLeft: HP(8), marginTop: HP(2)}}>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => decrementDuration(item.id)}
                            style={styles.circle}>
                            <Feather
                              name="minus-circle"
                              size={20}
                              style={{color: Colors.Main}}
                            />
                          </TouchableOpacity>

                          <CustomText style={{marginHorizontal: HP(2)}}>
                            {item.duration} Hrs
                          </CustomText>

                          <TouchableOpacity
                            onPress={() => incrementDuration(item.id)}
                            style={styles.circle}>
                            <Feather
                              name="plus-circle"
                              size={20}
                              style={{color: Colors.Main}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>
                </View>

                <View style={styles.actions}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: WP(20),
                    }}>
                    {/* Move Up */}
                    <TouchableOpacity
                      onPress={() => moveItemUp(index)}
                      disabled={index === 0}
                      style={{
                        opacity: index === 0 ? 0.4 : 1,
                      }}>
                      <SimpleLineIcons
                        name="arrow-up-circle"
                        size={20}
                        color={index === 0 ? '#ccc' : Colors.Main}
                      />
                    </TouchableOpacity>
                    {/* Move Down */}
                    <TouchableOpacity
                      onPress={() => moveItemDown(index)}
                      disabled={index === itinerary.length - 1}>
                      <SimpleLineIcons
                        name="arrow-down-circle"
                        size={20}
                        color={
                          index === itinerary.length - 1 ? '#ccc' : Colors.Main
                        }
                      />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteItem(item.id)}>
                      <Feather
                        name="minus-circle"
                        size={20}
                        color={Colors.Main}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            // horizontal={true}
            showsHorizontalScrollIndicator={false}
          />

          <View
            style={{
              height: HP(15),
              width: WP(92),
              alignSelf: 'center',
              backgroundColor: Colors.white,
              justifyContent: 'center',
              borderRadius: HP(1),
              elevation: 20,
            }}>
            <View
              style={{
                height: HP(13),
                width: WP(88),
                alignSelf: 'center',
                borderRadius: HP(1),
              }}>
              <MapboxGL.MapView style={{flex: 1}}>
                <MapboxGL.Camera
                  zoomLevel={4}
                  centerCoordinate={[78.9629, 20.5937]}
                />

                {itinerary.map((item, idx) => (
                  <MapboxGL.PointAnnotation
                    key={`point-${idx}`}
                    id={`point-${idx}`}
                    coordinate={item.coords}>
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: item.color,
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: '#fff',
                      }}
                    />
                  </MapboxGL.PointAnnotation>
                ))}

                <MapboxGL.ShapeSource
                  id="routeSource"
                  shape={{
                    type: 'Feature',
                    geometry: {
                      type: 'LineString',
                      coordinates: itinerary.map(item => item.coords),
                    },
                  }}>
                  <MapboxGL.LineLayer
                    id="routeLine"
                    style={{lineColor: '#007AFF', lineWidth: 3}}
                  />
                </MapboxGL.ShapeSource>
              </MapboxGL.MapView>
            </View>
          </View>
        </View>
      ) : (
        <>
          {/* Days scroll + drag responder */}
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
                    backgroundColor:
                      activityTypeColors[activityType] || '#A5F3FC',
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
                          <Text style={styles.dropdownOptionText}>
                            Activity
                          </Text>
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
                              backgroundColor:
                                activityTypeColors.Transportation,
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
                      <Text style={styles.activityTimeText}>
                        {activityDate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={[styles.activityInputGroup, {alignSelf: 'center'}]}>
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
                        <Image
                          source={Icons.Mine}
                          style={{resizeMode: 'center'}}
                        />
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
                        <Image
                          source={Icons.Plus}
                          style={{resizeMode: 'center'}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.activityInputGroup}>
                    <Text style={styles.activityInputLabel}>Date/Day</Text>
                    <TouchableOpacity style={styles.activityInput}>
                      <Text style={styles.activityTimeText}>
                        {activityDate}
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.activityInputGroup}>
                    <Text style={styles.activityInputLabel}>
                      Point of Contact
                    </Text>
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
                  <Text style={styles.activitySaveButtonText}>
                    Save a Action
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Settings Modal */}
          <Modal
            visible={settingsModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setSettingsModalVisible(false)}>
            <TouchableOpacity
              style={styles.modalBackground}
              onPress={() => setSettingsModalVisible(false)}>
              <View style={styles.settingsModalContainer}>
                <View style={styles.settingsModalHeader}>
                  <CustomText style={styles.settingsModalTitle}>
                    Settings
                  </CustomText>
                  <TouchableOpacity
                    onPress={() => setSettingsModalVisible(false)}
                    style={styles.settingsCloseButton}>
                    <Icon name="times" size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.settingsModalContent}>
                  <TouchableOpacity style={styles.settingsOption}>
                    <Icon name="edit" size={20} color="#4955E6" />
                    <CustomText style={styles.settingsOptionText}>
                      Edit Trip
                    </CustomText>
                    <Icon name="chevron-right" size={16} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.settingsOption}>
                    <Icon name="share" size={20} color="#4955E6" />
                    <CustomText style={styles.settingsOptionText}>
                      Share Trip
                    </CustomText>
                    <Icon name="chevron-right" size={16} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.settingsOption}>
                    <Icon name="download" size={20} color="#4955E6" />
                    <CustomText style={styles.settingsOptionText}>
                      Export Trip
                    </CustomText>
                    <Icon name="chevron-right" size={16} color="#999" />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.settingsOption}>
                    <Icon name="trash" size={20} color="#E74C3C" />
                    <CustomText
                      style={[styles.settingsOptionText, {color: '#E74C3C'}]}>
                      Delete Trip
                    </CustomText>
                    <Icon name="chevron-right" size={16} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      )}
    </View>
  );
};

/**
 * ──────────────────────────────────────────────────────────────────────────
 * STYLES
 * ──────────────────────────────────────────────────────────────────────────
 */
const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: Colors.white},

  tabs: {
    flexDirection: 'row',
    paddingVertical: HP(1),
    paddingHorizontal: WP(4),
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HP(1),
    paddingHorizontal: WP(3),
    borderRadius: HP(1),
    marginRight: WP(2),
    backgroundColor: '#EEEEEE',
  },
  activeTab: {backgroundColor: Colors.Main, alignItems: 'center'},
  tabIcon: {width: WP(4), height: HP(2), marginRight: WP(1)},
  tabText: {
    fontSize: FS(1.8),
    color: '#5B5B5B',
    fontFamily: Fonts.MontserratMedium,
  },
  activeTabText: {color: Colors.white},
  /* Columns */
  datesContainer: {flex: 1, backgroundColor: '#F7F7F7', marginTop: HP(2)},
  scrollView: {flex: 1},
  dateColumn: {width: COLUMN_WIDTH, paddingHorizontal: WP(4)},
  dateHeader: {paddingVertical: HP(2)},
  dateNumber: {
    fontSize: FS(2),
    fontFamily: Fonts.MontserratBold,
    color: Colors.Main,
  },
  dateMonth: {
    fontSize: FS(2),
    color: '#363636',
    fontFamily: Fonts.MontserratBold,
  },
  location: {
    fontSize: FS(1.8),
    color: '#ADADAD',
    fontFamily: Fonts.MontserratSemiBold,
  },
  /* Cards */
  itemWrapper: {marginBottom: HP(2)},
  card: {borderRadius: HP(1), padding: HP(0.8), elevation: 2},
  cardType: {
    fontSize: FS(1.6),
    color: '#B4B4B4',
    fontFamily: Fonts.MontserratBold,
    marginBottom: HP(0.5),
  },
  cardTitle: {
    fontSize: FS(1.8),
    color: '#3E3E54',
    fontFamily: Fonts.MontserratSemiBold,
    width: WP(50),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(1),
    backgroundColor: '#F4F4F4',
    borderRadius: HP(0.5),
  },
  locationText: {
    fontSize: FS(1.6),
    color: '#B4B4B4',
    fontFamily: Fonts.MontserratMedium,
    marginLeft: WP(2),
  },
  /* Drag Preview */
  dragPreview: {
    position: 'absolute',
    width: COLUMN_WIDTH - WP(8),
    padding: HP(2),
    borderRadius: HP(1),
    elevation: 5,
    opacity: 0.9,
  },
  activityModalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: WP(6),
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  activityModalContent: {
    backgroundColor: '#fff',
    borderRadius: HP(2),
    overflow: 'hidden',
    height: HP(70),
  },
  activityModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  activityModalTitle: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#626286',
    fontFamily: Fonts.MontserratSemiBold,
    top: HP(1),
  },
  activityModalScroll: {
    paddingHorizontal: 20,
    marginTop: HP(3),
  },
  activityTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  activityTypeButton: {
    width: '48%',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#F4F4F4',
    alignItems: 'center',
  },
  activityTypeActive: {
    backgroundColor: Colors.Main,
  },
  activityTypeText: {
    color: '#5B5B5B',
    fontSize: 14,
  },
  activityTypeTextActive: {
    color: '#fff',
  },
  activityInputGroup: {
    marginBottom: 15,
  },
  activityInputLabel: {
    color: '#3E3E54',
    fontSize: FS(1.9),
    marginBottom: 5,
    fontFamily: Fonts.MontserratSemiBold,
  },
  activityInput: {
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 8,
    padding: 12,
    fontSize: FS(1.8),
    color: '#3E3E54',
  },
  activityTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  activityTimeColumn: {
    width: '30%',
  },
  activityTimeInput: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    padding: 12,
  },
  activityTimeText: {
    fontSize: 14,
    color: '#3E3E54',
  },
  activityDurationText: {
    fontSize: FS(1.8),
    color: '#BFBFBF',
    padding: 12,
  },
  activitySaveButton: {
    backgroundColor: Colors.Main,
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  activitySaveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'relative',
    marginRight: 10,
    borderBottomWidth: 1,
    width: WP(75),
    borderColor: '#9898B4',
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    width: WP(75),
  },
  dropdownOptions: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    zIndex: 10,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownOptionText: {
    color: '#BFBFBF',
    fontSize: 14,
  },
  dropZone: {
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  dropZoneActive: {
    backgroundColor: '#FFD580',
    borderRadius: 8,
  },
  dropZoneIndicator: {
    width: 8,
    height: '80%',
    backgroundColor: '#FFD580',
    borderRadius: 4,
  },
  // Trip tab styles (merged)
  item: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'flex-start',
  },
  dottedLine: {
    flex: 1,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginTop: 2,
  },
  date: {fontWeight: 'bold', marginRight: HP(2), color: Colors.textB},
  dot: {
    width: HP(2),
    height: HP(2),
    borderRadius: HP(5),
    marginRight: 10,
    right: HP(1),
  },
  details: {flex: 1, marginLeft: 8},
  city: {
    fontSize: FS(2),
    color: Colors.textB,
    fontFamily: Fonts.MontserratBold,
  },
  subText: {fontSize: 12, marginLeft: HP(1.5)},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: HP(2),
    right: HP(1),
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 8,
    height: 80,
  },
  circle: {marginHorizontal: HP(0.5)},
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    margin: 40,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalItem: {paddingVertical: 10},
  modalText: {fontSize: 16, color: '#333'},
  timeline: {alignItems: 'center', marginRight: HP(1)},

  // Settings Modal Styles
  settingsModalContainer: {
    backgroundColor: '#fff',
    borderRadius: HP(2),
    margin: WP(10),
    maxHeight: HP(50),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  settingsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: HP(3),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingsModalTitle: {
    fontSize: FS(2.2),
    fontFamily: Fonts.MontserratBold,
    color: '#4955E6',
  },
  settingsCloseButton: {
    padding: HP(0.5),
  },
  settingsModalContent: {
    padding: HP(2),
  },
  settingsOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: HP(2),
    paddingHorizontal: HP(2),
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingsOptionText: {
    flex: 1,
    fontSize: FS(1.8),
    fontFamily: Fonts.MontserratMedium,
    color: '#333',
    marginLeft: HP(2),
  },
});

export default Overview;
