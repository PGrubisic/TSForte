import type { Game } from "@/types/game";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type GameCardProps = {
  game: Game;
  onDelete?: (id: string) => void; // Nova opcionalna funkcija
};

export default function GameCard({ game, onDelete }: GameCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: game.imageUrl }} style={styles.image} />
      
      <View style={styles.info}>
        <Text style={styles.title}>{game.title}</Text>
        <Text style={styles.description}>{game.description}</Text>
      </View>

      {/* Ikona za brisanje - prikazuje se samo ako je onDelete poslan */}
      {onDelete && (
        <Pressable onPress={() => onDelete(game.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={22} color="#ef4444" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    elevation: 2,
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#f3f4f6",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },
  description: {
    fontSize: 14,
    color: "#4b5563",
  },
  deleteButton: {
    padding: 8,
  },
});