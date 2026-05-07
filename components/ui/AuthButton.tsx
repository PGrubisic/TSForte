import { Pressable, StyleSheet, Text } from "react-native";

type AuthButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function AuthButton({ title, onPress, variant = "primary" }: AuthButtonProps) {
  return (
    <Pressable
      style={[styles.button, variant === "primary" ? styles.primaryButton : styles.secondaryButton]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, variant === "secondary" && styles.secondaryButtonText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { width: "100%", paddingVertical: 13, borderRadius: 12, alignItems: "center", marginTop: 4 },
  primaryButton: { backgroundColor: "#1f6feb" }, 
  secondaryButton: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#CBD5E1" },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" }, // Bijela slova na plavom
  secondaryButtonText: { color: "#111827" }, // Tamna slova na bijelom gumbu
});