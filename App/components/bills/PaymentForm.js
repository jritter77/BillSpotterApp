import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomForm from "../standard/CustomForm";
import PickerInput from "../standard/PickerInput";
import DatePicker from "../standard/DatePicker";
import FormTextInput from "../standard/FormTextInput";
import {
  createNewBill,
  generateNewBill,
  getStoredBills,
  setStoredBills,
} from "../../models/Bills";
import { ToastContext } from "../standard/Toast";
import CustomAlert from "../standard/CustomAlert";

const PaymentForm = ({ setModalVisible, setBills, bill, index }) => {
  const d = new Date();
  const [billPaid, setBillPaid] = React.useState({
    month: (d.getMonth() + 1).toString().padStart(2, 0),
    date: d.getDate().toString().padStart(2, 0),
    year: d.getFullYear(),
  });
  const [billAmtPaid, setBillAmtPaid] = React.useState(bill.billAmt);
  const [feedback, setFeedback] = React.useState("");

  const setToast = React.useContext(ToastContext);

  const onSubmit = async () => {
    if (!verifyInput()) {
      return;
    }

    CustomAlert(
      "Confirm Payment",
      "Mark bill as paid with entered information?",
      async () => {
        const bills = await getStoredBills();

        const index = bills.findIndex(
          (e) =>
            e.billName === bill.billName &&
            e.billDue.date === bill.billDue.date &&
            e.billDue.month === bill.billDue.month &&
            e.billDue.year === bill.billDue.year
        );

        bills[index] = {
          ...bills[index],
          billPaid,
          billAmtPaid,
        };

        const newBill = generateNewBill(bills[index]);
        const exists = bills.filter((e) => {
          return (
            e.billName === newBill.billName &&
            e.billDue.month === newBill.billDue.month &&
            e.billDue.date === newBill.billDue.date
          );
        });

        if (!exists.length) {
          bills.push(newBill);
        }

        await setStoredBills(bills);
        setBills(bills);
        setModalVisible(false);
        setToast("Bill Payment Confirmed");
      }
    );
  };

  const verifyInput = () => {
    if (!parseInt(billAmtPaid) > 0) {
      setFeedback("Please enter a valid amount paid.");
      return false;
    } else {
      setFeedback("");
      return true;
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomForm onSubmit={onSubmit} title={"Confirm Paid"}>
        <Text style={styles.heading}>Payment Details</Text>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.text}>{bill.billName}</Text>
        <Text style={styles.label}>Type</Text>
        <Text style={styles.text}>{bill.billType}</Text>
        <Text style={styles.label}>Due</Text>
        <Text style={styles.text}>
          {bill.billDue.month}/{bill.billDue.date}/{bill.billDue.year}
        </Text>
        <Text style={styles.label}>Amount Due</Text>
        <Text style={styles.text}>${bill.billAmt}</Text>
        <Text style={styles.label}>Date Paid</Text>
        <DatePicker value={billPaid} setValue={setBillPaid} />
        <Text style={styles.label}>Amount Paid</Text>
        <View style={styles.row}>
          <Text style={styles.dollar}>$</Text>
          <FormTextInput
            placeholder="Amount"
            value={billAmtPaid}
            onChangeText={(e) =>
              setBillAmtPaid((oldstate) => {
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

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    padding: "5%",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "5%",
  },
  heading: {
    fontSize: 24,
    textDecorationLine: "underline",
  },
  text: {
    fontSize: 16,
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
