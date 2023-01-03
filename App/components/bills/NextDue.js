import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";

const NextDue = ({ bills, setBills }) => {
  const limit = bills.length > 3 ? 3 : bills.length;

  const populateDueBills = () => {
    const dueBills = [];

    for (let i = 0; i < limit; i++) {
      dueBills.push(<DueBill key={i} bill={bills[i]} />);
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

export default NextDue;

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
