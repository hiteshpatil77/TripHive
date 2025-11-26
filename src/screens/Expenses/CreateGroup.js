import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {FS, HP, WP} from '../../utils/Dimention';
import LinearGradient from 'react-native-linear-gradient';
import Icons from '../../theme/Icons';
import Fonts from '../../theme/Fonts';
import Input from '../../components/Input';
import CustomText from '../../components/CustomText';

// === APIs ===
import {
  getAllFriend,
  CreateGroup as CreateGroupAPI,
} from '../../api/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateGroup = ({navigation}) => {
  // ========= STATE ==========
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [friendModal, setFriendModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const [loadingFriends, setLoadingFriends] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (e) {
      console.log('Error reading token', e);
    }
  };

  const fetchFriends = async () => {
    setLoadingFriends(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await getAllFriend(token);
      console.log('friends-==-=', res);

      setFriends(res?.data || []);
    } catch (err) {
      console.log('Error fetching friends: ', err);
    } finally {
      setLoadingFriends(false);
    }
  };

  // ========= OPEN MODAL ==========
  const openFriendModal = () => {
    fetchFriends();
    setFriendModal(true);
  };

  // ========= SELECT FRIEND ==========
  const toggleSelectFriend = id => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(item => item !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  // ========= HANDLE SUBMIT ==========
  const handleCreateGroup = async () => {
    const payload = {
      name,
      description,
      imageUrl: 'https://share.google/images/uUxtz9GajLt8oO6um',
      memberIds: selectedMembers,
    };

    console.log('Final Payload ===> ', payload);

    try {
      const res = await CreateGroupAPI(
        name,
        description,
        imageUrl,
        selectedMembers,
        token,
      );
      console.log('Group Created ===> ', res);
      alert('Group Created Successfully!');
      navigation.goBack();
    } catch (err) {
      console.log('Error Creating Group: ', err);
      alert('Failed to create group');
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#f2f2f2ff'}}>
      <StatusBar backgroundColor={'#f2f2f2ff'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#FF754D', '#FF8A5A', '#FFA515']}>
          <View style={{height: HP(15), marginTop: HP(2)}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: WP(90),
                alignSelf: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{resizeMode: 'contain', height: HP(6), width: WP(13)}}
                source={Icons.Logo}
              />
              <Text
                style={{
                  fontSize: FS(2.4),
                  color: '#fff',
                  bottom: HP(0.8),
                  fontFamily: Fonts.MontserratBold,
                }}>
                Expenses
              </Text>
              <Image
                style={{
                  height: HP(7),
                  width: HP(7),
                  borderRadius: HP(4),
                  borderWidth: 3,
                  borderColor: 'white',
                  resizeMode: 'cover',
                }}
                source={Icons.Travel}
              />
            </View>
          </View>
        </LinearGradient>

        <View
          style={{
            backgroundColor: '#F3EFE6',
            bottom: HP(3),
            borderRadius: HP(3),
          }}>
          <View
            style={{
              backgroundColor: '#f7f7f7ff',
              borderRadius: HP(3),
              padding: HP(2),
            }}>
            {/* NAME */}
            <Input Place={'Group Name'} value={name} onChangeText={setName} />

            {/* DESCRIPTION */}
            <Input
              Place={'Description'}
              value={description}
              onChangeText={setDescription}
            />

            {/* IMAGE URL */}
            <Input
              Place={'Image URL'}
              value={imageUrl}
              onChangeText={setImageUrl}
            />

            {/* FRIEND SELECT BUTTON */}
            <TouchableOpacity
              onPress={openFriendModal}
              style={{
                height: HP(5),
                width: WP(90),
                left: WP(1),
                borderRadius: HP(1),
                justifyContent: 'center',
                marginTop: HP(1),
                borderColor: '#FF8A5A',
                borderWidth: 1,
              }}>
              <CustomText style={{left: HP(3.5)}} children={'Select Friends'} />
            </TouchableOpacity>

            {/* SHOW SELECTED COUNT */}
            {selectedMembers.length > 0 && (
              <Text style={{marginTop: HP(1), color: 'black'}}>
                {selectedMembers.length} Members Selected
              </Text>
            )}

            {/* CREATE BUTTON */}
            <TouchableOpacity
              onPress={handleCreateGroup}
              style={{
                backgroundColor: '#FF8A5A',
                padding: HP(2),
                borderRadius: HP(1),
                marginTop: HP(2),
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: FS(2),
                  fontFamily: Fonts.MontserratBold,
                }}>
                Create Group
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={friendModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: '#00000088',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: WP(90),
              height: HP(60),
              backgroundColor: 'white',
              borderRadius: HP(2),
              padding: HP(2),
            }}>
            <Text
              style={{
                fontSize: FS(2.2),
                fontFamily: Fonts.MontserratBold,
                marginBottom: HP(2),
              }}>
              Select Friends
            </Text>

            {loadingFriends ? (
              <ActivityIndicator size="large" color="black" />
            ) : (
              <FlatList
                data={friends}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => toggleSelectFriend(item.id)}
                    style={{
                      padding: HP(1),
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 0.4,
                    }}>
                    <Text>{item.name}</Text>
                    <Text>{selectedMembers.includes(item.id) ? '✔' : '○'}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity
              onPress={() => setFriendModal(false)}
              style={{
                marginTop: HP(2),
                backgroundColor: '#FF8A5A',
                padding: HP(1.5),
                borderRadius: HP(1),
                alignItems: 'center',
              }}>
              <Text style={{color: 'white', fontSize: FS(2)}}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CreateGroup;
