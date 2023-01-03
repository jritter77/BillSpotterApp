import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewBillBtn from "../components/bills/NewBillBtn";
import CustomScrollView from "../components/standard/CustomScrollView";
import { getStoredBills } from "../models/Bills";
import BillInfo from "../components/bills/BillInfo";

const MyBills = ({ bills, setBills }) => {
  function populateBills() {
    const billComps = [];
    for (let [i, bill] of bills.entries()) {
      let bc = <BillInfo key={i} index={i} setBills={setBills} bill={bill} />;
      billComps.push(bc);
    }
    return billComps;
  }

  return <CustomScrollView>{populateBills()}</CustomScrollView>;
};

export default MyBills;

const styles = StyleSheet.create({});
