import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const { markers: serializedMarkers } = useLocalSearchParams();

  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch location');
      }
    };

    getUserLocation();
  }, []);

  useEffect(() => {
    if (serializedMarkers) {
      const parsedMarkers = JSON.parse(serializedMarkers);
      setMarkers(parsedMarkers);
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

  // Handle marker click to navigate to the EditMarker page
  const handleMarkerPress = (marker) => {
    router.push({
      pathname: '/editMarker',
      params: { marker: JSON.stringify(marker), markers: JSON.stringify(markers) },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        region={{
          latitude: userLocation?.latitude,
          longitude: userLocation?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)} // Add onPress handler
          />
        ))}
      </MapView>
      <Button 
        title="Add New Marker" 
        onPress={() => router.push({
          pathname: '/form',
          params: { markers: JSON.stringify(markers) },
        })} 
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
});

export default Home;
