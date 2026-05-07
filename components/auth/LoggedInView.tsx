import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { firestore } from "../../_firebaseConfig";
import AuthInput from "../ui/AuthInput";

export default function LoggedInView() {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState({ name: "", age: "", bio: "" });
    const [loading, setLoading] = useState(true);
    const [statusMsg, setStatusMsg] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            try {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProfile(docSnap.data() as any);
                }
            } catch (error) {
                setStatusMsg("Greška pri učitavanju.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const handleSave = async () => {
        if (!user) return;
        try {
            await setDoc(doc(firestore, "users", user.uid), profile);
            setStatusMsg("✅ Podaci spremljeni!");
            setTimeout(() => setStatusMsg(""), 3000);
        } catch (error) {
            setStatusMsg("❌ Greška pri spremanju.");
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#1f6feb" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Ionicons name="person-circle" size={80} color="#1f6feb" />
                <Text style={styles.title}>Moj Profil</Text>

                <AuthInput 
                    placeholder="Ime" 
                    value={profile.name} 
                    onChangeText={(t) => setProfile({...profile, name: t})} 
                />
                <AuthInput 
                    placeholder="Dob" 
                    value={profile.age} 
                    onChangeText={(t) => setProfile({...profile, age: t})} 
                    keyboardType="numeric" 
                />
                <AuthInput 
                    placeholder="O meni" 
                    value={profile.bio} 
                    onChangeText={(t) => setProfile({...profile, bio: t})} 
                    multiline 
                />

                <Text style={[styles.status, { color: statusMsg.includes('✅') ? 'green' : 'red' }]}>
                    {statusMsg}
                </Text>

                <TouchableOpacity style={styles.btn} onPress={handleSave}>
                    <Text style={styles.btnText}>Spremi profil</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.btn, {backgroundColor: '#f3f4f6', marginTop: 15}]} 
                    onPress={logout}
                >
                    <Text style={[styles.btnText, {color: '#ef4444'}]}>Odjavi se</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flexGrow: 1, padding: 20, backgroundColor: "#EEF3F8", justifyContent: "center" },
    centered: { flex: 1, justifyContent: "center", alignItems: "center" },
    card: { backgroundColor: "white", borderRadius: 20, padding: 25, alignItems: "center", elevation: 5 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#111827" },
    status: { marginVertical: 10, fontWeight: "600", fontSize: 14 },
    btn: { width: '100%', padding: 16, borderRadius: 12, backgroundColor: '#1f6feb', alignItems: 'center' },
    btnText: { color: 'white', fontWeight: '700', fontSize: 16 }
});