import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LaunchScreen from './screens/LaunchScreen';
import HomeScreen from './screens/HomeScreen'; // Écran pour un utilisateur inscrit

const Stack = createNativeStackNavigator();

export default function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {!isUserLoggedIn ? (
          // Navigation pour un utilisateur non connecté
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#e51b23',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={LaunchScreen}
              options={{
                title: 'Welcome',
              }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignUpScreen}
              options={{
                title: 'Inscription',
              }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{
                title: 'Connexion',
              }}
            />
          </Stack.Navigator>
        ) : (
          // Navigation pour un utilisateur connecté
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#e51b23',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: 'Accueil',
              }}
            />
            {/* Autres écrans pour l'utilisateur inscrit */}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
