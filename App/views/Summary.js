import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomScrollView from "../components/standard/CustomScrollView";
import BarGraph from "../components/summary/BarGraph";
import Bubble from "../components/standard/Bubble";

const Summary = ({ bills }) => {
  return (
    <CustomScrollView>
      <Bubble title={"Month Summary"}>
        <BarGraph bills={bills} />
      </Bubble>
    </CustomScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({});
