

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import styles from './styles';
import { Images } from '../../assets';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MenuProps {
  navigation: NavigationProp<any>;
}

const Menu: React.FC<MenuProps> = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chattedUsers, setChattedUsers] = useState([]);

  useEffect(() => {
    const fetchChattedUsers = async () => {
      try {
        const users = await AsyncStorage.getItem('chattedUsers');
        if (users) {
          setChattedUsers(JSON.parse(users));
        }
      } catch (error) {
        console.error('Error loading chatted users', error);
      }
    };

    fetchChattedUsers();
  }, []);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const navigateToChatScreen = () => {
    toggleModal();
    navigation.navigate('UserList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <View>
          <Text style={styles.location}>Messages</Text>
          <Text style={styles.sub2}>{chattedUsers.length} Contacts</Text>
        </View>
        <TouchableOpacity   onPress={() => {
   
      navigation.navigate('UserList');
  }}>
          <Image source={Images.addChat} style={styles.img3} />
        </TouchableOpacity>
      </View>

      <View style={styles.lower}>
        <View style={styles.input}>
          <Image source={Images.search} />
          <TextInput placeholder="Search messages..." />
        </View>

        {chattedUsers.length === 0 ? (
          <View style={styles.nochat}>
            <Image style={styles.nochatimg} source={Images.chat} />
            <Text>No chats, yet!</Text>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttonText}>Start Chat</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={chattedUsers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => navigation.navigate('ChatRoom', { firstName: item.firstName, lastName: item.lastName })}
            >
              <View style={styles.chatListItem}>
                {/* Circle with initials */}
                <View style={styles.initialsCircle}>
                  <Text style={styles.initialsText}>
                    {item.firstName.charAt(0)}{item.lastName.charAt(0)}
                  </Text>
                </View>
            
                {/* Full name */}
                <Text style={styles.chatListItemText}>
                  {item.firstName} {item.lastName}
                </Text>
              </View>
            </TouchableOpacity>
            
            )}
          />
        )}
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableWithoutFeedback onPress={toggleModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.viewBoth}>
                  <Image source={Images.addChat} style={styles.addMsg} />
                  <TouchableOpacity onPress={navigateToChatScreen}>
                    <Text style={styles.modalText}>New Chat</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};



export default Menu;



