import React from "react";
import { Button } from "react-native";

const NewGameButton = ({ onNewGame }) => {
  return <Button title="New Game" onPress={onNewGame} />;
};

export default NewGameButton;
