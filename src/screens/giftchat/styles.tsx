import {StyleSheet} from 'react-native';
import { vh,vw } from '../../utils/dimension';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    viewStyle: {
      paddingBottom:vh(15),
      backgroundColor: '#fff',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: vw(15),
      paddingTop: vh(50),
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    backArrow: {
      width: vw(30),
      height: vh(20),
      tintColor: 'black',
      marginRight: 20,
    },
    initialsContainer: {
      height: vh(50),
      width: vw(50),
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
      paddingLeft: vw(20),
    flexDirection:"row",
    backgroundColor:"#fff",
    justifyContent:'space-between'

    },
    nameText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    dotStyle: {
      height: vh(30),
      width: vw(30),
      backgroundColor:"#fff",
      tintColor: '#888',

    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    deleteModalContainer: {
      width: '80%',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      alignItems: 'center',
    },
    modalTitleText:{
      fontSize: 20,
      marginBottom: vh(20),
      fontWeight: 'bold'
    },
    deleteImg:{
  height:vh(50),
  width:vw(50),
  marginBottom: vh(20),
    },
    modalTitle: {
      fontSize: 18,
      color:'grey',
      fontWeight: '500',
      marginBottom: vh(20),
      textAlign: 'center',
    },
    deleteModalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '90%',
    },
    deleteButton: {
      backgroundColor: '#2A7BBB',
      paddingVertical: vh(15),
      paddingHorizontal: vw(25),
      borderRadius: 5,
    },
    modalDeleteText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    cancelButton: {
      backgroundColor: '#EEEEEE',
      paddingVertical: 15,
      paddingHorizontal: 25,
      borderRadius: 5,
    },
    modalCancelText: {
      color: '#111810',
      fontWeight: '500',
    },
    
    emojiContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 10,
    },
    emojiButton: {
      paddingHorizontal: vw(5),
    },
    emoji: {
      fontSize: 24,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: vw(20),
      paddingVertical: vh(10),
      paddingBottom: vh(40),
      backgroundColor: '#f8f9f9',
    },
    input: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 4,
      paddingHorizontal: vw(10),
      marginRight: vw(10),
      paddingVertical: vh(10),
      marginLeft: vw(10),
    },
    sendButton: {
      backgroundColor: '#007bff',
      borderRadius: 100,
      paddingVertical: vh(10),
      paddingHorizontal: vw(10),
    },
    sendButtonImage: {
      height: vh(20),
      width: vw(20),
    },
    addView: {
      borderWidth: 1,
      borderRadius: 100,
      height: vh(20),
      width: vw(20),
      justifyContent: 'center',
      alignItems: 'center',
    },
    addText: {
      fontSize: 15,
    },
    leftBubble: {
      backgroundColor: 'red',
      borderRadius: 15,
      padding: 10,
      left:0
      
    },
    rightBubble: {
      backgroundColor: 'red', 
      borderRadius: 15,
      padding: 10,
      marginRight: 10,
      marginLeft: -40,
    },
  });
  export default styles;