import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import styles from './styles';
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TextInput,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
// import usersData from '../../assets/users.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Images } from '../../assets';
import Contacts from 'react-native-contacts';
import { NavigationProp } from '@react-navigation/native';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
}

interface favprops {
  navigation: NavigationProp<any>;
}

const ChatScreen: React.FC<favprops> = ({ navigation }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  const readContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to access your contacts.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        console.log('Contacts permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting contacts permission:', error);
      return false;
    }
  };

  const fetchContacts = async () => {
    try {
      const contacts = await Contacts.getAll();
      const formattedContacts = contacts.map(contact => ({
        id: contact.recordID,
        firstName: contact.givenName,
        lastName: contact.familyName || '',
        phone: contact.phoneNumbers.length ? contact.phoneNumbers[0].number : 'N/A',
      }));

    
      setUsers(formattedContacts);
      setFilteredUsers(formattedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    // setUsers(usersData.users);
    // setFilteredUsers(usersData.users);

    const getContacts = async () => {
      if (Platform.OS === 'android') {
        const permissionGranted = await readContactPermission();
        if (permissionGranted) {
          await fetchContacts();
        }
      } else if (Platform.OS === 'ios') {
        await fetchContacts();
      }
    };

    getContacts();

 
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        user =>
          user.firstName.toLowerCase().includes(query.toLowerCase()) ||
          user.lastName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  };

  const handleChatRoom = (item: User) => {
    navigation.navigate('ChatRoom', {
      firstName: item.firstName,
      lastName: item.lastName,
    });
  };

  const renderItem: ListRenderItem<User> = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleChatRoom(item)}
      style={styles.userContainer}
    >
      <View style={styles.initialsContainer}>
        <Text style={styles.initialsText}>
          {getInitials(item.firstName, item.lastName)}
        </Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.userPhone}>{item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchView}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Contacts..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {filteredUsers.length > 0 ? (
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          style={styles.userList}
        />
      ) : (
        <View style={styles.noContactsContainer}>
          <Image source={Images.result} style={styles.rImage}></Image>
          <Text style={styles.noContactsText}>No contacts found</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;
