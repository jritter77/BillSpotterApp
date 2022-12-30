import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const FormTextInput = (props) => {
  return <TextInput style={styles.input} {...props} />;
};

export default FormTextInput;

const styles = StyleSheet.create({
  input: {
    borderColor: "lightblue",
    borderWidth: 2,
    borderRadius: 5,
    padding: 8,
    fontSize: 16,
  },
});
