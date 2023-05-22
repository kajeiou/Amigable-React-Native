import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../userScreens/Home/Home';
import ProfilScreen from '../userScreens/Profil/ProfilScreen';
import AddPostScreen from '../userScreens/AddPostScreen';
import NotificationScreen from '../userScreens/NotificationScreen';
import Profil from '../userScreens/Profil/Profil';

const Stack = createNativeStackNavigator();

export default function UserNavigator({notifications,newNotifications, fetchNotifications}) {
  return (
    <Stack.Navigator>

      <Stack.Screen name="TabHome" options={{ title: 'Accueil', headerShown: false }}>
        {() => <Home newNotifications={newNotifications} />}
      </Stack.Screen>
      <Stack.Screen
        name="TabProfil"
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
      <Stack.Screen name="Notifications" options={{ title: 'Notifications', headerShown: false }}>
        {() => <NotificationScreen notifications={notifications} newNotifications={newNotifications} fetchNotifications={fetchNotifications} />}
      </Stack.Screen>


    </Stack.Navigator>
  );
}
