import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
// import useURL from "../hooks/useURL";
import useMWAPI from "../hooks/useMWAPI";
import LoadingScreen from "./LoadingScreen";
import GText from "../components/tools/GText";
import PlayerTurnFrame from "../components/game/frames/PlayerTurnFrame";
import OpponentTurnFrame from "../components/game/frames/OpponentTurnFrame";
import ResultsFrame from "../components/game/frames/ResultsFrame";
import GameHeader from "../components/game/header/GameHeader";
import GameMenu from "../components/game/menu/GameMenu";
import { UserContext, UrlContext } from "../../App";

const GameScreen = ({
  route: {
    params: { gameData },
  },
}) => {
  // console.log("gameData:", gameData);
  // context variables
  const { user, setUser } = useContext(UserContext);
  const URL = useContext(UrlContext);
  console.log("user:", user);

  //#region STATE & Variables
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [game, setGame] = useState(gameData);
  console.log("game:", game);
  const { is_over: isOver, turn, player1, player2 } = game;
  const mwURL = useMWAPI;

  const isOdd = (num) => !!(num % 2);
  const isPlayerTurn =
    (player1.id === user.id && isOdd(turn)) ||
    (player2.id === user.id && !isOdd(turn));

  const [playerInput, setPlayerInput] = useState("");
  const [pNum, setPNum] = useState(1);
  //#endregion

  //#region Game Actions
  const getWordToSubmit = () => {
    return game.prompt.text.slice(-pNum) + playerInput;
  };

  const isWordEntry = (data) => {
    return !!data[0].meta;
  };

  const isWordInStems = (data, word) => {
    return data[0].meta.stems.find(
      (s) => s.toLowerCase() === word.toLowerCase()
    );
  };

  const isPlayableWordResponse = (data) => {
    if (isWordEntry(data) && isWordInStems(data, getWordToSubmit())) {
      return true;
    } else {
      setAlertMessage(
        <>
          <GText>Oops! </GText>
          <GText style={{ fontWeight: "bold" }}>"{getWordToSubmit()}"</GText>
          <GText> was not found in our dictionary! Try another word.</GText>
        </>
      );
      return false;
    }
  };

  const checkWordInDictionary = async (word) => {
    return fetch(mwURL(word))
      .then((res) => res.json())
      .then((data) => isPlayableWordResponse(data))
      .catch((error) => console.log(error.message));
  };

  const getWordScore = () => {
    return pNum * 10 + playerInput.length;
  };

  const playWord = (word) => {
    setAlertMessage("Success! Playing word...");
    fetch(URL + "/words", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        game_id: game.id,
        round_played: game.round,
        turn_played: game.turn,
        user_id: user.id,
        text: word,
        prompt_text: game.prompt.text,
        p_num: pNum,
        score: getWordScore(),
        is_first_word: false,
      }),
    })
      .then((res) => res.json())
      .then((updatedGameData) => {
        console.log(updatedGameData);
        setGame(updatedGameData);
      })
      .catch((error) => console.log(error.message));
  };

  const onWordSubmit = async () => {
    setAlertMessage("");
    if (playerInput.length === 0) {
      setAlertMessage("Must add at least one letter to play a word!");
      return;
    }
    const word = getWordToSubmit();
    const valid = await checkWordInDictionary(word);

    if (valid) {
      playWord(word);
    }
  };

  const playBotTurn = () => {
    fetch(URL + "/words/bot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        game_id: game.id,
        round_played: game.round,
        turn_played: game.turn,
        user_id: player1.id === user.id ? player1.id : player2.id,
        prompt_text: game.prompt.text,
        is_first_word: false,
      }),
    })
      .then((res) => res.json())
      .then((updatedGameData) => {
        console.log("RETURNED BOT GAME DATA:", updatedGameData);
        setGame(updatedGameData);
        setAlertMessage("");
      })
      .catch((error) => console.log(error.message));
  };

  const onContinueGame = () => {
    if (game.is_single_player) {
      playBotTurn();
    } else {
      console.log("TODO: progress game for multiplayer");
    }
  };

  const onNewGame = () => {
    fetch(URL + "/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        player1_id: game.player2.id,
        player2_id: game.player1.id,
        is_over: false,
        num_rounds: game.num_rounds,
        round: 1,
        turn: 1,
        player1_score: 0,
        player2_score: 0,
        is_single_player: game.is_single_player,
      }),
    })
      .then((res) => res.json())
      .then((newGameData) => {
        console.log("newGameData:", newGameData);
        setGame(newGameData);
        setAlertMessage("");
      })
      .catch((error) => console.log(error.message));
  };

  //#endregion

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
              alertMessage={alertMessage}
              setAlertMessage={setAlertMessage}
            />
          ) : (
            <OpponentTurnFrame game={game} user={user} />
          )}
        </View>
        <View>
          <GameMenu
            game={game}
            user={user}
            isPlayerTurn={isPlayerTurn}
            onWordSubmit={onWordSubmit}
            onContinueGame={onContinueGame}
            onNewGame={onNewGame}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GameScreen;
