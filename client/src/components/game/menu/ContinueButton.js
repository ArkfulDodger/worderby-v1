import React from "react";
import { Button } from "react-native";

const ContinueButton = ({ onContinueGame }) => {
  return <Button title="Continue" onPress={onContinueGame} />;
};

export default ContinueButton;
