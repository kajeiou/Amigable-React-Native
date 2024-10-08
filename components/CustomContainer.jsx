import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View } from 'react-native';
import MenuScreen from '../screens/userScreens/Menu/MenuScreen';
import { useAuthentication } from '../contexts/useAuthentification';

export default function CustomContainer({ children, refreshControl  }) {
  const user = useAuthentication()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} refreshControl={refreshControl}>
        {children}
      </ScrollView>
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
    paddingBottom: 200, // Ajout d'un padding au bas de la liste
  },
});
