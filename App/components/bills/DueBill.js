import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import CustomModal from "../standard/CustomModal";
import PaymentForm from "./PaymentForm";

const DueBill = ({ bill, setBills, index }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.dateAndName}>
        <Text style={styles.dateField}>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.nameField}>{bill.billName}</Text>
      </View>
      <Text style={styles.amtField}>${bill.billAmt}.00</Text>

      <CustomModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        toggleBtnTitle={
          <Ionicons name="checkmark-circle-outline" size={40} color="green" />
        }
        toggleBtnStyle={styles.confirmPaid}
      >
        <PaymentForm
          setModalVisible={setModalVisible}
          setBills={setBills}
          bill={bill}
          index={index}
        />
      </CustomModal>
    </View>
  );
};

export default DueBill;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingTop: "5%",
  },
  dateField: {
    fontSize: 16,
    color: "grey",
  },
  nameField: {
    fontSize: 16,
    fontWeight: "bold",
  },
  amtField: {
    flex: 1,
    textAlign: "right",
    fontSize: 20,
    fontWeight: "bold",
  },
  confirmPaid: {
    alignItems: "center",
    backgroundColor: "white",
    marginLeft: "10%",
  },
  dateAndName: {
    flex: 1,
  },
});
