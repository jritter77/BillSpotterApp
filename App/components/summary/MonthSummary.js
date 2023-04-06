import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import { getMonthBills, projectWeeklyBills } from "../../models/Bills";

const MonthSummary = ({ bills }) => {
  const [entries, setEntries] = React.useState([]);
  const date = new Date();

  const populateEntries = async () => {
    let monthBills = await getMonthBills(date.getFullYear(), date.getMonth());
    monthBills = [...monthBills, ...projectWeeklyBills(monthBills)];

    const entries = [];

    for (let i = 0; i < monthBills.length; i++) {
      entries.push(<Entry key={i} bill={monthBills[i]} />);
    }

    setEntries(entries);
  };

  React.useEffect(() => {
    populateEntries();
  }, [bills]);

  return (
    <Bubble title={"Month Summary"}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Due </Text>
        <Text style={{ ...styles.headerText, flex: 1 }}>Bill Name</Text>
        <Text style={styles.headerText}>Amt Due</Text>
        <Text style={styles.headerText}>Amt Paid</Text>
      </View>
      <View style={styles.hr}></View>
      {entries}
    </Bubble>
  );
};

const Entry = ({ bill }) => {
  return (
    <View style={styles.entry}>
      <Text style={{ ...styles.text, width: "auto", color: "grey" }}>
        {bill.billDue.month}/{bill.billDue.date}
      </Text>
      <Text
        numberOfLines={1}
        style={{ ...styles.text, flex: 1, fontWeight: "bold" }}
      >
        {bill.billName}
      </Text>
      <Text style={styles.text}>${bill.billAmt}</Text>
      <Text style={{ ...styles.text, color: "green" }}>
        {bill.billAmtPaid ? "$" : ""}
        {bill.billAmtPaid}
      </Text>
    </View>
  );
};

export default MonthSummary;

const styles = StyleSheet.create({
  entry: {
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
  },
  text: {
    width: "20%",
    margin: 4,
  },
  headerText: {
    fontWeight: "bold",
    width: "20%",
    margin: 4,
  },
  hr: {
    height: 1,
    backgroundColor: "black",
    margin: 4,
  },
});
