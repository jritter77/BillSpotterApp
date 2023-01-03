import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomScrollView from "../components/standard/CustomScrollView";
import NextDue from "../components/bills/NextDue";
import PreviousPayments from "../components/bills/PreviousPayments";

const MyPayments = ({ bills, setBills }) => {
  return (
    <CustomScrollView>
      <NextDue bills={bills} setBills={setBills} />
      <PreviousPayments bills={bills} setBills={setBills} />
    </CustomScrollView>
  );
};

export default MyPayments;

const styles = StyleSheet.create({});
