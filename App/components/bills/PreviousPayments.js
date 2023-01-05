import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";
import Payment from "./Payment";

const PreviousPayments = ({ bills, setBills }) => {
  const [limit, setLimit] = React.useState(bills.length > 3 ? 3 : bills.length);
  let showMoreVisible = false;

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
          showMoreVisible = true;
          break;
        }
      }
    }

    showMoreVisible = false;

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
