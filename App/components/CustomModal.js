import { Button, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";

const CustomModal = ({
  content,
  onClose,
  style,
  toggleBtnStyle,
  toggleBtnTitle,
  toggleBtnTextStyle,
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);

  return (
    <View style={{ ...styles.container, ...style }}>
      <Modal
        visible={modalVisible}
        onRequestClose={() => {
          onClose?.();
          setModalVisible(!modalVisible);
        }}
      >
        {content}
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
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 5,
  },
  toggleBtnText: {
    color: "white",
    fontSize: 20,
  },
});
