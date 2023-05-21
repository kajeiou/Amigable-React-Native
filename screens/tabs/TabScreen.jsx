import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PublicPostsScreen from '../userScreens/PublicPostsScreen';
import PrivatePostsScreen from '../userScreens/PrivatePostsScreen';

const Tab = createMaterialTopTabNavigator();

export default function TabScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
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
        name="Subscriptions"
        component={PrivatePostsScreen}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
