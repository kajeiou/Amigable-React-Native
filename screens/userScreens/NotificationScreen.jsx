import React from 'react';
import { View, Text,Image } from 'react-native';
import CustomContainer from '../../components/CustomContainer';
import Title from '../../components/Title';
import emptyPhoto from '../../assets/images/empty_photo.png';

export default function NotificationScreen() {
    // Exemple de données de notifications
    const notifications = [
      {
        id: 1,
        message: 'Nouveau message de John Doe',
        timestamp: '2023-05-20T09:30:00',
        image: '',
      },
      {
        id: 2,
        message: "Vous avez reçu une demande d'ami de Jane Smith",
        timestamp: '2023-05-19T14:45:00',
        image: '',
      },
      {
        id: 3,
        message: 'Votre publication a été partagée par Alex Johnson',
        timestamp: '2023-05-18T17:15:00',
        image: '',
      },
    ];
  
    return (
      <CustomContainer>
        <Title text="Notifications" />
        <View>
          {notifications.map(notification => (
            <View key={notification.id} style={styles.notificationContainer}>
              <Image source={emptyPhoto} style={styles.notificationImage} />
              <View style={styles.notificationContent}>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTimestamp}>{notification.timestamp}</Text>
              </View>
            </View>
          ))}
        </View>
      </CustomContainer>
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
      width:"80%"
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