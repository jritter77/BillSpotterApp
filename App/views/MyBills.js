import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewBillBtn from "../components/bills/NewBillBtn";
import CustomScrollView from "../components/standard/CustomScrollView";

const MyBills = () => {
  return (
    <CustomScrollView>
      <NewBillBtn />
    </CustomScrollView>
  );
};

export default MyBills;

const styles = StyleSheet.create({});
