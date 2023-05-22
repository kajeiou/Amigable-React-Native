import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PublicPostsScreen from '../userScreens/Home/PublicPostsScreen';
import PrivatePostsScreen from '../userScreens/Home/PrivatePostsScreen';
import { SafeAreaView, StyleSheet } from 'react-native';
const Tab = createMaterialTopTabNavigator();

export default function TabHome() {
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
        name="Public"
        component={PublicPostsScreen}
        options={{
          tabBarLabel: 'Public',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="earth" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Abonnements"
        component={PrivatePostsScreen}
        options={{
          tabBarLabel: 'Abonnements',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
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