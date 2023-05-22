import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import GuestNavigator from './screens/navigators/GuestNavigator';
import UserNavigator from './screens/navigators/UserNavigator';
import { useAuthentication } from './contexts/useAuthentification';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NotificationService from './services/NotificationService';


export default function App() {

  const user = useAuthentication();
  const [newNotifications, setNewNotifications] = useState([]);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    if (user && user.user && user.user.uid && !hasSubscribed) {
      //fetchNotifications(user);
      setHasSubscribed(true); 
    }
  }, [user, hasSubscribed]);
  
  const fetchNotifications = async (user) => {
    try {
      if (user && user.user && user.user.uid) {
        const unsubscribe = NotificationService.listenForNewNotifications(user.user.uid, (newNotification) => {
          setNewNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        });
        return () => unsubscribe();
      } else {
        console.error('User information is not available.');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  
  return (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <NavigationContainer>
        {user.user ? (
          <UserNavigator
            newNotifications={newNotifications}
          />
        ) : (
          <GuestNavigator />
        )}
      </NavigationContainer>
    </View>
  </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
