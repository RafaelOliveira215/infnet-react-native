import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const EditMarker = () => {
  const router = useRouter();
  const { marker: serializedMarker, markers: serializedMarkers } = useLocalSearchParams();

  // Parse the passed marker and markers array data
  const initialMarker = serializedMarker ? JSON.parse(serializedMarker) : null;
  const markersArray = serializedMarkers ? JSON.parse(serializedMarkers) : [];

  const [name, setName] = useState(initialMarker?.title || '');
  const [latitude, setLatitude] = useState(initialMarker?.latitude.toString() || '');
  const [longitude, setLongitude] = useState(initialMarker?.longitude.toString() || '');

  const handleSubmit = () => {
    const updatedMarker = {
      id: initialMarker.id,  // Keep the same id
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      title: name,
    };

    // Update the markers array: replace the old marker with the updated one
    const updatedMarkers = markersArray.map((marker) =>
      marker.id === updatedMarker.id ? updatedMarker : marker
    );

    // Send the updated markers array back to the Home page
    router.push({
        pathname: '/',
        params: { markers: JSON.stringify(updatedMarkers) },
      });
    };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Marker Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
      />
      <Button title="Update Marker" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
  },
});

export default EditMarker;
