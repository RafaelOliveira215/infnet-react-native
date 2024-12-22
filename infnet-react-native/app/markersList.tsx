import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useQuery, gql } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setCountries } from '../store/slice';

const MarkersList = () => {
  const { markers: serializedMarkers } = useLocalSearchParams();
  const markers = serializedMarkers ? JSON.parse(serializedMarkers) : [];

  const GET_COUNTRIES = gql`
    query {
      countries {
        code
        name
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.theme.countries);

  useEffect(() => {
    if (data && data.countries) {
      dispatch(setCountries(data.countries));
    }
  }, [data, dispatch]);

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Lista de marcações</Text>
        {markers?.map((marker) => (
          <Card key={marker.id} style={styles.card}>
            <Card.Content>
              <Title>{marker.title}</Title>
              <Paragraph>Latitude: {marker.latitude}</Paragraph>
              <Paragraph>Longitude: {marker.longitude}</Paragraph>
            </Card.Content>
          </Card>
        ))}

        <Text style={styles.sectionTitle}>Paises para visitar</Text>
        {countries[0]?.slice(0, 10).map((country) => (
          <Card key={country.code} style={styles.card}>
            <Card.Content>
              <Title>{country.name}</Title>
              <Paragraph>Codigo: {country.code}</Paragraph>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default MarkersList;
