import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const Form = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = () => {
    // Navigate back to the home screen with the new marker data
    router.push({
      pathname: '/',
      params: { name, latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
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
      <Button title="Add Marker" onPress={handleSubmit} />
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

export default Form;
