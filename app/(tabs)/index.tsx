import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Putanja do tvoje slike
const bendSlika = require("../../assets/images/forte-clanovi.jpg");

export default function Page() {
  return (
    <ScrollView style={styles.container} bounces={false}>
      
      {/* Gornji dio sa slikom benda i gradijentom */}
      <ImageBackground
        source={bendSlika}
        style={styles.header}
        imageStyle={{ borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}
        resizeMode="cover"
      >
        {/* Gradijent služi kao filter da bi bijeli tekst bio čitljiv preko slike */}
        <LinearGradient
          colors={['rgba(31, 111, 235, 0.4)', 'rgba(10, 46, 92, 0.9)']}
          style={styles.headerGradient}
        >
          <Ionicons name="musical-notes" size={60} color="white" style={styles.icon} />
          <Text style={styles.brandName}>TS FORTE</Text>
          <Text style={styles.tagline}>Profesionalna glazba za vaše proslave</Text>
        </LinearGradient>
      </ImageBackground>

      {/* Središnji sadržaj */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.welcomeTitle}>Dobrodošli!</Text>
          <Text style={styles.description}>
            Vaša destinacija za najbolji tamburaški štimung. Pratite naše nastupe, 
            rezervirajte termin ili nas kontaktirajte izravno putem aplikacije.
          </Text>
          
          <View style={styles.divider} />

          {/* Informacije o bendu */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={22} color="#1f6feb" />
            </View>
            <Text style={styles.infoText}>Sljedeći nastup: Uskoro...</Text>
          </View>
          
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="location-outline" size={22} color="#1f6feb" />
            </View>
            <Text style={styles.infoText}>Lokacija: Posušje, BiH</Text>
          </View>
        </View>

        {/* Glavni gumb s efektom */}
        <TouchableOpacity 
          activeOpacity={0.8} 
          style={styles.mainButton}
          onPress={() => alert("Uskoro: Izravno slanje upita za termin!")}
        >
          <LinearGradient
            colors={['#1f6feb', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.mainButtonText}>Zakaži termin</Text>
            <Ionicons name="chevron-forward" size={20} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  header: {
    height: 350,
    width: '100%',
  },
  headerGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    paddingTop: 20,
  },
  icon: { marginBottom: 10, opacity: 0.9 },
  brandName: { 
    fontSize: 42, 
    fontWeight: "900", 
    color: "white", 
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4
  },
  tagline: { fontSize: 16, color: "rgba(255, 255, 255, 0.9)", marginTop: 5, fontWeight: "500" },
  content: { flex: 1, paddingHorizontal: 20, marginTop: -40, marginBottom: 30 },
  card: {
    backgroundColor: "white",
    width: "100%",
    borderRadius: 25,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  welcomeTitle: { fontSize: 22, fontWeight: "700", color: "#111827", marginBottom: 10 },
  description: { fontSize: 15, color: "#4B5563", lineHeight: 22, marginBottom: 20 },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginBottom: 20 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 18 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF6FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  infoText: { fontSize: 16, color: "#374151", fontWeight: "500" },
  mainButton: {
    marginTop: 25,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
  },
  buttonGradient: {
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText: { color: "white", fontSize: 18, fontWeight: "700", marginRight: 8 },
});