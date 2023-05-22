import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserFromAsyncStorage = async () => {
  try {
    const userJSON = await AsyncStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      return user;
    }
    return null;
  } catch (error) {
    console.log('[AsyncStorageUtil] Utilisateur non trouvé fromAsyncStorage:', error);
    return null;
  }
};

export const addUserToAsyncStorage = async (user) => {
  try {
    const userJSON = JSON.stringify(user);
    await AsyncStorage.setItem('user', userJSON);
  } catch (error) {
    console.log('[AsyncStorageUtil] Utilisateur non ajouté AsyncStorage:', error);
  }
};

export const updateUserToAsyncStorage = async (user) => {
  try {
    const userJSON = JSON.stringify(user);
    await AsyncStorage.setItem('user', userJSON);
  } catch (error) {
    console.log('[AsyncStorageUtil] Utilisateur non édité AsyncStorage:', error);
  }
};


