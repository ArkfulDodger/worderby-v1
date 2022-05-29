import React, { useState, useEffect, useContext } from "react";
import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { UserContext, UrlContext } from "../../../App";
import GText from "../tools/GText";

const GameCard = ({ game: { item: game } }) => {
  console.log("GAMECARD game:", game);

  const URL = useContext(UrlContext);
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  // { player1, player2, turn, round}

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (game.player1.id === user.id && isOdd(game.turn)) ||
    (game.player2.id === user.id && !isOdd(game.turn));

  const opponent = game.player1.id === user.id ? game.player2 : game.player1;

  const isReadyToContinue = game.is_word_played_this_turn;

  // function isWordPlayedThisRound() {
  //   const round = game.round;
  //   const turn = game.turn;
  //   const wordThisRound = game.words.find(
  //     (word) => word.round_played === round && word.turn_played === turn
  //   );

  //   return !!wordThisRound;
  // }

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
      <GText>{opponent.username}</GText>
      <GText>Round {game.round}</GText>
      <GText>
        {isPlayerTurn !== isReadyToContinue ? "Your" : opponent.username + "'s"}{" "}
        Turn
      </GText>
    </TouchableOpacity>
  );
};

export default GameCard;
