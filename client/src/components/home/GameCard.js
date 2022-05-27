import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";
import GText from "../tools/GText";

const GameCard = ({ game: { item: game } }) => {
  console.log("game", game);

  const URL = useContext(UrlContext);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);

  const getGame = () => {
    fetch(URL + `/games/${game.id}`)
      .then((res) => res.json())
      .then((gameData) => {
        console.log("got game data");
        navigation.navigate("Game", { gameData: gameData });
      })
      .catch((error) => console.log(error.message));
  };

  const onGamePress = () => {
    // TODO: set buttons not pressable here
    getGame();
  };

  return (
    <TouchableOpacity
      onPress={onGamePress}
      style={{ width: 300, margin: 10, padding: 5, backgroundColor: "white" }}
    >
      <GText>
        {game.player1.id === user.id
          ? game.player2.username
          : game.player1.username}
      </GText>
      <GText>Round {game.round}</GText>
      <GText>
        {game.player1.id === user.id
          ? game.turn === 1
            ? "Your"
            : game.player2.username + "'s"
          : game.turn === 2
          ? "Your"
          : game.player1.username + "'s"}{" "}
        Turn
      </GText>
    </TouchableOpacity>
  );
};

export default GameCard;
