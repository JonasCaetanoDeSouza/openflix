import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}  // texto branco ou preto
        backgroundColor={isDark ? '#121212' : '#ffffff'}      // fundo da status bar
      />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}
