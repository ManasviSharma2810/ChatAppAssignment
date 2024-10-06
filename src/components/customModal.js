import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image
} from 'react-native';

const CustomModal = ({ visible, title, options, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide" // This will make the modal slide from the bottom
      onRequestClose={onClose}
    >
      {/* TouchableOpacity to close the modal when tapping outside */}
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <View style={styles.modalContainer} onTouchEnd={(e) => e.stopPropagation()}>
          {title && <Text style={styles.modalTitle}>{title}</Text>}
          
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={option.onPress}
              style={styles.modalOption}
            >
              {/* Render icon on the left side */}
              {option.icon && (
                <Image 
                  source={option.icon} // Use the source prop to specify the image
                  style={styles.modalIcon} // Add styles for the image
                />
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
    justifyContent: 'flex-end', // Aligns the modal at the bottom
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%', // Full width
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20, // Rounded top corners
    borderTopRightRadius: 20, // Rounded top corners
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    // textAlign: 'center', // Center the title
  },
  modalOption: {
    paddingVertical: 30, // Increase padding for better touch area
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    flexDirection: 'row', // Use row direction to align text and icon
    alignItems: 'center', // Center vertically
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15, // Add spacing between icon and text
    flex: 1, // This will make the text take up available space
  },
  modalIcon: {
    width: 20, // Specify the width of the icon
    height: 20, // Specify the height of the icon
  },
});

export default CustomModal;
