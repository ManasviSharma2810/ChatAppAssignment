import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from 'react-native';

const emojis = ['😀', '😂', '😍', '😎', '😢', '😡'];

interface Option {
  label: string;
  onPress: () => void;
  icon?: ImageSourcePropType;
}

interface CustomModalProps {
  visible: boolean;
  title?: string;
  options: Option[];
  onClose: () => void;
  onEmojiSelect?: (emoji: string) => void;
  showEmojiLabels?: boolean; 
}

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  title,
  options,
  onClose,
  onEmojiSelect,
  showEmojiLabels = true,
}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View
          style={styles.modalContainer}
          onTouchEnd={e => e.stopPropagation()}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          {showEmojiLabels && (
            <View style={styles.emojiContainer}>
              {emojis.map((emoji, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => onEmojiSelect && onEmojiSelect(emoji)}>
                  <Text style={styles.emoji}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              style={styles.modalOption}>
              {option.icon && (
                <Image source={option.icon} style={styles.modalIcon} />
              )}
              <Text style={styles.modalOptionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 24,
    marginRight: 10,
  },
  modalOption: {
    paddingVertical: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
  modalIcon: {
    width: 20,
    height: 20,
  },
});

export default CustomModal;
