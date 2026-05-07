import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type AddGameModalProps = {
  visible: boolean;
  title: string;
  description: string;
  imageUrl: string;
  onChangeTitle: (value: string) => void;
  onChangeDescription: (value: string) => void;
  onChangeImageUrl: (value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
};

export default function AddGameModal({
  visible,
  title,
  description,
  imageUrl,
  onChangeTitle,
  onChangeDescription,
  onChangeImageUrl,
  onClose,
  onSubmit,
}: AddGameModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={styles.backdrop}
      >
        <View style={styles.content}>
          <Text style={styles.modalTitle}>Dodaj novu igru</Text>

          <TextInput
            placeholder="Naslov igre"
            placeholderTextColor="#9ca3af" // Sivi tekst umjesto bijelog
            value={title}
            onChangeText={onChangeTitle}
            style={styles.input}
          />

          <TextInput
            placeholder="Opis igre"
            placeholderTextColor="#9ca3af"
            value={description}
            onChangeText={onChangeDescription}
            style={[styles.input, styles.textArea]}
            multiline
          />

          <TextInput
            placeholder="URL slike (https://...)"
            placeholderTextColor="#9ca3af"
            value={imageUrl}
            onChangeText={onChangeImageUrl}
            style={styles.input}
            autoCapitalize="none"
          />

          <Pressable style={styles.primaryButton} onPress={onSubmit}>
            <Text style={styles.primaryButtonText}>Spremi</Text>
          </Pressable>

          <Pressable style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Odustani</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 14,
    backgroundColor: "#f9fafb", // Blaga siva pozadina
    color: "#111827", // Crni tekst dok tipkaš
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  primaryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  primaryButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 15,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#6b7280",
    fontWeight: "600",
    fontSize: 15,
  },
});