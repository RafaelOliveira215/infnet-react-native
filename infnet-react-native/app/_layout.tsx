import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from '../store/store';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);


  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Home' }} />
          <Stack.Screen name="form" options={{ headerShown: true, headerTitle: 'Nova localização' }} />
          <Stack.Screen name="editMarker" options={{ headerShown: true, headerTitle: 'Editar localização' }} />
          <Stack.Screen name="markersList" options={{ headerShown: true, headerTitle: 'Listar localização' }} />
        </Stack>
    </Provider>
  );
}

