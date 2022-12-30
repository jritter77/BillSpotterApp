import { StyleSheet, Text, View } from "react-native";
import React from "react";

/**
 * It takes in a title and children, and returns a view with a title and content.
 * @returns A component that is a view with a title and content.
 */
const Bubble = ({ title, children, header }) => {
  return (
    <View style={styles.container}>
      {header}
      {!header && <Text style={styles.title}>{title}</Text>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

export default Bubble;

const styles = StyleSheet.create({
  container: {
    borderWidth: 15,
    borderRadius: 5,
    margin: "5%",
    borderColor: 'black'
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
