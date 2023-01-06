import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

/**
 * It takes in a function called onSubmit and a children prop, and returns a View with the children and
 * a TouchableOpacity with the onSubmit function.
 * @returns A function that takes in a component and returns a component.
 */
const CustomForm = ({ children, onSubmit, title }) => {
  return (
    <View>
      {children}
      <TouchableOpacity style={styles.submit} onPress={onSubmit}>
        <Text style={styles.submitText}>{title ? title : "Submit"}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomForm;

const styles = StyleSheet.create({
  submit: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 5,
    marginTop: "10%",
  },
  submitText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});
