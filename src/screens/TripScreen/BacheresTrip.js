import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FS, HP, WP} from '../../utils/Dimention';
import Colors from '../../theme/Color';
import CustomText from '../../components/CustomText';
import TripHeader from '../../components/TripHeader';
import Icons from '../../theme/Icons';
import Fonts from '../../theme/Fonts';
import DraggableFlatList, {ScaleDecorator} from 'react-native-draggable-flatlist';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmh1dG9yaWEiLCJhIjoiY2x1am5nbzRvMDM4MTJpbzJic28zZnoyNCJ9.x86CCCHxwknUx-SJS1I5kQ',
); // Replace this!
// Mapbox.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer('Mapbox');

const tabs = [
  {tab: 'Trip', Pic: Icons.Bag, ID: '0'},
  {tab: 'Overview', Pic: Icons.OverView, ID: '1'},
  {tab: 'Day-wise', Pic: Icons.daywise, ID: '2'},
  {tab: 'Budget', Pic: Icons.daywise, ID: '3'},
  {tab: 'Explore', Pic: Icons.Explore1, ID: '4'},
];

const BachelorsTrip = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
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

  const incrementDuration = (cityId) => {
    setItinerary(prevItinerary =>
      prevItinerary.map(item =>
        item.id === cityId
          ? { ...item, duration: item.duration + 1 }
          : item
      )
    );
  };

  const decrementDuration = (cityId) => {
    setItinerary(prevItinerary =>
      prevItinerary.map(item =>
        item.id === cityId
          ? { ...item, duration: Math.max(1, item.duration - 1) }
          : item
      )
    );
  };

  const handleDaySelect = (day) => {
    if (selectedCityId !== null) {
      setItinerary(prevItinerary =>
        prevItinerary.map(item =>
          item.id === selectedCityId
            ? { ...item, days: day.toString() }
            : item
        )
      );
    }
    setDayModalVisible(false);
  };

  const handleTransportSelect = (transport) => {
    if (selectedCityId !== null) {
      setItinerary(prevItinerary =>
        prevItinerary.map(item =>
          item.id === selectedCityId
            ? { ...item, flight: transport }
            : item
        )
      );
    }
    setTransportModalVisible(false);
  };

  const tabFun = ({item}) => (
    <TouchableOpacity
      style={[
        item.ID === activeTab.ID ? styles.activeTab : styles.tab,
        {
          alignItems: 'center',
          marginHorizontal: HP(1),
          marginTop: HP(2),
        },
      ]}
      onPress={() => setActiveTab(item)}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: HP(1),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={item.Pic}
          style={{
            height: HP(2),
            width: HP(2),
            tintColor: item.ID === activeTab.ID ? Colors.white : '#5B5B5B',
            marginHorizontal: HP(1),
          }}
        />
        <CustomText
          style={
            item.ID === activeTab.ID ? styles.activeTabText : styles.tabText
          }>
          {item.tab}
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: HP(1.5)}}></View>
      <TripHeader
        hearder={'Bachelors Trip'}
        isVisible={true}
        navigation={navigation}
      />
      <View style={[styles.tabRow, {marginBottom: HP(4)}]}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={tabs}
          renderItem={tabFun}
          removeClippedSubviews={false}
        />
      </View>

      {activeTab.tab === 'Trip' && (
        <View
          style={{
            flex: 1,
            width: WP(88),
            alignSelf: 'center',
          }}>
          <DraggableFlatList
            data={itinerary}
            onDragEnd={({data}) => setItinerary(data)}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index, drag, isActive}) => (
              <ScaleDecorator>
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

                  {/* City Info */}
                  <View style={styles.details}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <CustomText style={styles.city}>{item.city}</CustomText>

                      {/* Horizontal line */}
                      <View
                        // eslint-disable-next-line react-native/no-inline-styles
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
                        <Icon name="calendar-outline" size={16} color="#999" />
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
                          <Icon name="airplane-outline" size={16} color="#999" />
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

                  {/* Actions */}
                  <View style={styles.actions}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: WP(20),
                      }}>
                      {item.id !== 0 ? (
                        <TouchableOpacity>
                          <SimpleLineIcons
                            name="arrow-up-circle"
                            size={20}
                            style={{color: Colors.Main}}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity>
                          <SimpleLineIcons
                            // name="arrow-up-circle"
                            size={20}
                            style={{color: Colors.Main}}
                          />
                        </TouchableOpacity>
                      )}
                      {index !== itinerary.length - 1 && (
                        <TouchableOpacity>
                          <SimpleLineIcons
                            name="arrow-down-circle"
                            size={20}
                            style={{color: Colors.Main}}
                          />
                        </TouchableOpacity>
                      )}

                      <TouchableOpacity>
                        <Feather
                          name="minus-circle"
                          size={20}
                          style={{color: Colors.Main}}
                        />
                      </TouchableOpacity>
                    </View>
                    {/* <TouchableOpacity>
                      <Feather
                        name="plus-circle"
                        size={20}
                        style={{color: Colors.Main}}
                      />
                    </TouchableOpacity> */}
                  </View>
                </TouchableOpacity>
              </ScaleDecorator>
            )}
            horizontal={true}
          />

          {/* Mapbox Map */}
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
                  centerCoordinate={[78.9629, 20.5937]} // India center
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

                {/* Optional: Connect cities with a line */}
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
                    style={{
                      lineColor: '#007AFF',
                      lineWidth: 3,
                    }}
                  />
                </MapboxGL.ShapeSource>
              </MapboxGL.MapView>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: HP(1),
    backgroundColor: '#eee',
  },
  activeTab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: HP(1),
    backgroundColor: '#FFA500',
  },
  tabText: {color: '#555', marginRight: HP(1)},
  activeTabText: {color: '#fff', marginRight: HP(1)},
  itinerary: {paddingHorizontal: 10},
  itineraryItem: {marginBottom: 20},
  date: {fontWeight: 'bold', marginRight: HP(2), color: Colors.textB},
  cityInfo: {flexDirection: 'row', alignItems: 'flex-start'},
  dot: {
    width: HP(2),
    height: HP(2),
    borderRadius: HP(5),
    marginRight: 10,
    right: HP(1),
    // marginTop: 6,
  },
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
  flight: {marginLeft: 6, fontSize: 12},
  mapContainer: {
    height: Dimensions.get('window').height * 0.3,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
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
  details: {
    flex: 1,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 8,
    height: 80,
  },
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
  modalItem: {
    paddingVertical: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BachelorsTrip;
