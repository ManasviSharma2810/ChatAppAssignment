import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Images } from '../../assets';
import styles from './styles';


interface SplashScreenProps {
  navigation: {
    navigate: (screen: string) => void;
  };
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplash(false);
      navigation.navigate('HomeScreen'); 
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (isSplash) {
    return (
      <View style={styles.container}>
        <Image 
          source={Images.splashImage} style={styles.logo}
        />
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }

  return null; 
};



export default SplashScreen;
