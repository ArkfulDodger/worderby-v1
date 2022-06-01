import React from "react";
import { Button } from "react-native";
import PButton from "../../tools/PButton";

const ContinueButton = ({
  onContinueGame,
  isPlayerTurn,
  isReadyToContinue,
}) => {
  const isButtonActive = !isPlayerTurn && isReadyToContinue;

  return (
    <PButton
      onPress={onContinueGame}
      disabled={!isButtonActive}
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      Continue
    </PButton>
  );
};

export default ContinueButton;
