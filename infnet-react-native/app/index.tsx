import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();
  const { name, latitude, longitude } = useLocalSearchParams();

  const [markers, setMarkers] = useState([
    { id: 1, latitude: 37.78825, longitude: -122.4324, title: "Initial Marker" },
  ]);

  useEffect(() => {
    if (name && latitude && longitude) {
      const newMarker = {
        id: markers.length + 1,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        title: name,
      };
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  }, [name, latitude, longitude]);
  console.log(markers)
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider="google"
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}
          />
        ))}
      </MapView>
      <Button title="Add New Marker" onPress={() => router.push('/form')} />
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
