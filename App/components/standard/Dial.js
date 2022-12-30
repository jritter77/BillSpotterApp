import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Dial = ({ values }) => {
  const populateValues = () => {
    const options = [];

    for (let val of values) {
      options.push(
        <View style={styles.container}>
          <Text style={styles.option}>{val}</Text>
        </View>
      );
    }

    return options;
  };

  return (
    <ScrollView
      decelerationRate={0}
      snapToAlignment={"center"}
      snapToInterval={100}
    >
      {populateValues()}
    </ScrollView>
  );
};

export default Dial;

const styles = StyleSheet.create({
  container: {
    height: 100,
    justifyContent: "center",
  },
  option: {
    fontSize: 24,
    textAlign: "center",
  },
});
