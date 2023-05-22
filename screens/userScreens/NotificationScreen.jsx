import React, { useState, useEffect } from 'react';
import { View, Text, Image, RefreshControl } from 'react-native';
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import emptyPhoto from '../../assets/images/empty_photo.png';
import MenuScreen from './Menu/MenuScreen';
import NotificationService from '../../services/NotificationService';
import { useAuthentication } from '../../contexts/useAuthentification';

export default function NotificationScreen() {
  const user = useAuthentication()


  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  useEffect(() => {
    if (user?.user?.uid && !hasSubscribed) {
      fetchNotifications(user);
      setHasSubscribed(true);
    }
  }, [user, hasSubscribed]);

  const handleRefresh = () => {
    setRefreshing(true);
    setNewNotifications([]); // Vider la liste des nouvelles notifications
    fetchNotifications(user)
      .then(() => setRefreshing(false))
      .catch((error) => {
        console.error('[Notification Screen] Error refreshing notifications:', error);
        setRefreshing(false);
      });
  };
  

  const fetchNotifications = async (user) => {
    try {
      if (user && user.user && user.user.uid) {
        
        const response = await NotificationService.getNotificationsByUserId(user.user.uid);
        setNotifications(response);
        
        // Écouter les nouvelles notifications
        const unsubscribe = NotificationService.listenForNewNotifications(user.user.uid, (newNotification) => {
          setNewNotifications((prevNotifications) => [...prevNotifications, newNotification]);
        });

        // Nettoyer l'écouteur lors du démontage du composant
        return () => unsubscribe();
      } else {
        console.error('[Notification Screen] User information 2 is not available.');
      }
    } catch (error) {
      console.error('[Notification Screen] Error fetching 2 notifications:', error);
    }
  };

  return (
    <>
      <CustomContainer refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#900C3F"/>}>
        <Title text="Notifications" />
        <View>
          {newNotifications.map(notification => (
            <View key={notification.id} style={[styles.notificationContainer, styles.newNotificationContainer]}>
              <Image source={emptyPhoto} style={styles.notificationImage} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationMessage}>{notification.FromUser.displayName} {notification.message}</Text>
                <Text style={styles.notificationTimestamp}>{notification.createdAt}</Text>
              </View>
            </View>
          ))}
          {notifications.map(notification => (
            <View key={notification.id} style={styles.notificationContainer}>
              <Image source={emptyPhoto} style={styles.notificationImage} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationMessage}>{notification.FromUser.displayName} {notification.message}</Text>
                <Text style={styles.notificationTimestamp}>{notification.createdAt}</Text>
              </View>
            </View>
          ))}
        </View>
      </CustomContainer>
      <MenuScreen />
    </>
  );
}

const styles = {
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    width: '80%',
  },
  newNotificationContainer: {
    backgroundColor: '#F9E7E7',
  },
  notificationImage: {
    width: 34,
    height: 34,
    borderRadius: 24,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationMessage: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationTimestamp: {
    fontSize: 10,
    color: '#999999',
  },
};
