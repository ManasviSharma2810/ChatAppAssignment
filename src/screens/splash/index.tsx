import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Images } from '../../assets';

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
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (isSplash) {
    return (
      <View style={styles.container}>
        <Image 
          source={Images.splashImage} // Update this path to your logo
          style={styles.logo} 
        />
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.subtitle}>Loading...</Text>
      </View>
    );
  }

  return null; 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  logo: {
    width: 150, 
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666', 
  },
});

export default SplashScreen;
