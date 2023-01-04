import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { getBillTotals } from "../../models/Bills";

const BarGraph = ({ bills }) => {
  const [totals, setTotals] = React.useState({});

  const populateBars = () => {
    const bars = [];
    let max = 0;

    for (let t in totals) {
      if (totals[t].due > max) {
        max = totals[t].due + 200;
      }
    }

    for (let total in totals) {
      bars.push(
        <BarGroup
          key={total}
          label={total}
          due={totals[total].due}
          paid={totals[total].paid}
          max={max}
        />
      );
    }

    return bars;
  };

  React.useEffect(() => {
    const getTotals = async () => {
      setTotals(await getBillTotals());
    };

    getTotals();
  }, [bills]);

  return <View style={styles.graph}>{populateBars()}</View>;
};

const BarGroup = ({ label, due, paid, max }) => {
  return (
    <View style={styles.barGroup}>
      <BarLabel label={label} />
      <View style={styles.bars}>
        <View style={styles.bar}>
          <Bar style={{ ...styles.due, width: `${(100 * due) / max}%` }} />
          <BarTotal amt={due} />
        </View>
        <View style={styles.bar}>
          <Bar style={{ ...styles.paid, width: `${(100 * paid) / max}%` }} />
          <BarTotal amt={paid} />
        </View>
      </View>
    </View>
  );
};

const Bar = ({ style }) => <View style={style}></View>;

const BarLabel = ({ label }) => <Text style={styles.label}>{label}</Text>;

const BarTotal = ({ amt }) => <Text style={styles.total}>{amt}</Text>;

export default BarGraph;

const styles = StyleSheet.create({
  barGroup: {
    flexDirection: "row",
    flex: 1,
    marginTop: "5%",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bars: {
    flex: 1,
  },
  paid: {
    backgroundColor: "green",
    height: "100%",
  },
  due: {
    backgroundColor: "black",
    height: "100%",
  },
  label: {
    width: "20%",
    textAlign: "right",
    marginRight: "5%",
  },
  graph: {
    padding: "5%",
    flex: 1,
  },
  total: {
    paddingLeft: "5%",
  },
});
