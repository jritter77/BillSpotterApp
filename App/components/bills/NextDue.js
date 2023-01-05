import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";
import { getBillTotals, sortByDate } from "../../models/Bills";

const NextDue = ({ bills, setBills }) => {
  const [limit, setLimit] = React.useState(3);

  const populateDueBills = () => {
    const dueBills = [];

    for (let i = 0; i < bills.length; i++) {
      if (!bills[i].billPaid) {
        dueBills.push(
          <DueBill key={i} bill={bills[i]} setBills={setBills} index={i} />
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
      <TouchableOpacity style={styles.btn} onPress={() => setLimit(limit + 3)}>
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
