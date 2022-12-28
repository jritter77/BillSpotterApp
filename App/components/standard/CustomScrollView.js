import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

/**
 * It takes in a single prop called children, and returns a ScrollView component with the children prop
 * passed to it.
 * @returns A ScrollView component with the children passed in as props.
 */
const CustomScrollView = ({ children }) => {
  return <ScrollView>{children}</ScrollView>;
};

export default CustomScrollView;

const styles = StyleSheet.create({});
