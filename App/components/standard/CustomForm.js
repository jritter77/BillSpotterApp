import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

/**
 * It takes in a function called onSubmit and a children prop, and returns a View with the children and
 * a TouchableOpacity with the onSubmit function.
 * @returns A function that takes in a component and returns a component.
 */
const CustomForm = ({ children, onSubmit }) => {
  return (
    <View>
      {children}
      <TouchableOpacity onPress={onSubmit}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomForm;

const styles = StyleSheet.create({});
