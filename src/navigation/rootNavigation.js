import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomNavigation from './bottomNavigation';
import SplashScreen from '../screens/splash';
import ChatScreen from '../screens/fav';
import Gifted from '../screens/giftchat';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={BottomNavigation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserList"
          component={ChatScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ChatRoom"
          component={Gifted}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
