import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AuthInput from "../ui/AuthInput";
import ErrorMessage from "../ui/ErrorMessage";

export default function LoggedOutView() {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async () => {
        try {
            await login(email, password);
            setErrorMessage("");
        } catch (error: any) {
            setErrorMessage(error.message ?? "Prijava nije uspjela.");
        }
    };

    return (
        <View style={styles.screen}>
            <View style={styles.card}>
                <Ionicons name="person-circle-outline" size={72} color="#1f6feb" />
                <Text style={styles.title}>Prijava</Text>

                <AuthInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <AuthInput
                    placeholder="Lozinka"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <ErrorMessage message={errorMessage} />

                <TouchableOpacity 
                  activeOpacity={0.8} 
                  style={styles.mainButton} 
                  onPress={handleLogin}
                >
                  <LinearGradient
                    colors={['#1f6feb', '#3b82f6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Prijavi se</Text>
                  </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, backgroundColor: "#EEF3F8", justifyContent: "center", alignItems: "center", padding: 20 },
    card: { width: "100%", maxWidth: 380, backgroundColor: "#FFFFFF", borderRadius: 18, padding: 24, alignItems: "center", elevation: 4 },
    title: { fontSize: 28, fontWeight: "700", color: "#111827", marginTop: 10, marginBottom: 18 },
    mainButton: { width: "100%", borderRadius: 12, overflow: 'hidden', marginTop: 10 },
    buttonGradient: { paddingVertical: 14, alignItems: "center", justifyContent: "center" },
    buttonText: { color: "white", fontSize: 16, fontWeight: "700" },
});