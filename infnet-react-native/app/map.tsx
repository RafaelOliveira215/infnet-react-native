import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const { markers: serializedMarkers } = useLocalSearchParams();

  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          setIsLoading(false);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setIsLoading(false);
      } catch (error) {
        alert('Failed to fetch location');
        setIsLoading(false);
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (serializedMarkers) {
      try {
        const parsedMarkers = JSON.parse(serializedMarkers);
        const validMarkers = parsedMarkers.filter(
          (marker) =>
            marker.latitude && marker.longitude && marker.title && marker.id
        );
        setMarkers(validMarkers);
      } catch (error) {
        console.error('Error parsing markers:', error);
      }
    }
  }, [serializedMarkers]);

  useEffect(() => {
    if (userLocation && markers.length === 0) {
      const initialMarker = {
        id: Date.now(),
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        title: 'Você',
      };
      setMarkers((prevMarkers) => [initialMarker, ...prevMarkers]);
    }
  }, [userLocation]);

  const handleMarkerPress = useCallback((marker) => {
    router.push({
      pathname: '/editMarker',
      params: { marker: JSON.stringify(marker), markers: JSON.stringify(markers) },
    });
  }, [markers, router]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading map...</Text>
        </View>
      ) : (
        userLocation && (
          <MapView
            style={styles.map}
            provider="google"
            region={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {markers.map((marker) => (
              <Marker
                key={marker.id}
                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                title={marker.title}
                onPress={() => handleMarkerPress(marker)}
              />
            ))}
          </MapView>
        )
      )}
      <Button
        title="Adicionar localização"
        onPress={() =>
          router.push({
            pathname: '/form',
            params: { markers: JSON.stringify(markers) },
          })
        }
      />
      <Button
        title="Listar Localizações"
        onPress={() =>
          router.push({
            pathname: '/markersList',
            params: { markers: JSON.stringify(markers) },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default Home;
