import { Image } from 'expo-image';
import { Alert, Button, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D4AF37', dark: '#d3bf0d' }}
      headerImage={
        <Image
          source={require('@/assets/images/forte-logo.png')}
          style={styles.reactLogo}
        />
      }>
      
      {/* Glavna komponenta: Naslov */}
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TS Forte</ThemedText>
        <HelloWave />
      </ThemedView>

      {/* Osnovni View sa tekstom - cilj kolegija: prikaz informacija */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">O nama</ThemedText>
        <ThemedText>
          Tamburaški sastav Forte - glazba za sve vaše prigode.
        </ThemedText>
      </ThemedView>

      {/* Interakcija - cilj kolegija: Event handling (onPress) */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Rezervacije</ThemedText>
        <Button
          title="Zakaži svoj termin"
          color="#d4c00b"
          onPress={() => Alert.alert('Upit poslan', 'Hvala vam na interesu!')}
        />
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 12,
    padding: 10,
  },
  reactLogo: {
    height: 160,
    width: 260,
    bottom: 10,
    alignSelf: 'center',
    position: 'absolute',
  },
});