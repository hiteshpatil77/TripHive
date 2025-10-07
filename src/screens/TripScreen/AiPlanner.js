import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {useState} from 'react';
import TripHeader from '../../components/TripHeader';
import {FS, HP, WP} from '../../utils/Dimention';
import CustomText from '../../components/CustomText';
import Colors from '../../theme/Color';
import Fonts from '../../theme/Fonts';
import CusButton from '../../components/CusButton';
import {ScrollView} from 'react-native-gesture-handler';

export default function AiPlanner({navigation}) {
  const [location, setLocation] = useState('');
  const [people, setPeople] = useState(0);
  const [groupType, setGroupType] = useState('');
  const [budgetRange, setBudgetRange] = useState('');
  const [tripType, setTripType] = useState('');
  const [pickExtras, setPickExtras] = useState([]);

  const toggleExtra = extra => {
    setPickExtras(prev =>
      prev.includes(extra) ? prev.filter(e => e !== extra) : [...prev, extra],
    );
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{width: WP(90), alignSelf: 'center'}}>
        <TripHeader navigation={navigation} hearder={'Hive Al Planner'} />
        {/* Location Input */}
        <View style={{height: HP(2)}}></View>
        <CustomText style={styles.label}>
          Where are you traveling from?
        </CustomText>
        <TextInput
          style={[
            styles.input,
            {width: WP(87), fontFamily: Fonts.MontserratRegular, color: '#333'},
          ]}
          // style={[styles.input, {flex: 0.95}]}
          placeholder="Select a location"
          value={location}
          onChangeText={setLocation}
          placeholderTextColor={'#737373'}
        />
        {/* People Counter */}
        <View style={{marginTop: HP(3.5)}}></View>
        <CustomText style={styles.label}>How many people are going?</CustomText>
        <View style={styles.peopleRow}>
          <TextInput
            style={[styles.input, {flex: 0.95}]}
            value={String(people)}
            editable={false}
          />
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setPeople(people + 1)}>
            <CustomText style={styles.counterButtonText}>+</CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setPeople(Math.max(0, people - 1))}>
            <CustomText style={styles.counterButtonText}>-</CustomText>
          </TouchableOpacity>
        </View>

        {/* Group Type */}
        <View style={{height: HP(3)}}></View>
        <CustomText style={styles.label}>Group Type</CustomText>
        <View style={styles.optionsRow}>
          {['Friends', 'Couple', 'Family'].map(item => (
            <TouchableOpacity
              onPress={() => setGroupType(item)}
              key={item}
              style={[
                styles.optionButton,
                groupType === item && styles.selectedButton,
              ]}>
              <CustomText
                style={
                  groupType === item
                    ? styles.selectedButtonText
                    : styles.optionButtonText
                }>
                {item}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
        {/* Budget Range */}
        <CustomText style={[styles.label, {marginTop: HP(3)}]}>
          Budget Range
        </CustomText>
        <View style={styles.optionsRow}>
          {['Backpacker', 'Mid Range', 'Luxury'].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionButton,
                budgetRange === item && styles.selectedButton,
              ]}
              onPress={() => setBudgetRange(item)}>
              <CustomText
                style={
                  budgetRange === item
                    ? styles.selectedButtonText
                    : styles.optionButtonText
                }>
                {item}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Trip Type */}
        <CustomText
          style={[styles.label, {marginTop: HP(3)}]}
          children={'Trip type:'}
        />
        <View style={styles.optionsRow}>
          {[
            'Romantic',
            'Leisure',
            'Adventure',
            'Cultural',
            'Educational',
            'Luxury',
          ].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionButton,
                tripType === item && styles.selectedButton,
                {marginBottom: HP(1)},
              ]}
              onPress={() => setTripType(item)}>
              <CustomText
                style={
                  tripType === item
                    ? styles.selectedButtonText
                    : styles.optionButtonText
                }>
                {item}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pick Extras */}
        <Text style={[styles.label, {marginTop: HP(1)}]}>Pick Extras:</Text>
        <View style={styles.optionsRow}>
          {[
            'Adventure sports',
            'Shopping',
            'Heritage',
            'Night Life',
            'Hidden Gems',
            'Culinary',
          ].map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionButton,
                pickExtras.includes(item) && styles.selectedButton,
                {marginBottom: HP(1)},
              ]}
              onPress={() => toggleExtra(item)}>
              <CustomText
                style={
                  pickExtras.includes(item)
                    ? styles.selectedButtonText
                    : styles.optionButtonText
                }>
                {item}
              </CustomText>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{marginVertical: HP(2)}}>
          <CusButton
            navigation={navigation}
            SecTag={'Next'}
            NVT={() => navigation.navigate('InviteFriend')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

// STYLES
const styles = {
  label: {
    fontSize: FS(1.4),
    color: Colors.textB,
    fontFamily: Fonts.MontserratBold,
  },
  input: {
    // borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#F4F4F4',
    fontSize: FS(1.4),
    height: HP(5.5),
  },
  peopleRow: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#eee',
    height: HP(5.5),
    width: WP(12),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HP(1),
    marginLeft: HP(1),
    // marginHorizontal: HP(1),
  },
  counterButtonText: {
    fontSize: FS(3),
    fontWeight: 'bold',
    color: Colors.lightGT,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'red',
    // marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#eee',
    height: HP(6),
    width: WP(27.7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: HP(1),
    marginRight: HP(1),
    // marginLeft: HP(1),
  },
  optionButtonText: {
    color: '#000',
    fontSize: FS(1.3),
  },
  selectedButton: {
    backgroundColor: '#FF9100',
  },
  selectedButtonText: {
    color: '#fff',
    fontSize: FS(1.3),
    // fontWeight: 'bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  prevButton: {
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
  },
  prevButtonText: {
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#3B4FE4',
    padding: 15,
    borderRadius: 10,
    flex: 0.45,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
