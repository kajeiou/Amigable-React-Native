import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../userScreens/Home/Home';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
import AddPostScreen from '../userScreens/AddPostScreen';
import NotificationScreen from '../userScreens/NotificationScreen';
import Profil from '../userScreens/Profil/Profil';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: 'Accueil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfilTab"
        component={Profil}
        options={{
          title: 'Profil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          title: 'Nouvelle publication',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
