import React from "react";
import { Button } from "react-native";

const ContinueButton = (props) => {
  return (
    <Button
      title="Continue"
      onPress={() => console.log("continue button pressed")}
    />
  );
};

export default ContinueButton;
