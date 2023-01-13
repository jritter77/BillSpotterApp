import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { getStoredBills, setStoredBills } from "../../models/Bills";
import CustomModal from "../standard/CustomModal";
import BillForm from "./BillForm";
import CustomAlert from "../standard/CustomAlert";

const BillInfo = (props) => {
  const [collapsed, setCollapsed] = React.useState(true);
  const [modalVisible, setModalVisible] = React.useState(false);
  const { index, setBills, bill } = props;
  const { billName, billType, billFreq, billDue, billAmt } = bill;

  const BillHeader = () => (
    <Pressable style={styles.header} onPress={() => setCollapsed(!collapsed)}>
      <Text style={styles.headerText}>{billName}</Text>
      <Text style={styles.headerText}>{collapsed ? "+" : "-"}</Text>
    </Pressable>
  );

  const EditBillBtn = () => (
    <CustomModal
      toggleBtnTitle="Edit"
      toggleBtnStyle={styles.button}
      toggleBtnTextStyle={styles.buttonText}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      animationType={"slide"}
    >
      <BillForm setModalVisible={setModalVisible} {...props} />
    </CustomModal>
  );

  const DeleteBillBtn = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() =>
        CustomAlert(
          "Delete Bill",
          `Are you sure you would like to delete this bill?`,
          handleDelete
        )
      }
    >
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
    <View style={styles.container}>
      <BillHeader />
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
              {billDue.month}/{billDue.date}/{billDue.year}
            </Text>
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>Bill Amount Due:</Text>
            <Text>${billAmt}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <EditBillBtn />
          <DeleteBillBtn />
        </View>
      </View>
    </View>
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
  container: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: "5%",
    borderWidth: 10,
  },
});
