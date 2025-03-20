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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FS, HP, WP} from '../../utils/Dimention';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fonts from '../../theme/Fonts';
import CustomText from '../../components/CustomText';
import Colors from '../../theme/Color';

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

  const renderReturnScreen = () => (
    <>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="plane-departure" size={20} color="orange" />
        <TextInput style={styles.input} placeholder="Departure From" />
        <TouchableOpacity
          style={{
            height: HP(4),
            width: HP(4),
            backgroundColor: 'blue',
            borderRadius: HP(2),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: HP(2),
            bottom: HP(-2),
            zIndex: 1,
          }}>
          <Ionicons name="swap-vertical" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="plane-arrival" size={20} color="orange" />
        <TextInput style={styles.input} placeholder="Flying to" />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerSmall}>
          <FontAwesome name="calendar" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Fri, 9 Aug" />
        </View>
        <View style={styles.inputContainerSmall}>
          <FontAwesome name="calendar" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Fri, 15 Aug" />
        </View>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerSmall}>
          <FontAwesome name="users" size={20} color="orange" />
          {/* <TextInput style={styles.input} placeholder="Fri, 9 Aug" /> */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTravellersDropdown(!showTravellersDropdown)}>
            <Text style={{marginLeft: HP(1)}}>{travellers} Travellers</Text>
            <Ionicons
              style={{position: 'absolute', right: -HP(5)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showTravellersDropdown && (
            <View style={styles.TravelDrop}>
              {travellerOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(3), borderWidth: 1}}
                  onPress={() => {
                    setTravellers(option);
                    setShowTravellersDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.inputContainerSmall}>
          {/* <FontAwesome name="calendar" size={20} color="orange" /> */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowEconomyDropdown(!showEconomyDropdown)}>
            <Text style={{fontFamily: Fonts.Regular, top: HP(1.5)}}>
              {economyClass}
            </Text>
            <Ionicons
              style={{left: HP(13), bottom: HP(1)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showEconomyDropdown && (
            <View style={styles.ClassDrop}>
              {economyOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(20), borderWidth: 1}}
                  onPress={() => {
                    setEconomyClass(option);
                    setShowEconomyDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </>
  );

  const renderOneWayScreen = () => (
    <>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="plane-departure" size={20} color="orange" />
        <TextInput style={styles.input} placeholder="Departure From" />
        <TouchableOpacity
          style={{
            height: HP(4),
            width: HP(4),
            backgroundColor: 'blue',
            borderRadius: HP(2),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: HP(2),
            bottom: HP(-2),
            zIndex: 1,
          }}>
          <Ionicons name="swap-vertical" size={15} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome5 name="plane-arrival" size={20} color="orange" />
        <TextInput style={styles.input} placeholder="Flying to" />
      </View>
      <View style={styles.inputContainer}>
        <FontAwesome name="calendar" size={20} color="orange" />
        <TextInput style={styles.input} placeholder="Fri, 9 Aug" />
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerSmall}>
          <FontAwesome name="users" size={20} color="orange" />
          {/* <TextInput style={styles.input} placeholder="Fri, 9 Aug" /> */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTravellersDropdown(!showTravellersDropdown)}>
            <Text style={{marginLeft: HP(1)}}>{travellers} Travellers</Text>
            <Ionicons
              style={{position: 'absolute', right: -HP(5)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showTravellersDropdown && (
            <View style={styles.TravelDrop}>
              {travellerOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(3), borderWidth: 1}}
                  onPress={() => {
                    setTravellers(option);
                    setShowTravellersDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.inputContainerSmall}>
          {/* <FontAwesome name="calendar" size={20} color="orange" /> */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowEconomyDropdown(!showEconomyDropdown)}>
            <Text style={{fontFamily: Fonts.Regular, top: HP(1.5)}}>
              {economyClass}
            </Text>
            <Ionicons
              style={{left: HP(13), bottom: HP(1)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showEconomyDropdown && (
            <View style={styles.ClassDrop}>
              {economyOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(20), borderWidth: 1}}
                  onPress={() => {
                    setEconomyClass(option);
                    setShowEconomyDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
    </>
  );

  const renderMultiCityScreen = () => (
    <ScrollView>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainerSmall}>
          <FontAwesome name="users" size={20} color="orange" />
          {/* <TextInput style={styles.input} placeholder="Fri, 9 Aug" /> */}
          <Text style={{marginLeft: HP(1)}}>{travellers} Travellers</Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowTravellersDropdown(!showTravellersDropdown)}>
            <Ionicons
              style={{position: 'absolute', right: -HP(4), top: HP(-1)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showTravellersDropdown && (
            <View style={styles.TravelDrop}>
              {travellerOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(3), borderWidth: 1}}
                  onPress={() => {
                    setTravellers(option);
                    setShowTravellersDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.inputContainerSmall}>
          {/* <FontAwesome name="calendar" size={20} color="orange" /> */}
          <Text style={{fontFamily: Fonts.Regular, top: HP(0)}}>
            {economyClass}
          </Text>
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowEconomyDropdown(!showEconomyDropdown)}>
            <Ionicons
              style={{left: HP(6)}}
              name="chevron-down"
              size={20}
              color="orange"
            />
          </TouchableOpacity>
          {showTravellersDropdown && (
            <View style={styles.ClassDrop}>
              {economyOptions.map(option => (
                <TouchableOpacity
                  key={option}
                  style={{width: WP(20), borderWidth: 1}}
                  onPress={() => {
                    setEconomyClass(option);
                    setShowEconomyDropdown(false);
                  }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      <View style={{marginBottom: 10}}>
        <CustomText
          children={'Flight 1'}
          style={{
            marginTop: HP(1),
            marginVertical: HP(1),
            fontSize: FS(2),
            fontWeight: 'bold',
          }}
        />
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-departure" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Departure From" />
          <TouchableOpacity
            style={{
              height: HP(4),
              width: HP(4),
              backgroundColor: 'blue',
              borderRadius: HP(2),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: HP(2),
              bottom: HP(-2),
              zIndex: 1,
            }}>
            <Ionicons name="swap-vertical" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-arrival" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Flying to" />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Fri, 9 Aug" />
        </View>
      </View>
      <View style={{marginBottom: 5}}>
        <CustomText
          children={'Flight 1'}
          style={{
            marginTop: HP(1),
            marginVertical: HP(1),
            fontSize: FS(2),
            fontWeight: 'bold',
          }}
        />
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-departure" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Departure From" />
          <TouchableOpacity
            style={{
              height: HP(4),
              width: HP(4),
              backgroundColor: 'blue',
              borderRadius: HP(2),
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: HP(2),
              bottom: HP(-2),
              zIndex: 1,
            }}>
            <Ionicons name="swap-vertical" size={15} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome5 name="plane-arrival" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Flying to" />
        </View>
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={20} color="orange" />
          <TextInput style={styles.input} placeholder="Fri, 9 Aug" />
        </View>
      </View>
      <TouchableOpacity>
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
      {/* <View style={{padding:HP(5)}}></View> */}
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

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#3B3B3B'} barStyle={'light-content'} />
      <View
        style={{
          height: HP(8),
          backgroundColor: '#3B3B3B',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            borderRadius: HP(2),
            backgroundColor: Colors.white,
            height: HP(4),
            width: HP(4),
            alignItems: 'center',
            justifyContent: 'center',
            left: WP(5),
          }}
          onPress={() => navigation.goBack()}>
          <Ionicons
            // style={{left: HP(2)}}
            name="chevron-back"
            size={20}
            color="black"
          />
        </TouchableOpacity>
        <Text style={styles.title}>Flights</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.tabContainer}>
          {tabs.map(tab => (
            <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)}>
              <Text
                style={[styles.tab, selectedTab === tab && styles.activeTab]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {renderScreen()}

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    // bottom: HP(3.4),
    color: 'white',
    left: WP(30),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    color: 'gray',
  },
  activeTab: {
    color: 'orange',
    borderBottomWidth: 2,
    borderBottomColor: 'orange',
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
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchButton: {
    backgroundColor: '#4955E6',
    padding: HP(2),
    borderRadius: HP(4),
    marginTop: HP(1),
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
