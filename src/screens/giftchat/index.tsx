import React, {useState, useEffect} from 'react';
import {GiftedChat, IMessage, Bubble} from 'react-native-gifted-chat';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Clipboard,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Icons, Images} from '../../assets';
import CustomModal from '../../components/customModal';
import styles from './styles';
interface RouteParams {
  firstName: string;
  lastName: string;
}
interface MessageType extends IMessage {
  reactions?: Array<string>;
}
const Gifted: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isMessageModalVisible, setIsMessageModalVisible] =
    useState<boolean>(false);
  const [selectedMessage, setSelectedMessage] = useState<MessageType | null>(
    null,
  );
  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');

  const navigation = useNavigation();
  const route = useRoute();
  const {firstName, lastName} = route.params as RouteParams;

  const storageKey = `${firstName}_${lastName}_messages`;
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem(storageKey);
        console.log(savedMessages);

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
  const handleEmojiSelect = async (emoji: string) => {
    if (selectedMessage) {
      const updatedMessages = messages.map(msg => {
        if (msg._id === selectedMessage._id) {
          return {
            ...msg,
            text: `${msg.text} `,
            reactions: [...(msg.reactions || []), emoji],
          };
        }
        return msg;
      });
      setMessages(updatedMessages);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    }
    closeMessageModal();
  };
  const onSend = async () => {
    if (inputText.trim()) {
      const newMessage: MessageType = {
        _id: Math.random().toString(),
        text: inputText,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'You',
        },
        reactions: [],
      };
      const updatedMessages = GiftedChat.append(messages, [newMessage]);
      setMessages(updatedMessages);
      setInputText('');
      try {
        await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
        const existingUsers = await AsyncStorage.getItem('chattedUsers');
        let usersArray = existingUsers ? JSON.parse(existingUsers) : [];
        const userIndex = usersArray.findIndex(
          (user: {firstName: string; lastName: string}) =>
            user.firstName === firstName && user.lastName === lastName,
        );
        if (userIndex === -1) {
          usersArray.push({
            firstName,
            lastName,
            lastMessage: newMessage.text,
            lastMessageTime: newMessage.createdAt,
          });
        } else {
          usersArray[userIndex].lastMessage = newMessage.text;
          usersArray[userIndex].lastMessageTime = newMessage.createdAt;
        }
        await AsyncStorage.setItem('chattedUsers', JSON.stringify(usersArray));
      } catch (error) {
        console.error('Error saving messages', error);
      }
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
    await AsyncStorage.removeItem(storageKey);
    setIsDeleteModalVisible(false);
  };

  const openMessageModal = (message: MessageType) => {
    setSelectedMessage(message);
    setIsMessageModalVisible(true);
  };

  const copyMessage = () => {
    if (selectedMessage?.text) {
      Clipboard.setString(selectedMessage.text);
      Alert.alert('Copied!', 'Message has been copied to clipboard.');
    }
    closeMessageModal();
  };
  const deleteMessage = async () => {
    if (selectedMessage) {
      const updatedMessages = messages.filter(
        msg => msg._id !== selectedMessage._id,
      );
      setMessages(updatedMessages);
      await AsyncStorage.setItem(storageKey, JSON.stringify(updatedMessages));
    }
    closeMessageModal();
  };

  const closeMessageModal = () => {
    setIsMessageModalVisible(false);
    setSelectedMessage(null);
  };

  const renderBubble = (props: any) => {
    return (
      <View style={{marginTop: 20}}>
        <Bubble
          {...props}
          wrapperStyle={{
            left: {
              marginLeft: -30,
            },
          }}
        />
        {props.currentMessage.reactions &&
          props.currentMessage.reactions.length > 0 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                marginVertical: 5,
                position: 'relative',
              }}>
              {props.currentMessage.reactions.map(
                (emoji: any, index: number) => (
                  <View
                    style={{
                      top: -65,
                      right: 45,
                      position: 'absolute',
                      backgroundColor: 'grey',
                      borderRadius: 15,
                    }}>
                    <Text key={index} style={{fontSize: 20}}>
                      {emoji}
                    </Text>
                  </View>
                ),
              )}
            </View>
          )}
      </View>
    );
  };
  const renderInputToolbar = (props: any) => (
    <View style={styles.inputContainer}>
      <View style={styles.addView}>
        <Text style={styles.addText}>+</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={inputText}
        onChangeText={setInputText}
        onSubmitEditing={onSend}
      />
      <TouchableOpacity style={styles.sendButton} onPress={onSend}>
        <Image style={styles.sendButtonImage} source={Images.send} />
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.container}>
      <View style={styles.viewStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={Images.backArrow} style={styles.backArrow} />
        </TouchableOpacity>
        <View style={styles.initialsContainer}>
          <Text style={styles.initialsText}>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </Text>
        </View>
        <View style={{width: 300}}>
          <View style={styles.nameContainer}>
            <Text style={styles.nameText}>
              {firstName} {lastName}
            </Text>
            <TouchableOpacity onPress={openModal}>
              <Image source={Icons.dots} style={styles.dotStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <CustomModal
        visible={isModalVisible}
        options={[
          {label: 'Delete Chat', onPress: confirmDelete, icon: Icons.delete},
        ]}
        onClose={closeModal}
        onEmojiSelect={handleEmojiSelect}
        showEmojiLabels={false}
      />

      <CustomModal
        visible={isMessageModalVisible}
        options={[
          {
            label: 'Reply',
            onPress: () => Alert.alert('Reply'),
            icon: Icons.reply,
          },
          {label: 'Copy', onPress: copyMessage, icon: Icons.copy},
          {label: 'Star', onPress: () => Alert.alert('Star'), icon: Icons.fav},
          {label: 'Edit', onPress: () => Alert.alert('Edit'), icon: Icons.edit},
          {label: 'Delete', onPress: deleteMessage, icon: Icons.delete},
        ]}
        onClose={closeMessageModal}
        onEmojiSelect={handleEmojiSelect}
      />

      <Modal
        transparent={true}
        visible={isDeleteModalVisible}
        animationType="fade"
        onRequestClose={() => setIsDeleteModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContainer}>
            <Image source={Images.deleteModal} style={styles.deleteImg} />
            <Text style={styles.modalTitleText}>Delete Chat?</Text>
            <Text style={styles.modalTitle}>
              Are you sure you want to delete the chat?
            </Text>

            <View style={styles.deleteModalButtons}>
              <TouchableOpacity
                onPress={handleDeleteChat}
                style={styles.deleteButton}>
                <Text style={styles.modalDeleteText}> Yes,Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsDeleteModalVisible(false)}
                style={styles.cancelButton}>
                <Text style={styles.modalCancelText}> No, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <GiftedChat
        messages={messages}
        user={{
          _id: 1,
          name: 'You',
        }}
        renderUsernameOnMessage
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onLongPress={(context, message) => openMessageModal(message)}
      />
    </View>
  );
};

export default Gifted;
