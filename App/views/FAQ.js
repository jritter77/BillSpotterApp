import {
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { forwardRef } from "react";
import CustomScrollView from "../components/standard/CustomScrollView";

const faqs = [
  {
    question: "How do I create a new bill?",
    answer:
      "1. Navigate to the My Bills tab.\n\n" +
      '2. Tap the "New +" button in the top left of the screen.\n\n' +
      "3. Fill out the required information.\n\n" +
      '4. Tap "Save Changes" when you are finished.',
  },
  {
    question: "How do I edit an existing bill?",
    answer:
      "1. Navigate to the My Bills tab.\n\n" +
      "2. Tap the desired bill to expand the bills information.\n\n" +
      '3. Tap the "Edit" button. \n\n' +
      "4. Make changes to desired fields" +
      '5. Tap "Save Changes" when you are finished.',
  },
  {
    question: "How do I delete an existing bill?",
    answer:
      "1. Navigate to the My Bills tab.\n\n" +
      "2. Tap the desired bill to expand the bills information.\n\n" +
      '3. Tap the "Delete" button. \n\n' +
      '4. Tap "Yes" when asked for confirmation',
  },
  {
    question: "How do I confirm a bill's payment has been made?",
    answer:
      "1. Navigate to either the Dashboard or My Payments tab.\n\n" +
      '2. Find the desired bill in the "Next Due Bills" section and tap the green checkmark icon next to the bill.\n\n' +
      "3. Enter/confirm payment details. \n\n" +
      '4. Tap "Save Changes" when finished.',
  },
  {
    question: "Can I delete a confirmed payment?",
    answer:
      "1. Navigate to the My Payments tab.\n\n" +
      '2. Find the desired payment in the "Previous Payments" section and tap the red "X" icon next to the payment.\n\n' +
      '3. Tap "Yes" when asked for confirmation. \n\n',
  },
  {
    question: "How does BillSpotter store my bill information?",
    answer:
      "BillSpotter saves all bill information to the user's device only.\n\n" +
      "BillSpotter does not store any information remotely.",
  },
];

const FAQ = () => {
  const populateFaqs = () => {
    let questions = [];

    for (let i = 0; i < faqs.length; i++) {
      questions.push(<Question key={i} faq={faqs[i]} />);
    }

    return questions;
  };

  return (
    <CustomScrollView>
      {populateFaqs()}
      <TouchableOpacity
        style={styles.privacyBtn}
        onPress={() =>
          Linking.openURL(
            "https://www.privacypolicies.com/live/293bc9e7-9252-4ee1-a5f2-88234126f75a"
          )
        }
      >
        <Text style={styles.privacyText}>Privacy Policy</Text>
      </TouchableOpacity>
    </CustomScrollView>
  );
};

const Question = ({ faq }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <View style={styles.question}>
      <Pressable
        style={styles.questionHeader}
        onPress={() => setCollapsed(!collapsed)}
      >
        <Text style={styles.questionHeaderText}>{faq.question}</Text>
        <Text style={styles.headerText}>{collapsed ? "+" : "-"}</Text>
      </Pressable>
      <Text
        style={{ ...styles.questionText, display: collapsed ? "none" : "flex" }}
      >
        {faq.answer}
      </Text>
    </View>
  );
};

export default FAQ;

const styles = StyleSheet.create({
  question: {
    backgroundColor: "white",
    borderRadius: 5,
    margin: "5%",
    borderWidth: 10,
  },
  questionHeader: {
    backgroundColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionHeaderText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "black",
  },
  questionText: {
    fontSize: 16,
    padding: "5%",
  },
  privacyBtn: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 5,
    marginTop: "10%",
    margin: "5%",
  },
  privacyText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
