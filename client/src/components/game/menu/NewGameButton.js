import React, { useContext } from "react";
import { Button } from "react-native";
import { UserContext } from "../../../../App";
import PButton from "../../tools/PButton";

const NewGameButton = ({
  onNewGame,
  rematchOffered,
  rematchGame,
  onAcceptRematch,
}) => {
  const { user } = useContext(UserContext);

  return (
    <PButton
      disabled={rematchOffered && rematchGame.challenger_id === user.id}
      onPress={rematchOffered ? onAcceptRematch : onNewGame}
      style={{
        width: 120,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
      }}
    >
      {rematchOffered && rematchGame.challenger_id !== user.id
        ? "Accept"
        : "Play Again"}
    </PButton>
  );
};

export default NewGameButton;
