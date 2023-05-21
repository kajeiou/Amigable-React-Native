import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import GuestNavigator from './screens/navigators/GuestNavigator';
import UserNavigator from './screens/navigators/UserNavigator';
import { useAuthentication } from './contexts/useAuthentification';

export default function App() {
  const user = useAuthentication();


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
      {user.user ? <UserNavigator /> : <GuestNavigator />}
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
