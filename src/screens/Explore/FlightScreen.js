import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FS, HP, WP} from '../../utils/Dimention';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../../theme/Fonts';
import CustomText from '../../components/CustomText';
import Colors from '../../theme/Color';
import Icons from '../../theme/Icons';
import TrackHeader from '../../components/TrackHeader';
import PassengerPickerModal from '../../components/modal/PassengerPickerModal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const FlightBookingScreen = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Return');
  const [travellersModalVisible, setTravellersModalVisible] = useState(false);
  const tabs = ['Return', 'One-way', 'Multi-city'];
  const [travelClass, setTravelClass] = useState('Economy');
  const [travellers, setTravellers] = useState('2 Travellers');
  const [economyClass, setEconomyClass] = useState('Economy');
  const [showTravellersDropdown, setShowTravellersDropdown] = useState(false);
  const [showEconomyDropdown, setShowEconomyDropdown] = useState(false);
  const travellerOptions = ['1', '2', '3', '4', '5', '6'];
  const economyOptions = ['Economy', 'Business', 'First Class'];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateType, setSelectedDateType] = useState(null);
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [flights, setFlights] = useState([{id: 1}]); // initial flight
  const removeFlight = id => {
    setFlights(prev => prev.filter(item => item.id !== id));
  };
  const addFlight = () => {
    setFlights(prev => [...prev, {id: prev.length + 1}]);
  };
  const showDatePicker = type => {
    setSelectedDateType(type);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    if (selectedDateType === 'departure') {
      setDepartureDate(formattedDate);
    } else if (selectedDateType === 'arrival') {
      setArrivalDate(formattedDate);
    }
    hideDatePicker();
  };

  const renderReturnScreen = () => (
    <>
      <View
        style={{
          height: HP(50),
          backgroundColor: '#EBEBEB',
          borderRadius: HP(2),
          padding: HP(2),
          alignSelf: 'center',
        }}>
        <View>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'From'}
          />
          <TextInput
            style={styles.inputnew}
            placeholder="Origin"
            placeholderTextColor={'#737373'}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: WP(2),
              top: HP(9.6),
              zIndex: 1,
            }}>
            <Image
              source={Icons.UpDown}
              style={{
                alignSelf: 'flex-end',
                height: HP(3.5),
                width: WP(8),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: HP(1)}}>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'To'}
          />
          <TextInput
            style={styles.inputnew}
            placeholder="Destination"
            placeholderTextColor={'#737373'}
          />
        </View>
        <CustomText
          children={'Dates'}
          style={{
            marginTop: HP(2),
            fontFamily: Fonts.MontserratBold,
            fontSize: FS(2),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => showDatePicker('departure')}
            style={{
              height: HP(6),
              width: WP(35),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText children={departureDate || 'Departure'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => showDatePicker('arrival')}
            style={{
              height: HP(6),
              width: WP(35),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomText children={arrivalDate || 'Arrival'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(52),
          }}>
          <CustomText
            children={'Travellers'}
            style={{
              marginTop: HP(2),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />
          <CustomText
            children={'Class'}
            style={{
              marginTop: HP(2),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: HP(6),
              width: WP(45),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: WP(2),
              marginRight: HP(1),
            }}>
            <CustomText>
              {`${returnPassengers.adult} Adult${
                returnPassengers.adult > 1 ? 's' : ''
              } - ${returnPassengers.child} Child${
                returnPassengers.child > 1 ? 'ren' : ''
              } - ${returnPassengers.infant} Infant${
                returnPassengers.infant > 1 ? 's' : ''
              }`}
            </CustomText>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              height: HP(6),
              width: WP(30),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <CustomText children={'Economy'} />
            <Ionicons
              style={{left: WP(4)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderOneWayScreen = () => (
    <>
      <View
        style={{
          height: HP(50),
          backgroundColor: '#EBEBEB',
          borderRadius: HP(2),
          padding: HP(2),
          alignSelf: 'center',
        }}>
        <View>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'From'}
          />
          <TextInput
            style={styles.inputnew}
            placeholder="Origin"
            placeholderTextColor={'#737373'}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: WP(2),
              top: HP(9.6),
              zIndex: 1,
            }}>
            <Image
              source={Icons.UpDown}
              style={{
                alignSelf: 'flex-end',
                height: HP(3.5),
                width: WP(8),
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginTop: HP(1)}}>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
            children={'To'}
          />
          <TextInput
            style={styles.inputnew}
            placeholder="Destination"
            placeholderTextColor={'#737373'}
          />
        </View>
        <CustomText
          children={'Dates'}
          style={{
            marginTop: HP(2),
            fontFamily: Fonts.MontserratBold,
            fontSize: FS(2),
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => showDatePicker('departure')}
            style={{
              height: HP(6),
              width: WP(75),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              justifyContent: 'center',
              paddingLeft: WP(2),
            }}>
            <CustomText children={departureDate || 'Departure Date'} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: WP(52),
          }}>
          <CustomText
            children={'Travellers'}
            style={{
              marginTop: HP(2),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />
          <CustomText
            children={'Class'}
            style={{
              marginTop: HP(2),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: HP(6),
              width: WP(45),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: WP(2),
              marginRight: HP(1),
            }}>
            <CustomText>
              {`${oneWayPassengers.adult} Adult${
                oneWayPassengers.adult > 1 ? 's' : ''
              } - ${oneWayPassengers.child} Child${
                oneWayPassengers.child > 1 ? 'ren' : ''
              } - ${oneWayPassengers.infant} Infant${
                oneWayPassengers.infant > 1 ? 's' : ''
              }`}
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: HP(6),
              width: WP(30),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <CustomText children={'Economy'} />
            <Ionicons
              style={{left: WP(4)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  const renderMultiCityScreen = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          height: HP(12),
          backgroundColor: '#EBEBEB',
          borderRadius: HP(2),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          // alignSelf: 'center',
        }}>
        <View style={{alignSelf: 'center'}}>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold}}
            children={'Trevellers'}
          />
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={{
              height: HP(6),
              width: WP(45),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: WP(2),
            }}>
            <CustomText>
              {`${multiCityPassengers.adult} Adult${
                multiCityPassengers.adult > 1 ? 's' : ''
              } - ${multiCityPassengers.child} Child${
                multiCityPassengers.child > 1 ? 'ren' : ''
              } - ${multiCityPassengers.infant} Infant${
                multiCityPassengers.infant > 1 ? 's' : ''
              }`}
            </CustomText>
          </TouchableOpacity>
        </View>
        <View>
          <CustomText
            style={{fontFamily: Fonts.MontserratBold}}
            children={'Class'}
          />
          <TouchableOpacity
            style={{
              height: HP(6),
              width: WP(30),
              backgroundColor: '#fff',
              borderRadius: HP(1),
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <CustomText children={'Economy'} />
            <Ionicons
              style={{left: WP(4)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
        </View>
      </View>
      {flights.map((flight, index) => (
        <View>
          <CustomText
            children={`Flight ${index + 1}`}
            style={{
              alignSelf: 'center',
              marginTop: HP(3),
              fontFamily: Fonts.MontserratBold,
              fontSize: FS(2),
            }}
          />

          <View
            key={flight.id}
            style={{
              height: HP(37),
              backgroundColor: '#EBEBEB',
              borderRadius: HP(2),
              padding: HP(2),
              marginBottom: HP(2),
            }}>
            {/* From */}
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <CustomText
                  style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
                  children={'From'}
                />
                {flights.length > 1 && (
                  <TouchableOpacity onPress={() => removeFlight(flight.id)}>
                    <Ionicons
                      name="trash-outline"
                      size={22}
                      color={Colors.secondary}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: HP(1),
                  paddingHorizontal: WP(2),
                  height: HP(6),
                  marginTop: HP(0.5),
                  fontFamily: Fonts.MontserratRegular,
                  color: '#737373',
                }}
                placeholder="Origin"
                placeholderTextColor={'#737373'}
              />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                right: WP(5),
                top: HP(12),
                zIndex: 1,
              }}>
              <Image
                source={Icons.UpDown}
                style={{
                  alignSelf: 'flex-end',
                  height: HP(3.5),
                  width: WP(8),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>

            {/* To */}
            <View style={{}}>
              <CustomText
                style={{fontFamily: Fonts.MontserratBold, fontSize: FS(2)}}
                children={'To'}
              />
              <TextInput
                style={{
                  backgroundColor: '#fff',
                  borderRadius: HP(1),
                  paddingHorizontal: WP(2),
                  height: HP(6),
                  marginTop: HP(0.5),
                  fontFamily: Fonts.MontserratRegular,
                  color: '#737373',
                }}
                placeholder="Destination"
                placeholderTextColor={'#737373'}
              />
            </View>

            {/* Dates */}
            <CustomText
              children={'Dates'}
              style={{
                marginTop: HP(2),
                fontFamily: Fonts.MontserratBold,
                fontSize: FS(2),
              }}
            />
            <TouchableOpacity
              onPress={() => showDatePicker('departure')}
              style={{
                height: HP(6),
                width: WP(75),
                backgroundColor: '#fff',
                borderRadius: HP(1),
                justifyContent: 'center',
                paddingLeft: WP(2),
              }}>
              <CustomText children={departureDate || 'Departure Date'} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={addFlight}>
        <CustomText
          children={'+Add another flight'}
          style={{
            marginVertical: HP(2),
            color: '#4955E6',
            fontWeight: 'bold',
            fontSize: FS(2),
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Tickets')}
        style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
      <View style={{height: HP(20)}}></View>
    </ScrollView>
  );

  const renderScreen = () => {
    switch (selectedTab) {
      case 'Return':
        return renderReturnScreen();
      case 'One-way':
        return renderOneWayScreen();
      case 'Multi-city':
        return renderMultiCityScreen();
      default:
        return null;
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [returnPassengers, setReturnPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const [oneWayPassengers, setOneWayPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const [multiCityPassengers, setMultiCityPassengers] = useState({
    adult: 1,
    child: 0,
    infant: 0,
  });
  const handleConfirm = data => {
    if (selectedTab === 'Return') setReturnPassengers(data);
    else if (selectedTab === 'One-way') setOneWayPassengers(data);
    else if (selectedTab === 'Multi-city') setMultiCityPassengers(data);

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={'#3B3B3B'} barStyle={'light-content'} /> */}
      <TrackHeader navigation={navigation} tag={'Flights'} />
      <View style={styles.card}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <View
              style={{
                borderBottomWidth: 2,
                height: HP(5),
                borderBottomColor:
                  selectedTab === tab ? '#FFA015' : '#6F77894D',

                width: WP(30),
                alignItems: 'center',
              }}>
              <TouchableOpacity
                key={tab}
                style={{}}
                onPress={() => setSelectedTab(tab)}>
                <CustomText
                  style={[styles.tab, selectedTab === tab && styles.activeTab]}>
                  {tab}
                </CustomText>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {renderScreen()}

        <TouchableOpacity
          onPress={() => navigation.navigate('Tickets')}
          style={styles.searchButton}>
          <CustomText style={styles.searchButtonText}>Search</CustomText>
        </TouchableOpacity>
        <PassengerPickerModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleConfirm}
        />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    width: WP(100),
    padding: HP(4),
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    bottom: HP(2),
  },
  title: {
    fontSize: FS(2.8),
    // fontWeight: 'bold',
    textAlign: 'center',
    // bottom: HP(3.4),
    color: Colors.secondary,
    left: WP(30),
    fontFamily: Fonts.MontserratBold,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 19,
    right: WP(3),
  },
  tab: {
    fontSize: FS(2),
    color: '#3E3E54',
  },
  activeTab: {
    color: '#3E3E54',

    fontFamily: Fonts.MontserratBold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    position: 'relative',
  },
  inputContainerSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    flex: 1,
    marginRight: WP(1),
    height: HP(6),
    position: 'relative',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  inputnew: {
    height: HP(6),
    width: WP(75),
    backgroundColor: '#fff',
    color: '#737373',
    paddingLeft: WP(2),
    borderRadius: HP(1),
    fontFamily: Fonts.MontserratRegular,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: '#4955E6',
    padding: HP(2),
    borderRadius: HP(2),
    marginTop: HP(2),
  },
  searchButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  TravelDrop: {
    right: HP(1),
    top: HP(4),
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  ClassDrop: {
    right: HP(1),
    top: HP(4),
    alignItems: 'center',
    position: 'absolute',
    zIndex: 1,
  },
});

export default FlightBookingScreen;
