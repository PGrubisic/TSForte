import { StyleSheet, TextInput, TextInputProps } from "react-native";

type AuthInputProps = TextInputProps;

export default function AuthInput(props: AuthInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={props.placeholderTextColor ?? "#374151"}
      style={[
        styles.input,
        props.multiline && styles.textArea,
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#000000",
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});