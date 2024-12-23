import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ApolloProvider } from '@apollo/client';
import client from '../apolloClient';
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
    <ApolloProvider client={client}>
    <Provider store={store}>
        <Stack initialRouteName='login'>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="map" options={{ headerShown: false }} />
          <Stack.Screen name="form" options={{ headerShown: true, headerTitle: 'Nova localização' }} />
          <Stack.Screen name="editMarker" options={{ headerShown: true, headerTitle: 'Editar localização' }} />
          <Stack.Screen name="markersList" options={{ headerShown: true, headerTitle: 'Listar localização' }} />
        </Stack>
    </Provider>
    </ApolloProvider>
  );
}

