import React, { useContext } from "react";
import { Button } from "react-native";
import { UserContext } from "../../../../App";

const NewGameButton = ({
  onNewGame,
  rematchOffered,
  rematchGame,
  onAcceptRematch,
}) => {
  const { user } = useContext(UserContext);

  return (
    <Button
      title={
        rematchOffered && rematchGame.challenger_id !== user.id
          ? "Accept"
          : "Play Again"
      }
      onPress={rematchOffered ? onAcceptRematch : onNewGame}
      disabled={rematchOffered && rematchGame.challenger_id === user.id}
    />
  );
};

export default NewGameButton;
