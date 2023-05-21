import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Ionicons, Entypo, Feather, MaterialIcons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('AddPost')}>
          <MaterialIcons name='add-box' style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]}>
          <MaterialIcons name='search' style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemLarge]} onPress={() => navigation.navigate('Home')}>
          <MaterialIcons name='home' style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('Notifications')}>
          <Entypo name='notification' style={styles.menuIcon} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('Profil')}>
          <Feather name='user' style={styles.menuIcon} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
    },
    menuItem: {
      flex: 1,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItemSmall: {
      flex: 0.5, // Ajuster la hauteur des éléments plus petits
      backgroundColor: 'white',
    },
    menuItemLarge: {
      flex: 1, // Ajuster la hauteur des éléments plus grands
      backgroundColor: 'white',
    },
    menuItemText: {
      fontWeight: 'bold',
    },
    menuIcon : {
      color:'#900C3F',
      fontSize:30
    }
});
  