// EditMarker.js
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Appbar, Provider, DefaultTheme, MD3DarkTheme } from 'react-native-paper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux'; // Import hooks
import { toggleTheme } from '../store/slice'; // Import the toggleTheme action

const EditMarker = () => {
  const router = useRouter();
  const { marker: serializedMarker, markers: serializedMarkers } = useLocalSearchParams();

  const initialMarker = serializedMarker ? JSON.parse(serializedMarker) : null;
  const markersArray = serializedMarkers ? JSON.parse(serializedMarkers) : [];

  const [name, setName] = useState(initialMarker?.title || '');
  const [latitude, setLatitude] = useState(initialMarker?.latitude.toString() || '');
  const [longitude, setLongitude] = useState(initialMarker?.longitude.toString() || '');
  const [errors, setErrors] = useState({
    name: '',
    latitude: '',
    longitude: '',
  });

  // Access theme from Redux state
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const validateForm = () => {
    const newErrors = { name: '', latitude: '', longitude: '' };
    let isValid = true;

    // Validate name
    if (!name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    // Validate latitude (numeric and valid range)
    const latitudeNum = parseFloat(latitude);
    if (isNaN(latitudeNum) || latitudeNum < -90 || latitudeNum > 90) {
      newErrors.latitude = 'Latitude must be a number between -90 and 90';
      isValid = false;
    }

    // Validate longitude (numeric and valid range)
    const longitudeNum = parseFloat(longitude);
    if (isNaN(longitudeNum) || longitudeNum < -180 || longitudeNum > 180) {
      newErrors.longitude = 'Longitude must be a number between -180 and 180';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const updatedMarker = {
        id: initialMarker.id,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        title: name,
      };

      const updatedMarkers = markersArray.map((marker) =>
        marker.id === updatedMarker.id ? updatedMarker : marker
      );

      router.push({
        pathname: '/map',
        params: { markers: JSON.stringify(updatedMarkers) },
      });
    }
  };

  return (
    <Provider theme={theme === 'dark' ? MD3DarkTheme : DefaultTheme}>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content title="Edit Location" />
          <Appbar.Action icon={theme === 'dark' ? 'brightness-7' : 'brightness-3'} onPress={() => dispatch(toggleTheme())} />
        </Appbar.Header>

        <TextInput
          label="Nome da localização"
          value={name}
          onChangeText={setName}
          style={styles.input}
          error={!!errors.name}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

        <TextInput
          label="Latitude"
          keyboardType="numeric"
          value={latitude}
          onChangeText={setLatitude}
          style={styles.input}
          error={!!errors.latitude}
        />
        {errors.latitude ? <Text style={styles.errorText}>{errors.latitude}</Text> : null}

        <TextInput
          label="Longitude"
          keyboardType="numeric"
          value={longitude}
          onChangeText={setLongitude}
          style={styles.input}
          error={!!errors.longitude}
        />
        {errors.longitude ? <Text style={styles.errorText}>{errors.longitude}</Text> : null}

        <Button mode="contained" onPress={handleSubmit} style={styles.button}>
          Atualizar localização
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default EditMarker;
