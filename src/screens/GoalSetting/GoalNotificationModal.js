import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";

const NotificationModal = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is the notification modal!</Text>
        <TouchableOpacity onPress={onClose}>
          <Text>Close Modal</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NotificationModal;
