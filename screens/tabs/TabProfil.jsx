import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5, Feather } from '@expo/vector-icons';

import { SafeAreaView, StyleSheet } from 'react-native';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
import MyPosts from '../userScreens/Profil/MyPosts';
const Tab = createMaterialTopTabNavigator();

export default function TabProfil() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
      screenOptions={{
        activeTintColor: '#900C3F',
        inactiveTintColor: '#999999',
        style: {
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 1,
          borderBottomColor: '#DDDDDD',
          paddingTop:25
        },
        tabStyle: {
          height: 50,
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        indicatorStyle: {
          backgroundColor: '#900C3F',
        },
      }}
      tabBarPosition="top"
    >
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-edit" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          tabBarLabel: 'Mes posts',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bookmark" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});