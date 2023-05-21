import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {Ionicons, Entypo, Feather, MaterialIcons } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

export default function MenuScreen() {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]}>
        <Text style={styles.menuItemText}>
            <MaterialIcons name='add-box' style={styles.menuIcon} onPress={() => navigation.navigate('AddPost')}/>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]}>
        <Text style={styles.menuItemText}>
            <Ionicons name='search' style={styles.menuIcon}/>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemLarge]}>
        <Text style={styles.menuItemText}>
            <Ionicons name='home' style={styles.menuIcon}  onPress={() => navigation.navigate('Home')}/>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]}>
        <Text style={styles.menuItemText}>
        <Text style={styles.menuItemText}>
            <Entypo name='notification' style={styles.menuIcon}/>
        </Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.menuItem, styles.menuItemSmall]} onPress={() => navigation.navigate('Profil')}>
        <Text style={styles.menuItemText}>
            <Feather name='user' style={styles.menuIcon}/>
        </Text>
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
        backgroundColor: 'white',
    },
    menuItemLarge: {
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