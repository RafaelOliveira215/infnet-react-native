import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import styled from 'styled-components/native'; 

const Form = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const { markers: serializedMarkers } = useLocalSearchParams();
  
  const parsedMarkers = serializedMarkers ? JSON.parse(serializedMarkers) : [];
  console.log(parsedMarkers);

  const handleSubmit = () => {
    const newMarker = {
      id: Date.now(),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      title: name,
    };
    const updatedMarkers = [...parsedMarkers, newMarker];

    router.push({
      pathname: '/',
      params: { markers: JSON.stringify(updatedMarkers) },
    });
  };

  return (
    <Container>
      <Input
        placeholder="Enter Marker Name"
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Enter Latitude"
        keyboardType="numeric"
        value={latitude}
        onChangeText={setLatitude}
      />
      <Input
        placeholder="Enter Longitude"
        keyboardType="numeric"
        value={longitude}
        onChangeText={setLongitude}
      />
      <Button title="Add Marker" onPress={handleSubmit} />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 20px;
`;

const Input = styled.TextInput`
  height: 40px;
  border-color: #ccc;
  border-width: 1px;
  margin-bottom: 15px;
  padding-left: 8px;
`;

export default Form;
