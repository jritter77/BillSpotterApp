import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewBillBtn from "../components/bills/NewBillBtn";
import CustomScrollView from "../components/standard/CustomScrollView";
import { getBills } from "../models/Bills";

const MyBills = () => {

  const [bills, setBills] = React.useState({});

  React.useEffect(() => {
    const updateBills = async () => {
      const result = await getBills();
      if (result) {
        setBills(result);
      }
    }

    updateBills();
  }, []);

  return <CustomScrollView></CustomScrollView>;
};

export default MyBills;

const styles = StyleSheet.create({});
