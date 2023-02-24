import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";
import CustomModal from "../standard/CustomModal";
import BillForm from "../bills/BillForm";
import CustomScrollView from "../standard/CustomScrollView";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * It creates a calendar
 * @returns A function that returns a component.
 */
const Calendar = ({ bills }) => {
  const [month, setMonth] = React.useState(new Date().getMonth());
  const [year, setYear] = React.useState(new Date().getFullYear());

  const monthBills = bills?.filter(
    (b) => b.billDue.year === year && parseInt(b.billDue.month) - 1 === month
  );

  function populateDates() {
    const date = new Date();
    const rows = [];
    const today = {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    };
    date.setFullYear(year);
    date.setMonth(month);
    date.setDate(1);

    for (let r = 0; r < 6; r++) {
      const dates = [];

      for (let c = 0; c < 7; c++) {
        let d = "";

        if (date.getMonth() === month && 7 * r + c >= date.getDay()) {
          d = date.getDate();
          date.setDate(date.getDate() + 1);
        } else {
          d = "";
        }

        dates.push(
          <Col key={7 * r + c} date={d} monthBills={monthBills} today={today} />
        );
      }

      rows.push(<Row key={r} dates={dates} />);
    }

    return rows;
  }

  return (
    <Bubble
      header={
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {monthNames[month]} - {year}
          </Text>
        </View>
      }
    >
      {populateDates()}
      <Legend />
    </Bubble>
  );
};

/**
 * It takes in an array of dates and returns a View component with the dates as children.
 * @returns An array of dates.
 */
const Row = ({ dates }) => {
  return <View style={styles.row}>{dates}</View>;
};

/**
 * It takes a date as a prop and returns a Text component with the date as the text
 * @returns A function that returns a Text component.
 */
const Col = ({ date, monthBills, today }) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  const dateBills = monthBills?.filter(
    (b) => parseInt(b.billDue.date) === parseInt(date)
  );

  const populateDateBills = () => {
    const bills = [];

    for (let bill of dateBills) {
      bills.push(<ModalDate key={bill.billName} bill={bill} />);
    }

    return bills;
  };

  if (dateBills.length) {
    return (
      <CustomModal
        toggleBtnTitle={date}
        style={styles.date}
        toggleBtnStyle={styles.date}
        toggleBtnTextStyle={{
          ...styles.dateText,
          ...getHighlight(date, today, dateBills),
        }}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        animationType={"fade"}
        transparent={true}
      >
        <Pressable
          style={styles.dateModalContainer}
          onPress={() => setModalVisible(!modalVisible)}
        >
          {populateDateBills()}
        </Pressable>
      </CustomModal>
    );
  } else {
    return (
      <Text
        style={{
          ...styles.date,
          ...styles.dateText,
        }}
      >
        {date}
      </Text>
    );
  }
};

/**
 * It's a function that returns a TouchableOpacity component that when pressed, will decrement the
 * month by 1 and if the month is 0, it will decrement the year by 1.
 * @returns A function that returns a component.
 */
const PrevDateBtn = ({ month, setMonth, year, setYear }) => {
  const handlePress = () => {
    if (month == 0) {
      setYear(year - 1);
    }
    setMonth((month + 11) % 12);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.headerBtnText}>{"<"}</Text>
    </TouchableOpacity>
  );
};

/**
 * It's a function that returns a TouchableOpacity component that, when pressed, will increment the
 * month and year state variables
 * @returns A function that returns a component.
 */
const NextDateBtn = ({ month, setMonth, year, setYear }) => {
  const handlePress = () => {
    if (month === 11) {
      setYear(year + 1);
    }
    setMonth((month + 1) % 12);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.headerBtnText}>{">"}</Text>
    </TouchableOpacity>
  );
};

const Legend = () => {
  return (
    <View style={styles.legend}>
      <View style={{ ...styles.due, ...styles.legendIcon }}></View>
      <Text>Due</Text>
      <View style={{ ...styles.paid, ...styles.legendIcon }}></View>
      <Text>Paid</Text>
      <View style={{ ...styles.pastDue, ...styles.legendIcon }}></View>
      <Text>Past-Due</Text>
      <View style={{ ...styles.today, ...styles.legendIcon }}></View>
      <Text>Today</Text>
    </View>
  );
};

const ModalDate = ({ bill }) => {
  const date = new Date();

  let status;

  if (bill.billPaid) {
    status = "Paid";
  } else {
    if (date.getFullYear() <= parseInt(bill.billDue.year)) {
      if (
        date.getFullYear() === parseInt(bill.billDue.year) &&
        date.getMonth() + 1 <= parseInt(bill.billDue.month)
      ) {
        if (
          date.getMonth() + 1 === parseInt(bill.billDue.month) &&
          date.getDate() <= parseInt(bill.billDue.date)
        ) {
          status = "Due";
        } else {
          status = "Past Due";
        }
      } else {
        console.log("here");

        status = "Past Due";
      }
    } else {
      status = "Past Due";
    }
  }

  return (
    <View style={styles.modalDate}>
      <Text style={{ ...styles.modalDateField, textAlign: "left" }}>
        {bill.billName}
      </Text>
      <Text style={styles.modalDateField}>${bill.billAmt}</Text>
      <Text style={styles.modalDateField}>{status}</Text>
    </View>
  );
};

function getHighlight(day, today, dateBills) {
  if (!dateBills) {
    return;
  }

  let highlight = {};

  for (let b of dateBills) {
    if (parseInt(b.billDue.date) === day) {
      if (b.billPaid) {
        if (highlight.backgroundColor !== "black") {
          highlight = styles.paid;
        }
      } else if (
        b.billDue.year < today.year ||
        parseInt(b.billDue.month) - 1 < today.month ||
        parseInt(b.billDue.date) < today.date
      ) {
        highlight = styles.pastDue;
        break;
      } else {
        highlight = styles.due;
      }
    }
  }

  if (day === today.date) {
    highlight = { ...highlight, ...styles.today };
  }

  return highlight;
}

export default Calendar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    margin: "5%",
  },
  row: {
    flexDirection: "row",
    margin: 8,
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
  },
  date: {
    flex: 1,
    backgroundColor: "white",
  },
  dateText: {
    textAlign: "center",
    borderRadius: 5,
    color: "black",
    fontSize: 16,
  },
  dateModalContainer: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: "rgba(0, 0, 0, .5)",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
    paddingBottom: "10%",
  },
  header: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    padding: 8,
  },
  due: {
    backgroundColor: "black",
    color: "white",
  },
  paid: {
    backgroundColor: "green",
    color: "white",
  },
  pastDue: {
    backgroundColor: "darkred",
    color: "white",
  },
  today: {
    borderWidth: 2,
    borderColor: "lightblue",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
  },
  legendIcon: {
    width: 16,
    height: 16,
    borderRadius: 5,
    marginLeft: "5%",
  },
  modalDate: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: "5%",
    width: "70%",
    justifyContent: "space-between",
  },
  modalDateField: {
    flex: 1,
    textAlign: "right",
  },
});
