import { StyleSheet, Text, View } from "react-native";
import React from "react";
import CustomScrollView from "../components/standard/CustomScrollView";
import BarGraph from "../components/summary/BarGraph";
import Bubble from "../components/standard/Bubble";
import { getBillTotals } from "../models/Bills";

const Summary = ({ bills }) => {
  const [totalDue, setTotalDue] = React.useState(0);
  const [totalPaid, setTotalPaid] = React.useState(0);

  const getTotals = async () => {
    const totals = await getBillTotals();

    let td = 0;
    let tp = 0;

    for (let t in totals) {
      td += totals[t].due;
      tp += totals[t].paid;
    }

    setTotalDue(td);
    setTotalPaid(tp);
  };

  getTotals();

  return (
    <CustomScrollView>
      <Bubble title={"Month Summary"}>
        <BarGraph bills={bills} />
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.header}>Due:</Text>
            <Text style={styles.amt}>${totalDue}.00</Text>
          </View>
          <View style={styles.col}>
            <Text style={{ ...styles.header, color: "green" }}>Paid:</Text>
            <Text style={{ ...styles.amt, color: "green" }}>
              ${totalPaid}.00
            </Text>
          </View>
        </View>
      </Bubble>
    </CustomScrollView>
  );
};

export default Summary;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  col: {
    flex: 1,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    textDecorationLine: "underline",
    marginTop: "10%",
    fontWeight: "bold",
  },
  amt: {
    textAlign: "center",
    fontSize: 24,
    padding: "10%",
  },
});
