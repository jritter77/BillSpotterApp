import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";
import Payment from "./Payment";

const PreviousPayments = ({ bills, setBills }) => {
  const [limit, setLimit] = React.useState(bills.length > 3 ? 3 : bills.length);
  const [showMoreVisible, setShowMoreVisible] = React.useState(false);

  const populatePrevPayments = () => {
    const prevPayments = [];

    for (let i = bills.length - 1; i >= 0; i--) {
      if (bills[i].billPaid) {
        prevPayments.push(
          <Payment
            key={i}
            bill={bills[i]}
            setBills={setBills}
            bills={bills}
            index={i}
          />
        );

        if (prevPayments.length >= limit) {
          break;
        }
      }
    }

    return prevPayments;
  };

  React.useEffect(() => {
    if (bills.filter((e) => e.billAmtPaid !== null).length > limit) {
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }
  }, [bills, limit]);

  return (
    <Bubble title={"Previous Payments"}>
      {populatePrevPayments()}

      {showMoreVisible && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setLimit(limit + 3)}
        >
          <Text style={styles.btnText}>Show More</Text>
        </TouchableOpacity>
      )}
      {!bills.filter((e) => e.billAmtPaid !== null).length && (
        <Text style={styles.noBills}>
          {"You do not currently have any previous payments to display."}
        </Text>
      )}
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
  noBills: {
    textAlign: "center",
    padding: "5%",
    fontSize: 16,
  },
});
