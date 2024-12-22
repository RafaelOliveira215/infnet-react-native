import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../FirebaseConfig'; // Import the auth instance from FirebaseConfig

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Handle login action
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('User logged in:', user);
        router.push('/map'); // Navigate to the map screen after successful login
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('Error during login:', errorMessage);
        setError(errorMessage); // Set error to show error message
      });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Login</Text>

          {/* Email input */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            mode="outlined"
            style={styles.input}
          />

          {/* Password input */}
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />

          {/* Display error message if any */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Login button */}
          <Button mode="contained" onPress={handleLogin} style={styles.button}>
            Login
          </Button>

          {/* Button to navigate to the signup screen */}
          <Button
            mode="text"
            onPress={() => router.push('/signup')} // Navigate to signup screen
            style={styles.signupButton}
          >
            Don't have an account? Sign up
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
  signupButton: {
    marginTop: 12,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default LoginScreen;
