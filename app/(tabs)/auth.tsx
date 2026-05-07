import LoggedInView from "@/components/auth/LoggedInView";
import LoggedOutView from "@/components/auth/LoggedOutView";
import { useAuth } from "@/contexts/AuthContext"; // Koristimo naš novi hook
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function AuthScreen() {
  // Uzimamo samo ono što nam treba iz globalnog stanja
  const { isLoggedIn, authReady } = useAuth();

  // Dok Firebase provjerava sesiju, prikaži kružić za učitavanje
  if (!authReady) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1f6feb" />
      </View>
    );
  }

  // Ako smo ulogirani, prikaži Profil, inače formu za Prijavu
  return isLoggedIn ? <LoggedInView /> : <LoggedOutView />;
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    backgroundColor: "#EEF3F8",
    justifyContent: "center",
    alignItems: "center",
  },
});