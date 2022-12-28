import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
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
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          onClose?.();
          setModalVisible(!modalVisible);
        }}
      >
        {children}
      </Modal>
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        style={{ ...styles.toggleBtn, ...toggleBtnStyle }}
      >
        <Text style={{ ...styles.toggleBtnText, ...toggleBtnTextStyle }}>
          {toggleBtnTitle}
        </Text>
      </Pressable>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  toggleBtn: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 5,
  },
  toggleBtnText: {
    color: "white",
    fontSize: 20,
  },
});
