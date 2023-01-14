import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";
import FormTextInput from "../standard/FormTextInput";
import {
  createNewBill,
  getStoredBills,
  setStoredBills,
} from "../../models/Bills";

const BillForm = ({ setModalVisible, setBills, bill, index }) => {
  const [billName, setBillName] = React.useState("");
  const [billType, setBillType] = React.useState("Home");
  const [billFreq, setBillFreq] = React.useState("Monthly");
  const [billDue, setBillDue] = React.useState(bill?.billDue);
  const [billAmt, setBillAmt] = React.useState("0.00");
  const [feedback, setFeedback] = React.useState("");

  const onSubmit = async () => {
    if (!verifyInput()) {
      return;
    }

    const bills = await getStoredBills();
    if (!bill) {
      const newBill = createNewBill(
        billName,
        billType,
        billFreq,
        billDue,
        billAmt
      );
      bills.unshift(newBill);
    } else {
      bills[index] = {
        ...bills[index],
        billName,
        billType,
        billFreq,
        billDue,
        billAmt,
      };
    }

    await setStoredBills(bills);
    setBills(bills);
    setModalVisible(false);
  };

  const verifyInput = () => {
    if (!billName) {
      setFeedback("Please enter a name for the bill.");
      return false;
    } else if (!parseFloat(billAmt) > 0) {
      setFeedback("Please enter a valid amount due for the bill.");
      return false;
    } else {
      setFeedback("");
      return true;
    }
  };

  React.useEffect(() => {
    if (bill) {
      setBillName(bill.billName);
      setBillType(bill.billType);
      setBillFreq(bill.billFreq);
      setBillDue(bill.billDue);
      setBillAmt(bill.billAmt);
    }
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit} title={"Save Changes"}>
        <Text style={styles.heading}>Bill Details</Text>
        <Text style={styles.label}>Bill Name</Text>
        <FormTextInput
          placeholder="Name of bill"
          value={billName}
          onChangeText={setBillName}
        />
        <Text style={styles.label}>Bill Type</Text>
        <PickerInput
          value={billType}
          setValue={setBillType}
          options={["Home", "Auto", "Medical"]}
        />
        <Text style={styles.label}>Bill Frequency</Text>
        <PickerInput
          value={billFreq}
          setValue={setBillFreq}
          options={["One-Time", "Weekly", "Monthly", "Yearly"]}
        />
        <Text style={styles.label}>Bill Due Date</Text>
        <DatePicker value={billDue} setValue={setBillDue} />
        <Text style={styles.label}>Bill Amount Due</Text>
        <View style={styles.row}>
          <Text style={styles.dollar}>$</Text>
          <FormTextInput
            placeholder="Amount"
            value={billAmt}
            onChangeText={(e) =>
              setBillAmt((oldstate) => {
                const num = e.replace(/^0+/, "");
                const sliced =
                  num.slice(0, num.indexOf(".")) +
                  num.slice(num.indexOf(".") + 1);
                const padded = sliced.padStart(3, 0);
                return padded.slice(0, -2) + "." + padded.slice(-2);
              })
            }
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.feedback}>{feedback}</Text>
      </CustomForm>
    </ScrollView>
  );
};

export default BillForm;

const styles = StyleSheet.create({
  container: {
    padding: "5%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: "5%",
  },
  heading: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dollar: {
    fontSize: 24,
    padding: 8,
  },
  feedback: {
    fontSize: 16,
    color: "red",
  },
});
