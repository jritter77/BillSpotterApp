import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Bubble = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    borderWidth: 5,
    borderRadius: 5,
    margin: "5%",
  },
  title: {
    backgroundColor: "black",
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  content: {
    backgroundColor: "white",
  },
});
