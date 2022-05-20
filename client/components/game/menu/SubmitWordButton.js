import React from "react";
import { Button } from "react-native";

const SubmitWordButton = (props) => {
  return (
    <Button
      title="Submit"
      onPress={() => console.log("submit word button pressed")}
    />
  );
};

export default SubmitWordButton;
