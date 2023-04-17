import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import DueBill from "./DueBill";

const NextDue = ({ bills, setBills }) => {
  const [limit, setLimit] = React.useState(3);
  const [showMoreVisible, setShowMoreVisible] = React.useState(false);

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

  React.useEffect(() => {
    if (bills.filter((e) => e.billAmtPaid === null).length > limit) {
      setShowMoreVisible(true);
    } else {
      setShowMoreVisible(false);
    }
  }, [bills, limit]);

  return (
    <Bubble title={"Next Due Bills"}>
      {populateDueBills()}
      {showMoreVisible && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setLimit(limit + 3)}
        >
          <Text style={styles.btnText}>Show More</Text>
        </TouchableOpacity>
      )}
      {!bills.filter((e) => e.billAmtPaid === null).length && (
        <Text style={styles.noBills}>
          {
            "You do not currently have any upcoming payments.\n\nYou can create a new bill from the My Bills page."
          }
        </Text>
      )}
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
  noBills: {
    textAlign: "center",
    padding: "5%",
    fontSize: 16,
  },
});
