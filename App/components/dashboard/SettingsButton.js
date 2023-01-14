import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import CustomModal from "../standard/CustomModal";
import Settings from "../../views/Settings";

const SettingsButton = () => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <CustomModal
      toggleBtnTitle={<Ionicons name="settings" size={24} color="black" />}
      toggleBtnStyle={styles.toggleBtnStyle}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <Settings />
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
