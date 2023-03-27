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

  return <Bubble title={"Month Summary"}>{entries}</Bubble>;
};

const Entry = ({ bill }) => {
  return (
    <View style={styles.entry}>
      <Text style={{ flex: 1 }}>
        {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year % 100}
      </Text>
      <Text numberOfLines={1} style={{ flex: 1 }}>
        {bill.billName}
      </Text>
      <Text style={{ flex: 1 }}>{bill.billAmt}</Text>
      <Text style={{ flex: 1 }}>{bill.billAmtPaid}</Text>
    </View>
  );
};

export default MonthSummary;

const styles = StyleSheet.create({
  entry: {
    flexDirection: "row",
  },
});
