import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    updateProfile,
    updateEmail
} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {initializeAuth} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getReactNativePersistence} from "firebase/auth/react-native";
import firebaseConfig from './config/firebaseConfig';
import { setDoc, doc, getDoc, getFirestore, initializeFirestore } from 'firebase/firestore';
import { User } from '../classes/User';
import { addUserToAsyncStorage,getUserFromAsyncStorage,updateUserToAsyncStorage } from "../utils/AsyncStorageUtil";

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const auth = getAuth(app);
const firestore = getFirestore(app);

const AuthService = { 
  register: async (email, displayName, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = new User(
        userCredential.user.uid,
        userCredential.user.email,
        displayName,
        "",
        new Date().toISOString(),
        "","",new Date().toISOString()
      );
      await setDoc(doc(firestore, 'users', user.uid), { ...user }, { merge: true });
      await addUserToAsyncStorage(user);
      console.log(user); // save user info in AsyncStorage
      return user;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userSnapshot = await getDoc(doc(firestore, 'users', userCredential.user.uid));
      const userData = userSnapshot.data();
  
      if (userData) {
        const user = new User(
          userCredential.user.uid,
          userCredential.user.email,
          userData.displayName,
          userData.phoneNumber,
          userData.createdAt,
          userData.photoURL,
          userData.biography,
          userData.lastLogin
        );
  
        // Update user's last login date
        const lastLoginDate = new Date().toISOString();
        await setDoc(doc(firestore, 'users', user.uid), {
          ...userData, // Merge existing user data
          lastLogin: lastLoginDate
        }, { merge: true });
  
        await AsyncStorage.setItem('user', JSON.stringify(user));
        return user;
      } else {
        throw new Error('User data not found');
      }
    } catch (error) {
      throw error;
    }
  },      
  updateUser: async (displayName, photoURL, phoneNumber, biography) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Utilisateur non authentifié');
      }
  
      await updateProfile(user, {
        displayName: displayName,
        photoURL: photoURL
      });
  
      const userRef = doc(firestore, 'users', user.uid);
  
      const userData = {
        displayName: displayName,
        photoURL: photoURL,
        phoneNumber: phoneNumber,
        biography: biography
      };
  
      await setDoc(userRef, userData, { merge: true });
  
      // Update user in AsyncStorage
      const storedUser = await getUserFromAsyncStorage();
      storedUser.displayName = displayName;
      storedUser.photoURL = photoURL;
      storedUser.phoneNumber = phoneNumber;
      storedUser.biography = biography;
      await updateUserToAsyncStorage(storedUser);
  
      return true;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  },
  emailUpdate: async (email) => {
      updateEmail(auth.currentUser, email).then(() => {
          return true
      }).catch((error) => {
          console.log(error.message)
          return error.message
      });
  },
  verification: async () => {
    try {
        return await sendEmailVerification(auth.currentUser)
    } catch (e) {
        console.log(e.message)
        return e.message
    }
  },

  signOut: async () => {
      try {
          return await signOut(auth);
      } catch (error) {
          console.log(e.message)
          return e.message
      }
  },
  getUserById: async (userId) => {
    try {
      const userSnapshot = await getDoc(doc(firestore, 'users', userId));
      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;