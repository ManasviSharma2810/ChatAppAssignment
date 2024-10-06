import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Account from '../screens/account';
import Fav from '../screens/fav';
import Menu from '../screens/menu';
import { Icons } from '../assets';

// Create the type for the tab navigator
const Tab = createBottomTabNavigator();

const BottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home"
        component={Home}
        options={{
          title: 'HOME',
          tabBarIcon: ({ size, focused, color }: { size: number; focused: boolean; color: string }) => {
            return (
              <Image style={{ width: size, height: size }} source={Icons.home} />
            );
          },
        }}
      />
      <Tab.Screen 
        name="Account"
        component={Account}
        options={{
          title: 'Account',
          tabBarIcon: ({ size, focused, color }: { size: number; focused: boolean; color: string }) => {
            return (
              <Image style={{ width: size, height: size }} source={Icons.account} />
            );
          },
        }}
      />
      <Tab.Screen 
        name="Fav"
        component={Fav}
        options={{
          title: 'Fav',
          tabBarIcon: ({ size, focused, color }: { size: number; focused: boolean; color: string }) => {
            return (
              <Image style={{ width: size, height: size }} source={Icons.fav} />
            );
          },
        }}
      />
      <Tab.Screen 
        name="Menu"
        component={Menu}
        options={{
          headerShown: false,
          title: 'Menu',
          tabBarIcon: ({ size, focused, color }: { size: number; focused: boolean; color: string }) => {
            return (
              <Image style={{ width: size, height: size }} source={Icons.menu} />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
