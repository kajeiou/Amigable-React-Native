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
    console.log('Error retrieving user from AsyncStorage:', error);
    return null;
  }
};

export const addUserToAsyncStorage = async (user) => {
  try {
    const userJSON = JSON.stringify(user);
    await AsyncStorage.setItem('user', userJSON);
    console.log('User added to AsyncStorage:', user);
  } catch (error) {
    console.log('Error adding user to AsyncStorage:', error);
  }
};

export const updateUserToAsyncStorage = async (user) => {
  try {
    const userJSON = JSON.stringify(user);
    await AsyncStorage.setItem('user', userJSON);
    console.log('User updated in AsyncStorage:', user);
  } catch (error) {
    console.log('Error updating user in AsyncStorage:', error);
  }
};


