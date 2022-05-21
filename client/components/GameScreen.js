import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import GameHeader from "./game/GameHeader";
import PlayerTurnFrame from "./game/PlayerTurnFrame";
import OpponentTurnFrame from "./game/OpponentTurnFrame";
import ResultsFrame from "./game/ResultsFrame";
import GameMenu from "./game/GameMenu";
import LoadingScreen from "./LoadingScreen";
import useURL from "./hooks/useURL";

const GameScreen = ({ user }) => {
  const dummyP1 = {
    id: user.id,
    name: user.username,
  };
  const dummyP2 = {
    id: 2,
    name: "Worderbot",
  };
  const dummyPrompt = {
    id: 1,
    text: "chicken",
    p_num: null,
    score: null,
    is_first_word: false,
  };

  const dummyGame = {
    id: 1,
    player1: dummyP1,
    player2: dummyP2,
    player1_score: 0,
    player2_score: 0,
    prompt: dummyPrompt,
    is_over: false,
    num_rounds: 3,
    round: 1,
    turn: 1,
    is_single_player: true,
    words: [],
  };

  const [isLoading, setIsLoading] = useState(true);
  const [game, setGame] = useState(dummyGame);
  const { is_over: isOver, turn, player1, player2 } = game;
  const URL = useURL();

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (player1.id === user.id && isOdd(turn)) ||
    (player2.id === user.id && !isOdd(turn));

  const [playerInput, setPlayerInput] = useState("");
  const [pNum, setPNum] = useState(1);

  // load the game, and set loading to false after success
  useEffect(() => {
    fetch(URL + "/games/current")
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));

    setGame(dummyGame);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={
        Platform.OS === "ios" ? 0 : StatusBar.currentHeight
      }
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, position: "relative" }}>
        <GameHeader game={game} user={user} />
        <View style={{ flex: 1 }}>
          {isOver ? (
            <ResultsFrame game={game} user={user} />
          ) : isPlayerTurn ? (
            <PlayerTurnFrame
              game={game}
              user={user}
              playerInput={playerInput}
              setPlayerInput={setPlayerInput}
              pNum={pNum}
              setPNum={setPNum}
            />
          ) : (
            <OpponentTurnFrame game={game} user={user} />
          )}
        </View>
        <View>
          <GameMenu game={game} user={user} isPlayerTurn={isPlayerTurn} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GameScreen;
