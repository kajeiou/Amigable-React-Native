import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import MenuScreen from '../screens/userScreens/MenuScreen';

export default function CustomContainer({ children }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
      <MenuScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:100,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 60, // Ajout d'un padding au bas de la liste
  },
});
