import { getFirestore, collection, addDoc, getDocs, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import UserService from '../services/UserService';

const database = getDatabase();
const firestore = getFirestore();

import { Notification } from '../classes/Notification';
const NotificationService = {

 
    createNotificationPostLike: async (uid,userId, postId) => {
        try {    
            const notificationData = {
                type: 'likePost',
                message: "a aimé ta publication.",
                FromUserId: uid,
                ToUserId: userId,
                postId: postId,
                createdAt: new Date().toISOString(), 
                viewed: false
            };
    
            const docRef = await addDoc(collection(firestore, 'notifications'), notificationData);
            const notificationId = docRef.id;
    
            return notificationId;
        } catch (error) {
            console.log('[Notification Service] Erreur lors de la création de la notification :', error.message);
            throw error;
        }
    },
    getNotificationsByUserId: async (userId) => {
        try {
            
            const notificationsCollectionRef = collection(firestore, 'notifications');
            const querySnapshot = await getDocs(
                query(
                notificationsCollectionRef,
                where('ToUserId', '==', userId),
                orderBy('createdAt', 'desc')
                )
            );
      
            const notifications = [];
            for (const doc of querySnapshot.docs) {
                const notificationData = doc.data();
        
                const FromUserId = notificationData.FromUserId;
                const ToUserId = notificationData.ToUserId;
        
                const FromUser = FromUserId ? await UserService.getUserById(FromUserId) : null;
                const ToUser = ToUserId ? await UserService.getUserById(ToUserId) : null;

                
                const notification = new Notification(
                    doc.id,
                    notificationData.type,
                    notificationData.message,
                    FromUserId,
                    ToUserId,
                    notificationData.postId,
                    notificationData.createdAt,
                    notificationData.viewed,
                    ToUser,
                    FromUser
                );             
                
                notifications.push(notification);
            }
          
      
          return notifications;
        } catch (error) {
          console.log('[Notification Service] Erreur lors de la récupération des notifications :', error.message);
          throw error;
        }
      },
      listenForNewNotifications: (userId, callback) => {
        
        const notificationsCollectionRef = collection(firestore, 'notifications');
        const notificationQuery  = query(
          notificationsCollectionRef,
          where('ToUserId', '==', userId),
          orderBy('createdAt', 'desc')
        );
      
        const unsubscribe = onSnapshot(notificationQuery , async (snapshot) => {
          for (const change of snapshot.docChanges()) {
            if (change.type === 'added') {
                const newNotificationData = change.doc.data();
                
                const FromUserId = newNotificationData.FromUserId;
                const ToUserId = newNotificationData.ToUserId;
            
                const FromUser = FromUserId ? await UserService.getUserById(FromUserId) : null;
                const ToUser = ToUserId ? await UserService.getUserById(ToUserId) : null;
                
                const newNotification = new Notification(
                    change.doc.id,
                    newNotificationData.type,
                    newNotificationData.message,
                    FromUserId,
                    ToUserId,
                    newNotificationData.postId,
                    newNotificationData.createdAt,
                    newNotificationData.viewed,
                    ToUser,
                    FromUser
                );
                
                callback(newNotification);
            }
          }
        });
      
        // Retourne une fonction pour désinscrire l'écoute des notifications
        return unsubscribe;
      },
};

export default NotificationService;
