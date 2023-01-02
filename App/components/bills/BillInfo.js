import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";

const BillInfo = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  const BillHeader = () => (
    <Pressable style={styles.header} onPress={() => setCollapsed(!collapsed)}>
      <Text style={styles.headerText}>Rent</Text>
      <Text style={styles.headerText}>{collapsed ? "+" : "-"}</Text>
    </Pressable>
  );

  const EditBillBtn = () => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Edit</Text>
    </TouchableOpacity>
  );

  const DeleteBillBtn = () => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <Bubble header={<BillHeader />}>
      <View style={{ display: collapsed ? "none" : "flex" }}>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Type:</Text>
            <Text>Home</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Frequency:</Text>
            <Text>Monthly</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Due Date:</Text>
            <Text>01/01/2023</Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Amount Due:</Text>
            <Text>$625.00</Text>
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
