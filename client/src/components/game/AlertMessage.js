import React, { useState, useEffect } from "react";
import { View, Keyboard, Platform } from "react-native";
import GText from "../tools/GText";

const AlertMessage = ({ alertMessage }) => {
  const [padding, setPadding] = useState(5);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
        if (Platform.OS !== "ios") {
          setPadding(0);
        }
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
        if (Platform.OS !== "ios") {
          setPadding(5);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View
      style={{
        // flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        paddingVertical: 5,
      }}
    >
      <GText>{alertMessage}</GText>
    </View>
  );
};

export default AlertMessage;
