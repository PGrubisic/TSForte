import { Ionicons } from '@expo/vector-icons'; // Koristimo standardne ikone
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D4AF37', dark: '#8B0000' }}
      headerImage={
        <Ionicons 
          name="musical-notes" 
          size={200} 
          color="rgba(255,255,255,0.3)" 
          style={styles.headerIcon} 
        />
      }>
      
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Informacije</ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Lokacija i kontakt</ThemedText>
        <ThemedText>
          TS Forte je tamburaški sastav koji je dostupan za nastupe širom regije. 
          Bazirani smo u Posušju, ali sviramo gdje god je dobra fešta!
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Repertoar</ThemedText>
        <ThemedText>
          Od tradicionalnih tamburaških pjesama do modernih hitova prilagođenih vašim željama.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.container}>
  <ThemedText type="subtitle">Članovi</ThemedText>
  <ThemedText>
    Harmonika - Branko Rezo {"\n"}
    Tamburica - Karlo Miletić {"\n"}
    Bas gitara- Mario Milas {"\n"}
    Bugarija - Petar Grubišić
  </ThemedText>
</ThemedView>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerIcon: {
    position: 'absolute',
    bottom: 0,
    left: 20,
  },
  titleContainer: {
    paddingHorizontal: 10,
    marginVertical: 15,
  },
  container: {
    gap: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
});