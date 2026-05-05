import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
// Putanja je ../ jer je _firebaseConfig.js izvan app mape
import { auth } from '../_firebaseConfig.js';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        console.log("Prijava uspješna!");

        // Koristimo setTimeout jer tvoja verzija Expo Routera (6.0.23) 
        // ponekad treba milisekundu da registrirate Firebase session 
        // prije nego što dozvoli navigaciju.
        setTimeout(() => {
          router.replace("/(tabs)") // Navigiraj na glavni ekran nakon uspješne prijave
        }, 100);
      })
      .catch((error) => {
        console.log("Greška:", error.code);
        Alert.alert("Greška", "Pogrešan e-mail ili lozinka.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TS Forte - Prijava</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Lozinka"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Prijavi se" onPress={handleLogin} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    padding: 15,
    fontSize: 16
  },
  buttonContainer: {
    marginTop: 10,
    borderRadius: 8,
    overflow: 'hidden'
  }
});