import React, {useState, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Clipboard,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Icons, Images} from '../../assets';
import CustomModal from '../../components/customModal'; 

const Gifted = () => {
  const [messages, setMessages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);  
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);  
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);  
  
  const navigation = useNavigation();
  const route = useRoute();
  const {firstName, lastName} = route.params;

  const storageKey = `${firstName}_${lastName}_messages`;

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem(storageKey);
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        } else {
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
              reactions: [],
            },
          ]);
        }
      } catch (error) {
        console.error('Error loading messages', error);
      }
    };

    loadMessages();
  }, []);
  const reactionOptions = [
    { label: '👍', value: 'like' },
    { label: '❤️', value: 'love' },
    { label: '😂', value: 'laugh' },
    { label: '😮', value: 'wow' },
    { label: '😢', value: 'sad' },
    { label: '😡', value: 'angry' },
  ];
  
  const onSend = async (newMessages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
    try {
      const updatedMessages = GiftedChat.append(messages, newMessages);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
      const existingUsers = await AsyncStorage.getItem('chattedUsers');
    let usersArray = existingUsers ? JSON.parse(existingUsers) : [];
    const userIndex = usersArray.findIndex(
      user => user.firstName === firstName && user.lastName === lastName,
    );
    if (userIndex === -1) {
      usersArray.push({ firstName, lastName });
    }

    await AsyncStorage.setItem('chattedUsers', JSON.stringify(usersArray));
    } catch (error) {
      console.error('Error saving messages', error);
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  
  const confirmDelete = () => {
    closeModal(); 
    setIsDeleteModalVisible(true);  
  };

  const handleDeleteChat = async () => {
    setMessages([]); 
    await AsyncStorage.removeItem(storageKey);  // Remove messages from storage
    setIsDeleteModalVisible(false);  // Close confirmation modal
  };

  // Function to open the bottom modal with message options
  const openMessageModal = (message) => {
    setSelectedMessage(message);  // Set the selected message
    setIsMessageModalVisible(true);  // Show message options modal
  };

  // Handle copying the message text
  const copyMessage = () => {
    Clipboard.setString(selectedMessage.text);  
    Alert.alert('Copied!', 'Message has been copied to clipboard.');
    closeMessageModal();
  };

  // Handle deleting a particular message
  const deleteMessage = async () => {
    setMessages(prevMessages => prevMessages.filter(msg => msg._id !== selectedMessage._id));  
    const updatedMessages = messages.filter(msg => msg._id !== selectedMessage._id);
    await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));  
    closeMessageModal();
  };

  const closeMessageModal = () => {
    setIsMessageModalVisible(false);
    setSelectedMessage(null);  
  };

  return (
    <View style={styles.container}>
      <View >
        <View style={styles.viewStyle}>
          <TouchableOpacity  onPress={() => navigation.goBack()}>
            <Image source={Images.backArrow} style={styles.backArrow} />
          </TouchableOpacity>
          <View style={styles.initialsContainer}>
            <Text style={styles.initialsText}>
              {firstName.charAt(0)}{lastName.charAt(0)}
            </Text>
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>{firstName} {lastName}</Text>
          </View>

          <TouchableOpacity onPress={openModal}>
            <Image source={Icons.dots} style={styles.dotStyle} />
          </TouchableOpacity>
        </View>
      </View>

      
      <CustomModal
        visible={isModalVisible}
        // title="Options"
        options={[
          { label: 'Delete Chat', onPress: confirmDelete ,icon :Icons.delete},  
          // { label: 'More', onPress: () => Alert.alert('Option 1') },
         
        ]}
        onClose={closeModal}
      />

      
      <CustomModal
        visible={isMessageModalVisible}
        // title="Message Options"
        options={[
          { label: 'Reaction', onPress: () => Alert.alert('Reaction') },
          { label: 'Reply', onPress: () => Alert.alert('Reply'),icon :Icons.reply},
          { label: 'Copy', onPress: copyMessage ,icon :Icons.copy},
          { label: 'Star', onPress: () => Alert.alert('Star'),icon :Icons.fav },
          { label: 'Edit', onPress: () => Alert.alert('Edit'),icon :Icons.edit },
          { label: 'Delete', onPress: deleteMessage,icon :Icons.delete, },
         
        ]}
        onClose={closeMessageModal}
      />

      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContainer}>
            <Text style={styles.modalTitle}>Are you sure you want to delete the chat?</Text>

            <View style={styles.deleteModalButtons}>
              <TouchableOpacity onPress={handleDeleteChat} style={styles.deleteButton}>
                <Text style={styles.modalDeleteText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <GiftedChat
        messages={messages}
        onSend={newMessages => onSend(newMessages)}
        user={{
          _id: 1,
          name: 'You',
        }}
        renderUsernameOnMessage
        onLongPress={(context, message) => openMessageModal(message)}  // Long press message to open the bottom modal
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  viewStyle: {
    height: '38%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backArrow: {
    width: 30,
    height: 20,
    tintColor: 'black',
    marginRight:20
  },
  initialsContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'lightblue',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  nameContainer: {
  
    paddingLeft: 20,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotStyle: {
    height: 30,
    width: 30,
    right:"-400%",
    tintColor: '#888',
  },
  
  
    reactionContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    reactionText: {
      fontSize: 16,
      marginRight: 5,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    deleteModalContainer: {
      width: '80%', // Width of the modal
      backgroundColor: '#FFFFFF', // White background
      borderRadius: 10, // Rounded corners
      padding: 20, // Padding inside the modal
      shadowColor: '#000', // Shadow color
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25, // Shadow opacity
      shadowRadius: 4, // Shadow radius
      elevation: 5, // Elevation for Android
      alignItems: 'center', // Center the content
    },
    modalTitle: {
      fontSize: 18, // Font size for title
      fontWeight: 'bold', // Bold text
      marginBottom: 15, // Space below the title
      textAlign: 'center', // Centered text
    },
    deleteModalButtons: {
      flexDirection: 'row', // Arrange buttons in a row
      justifyContent: 'space-between', // Space between buttons
      width: '100%', // Full width of modal
    },
    deleteButton: {
      flex: 1, // Take equal space
      backgroundColor: '#FF3B30', // Red background for delete button
      borderRadius: 5, // Rounded corners
      padding: 10, // Padding inside button
      marginRight: 5, // Space between buttons
      alignItems: 'center', // Center text
    },
    cancelButton: {
      flex: 1, // Take equal space
      backgroundColor: '#D1D1D1', // Grey background for cancel button
      borderRadius: 5, // Rounded corners
      padding: 10, // Padding inside button
      marginLeft: 5, // Space between buttons
      alignItems: 'center', // Center text
    },
    modalDeleteText: {
      color: '#FFFFFF', // White text for delete button
      fontWeight: 'bold', // Bold text
    },
    modalCancelText: {
      color: '#000000', // Black text for cancel button
      fontWeight: 'bold', // Bold text
    },
  });
  


export default Gifted;





