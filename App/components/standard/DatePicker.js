import { StyleSheet, Text, View } from "react-native";
import React from "react";

import PickerInput from "./PickerInput";

const DatePicker = ({ value, setValue }) => {
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [month, setMonth] = React.useState(
    (new Date().getMonth() + 1).toString().padStart(2, 0)
  );
  const [date, setDate] = React.useState(
    new Date().getDate().toString().padStart(2, 0)
  );

  const monthOptions = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const yearOptions = [];
  const dayOptions = [];

  for (let i = 0; i < 20; i++) {
    yearOptions.push(new Date().getFullYear() + i);
  }

  for (let i = 0; i < getMonthDays(year, month - 1); i++) {
    dayOptions.push((i + 1).toString().padStart(2, 0));
  }

  React.useEffect(() => {
    if (date > getMonthDays(year, month - 1)) {
      setDate(getMonthDays(year, month - 1));
    }
    setValue({ month, date, year });
  }, [date, month, year]);

  React.useEffect(() => {
    console.log(value);

    if (value) {
      setDate(value.date);
      setMonth(value.month);
      setYear(value.year);
    }
  }, []);

  return (
    <View style={styles.container}>
      <PickerInput value={month} setValue={setMonth} options={monthOptions} />
      <PickerInput value={date} setValue={setDate} options={dayOptions} />
      <PickerInput value={year} setValue={setYear} options={yearOptions} />
    </View>
  );
};

const getMonthDays = (year, month) => {
  const date = new Date(year, month + 1, 0);
  return date.getDate();
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
