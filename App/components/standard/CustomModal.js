import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

/**
 * It's a custom modal component that takes in a few props and returns a modal that can be toggled on
 * and off.
 * @returns A custom modal component that can be used in any other component.
 */
const CustomModal = ({
  children,
  onClose,
  style,
  toggleBtnStyle,
  toggleBtnTitle,
  toggleBtnTextStyle,
  modalVisible,
  setModalVisible,
  transparent,
  animationType,
  toggleContent,
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Modal
        transparent={transparent}
        animationType={animationType}
        visible={modalVisible}
        onRequestClose={() => {
          onClose?.();
          setModalVisible(!modalVisible);
        }}
      >
        {children}
      </Modal>
      <TouchableOpacity
        onPress={() => setModalVisible(!modalVisible)}
        style={{ ...styles.toggleBtn, ...toggleBtnStyle }}
      >
        {!toggleContent && (
          <Text style={{ ...styles.toggleBtnText, ...toggleBtnTextStyle }}>
            {toggleBtnTitle}
          </Text>
        )}
        {toggleContent}
      </TouchableOpacity>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {},
  toggleBtn: {
    backgroundColor: "black",
    borderRadius: 5,
  },
  toggleBtnText: {
    color: "white",
    fontSize: 16,
  },
});
