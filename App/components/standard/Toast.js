import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

const ToastContext = React.createContext("");

const Toast = ({ message }) => {
  const [visible, setVisible] = React.useState(false);

  const setMessage = useContext(ToastContext);

  React.useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setTimeout(() => setMessage(""), 3000);
  }, [message]);

  return (
    <View style={{ ...styles.container, display: visible ? "flex" : "none" }}>
      <View style={styles.toast}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export { Toast, ToastContext };

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  toast: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
    borderRadius: 30,
    marginBottom: "20%",
  },
  text: {
    color: "white",
  },
});
