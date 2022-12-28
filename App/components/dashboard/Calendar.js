import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Bubble from "../standard/Bubble";

const Calendar = () => {
  function populateDates() {
    const rows = [];

    const date = new Date();
    date.setDate(1);

    const month = date.getMonth();

    for (let r = 0; r < 5; r++) {
      const dates = [];

      for (let c = 0; c < 7; c++) {
        let d = "";

        if (date.getMonth() === month && 7 * r + c >= date.getDay()) {
          d = date.getDate();
          date.setDate(date.getDate() + 1);
        } else {
          d = "";
        }

        dates.push(<Col key={7 * r + c} date={d} />);
      }

      rows.push(<Row key={r} dates={dates} />);
    }

    return rows;
  }

  return <Bubble title="Calendar">{populateDates()}</Bubble>;
};

const Row = ({ dates }) => {
  return <View style={styles.row}>{dates}</View>;
};

const Col = ({ date }) => {
  return <Text style={styles.date}>{date}</Text>;
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 5,
    margin: "5%",
  },
  row: {
    flexDirection: "row",
    margin: "5%",
  },
  title: {
    textAlign: "center",
    color: "white",
    backgroundColor: "black",
  },
  date: {
    flex: 1,
    textAlign: "center",
  },
});
