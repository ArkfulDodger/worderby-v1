import React from "react";
import { View } from "react-native";
import GText from "../tools/GText";

const AlertMessage = ({ alertMessage }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        padding: 15,
      }}
    >
      <GText>{alertMessage}</GText>
    </View>
  );
};

export default AlertMessage;
