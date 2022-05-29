import React from "react";
import { Button } from "react-native";

const ContinueButton = ({
  onContinueGame,
  isPlayerTurn,
  isReadyToContinue,
}) => {
  const isButtonActive = !isPlayerTurn && isReadyToContinue;

  return (
    <Button
      title="Continue"
      onPress={onContinueGame}
      disabled={!isButtonActive}
    />
  );
};

export default ContinueButton;
