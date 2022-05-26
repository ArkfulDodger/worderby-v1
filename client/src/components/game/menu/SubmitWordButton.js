import React from "react";
import { Button } from "react-native";
import useURL from "../../../hooks/useURL";
import useMWAPI from "../../../hooks/useMWAPI";

const SubmitWordButton = ({ game, onWordSubmit }) => {
  const URL = useURL();
  const mwLookup = useMWAPI;

  return <Button title="Submit" onPress={onWordSubmit} />;
};

export default SubmitWordButton;
