import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router'; // Assuming you're using Expo Router

const MarkersList = () => {
  const { markers: serializedMarkers } = useLocalSearchParams(); // Get serialized markers from route params
  const markers = serializedMarkers ? JSON.parse(serializedMarkers) : [];

  return (
    <View style={styles.container}>
      <ScrollView>
        {markers.map((marker) => (
          <Card key={marker.id} style={styles.card}>
            <Card.Content>
              <Title>{marker.title}</Title>
              <Paragraph>Latitude: {marker.latitude}</Paragraph>
              <Paragraph>Longitude: {marker.longitude}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
});

export default MarkersList;
