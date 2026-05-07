import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

// 1. Ispravan import za SafeAreaView (rješava Warning)
import { SafeAreaView } from "react-native-safe-area-context";

// 2. Importi za Firestore (uključujući deleteDoc i doc)
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";

import { firestore } from "@/_firebaseConfig";
import AddGameModal from "@/components/games/AddGameModal";
import GameCard from "@/components/games/GameCard";
import { useAuth } from "@/contexts/AuthContext";
import type { Game } from "@/types/game";

export default function GamesScreen() {
  const { isLoggedIn } = useAuth();

  const [games, setGames] = useState<Game[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [gameTitle, setGameTitle] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [gameImageUrl, setGameImageUrl] = useState("");

  // DOHVAĆANJE PODATAKA
  const fetchGames = async () => {
    try {
      const gamesCollection = collection(firestore, "games");
      const gamesSnapshot = await getDocs(gamesCollection);
      const gamesList = gamesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Game, "id">),
      })) as Game[];
      setGames(gamesList);
    } catch (error) {
      console.error("Error loading games:", error);
      Alert.alert("Greška", "Nije moguće učitati igre.");
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  // DODAVANJE IGRE
  const handleAddGame = async () => {
    if (!gameTitle || !gameDescription || !gameImageUrl) {
      Alert.alert("Nedostaju podaci", "Molimo unesite sve podatke o igri.");
      return;
    }
    if (!isLoggedIn) {
      Alert.alert("Prijava potrebna", "Prijavite se kako biste dodali igru.");
      return;
    }

    const newGameData = { 
      title: gameTitle, 
      description: gameDescription, 
      imageUrl: gameImageUrl 
    };

    try {
      const docRef = await addDoc(collection(firestore, "games"), newGameData);
      setGames((prev) => [...prev, { id: docRef.id, ...newGameData }]);
      setModalVisible(false);
      setGameTitle(""); setGameDescription(""); setGameImageUrl("");
      Alert.alert("Uspjeh", "Igra dodana!");
    } catch (error) {
      Alert.alert("Greška", "Spremanje nije uspjelo.");
    }
  };

  // BRISANJE IGRE (Sa potvrdom)
  const handleDeleteGame = async (gameId: string) => {
    if (!isLoggedIn) {
      Alert.alert("Greška", "Moraš biti prijavljen za brisanje.");
      return;
    }

    Alert.alert(
      "Brisanje",
      "Jesi li siguran da želiš obrisati ovu igru?",
      [
        { text: "Odustani", style: "cancel" },
        { 
          text: "Obriši", 
          style: "destructive", 
          onPress: async () => {
            try {
              // Brisanje iz Firestore-a
              await deleteDoc(doc(firestore, "games", gameId));
              
              // Lokalno micanje iz liste (UI update)
              setGames((prev) => prev.filter(g => g.id !== gameId));
            } catch (error) {
              console.error(error);
              Alert.alert("Greška", "Nije uspjelo brisanje.");
            }
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Lista Igara</Text>
          <Text style={styles.subtitle}>
            Upravljaj bazom vježbi i igara za TS Forte.
          </Text>
        </View>

        <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Dodaj novu igru</Text>
        </Pressable>

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard 
              game={item} 
              onDelete={isLoggedIn ? handleDeleteGame : undefined} 
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <AddGameModal
          visible={modalVisible}
          title={gameTitle}
          description={gameDescription}
          imageUrl={gameImageUrl}
          onChangeTitle={setGameTitle}
          onChangeDescription={setGameDescription}
          onChangeImageUrl={setGameImageUrl}
          onClose={() => setModalVisible(false)}
          onSubmit={handleAddGame}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef3f8",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10, 
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#111827",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 4,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 40,
  },
});