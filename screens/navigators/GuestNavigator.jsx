import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../guestScreens/LoginScreen';
import LaunchScreen from '../guestScreens/LaunchScreen';
import SignupScreen from '../guestScreens/SignupScreen';


const Stack = createNativeStackNavigator();

export default function GuestNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#900C3F',
              },
              headerTintColor: '#ffffff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={LaunchScreen}
              options={{
                title: 'Welcome',
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{
                title: 'Inscription',
              }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Connexion',
              }}
            />
          </Stack.Navigator>
    )
}