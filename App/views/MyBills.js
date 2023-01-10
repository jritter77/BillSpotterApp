import { StyleSheet, Text, View } from "react-native";
import React from "react";
import NewBillBtn from "../components/bills/NewBillBtn";
import CustomScrollView from "../components/standard/CustomScrollView";
import { getStoredBills, sortByDate } from "../models/Bills";
import BillInfo from "../components/bills/BillInfo";
import Bubble from "../components/standard/Bubble";

const MyBills = ({ bills, setBills }) => {
  function populateBills() {
    const billComps = [];
    for (let [i, bill] of bills.entries()) {
      if (!bill.billPaid) {
        let bc = <BillInfo key={i} index={i} setBills={setBills} bill={bill} />;
        billComps.push(bc);
      }
    }
    return billComps;
  }

  return (
    <CustomScrollView>
      {populateBills()}
      {!bills.length && (
        <Bubble title="No Bills">
          <Text style={styles.noBills}>
            {
              "You do not have any bills to display.\n\nUse the New Bill Button above\nto create a new bill."
            }
          </Text>
        </Bubble>
      )}
    </CustomScrollView>
  );
};

export default MyBills;

const styles = StyleSheet.create({
  noBills: {
    textAlign: "center",
    padding: "5%",
    fontSize: 16,
  },
});
