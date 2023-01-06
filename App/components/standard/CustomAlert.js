import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomAlert = (title, msg, confirmHandler) => {
  return Alert.alert(title, msg, [
    { text: "yes", onPress: confirmHandler },
    { text: "no" },
  ]);
};

export default CustomAlert;

const styles = StyleSheet.create({});
