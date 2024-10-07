import {StyleSheet} from 'react-native';
import { vh,vw } from '../../utils/dimension';
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
      margin:10,
      backgroundColor: '#fff',
      borderRadius: 8,
      elevation: 2,
      marginHorizontal: vw(10),
    },
    searchBar: {
      flex: 1,
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      paddingLeft: vw(10),
      backgroundColor: '#fff',
    },
    backArrow: {
      width: 30,
      height: 30,
      marginRight:vw(10)
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
      width: vw(40),
      height: vh(40),
      borderRadius: 20,
      backgroundColor: '#007BFF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: vw(15),
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
  export default styles