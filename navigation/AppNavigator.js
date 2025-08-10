import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WatchScreen from '../screens/WatchScreen'; 
import SeasonsScreen from '../screens/SeasonsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#161618ff' },
        headerTintColor: '#fff',
        headerTitle: () => (
          <Image
            source={require('../assets/logo.png')}
            style={{ width: 120, height: 80, resizeMode: 'contain', marginLeft:-15, marginTop:-10, marginBottom:-5}}
          />
        ),
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Watch" component={WatchScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Seasons" component={SeasonsScreen} />

    </Stack.Navigator>
  );
}
