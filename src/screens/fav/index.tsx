import React, {useState, useEffect} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';

import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import usersData from '../../assets/users.json';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icons, Images} from '../../assets';
import {NavigationProp} from '@react-navigation/native';
interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
}
interface favprops {
  navigation: NavigationProp<any>;
}

const ChatScreen: React.FC<favprops> = ({navigation}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
 

  useEffect(() => {
    setUsers(usersData.users);
    setFilteredUsers(usersData.users);
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
      GiftedChat.append(previousMessages, newMessages),
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
          user.lastName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredUsers(filtered);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0).toUpperCase()}${lastName
      .charAt(0)
      .toUpperCase()}`;
  };

  const handleChatRoom = (item: any) => {
    navigation.navigate('ChatRoom', {
      firstName: item.firstName,
      lastName: item.lastName,
    });
  };

  const renderItem: ListRenderItem<User> = ({item}) => (
    <TouchableOpacity
      onPress={() => handleChatRoom(item)}
      style={styles.userContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  backArrow: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  userList: {
    paddingBottom: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  initialsContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  initialsText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    fontSize: 18,
    color: '#666',
  },
  rImage: {
    height: '30%',
    width: '50%',
  },
  
});

export default ChatScreen;
