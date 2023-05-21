import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../userScreens/HomeScreen';
import ProfilScreen from '../userScreens/ProfilScreen';
import AddPostScreen from '../userScreens/AddPostScreen';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Accueil',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profil"
        component={ProfilScreen}
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
    </Stack.Navigator>
  );
}
