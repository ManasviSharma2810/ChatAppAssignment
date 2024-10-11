import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, PermissionsAndroid, Platform } from 'react-native';
import Contacts from 'react-native-contacts';


interface Contact {
  recordID: string;
  givenName: string;
  familyName: string;
}

const Home: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      fetchContacts();
    } else {
      readContact();
    }
  }, []);
  const readContact = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        fetchContacts();
      } else {
        console.log('Contacts permission denied');
      }
    } catch (error) {
      console.error('Permission error: ', error);
    }
  };

 
  const fetchContacts = () => {
    Contacts.getAll()//method provided by the react-native-contacts
      .then((contacts) => {
        setContacts(contacts); 
        console.log(contacts);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const renderItem = ({ item }: { item: Contact }) => (
    <View style={{ padding: 20,borderBottomColor: '#ccc',borderBottomWidth:1,backgroundColor:'#fff' }}>
    <Text>{item.givenName} {item.familyName}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
     <FlatList
     data={contacts}
     renderItem={renderItem}
     />
    </View>
    
  );
};

export default Home;
