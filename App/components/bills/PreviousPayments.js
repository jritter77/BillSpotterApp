import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";
import Payment from "./Payment";

const PreviousPayments = ({ bills, setBills }) => {
  const limit = bills.length > 3 ? 3 : bills.length;

  const populateDueBills = () => {
    const dueBills = [];

    for (let i = 0; i < bills.length; i++) {
      if (bills[i].billPaid) {
        dueBills.push(
          <Payment
            key={i}
            bill={bills[i]}
            setBills={setBills}
            bills={bills}
            index={i}
          />
        );

        if (dueBills.length >= limit) {
          break;
        }
      }
    }

    return dueBills;
  };

  return (
    <Bubble title={"Next Due Bills"}>
      {populateDueBills()}
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Show More</Text>
      </TouchableOpacity>
    </Bubble>
  );
};

export default PreviousPayments;

const styles = StyleSheet.create({
  btnText: {
    textAlign: "center",
    color: "green",
  },
  btn: {
    borderColor: "green",
    borderWidth: 2,
    width: "50%",
    borderRadius: 5,
    margin: "5%",
    marginLeft: "25%",
  },
});
