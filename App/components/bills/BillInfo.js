import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import { getStoredBills, setStoredBills } from "../../models/Bills";

const BillInfo = ({
  index,
  billName,
  billType,
  billFreq,
  billDue,
  billAmt,
  setBills,
}) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const BillHeader = () => (
    <Pressable style={styles.header} onPress={() => setCollapsed(!collapsed)}>
      <Text style={styles.headerText}>{billName}</Text>
      <Text style={styles.headerText}>{collapsed ? "+" : "-"}</Text>
    </Pressable>
  );

  const EditBillBtn = () => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
  );

  const DeleteBillBtn = () => (
    <TouchableOpacity style={styles.button} onPress={handleDelete}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );

  async function handleDelete() {
    const bills = await getStoredBills();
    bills.splice(index, 1);
    await setStoredBills(bills);
    setBills(await getStoredBills());
  }

  return (
    <Bubble header={<BillHeader />}>
      <View style={{ display: collapsed ? "none" : "flex" }}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Type:</Text>
            <Text>{billType}</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Frequency:</Text>
            <Text>{billFreq}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Due Date:</Text>
            <Text>
              {billDue.month + 1}/{billDue.date}/{billDue.year}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Amount Due:</Text>
            <Text>{billAmt}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <EditBillBtn />
          <DeleteBillBtn />
        </View>
      </View>
    </Bubble>
  );
};

export default BillInfo;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
  },
  button: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 5,
    margin: "5%",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "5%",
  },
  col: {
    flex: 1,
  },
});
