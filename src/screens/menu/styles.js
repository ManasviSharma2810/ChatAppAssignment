import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7edf3',
  },

  upper: {
    backgroundColor: '#2A7BBB',
    height: windowWidth > 400 ? 123 : 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  sub2: {
    color: 'white',
    fontSize: 13,
    marginBottom: 20,
  },
  location: {
    fontWeight: '500',
    color: 'white',
    fontSize: 22,
  },

  img3: {
    width: 40,
    height: 40,
    marginTop: -55,
  },
  lower: {
    backgroundColor: '#e7edf3',
    flex: 1,
  },
  input: {
    marginVertical: 19,
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
  },
  nochat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nochatimg: {
    width: 269,
    height: 166,
  },
  button: {
    backgroundColor: '#2A7BBB',
    padding: 5,
    alignItems: 'center',
    borderRadius: 7,
    marginHorizontal: 15,
    marginTop: 20,
  },
  buttonText: {
    padding: 10,
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
  addMsg: {
    width: 30,
    height: 30,
  },
  userInfo: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  chatListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: '#ccc',
    backgroundColor:"#fff",
    borderRadius:8,
    marginHorizontal:15
  },
  initialsCircle: {
    width: 40, 
    height: 40, 
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 10,
  },
  initialsText: {
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 18, 
  },
  chatListItemText: {
    fontSize: 16,
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  viewBoth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'grey',
  },
 
});
