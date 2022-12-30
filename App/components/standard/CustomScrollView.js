import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";


/**
 * It takes in a single prop called children, and returns a ScrollView component with the children prop
 * passed to it.
 * @returns A ScrollView component with the children passed in as props.
 */
const CustomScrollView = ({ children }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', 'lightgreen']}
        style={{position: 'absolute', width: '100%', height: '100%'}}
        />
      <ScrollView  contentContainerStyle={styles.content}>{children}</ScrollView>
       
    </View>
  )
  
};

export default CustomScrollView;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  content: {}
});
