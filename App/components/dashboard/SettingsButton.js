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
import Settings from "../../views/Settings";
import FAQ from "../../views/FAQ";

const SettingsButton = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <CustomModal
      toggleBtnTitle={<Ionicons name="help-circle" size={24} color="black" />}
      toggleBtnStyle={styles.toggleBtnStyle}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <FAQ />
    </CustomModal>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({
  toggleBtnStyle: {
    padding: 8,
    backgroundColor: "white",
  },
});
